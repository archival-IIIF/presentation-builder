import Base, {ViewingDirection} from './Base';
import AnnotationPage from "./AnnotationPage";
import Canvas from "./Canvas";
import AnnotationCollection from "./AnnotationCollection";
import CollectionManifestCanvasRangeBase from "./CollectionManifestCanvasRangeBase";

type Behavior = "auto-advance" | "continuous" | "individuals" | "no-auto-advance" | "no-nav" |
"paged" | "sequence" | "thumbnail-nav" | "unordered";

export default class Range extends CollectionManifestCanvasRangeBase {

    supplementary?: AnnotationCollection;
    behavior?: Behavior[];
    viewingDirection?: ViewingDirection;
    start?: AnnotationPage;
    items: Canvas[];

    constructor(id: string) {
        super(id, 'Range');
    }

    setViewingDirectory(viewingDirection: ViewingDirection) {
        this.viewingDirection = viewingDirection;
    }

    setSupplementary(supplementary?: AnnotationCollection) {
        this.supplementary = supplementary;
    }

    setStart(start?: AnnotationPage) {
        this.start = start;
    }

    setBehavior(behavior?: Behavior[]) {
        this.behavior = behavior;
    }

    setItems(items: Canvas[]) {
        this.items = items;
    }
}
