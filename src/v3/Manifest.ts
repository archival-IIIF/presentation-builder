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

    setItems(items: undefined | Canvas[]): void {
        this.items = items;
    }

    addItem(item: Canvas): void {
        if (!this.items) {
            this.items = [item];
        } else {
            this.items.push(item);
        }
    }

    setStructures(structures?: Range[] | undefined): void {
        this.structures = structures;
    }

    addStructure(structure: Range): void {
        if (!this.structures) {
            this.structures = [structure];
        } else {
            this.structures.push(structure);
        }
    }

    setStart(start?: Canvas): void {
        this.start = start;
    }

    setBehavior(behaviors: ManifestBehavior[] | undefined): void {
        this.behavior = behaviors;
    }

    addBehavior(behavior: ManifestBehavior): void {
        if (!this.behavior) {
            this.behavior = [behavior];
        } else {
            this.behavior.push(behavior);
        }
    }

    setViewingDirection(viewingDirection?: ViewingDirection): void {
        this.viewingDirection = viewingDirection;
    }
}
