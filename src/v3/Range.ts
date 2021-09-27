import Base, {Internationalize, ViewingDirection} from './Base';
import Canvas from './Canvas';
import AnnotationPage from './AnnotationPage';
import AnnotationCollection from './AnnotationCollection';
import CollectionManifestCanvasRangeBase from './CollectionManifestCanvasRangeBase';

type RangeBehavior = 'auto-advance' | 'continuous' | 'individuals' | 'no-auto-advance' | 'no-nav' |
    'paged' | 'sequence' | 'thumbnail-nav' | 'unordered';

export default class Range extends CollectionManifestCanvasRangeBase {
    items?: (Canvas | Range)[];

    start?: AnnotationPage;
    behavior?: RangeBehavior[];
    viewingDirection?: ViewingDirection;
    supplementary?: AnnotationCollection;

    constructor(id: string, label?: Internationalize) {
        super(id, 'Range', label);
    }

    setItems(items?: Canvas | Range | (Canvas | Range)[]): void {
        this.items = Base.setArrayValue(items, this.items);
    }

    setStart(start?: AnnotationPage): void {
        this.start = start;
    }

    setBehavior(behavior?: RangeBehavior | RangeBehavior[]): void {
        this.behavior = Base.setArrayValue(behavior, this.behavior);
    }

    setViewingDirectory(viewingDirection?: ViewingDirection): void {
        this.viewingDirection = viewingDirection;
    }

    setSupplementary(supplementary?: AnnotationCollection): void {
        this.supplementary = supplementary;
    }
}
