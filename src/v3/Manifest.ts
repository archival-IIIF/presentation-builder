import Base, {Internationalize} from './Base';
import Canvas from "./Canvas";

export default class Manifest extends Base {

    items: Canvas[] | undefined;

    constructor(id: string, label: Internationalize) {
        super(id, 'Manifest', label);
        this["@context"] = "http://iiif.io/api/presentation/3/context.json";
    }
}
