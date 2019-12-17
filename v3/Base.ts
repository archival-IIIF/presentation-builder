import Service from './Service';
import Resource from './Resource';

export type Internationalized = string | string[] | { [language: string]: string[] };
export type LabelValue = { label: Internationalized; value: Internationalized };

type ExtendedRef = Ref & { format?: string; profile?: string; };
type ViewingDirection = 'left-to-right' | 'right-to-left' | 'top-to-bottom' | 'bottom-to-top';

export interface Ref {
    id?: string;
    type?: string;
    label?: Internationalized;
}

export default class Base implements Ref {
    id?: string;
    type?: string;
    label?: Internationalized;

    '@context'?: string | string[];

    summary?: Internationalized;
    thumbnail?: Resource[];
    partOf?: { id: string; type: string; }[];
    logo?: Resource[];
    requiredStatement?: LabelValue;
    homepage?: Ref & { format?: string; }[];
    rights?: string;
    service?: Service[];
    items?: (Ref | Base)[];
    metadata?: LabelValue[];
    rendering?: Ref & { format?: string; }[];
    seeAlso?: Ref & { format?: string; profile?: string; }[];
    behavior?: string[];
    viewingDirection?: ViewingDirection;

    constructor(id?: string, type?: string, label?: Internationalized) {
        if (id) this.id = id;
        if (type) this.type = type;
        if (label) this.setLabel(label);
    }

    setLabel(label: Internationalized): void {
        if (typeof label === 'string')
            this.label = {'@none': [label]};
        else
            this.label = label;
    }

    setContext(context?: string): void {
        this['@context'] = context || [
            'http://www.w3.org/ns/anno.jsonld',
            'http://iiif.io/api/presentation/3/context.json'
        ];
    }

    setSummary(summary: string): void {
        this.summary = {'@none': [summary]};
    }

    setThumbnail(resource: Resource): void {
        if (!this.thumbnail)
            this.thumbnail = [resource];
        else
            this.thumbnail.push(resource);
    }

    setParent(id: string, type: string): void {
        this.partOf = [{id, type}];
    }

    setLogo(logo: Resource): void {
        if (!this.logo)
            this.logo = [logo];
        else
            this.logo.push(logo);
    }

    setAttribution(attribution: string): void {
        this.requiredStatement = {
            'label': {'en': ['Attribution']},
            'value': {'en': [attribution]}
        };
    }

    setHomepage(homepage: ExtendedRef | ExtendedRef[]): void {
        if (!this.homepage)
            this.homepage = [];

        if (Array.isArray(homepage))
            homepage.forEach(sa => this.setHomepage(sa));
        else if ((typeof homepage === 'object') && homepage.hasOwnProperty('id')) {
            const obj: ExtendedRef = {id: homepage.id, type: 'Text', format: 'text/html'};

            if (homepage.label && typeof homepage.label === 'string')
                obj.label = {'@en': [homepage.label]};

            this.homepage.push(obj);
        }
    }

    setRights(rights: string): void {
        this.rights = rights;
    }

    setRendering(rendering: Ref & { format?: string; }): void {
        if (!this.rendering)
            this.rendering = [];

        if (Array.isArray(rendering))
            rendering.forEach(r => this.setRendering(r));
        else {
            const obj: ExtendedRef = {id: rendering.id, type: rendering.type, format: rendering.format};

            if (rendering.label && typeof rendering.label === 'string')
                obj.label = {'@none': [rendering.label]};

            this.rendering.push(rendering);
        }
    }

    setService(service: Service): void {
        if (!this.service)
            this.service = [service];
        else
            this.service.push(service);
    }

    setItems(items: Base | Base[]): void {
        if (!this.items)
            this.items = [];

        if (Array.isArray(items))
            items.forEach(item => this.addItem(item));
        else
            this.items.push(items);
    }

    addItem(item: Base) {
        if (!this.items)
            this.items = [];

        this.items.push(item);
    }

    addMetadata(label: string | string[] | LabelValue | LabelValue[], value?: string | string[]): void {
        if (!this.metadata)
            this.metadata = [];

        if (Array.isArray(label))
            label.forEach((md: string | LabelValue) => this.addMetadata(md));
        else if (typeof label === 'object' && typeof label.label === 'string' && typeof label.value === 'string')
            this.metadata.push({
                label: {'@none': [label.label]},
                value: {'@none': Array.isArray(label.value) ? label.value : [label.value]}
            });
        else
            this.metadata.push({
                label: {'@none': [label as string]},
                value: {'@none': Array.isArray(value) ? value as string[] : [value as string]}
            });
    }

    addSeeAlso(seeAlso: ExtendedRef | ExtendedRef[]): void {
        if (!this.seeAlso)
            this.seeAlso = [];

        if (Array.isArray(seeAlso))
            seeAlso.forEach(sa => this.addSeeAlso(sa));
        else if ((typeof seeAlso === 'object') && seeAlso.hasOwnProperty('id')) {
            const obj: ExtendedRef = {id: seeAlso.id, type: 'Dataset'};

            if (seeAlso.format)
                obj.format = seeAlso.format;
            if (seeAlso.profile)
                obj.profile = seeAlso.profile;
            if (seeAlso.label && typeof seeAlso.label === 'string')
                obj.label = {'@en': [seeAlso.label]};

            this.seeAlso.push(obj);
        }
    }

    addBehavior(behavior: string | string[]): void {
        if (!this.behavior)
            this.behavior = [];

        if (Array.isArray(behavior))
            behavior.forEach(b => this.addBehavior(b));
        else
            this.behavior.push(behavior);
    }

    setViewingDirection(viewingDirection: ViewingDirection): void {
        this.viewingDirection = viewingDirection;
    }
}
