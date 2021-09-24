import Base, {Internationalize, ViewingDirection} from './Base';
import Manifest from './Manifest';
import CollectionManifestCanvasRangeBase from './CollectionManifestCanvasRangeBase';

export type CollectionBehavior =
    'auto-advance' | 'continuous' | 'individuals' | 'multi-part' | 'no-auto-advance' | 'no-repeat' |
    'paged' | 'repeat' | 'together' | 'unordered';

export default class Collection extends CollectionManifestCanvasRangeBase {
    items?: (Manifest | Collection)[];

    behavior?: CollectionBehavior[];
    viewingDirection?: ViewingDirection;

    constructor(id: string, label: Internationalize) {
        super(id, 'Collection', label);
    }

    setItems(items?: Collection | Manifest | Collection[] | Manifest[]): void {
        this.items = Base.setArrayValue(items, this.items);
    }

    setViewingDirectory(viewingDirection?: ViewingDirection): void {
        this.viewingDirection = viewingDirection;
    }

    setBehavior(behavior?: CollectionBehavior | CollectionBehavior[]) {
        this.behavior = Base.setArrayValue(behavior, this.behavior);
    }
}
