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
    behaviors?: RangeBehavior[];
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

    setBehaviors(behaviors: undefined | RangeBehavior[]): void {
        this.behaviors = behaviors;
    }

    addBehavior(behavior: RangeBehavior): void {
        if (!this.behaviors) {
            this.behaviors = [behavior];
        } else {
            this.behaviors.push(behavior);
        }
    }

    setViewingDirectory(viewingDirection?: ViewingDirection): void {
        this.viewingDirection = viewingDirection;
    }

    setSupplementary(supplementary?: AnnotationCollection): void {
        this.supplementary = supplementary;
    }
}
