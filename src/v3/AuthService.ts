import Service from './Service';

type AuthType = 'login' | 'external' | 'logout';
type AuthTextsByType = { [type: string]: AuthTexts; };

export interface AuthTexts {
    label?: string;
    header?: string;
    description?: string;
    confirmLabel?: string;
    failureHeader?: string;
    failureDescription?: string;
}

export default class AuthService extends Service {
    label?: string;
    header?: string;
    description?: string;
    confirmLabel?: string;
    failureHeader?: string;
    failureDescription?: string;

    setLabel(label?: string): void {
        this.label = label;
    }

    setHeader(header?: string): void {
        this.header = header;
    }

    setDescription(description?: string): void {
        this.description = description;
    }

    setConfirmLabel(confirmLabel?: string): void {
        this.confirmLabel = confirmLabel;
    }

    setFailureHeader(failureHeader?: string): void {
        this.failureHeader = failureHeader;
    }

    setFailureDescription(failureDescription?: string): void {
        this.failureDescription = failureDescription;
    }

    setAuthTexts(authTexts: AuthTexts) {
        if (authTexts.label) this.label = authTexts.label;
        if (authTexts.header) this.header = authTexts.header;
        if (authTexts.description) this.description = authTexts.description;
        if (authTexts.confirmLabel) this.confirmLabel = authTexts.confirmLabel;
        if (authTexts.failureHeader) this.failureHeader = authTexts.failureHeader;
        if (authTexts.failureDescription) this.failureDescription = authTexts.failureDescription;
    }

    static getAuthenticationService(authUri: (type: string) => string, authTexts: AuthTextsByType,
                                    type: AuthType = 'login'): AuthService | null {
        if (!authTexts.hasOwnProperty(type))
            return null;

        let service = null;
        switch (type) {
            case 'login':
                service = new AuthService(
                    authUri('login'), Service.AUTH_TOKEN_SERVICE_1, 'http://iiif.io/api/auth/1/login');
                break;
            case 'external':
                service = new AuthService(
                    undefined, Service.AUTH_EXTERNAL_SERVICE_1, 'http://iiif.io/api/auth/1/external');
                break;
            default:
                return null;
        }

        service.setAuthTexts(authTexts[type]);
        service.setService(AuthService.getAccessTokenService(authUri));

        if (type !== 'external')
            service.setService(AuthService.getLogoutService(authUri, authTexts));

        return service;
    }

    static getAccessTokenService(authUri: (type: string) => string): AuthService {
        return new AuthService(
            authUri('token'), Service.AUTH_TOKEN_SERVICE_1, 'http://iiif.io/api/auth/1/token');
    }

    static getLogoutService(authUri: (type: string) => string, authTexts: { [type: string]: AuthTexts }): AuthService {
        const service = new AuthService(
            authUri('logout'), Service.AUTH_LOGOUT_SERVICE_1, 'http://iiif.io/api/auth/1/logout');
        service.setAuthTexts(authTexts.logout);
        return service;
    }
}
