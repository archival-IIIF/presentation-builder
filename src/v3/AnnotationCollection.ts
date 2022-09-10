import Base, {Ref} from './Base';
import AnnotationPage from './AnnotationPage';

export default class AnnotationCollection extends Base {
    first?: Ref;
    last?: Ref;
    items?: AnnotationPage[];

    constructor(id: string) {
        super(id, 'AnnotationCollection');
    }

    setFirstAndLast(type: string, firstId?: string, lastId?: string) {
        if (firstId) this.first = {id: firstId, type};
        if (lastId) this.last = {id: lastId, type};
    }

    setItems(items: undefined | AnnotationPage[]): void {
        this.items = items;
    }

    addItem(item: AnnotationPage): void {
        if (!this.items) {
            this.items = [item];
        } else {
            this.items.push(item);
        }
    }
}

