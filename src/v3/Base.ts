import Service from './Service';
import Resource from './Resource';
import Provider from './Provider';

export type Internationalized = { [language: string]: string[] };
export type Internationalize = string | string[] | Internationalized;
export type LabelValue = { label: Internationalized; value: Internationalized };

export type ExtendedRef = Ref & { format?: string; profile?: string; };
export type I18nExtendedRef =
    { id?: string; type?: string; label?: Internationalize; format?: string; profile?: string; };
export type ViewingDirection = 'left-to-right' | 'right-to-left' | 'top-to-bottom' | 'bottom-to-top';

export interface Ref {
    id?: string;
    type?: string;
    label?: Internationalized;
}

export default class Base implements Ref {
    '@context'?: string | string[];

    id?: string;
    type?: string;
    label?: Internationalized;

    summary?: Internationalized;
    partOf?: Ref[];
    thumbnail?: Resource[];
    provider?: Provider[];

    logo?: Resource[];
    requiredStatement?: LabelValue;
    rights?: string;
    homepage?: ExtendedRef[];
    seeAlso?: ExtendedRef[];

    metadata?: LabelValue[];
    rendering?: ExtendedRef[];
    service?: Service[];

    constructor(id?: string, type?: string, label?: Internationalize) {
        if (id) this.id = id;
        if (type) this.type = type;
        if (label) this.setLabel(label);
    }

    setContext(context?: string | string[]): void {
        this['@context'] = context || 'http://iiif.io/api/presentation/3/context.json';
    }

    setLabel(label: Internationalize): void {
        this.label = Base.i18n(label);
    }

    setSummary(summary: Internationalize): void {
        this.summary = Base.i18n(summary);
    }

    setParent(id: string | Ref, type?: string, label?: Internationalize): void {
        const parent: Ref = typeof id === 'string' ? {id, type} : id;
        if (label)
            parent.label = Base.i18n(label);

        this.partOf = [parent];
    }

    setThumbnail(resource: Resource): void {
        this.thumbnail = Base.setArrayValue(resource, this.thumbnail);
    }

    setProvider(provider: Provider): void {
        this.provider = Base.setArrayValue(provider, this.provider);
    }

    setLogo(logo: Resource): void {
        this.logo = Base.setArrayValue(logo, this.logo);
    }

    setAttribution(attribution: string): void {
        this.requiredStatement = {
            'label': Base.i18n('Attribution', 'en'),
            'value': Base.i18n(attribution, 'en')
        };
    }

    setRequiredStatement(requiredStatement: LabelValue): void {
        this.requiredStatement = requiredStatement;
    }

    setRights(rights: string): void {
        this.rights = rights;
    }

    setHomepage(homepage: I18nExtendedRef | I18nExtendedRef[]): void {
        if (!this.homepage)
            this.homepage = [];

        Base.setExtendedRef(this.homepage, homepage, 'en');
    }

    setSeeAlso(seeAlso: I18nExtendedRef | I18nExtendedRef[]): void {
        if (!this.seeAlso)
            this.seeAlso = [];

        Base.setExtendedRef(this.seeAlso, seeAlso, 'en');
    }

    setMetadata(label: string | LabelValue | LabelValue[], value?: string | string[]): void {
        if (!this.metadata)
            this.metadata = [];

        if (typeof label === 'string' && value !== undefined)
            this.metadata.push({label: Base.i18n(label), value: Base.i18n(value)});
        else if (Array.isArray(label))
            this.metadata = [...this.metadata, ...label];
        else if (typeof label !== 'string')
            this.metadata.push(label);
    }

    setRendering(rendering: I18nExtendedRef | I18nExtendedRef[]): void {
        if (!this.rendering)
            this.rendering = [];

        Base.setExtendedRef(this.rendering, rendering);
    }

    setService(service: Service | Service[]): void {
        this.service = Base.setArrayValue(service, this.service);
    }

    protected static i18n(text: Internationalize, lang: string = 'none'): Internationalized {
        if (typeof text === 'string' || Array.isArray(text))
            return {[lang]: Array.isArray(text) ? text : [text]};

        return text;
    }

    protected static setExtendedRef(prop: ExtendedRef[],
                                    convert: I18nExtendedRef | I18nExtendedRef[], lang?: string): void {
        if (Array.isArray(convert))
            for (const r of convert)
                Base.setExtendedRef(prop, r, lang);
        else
            prop.push({
                ...convert,
                label: convert.label ? Base.i18n(convert.label, lang) : undefined,
            });
    }

    protected static setArrayValue<R>(value?: R | R[], property?: R[]): R[] | undefined {
        if (value === null || value === undefined)
            return property;

        if (property === null || property === undefined)
            property = [];

        if (Array.isArray(value))
            return [...property, ...value];

        property.push(value);
        return property;
    }
}
