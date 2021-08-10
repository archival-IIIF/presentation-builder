import Base, {Internationalize, Internationalized, Ref, ViewingDirection} from './Base';
import Resource from "./Resource";
import Manifest from "./Manifest";
import Service from "./Service";
import AuthService from "./AuthService";
import AnnotationPage from "./AnnotationPage";
import Canvas from "./Canvas";
import CollectionManifestCanvasRangeBase from "./CollectionManifestCanvasRangeBase";

export interface ManifestRef extends Ref {
    thumbnail?: Resource[];
}

export interface CollectionRef extends Ref {
    thumbnail?: Resource[];
}

export type = CollectionBehavior = "auto-advance" | "continuous" | "individuals" | "multi-part" | "no-auto-advance" | "no-repeat" |
    "paged" | "repeat" | "together" | "unordered";

export default class Collection extends CollectionManifestCanvasRangeBase {

    items: ManifestRef[] | CollectionRef[];
    type: 'Collection';
    behavior?: CollectionBehavior[];
    services?: (Service | AuthService)[];
    viewingDirection?: ViewingDirection;

    constructor(id: string, label: Internationalize) {
        super(id, 'Collection', label);
        this.setContext('http://iiif.io/api/presentation/3/context.json')
        this.setItems([]);
    }

    addCollection(collection: Collection) {
        this.items.push({
            id: collection.id,
            type: collection.type,
            label: collection.label,
            thumbnail: collection.thumbnail
        })
    }

    addManifest(manifest: Manifest) {
        if (!this.items) {
            this.items = [];
        }

        this.items.push({
            id: manifest.id,
            type: manifest.type,
            label: manifest.label,
            thumbnail: manifest.thumbnail
        })
    }

    setViewingDirectory(viewingDirection: ViewingDirection) {
        this.viewingDirection = viewingDirection;
    }

    setBehavior(behavior?: ManifestBehavior[]) {
        this.behavior = behavior;
    }

    setServices(services? (Service | AuthService)[]) {
        this.servies = services;
    }
}
