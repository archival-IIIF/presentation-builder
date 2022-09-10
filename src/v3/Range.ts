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

    setItems(items: undefined | (Canvas | Range)[]): void {
        this.items = items;
    }

    addItem(item: Canvas | Range): void {
        if (!this.items) {
            this.items = [item];
        } else {
            this.items.push(item);
        }
    }

    setStart(start?: AnnotationPage): void {
        this.start = start;
    }

    setBehavior(behaviors: undefined | RangeBehavior[]): void {
        this.behavior = behaviors;
    }

    addBehavior(behavior: RangeBehavior): void {
        if (!this.behavior) {
            this.behavior = [behavior];
        } else {
            this.behavior.push(behavior);
        }
    }

    setViewingDirectory(viewingDirection?: ViewingDirection): void {
        this.viewingDirection = viewingDirection;
    }

    setSupplementary(supplementary?: AnnotationCollection): void {
        this.supplementary = supplementary;
    }
}
