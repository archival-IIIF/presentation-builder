import Base, {Ref} from './Base';
import SearchHit from './SearchHit';
import Annotation from './Annotation';

type Within = Ref & { '@type': string; total: number; first?: string; last?: string; ignored?: string[] };

export default class AnnotationList extends Base {
    resources?: Annotation[];
    hits?: SearchHit[];

    constructor(id: string) {
        super(id, 'sc:AnnotationList');
    }

    setResources(resources: Annotation[]) {
        this.resources = resources;
    }

    setHits(hits: SearchHit[]) {
        this.hits = hits;
    }

    setWithin(within: Within) {
        super.setParent(within);
    }
}
