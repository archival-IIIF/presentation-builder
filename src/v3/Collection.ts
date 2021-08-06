import Base, {Internationalize} from './Base';

export default class Collection extends Base {
    constructor(id: string, label: Internationalize) {
        super(id, 'Collection', label);
        this["@context"] = "http://iiif.io/api/presentation/3/context.json";
    }
}
