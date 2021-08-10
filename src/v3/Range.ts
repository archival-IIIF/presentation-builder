import Base, {ViewingDirection} from './Base';
import AnnotationPage from "./AnnotationPage";
import Canvas from "./Canvas";
import AnnotationCollection from "./AnnotationCollection";
import CollectionManifestCanvasRangeBase from "./CollectionManifestCanvasRangeBase";

type RangeBehavior = "auto-advance" | "continuous" | "individuals" | "no-auto-advance" | "no-nav" |
"paged" | "sequence" | "thumbnail-nav" | "unordered";

export default class Range extends CollectionManifestCanvasRangeBase {

    supplementary?: AnnotationCollection;
    behavior?: RangeBehavior[];
    viewingDirection?: ViewingDirection;
    start?: AnnotationPage;
    items: (Canvas | Range)[];

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

    setBehavior(behavior?: RangeBehavior | RangeBehavior[]) {
        if (!this.behavior)
            this.behavior = undefined;

        if (Array.isArray(behavior))
            this.behavior = [...this.behavior, ...behavior];
        else
            this.behavior.push(behavior);
    }

    setItems(items: Canvas[]) {
        this.items = items;
    }
}
