import Base, {Internationalize, Internationalized} from './Base';
import Canvas from "./Canvas";
import Service from "./Service";
import AuthService from "./AuthService";
import Provider from "./Provider";
import AnnotationPage from "./AnnotationPage";
import Range from "./Range";

export default class Manifest extends Base {

    items: Canvas[];
    label: Internationalized;
    id: string;
    type: 'Manifest';
    behavior?: ("auto-advance" | "continuous" | "individuals" | "no-auto-advance" | "no-repeat" |
        "paged" | "repeat" | "unordered")[];
    navDate?: string;
    start?: Canvas;
    services?: (Service | AuthService)[];
    provider?: Provider[];
    annotations?: AnnotationPage[];
    structures?: Range[];

    constructor(id: string, label: Internationalize) {
        super(id, 'Manifest', label);
        this["@context"] = "http://iiif.io/api/presentation/3/context.json";
        this.items = [];
    }
}
