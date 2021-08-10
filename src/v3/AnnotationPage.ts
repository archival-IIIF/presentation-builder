import Base, {Ref} from './Base';
import Annotation from "./Annotation";

export default class AnnotationPage extends Base {
    prev?: Ref;
    next?: Ref;

    items?: Annotation[];
    type: 'AnnotationPage';

    constructor(id: string) {
        super(id, 'AnnotationPage');
    }

    setContext(context?: string): void {
        this['@context'] = context || [
            'http://www.w3.org/ns/anno.jsonld',
            'http://iiif.io/api/extension/text-granularity/context.json',
            'http://iiif.io/api/presentation/3/context.json'
        ];
    }

    setPrevAndNext(type: string, prevId?: string, nextId?: string) {
        if (prevId) this.prev = {id: prevId, type};
        if (nextId) this.next = {id: nextId, type};
    }

    setItems(items?: Annotation | Annotation[]) {
        if (!items) {
            this.items = undefined;
        }

        if (Array.isArray(items)) {
            this.items = items;
        } else {
            if (!this.items) {
                this.items = [];
            }
            this.items.push(items);
        }
    }
}

