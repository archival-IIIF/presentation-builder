import Base, {ExtendedRef, I18nExtendedRef, Internationalize, Internationalized} from './Base';
import Resource from "./Resource";

export default class Provider {

    id: string;
    type: 'Agent';
    label: Internationalized;
    homepage?: ExtendedRef[];
    logo?: Resource[];
    seeAlso?: ExtendedRef[];

    constructor(id: string, label: Internationalize) {
        this.id = id;
        this.label = Base.i18n(label);
        this.type = 'Agent';
    }

    setId(id: string) {
        this.id = id;
    }

    setLabel(label: Internationalize): void {
        this.label = Base.i18n(label);
    }

    setHomepage(homepage?: I18nExtendedRef | I18nExtendedRef[]): void {
        if (!this.homepage) {
            this.homepage = undefined;
        } else {
            Base.setExtendedRef(this.homepage, homepage, 'en');
        }
    }

    setSeeAlso(seeAlso: I18nExtendedRef | I18nExtendedRef[]): void {
        if (!this.seeAlso){
            this.seeAlso = undefined;
        } else {
            Base.setExtendedRef(this.seeAlso, seeAlso, 'en');
        }
    }

    setLogo(logo?: Resource): void {
        if (!this.logo) {
            this.logo = undefined;
        } else {
            this.logo.push(logo);
        }
    }
}
