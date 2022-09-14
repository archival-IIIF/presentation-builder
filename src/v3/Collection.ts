import Base, {Internationalize, ViewingDirection} from './Base';
import Manifest from './Manifest';
import CollectionManifestCanvasRangeBase from './CollectionManifestCanvasRangeBase';

export type CollectionBehavior =
    'auto-advance' | 'continuous' | 'individuals' | 'multi-part' | 'no-auto-advance' | 'no-repeat' |
    'paged' | 'repeat' | 'together' | 'unordered';

export default class Collection extends CollectionManifestCanvasRangeBase {
    items?: (Manifest | Collection)[];

    behaviors?: CollectionBehavior[];
    viewingDirection?: ViewingDirection;

    constructor(id: string, label: Internationalize) {
        super(id, 'Collection', label);
    }

    setItems(items: (Collection | Manifest)[] | undefined): void {
        this.items = items;
    }

    addItem(item: Collection | Manifest): void {
        if (!this.items) {
            this.items = [item];
        } else {
            this.items.push(item);
        }
    }

    setViewingDirectory(viewingDirection?: ViewingDirection): void {
        this.viewingDirection = viewingDirection;
    }

    setBehaviors(behavior: CollectionBehavior[] | undefined) {
        this.behaviors = behavior;
    }

    addBehavior(behavior: CollectionBehavior) {
        if (!this.behaviors) {
            this.behaviors = [behavior];
        } else {
            this.behaviors.push(behavior);
        }
    }
}
