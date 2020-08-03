import Base from './Base';

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

export default class AuthService extends Base {
    profile: string;
    header?: string;
    confirmLabel?: string;
    failureHeader?: string;
    failureDescription?: string;

    constructor(id: string | undefined, profile: string, context?: string) {
        super(id);
        this.profile = profile;
        if (context) this['@context'] = context;
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
        let service = null;
        switch (type) {
            case 'login':
                service = new AuthService(
                    authUri('login'),
                    'http://iiif.io/api/auth/1/login',
                    'http://iiif.io/api/auth/1/context.json'
                );
                break;
            case 'external':
                service = new AuthService(
                    undefined,
                    'http://iiif.io/api/auth/1/external',
                    'http://iiif.io/api/auth/1/context.json'
                );
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
        return new AuthService(authUri('token'), 'http://iiif.io/api/auth/1/token');
    }

    static getLogoutService(authUri: (type: string) => string, authTexts: { [type: string]: AuthTexts }): AuthService {
        const service = new AuthService(authUri('logout'), 'http://iiif.io/api/auth/1/logout');
        service.setAuthTexts(authTexts.logout);
        return service;
    }
}
