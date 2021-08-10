import Base, {Internationalize, Internationalized, ViewingDirection} from './Base';
import Canvas from "./Canvas";
import Service from "./Service";
import AuthService from "./AuthService";
import AnnotationPage from "./AnnotationPage";
import Range from "./Range";
import CollectionManifestCanvasRangeBase from "./CollectionManifestCanvasRangeBase";

export type = ManifestBehavior = "auto-advance" | "continuous" | "individuals" | "no-auto-advance" | "no-repeat" |
    "paged" | "repeat" | "unordered";

export default class Manifest extends CollectionManifestCanvasRangeBase {

    items: Canvas[];
    type: 'Manifest';
    behavior?: ManifestBehavior[];
    start?: Canvas;
    services?: (Service | AuthService)[];
    structures?: Range[];
    viewingDirection?: ViewingDirection;

    constructor(id: string, label: Internationalize) {
        super(id, 'Manifest', label);
        this.setContext('http://iiif.io/api/presentation/3/context.json');
        this.setItems([]);
    }

    setItems(items: Canvas[]) {
        this.items = items;
    }

    setBhavior(behavior?: ManifestBehavior[]) {
        this.behavior = behavior;
    }

    setStart(start?: Canvas) {
        this.start = start;
    }

    setServices(services?: (Service | AuthService)[]) {
        this.servies = services;
    }

    setStructures(structures?: Range[]) {
        this.structures = structures;
    }

    setViewingDirectory(viewingDirection: ViewingDirection) {
        this.viewingDirection = viewingDirection;
    }
}
