import Base, {Ref} from './Base';
import Annotation from './Annotation';

type Within = Ref & { '@type': string; total: number; first?: string; last?: string; };

export default class AnnotationList extends Base {
    resources: Annotation[];

    constructor(id: string, resources: Annotation[]) {
        super(id, 'sc:AnnotationList');
        this.resources = resources;
    }

    setWithin(within: Within) {
        super.setParent(within);
    }
}
