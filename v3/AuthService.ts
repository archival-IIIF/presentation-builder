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

    setAuthTexts(authTexts: AuthTexts) {
        if (authTexts.label) this.label = authTexts.label;
        if (authTexts.header) this.header = authTexts.header;
        if (authTexts.description) this.description = authTexts.description;
        if (authTexts.confirmLabel) this.confirmLabel = authTexts.confirmLabel;
        if (authTexts.failureHeader) this.failureHeader = authTexts.failureHeader;
        if (authTexts.failureDescription) this.failureDescription = authTexts.failureDescription;
    }

    static getAuthenticationService(prefixAuthUrl: string, authTexts: AuthTextsByType,
                                    type: AuthType = 'login'): AuthService | null {
        let service = null;
        switch (type) {
            case 'login':
                service = new AuthService(
                    `${prefixAuthUrl}/login`, Service.AUTH_TOKEN_SERVICE_1, 'http://iiif.io/api/auth/1/login');
                break;
            case 'external':
                service = new AuthService(
                    undefined, Service.AUTH_EXTERNAL_SERVICE_1, 'http://iiif.io/api/auth/1/external');
                break;
            default:
                return null;
        }

        service.setAuthTexts(authTexts[type]);
        service.setService(AuthService.getAccessTokenService(prefixAuthUrl));

        if (type !== 'external')
            service.setService(AuthService.getLogoutService(prefixAuthUrl, authTexts));

        return service;
    }

    static getAccessTokenService(prefixAuthUrl: string): AuthService {
        return new AuthService(
            `${prefixAuthUrl}/token`, Service.AUTH_TOKEN_SERVICE_1, 'http://iiif.io/api/auth/1/token');
    }

    static getLogoutService(prefixAuthUrl: string, authTexts: { [type: string]: AuthTexts }): AuthService {
        const service = new AuthService(
            `${prefixAuthUrl}/logout`, Service.AUTH_LOGOUT_SERVICE_1, 'http://iiif.io/api/auth/1/logout');
        service.setAuthTexts(authTexts.logout);
        return service;
    }
}
