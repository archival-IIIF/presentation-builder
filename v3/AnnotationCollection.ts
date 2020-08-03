import Base, {Ref} from './Base';

export default class AnnotationCollection extends Base {
    first?: Ref;
    last?: Ref;

    constructor(id: string) {
        super(id, 'AnnotationCollection');
    }

    setFirstAndLast(type: string, firstId?: string, lastId?: string) {
        if (firstId) this.first = {id: firstId, type};
        if (lastId) this.last = {id: lastId, type};
    }
}

