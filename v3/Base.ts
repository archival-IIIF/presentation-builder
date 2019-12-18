import Service from './Service';
import Resource from './Resource';

export type Internationalized = { [language: string]: string[] };
export type Internationalize = string | string[] | Internationalized;
export type LabelValue = { label: Internationalized; value: Internationalized };

type ExtendedRef = Ref & { format?: string; profile?: string; };
type I18nExtendedRef = { id?: string; type?: string; label?: Internationalize; format?: string; profile?: string; };
type ViewingDirection = 'left-to-right' | 'right-to-left' | 'top-to-bottom' | 'bottom-to-top';

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

    logo?: Resource[];
    requiredStatement?: LabelValue;
    rights?: string;
    homepage?: ExtendedRef[];
    seeAlso?: ExtendedRef[];

    behavior?: string[];
    viewingDirection?: ViewingDirection;

    metadata?: LabelValue[];
    items?: Ref[];
    rendering?: ExtendedRef[];
    service?: Service[];

    constructor(id?: string, type?: string, label?: Internationalize) {
        if (id) this.id = id;
        if (type) this.type = type;
        if (label) this.setLabel(label);
    }

    setContext(context?: string): void {
        this['@context'] = context || [
            'http://www.w3.org/ns/anno.jsonld',
            'http://iiif.io/api/presentation/3/context.json'
        ];
    }

    setLabel(label: Internationalize): void {
        this.label = Base.i18n(label);
    }

    setSummary(summary: string): void {
        this.summary = Base.i18n(summary);
    }

    setParent(id: string, type: string, label?: Internationalize): void {
        const parent: Ref = {id, type};
        if (label)
            parent.label = Base.i18n(label);

        this.partOf = [parent];
    }

    setThumbnail(resource: Resource): void {
        if (!this.thumbnail)
            this.thumbnail = [resource];
        else
            this.thumbnail.push(resource);
    }

    setLogo(logo: Resource): void {
        if (!this.logo)
            this.logo = [logo];
        else
            this.logo.push(logo);
    }

    setAttribution(attribution: string): void {
        this.requiredStatement = {
            'label': Base.i18n('Attribution', 'en'),
            'value': Base.i18n(attribution, 'en')
        };
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

    setBehavior(behavior: string | string[]): void {
        if (!this.behavior)
            this.behavior = [];

        if (Array.isArray(behavior))
            behavior.forEach(b => this.setBehavior(b));
        else
            this.behavior.push(behavior);
    }

    setViewingDirection(viewingDirection: ViewingDirection): void {
        this.viewingDirection = viewingDirection;
    }

    setMetadata(label: string | LabelValue | LabelValue[], value?: string | string[]): void {
        if (!this.metadata)
            this.metadata = [];

        if (typeof label === 'string' && value !== undefined)
            this.metadata.push({label: Base.i18n(label), value: Base.i18n(value)});
        else if (Array.isArray(label))
            this.metadata.push(...label);
        else if (typeof label !== 'string')
            this.metadata.push(label);
    }

    setItems(items: Ref | Ref[]): void {
        if (!this.items)
            this.items = [];

        if (Array.isArray(items))
            this.items.push(...items);
        else
            this.items.push(items);
    }

    setRendering(rendering: I18nExtendedRef | I18nExtendedRef[]): void {
        if (!this.rendering)
            this.rendering = [];

        Base.setExtendedRef(this.rendering, rendering);
    }

    setService(service: Service): void {
        if (!this.service)
            this.service = [service];
        else
            this.service.push(service);
    }

    static i18n(text: Internationalize, lang: string = 'none'): Internationalized {
        if (typeof text === 'string' || Array.isArray(text))
            return {[lang]: Array.isArray(text) ? text : [text]};

        return text;
    }

    static setExtendedRef(prop: ExtendedRef[], convert: I18nExtendedRef | I18nExtendedRef[], lang?: string): void {
        if (Array.isArray(convert))
            convert.forEach(r => Base.setExtendedRef(prop, r, lang));
        else
            prop.push({
                ...convert,
                label: convert.label ? Base.i18n(convert.label, lang) : undefined,
            });
    }
}
