import Base, {Internationalize} from './Base';

export default class Manifest extends Base {
    constructor(id: string, label: Internationalize) {
        super(id, 'Manifest', label);
        this["@context"] = "http://iiif.io/api/presentation/3/context.json";
    }
}
