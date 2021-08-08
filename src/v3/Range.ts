import Base, {ViewingDirection} from './Base';
import AnnotationPage from "./AnnotationPage";
import Canvas from "./Canvas";
import AnnotationCollection from "./AnnotationCollection";

export default class Range extends Base {

    supplementary?: AnnotationCollection;
    annotations?: AnnotationPage[];
    navDate?: string;
    behavior?: ("auto-advance" | "continuous" | "individuals" | "no-auto-advance" | "no-nav" |
        "paged" | "sequence" | "thumbnail-nav" | "unordered")[];
    placeholderCanvas?: Canvas;
    accompanyingCanvas?: Canvas;
    viewingDirection?: ViewingDirection;

    constructor(id: string) {
        super(id, 'Range');
    }

}
