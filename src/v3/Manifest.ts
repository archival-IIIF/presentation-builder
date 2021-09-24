import Base, {Internationalize, ViewingDirection} from './Base';
import Range from './Range';
import Canvas from './Canvas';
import CollectionManifestCanvasRangeBase from './CollectionManifestCanvasRangeBase';

export type ManifestBehavior =
    'auto-advance' | 'continuous' | 'individuals' | 'no-auto-advance' | 'no-repeat' | 'paged' | 'repeat' | 'unordered';

export default class Manifest extends CollectionManifestCanvasRangeBase {
    items?: Canvas[];
    structures?: Range[];

    start?: Canvas;
    behavior?: ManifestBehavior[];
    viewingDirection?: ViewingDirection;

    constructor(id: string, label: Internationalize) {
        super(id, 'Manifest', label);
    }

    setItems(items?: Canvas | Canvas[]): void {
        this.items = Base.setArrayValue(items, this.items);
    }

    setStructures(range?: Range | Range[]): void {
        this.structures = Base.setArrayValue(range, this.structures);
    }

    setStart(start?: Canvas): void {
        this.start = start;
    }

    setBehavior(behavior?: ManifestBehavior | ManifestBehavior[]): void {
        this.behavior = Base.setArrayValue(behavior, this.behavior);
    }

    setViewingDirection(viewingDirection?: ViewingDirection): void {
        this.viewingDirection = viewingDirection;
    }
}
