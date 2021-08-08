import Base, {Internationalize, Internationalized, Ref, ViewingDirection} from './Base';
import Resource from "./Resource";
import Manifest from "./Manifest";
import Service from "./Service";
import AuthService from "./AuthService";
import AnnotationPage from "./AnnotationPage";
import Canvas from "./Canvas";

export interface ManifestRef extends Ref {
    thumbnail?: Resource[];
}

export interface CollectionRef extends Ref {
    thumbnail?: Resource[];
}

export default class Collection extends Base {

    items: ManifestRef[] | CollectionRef[];
    label: Internationalized;
    id: string;
    type: 'Collection';
    behavior?: ("auto-advance" | "continuous" | "individuals" | "multi-part" | "no-auto-advance" | "no-repeat" |
        "paged" | "repeat" | "together" | "unordered")[];
    navDate?: string;
    services?: (Service | AuthService)[];
    annotations?: AnnotationPage[];
    placeholderCanvas?: Canvas;
    accompanyingCanvas?: Canvas;
    viewingDirection?: ViewingDirection;

    constructor(id: string, label: Internationalize) {
        super(id, 'Collection', label);
        this["@context"] = "http://iiif.io/api/presentation/3/context.json";
        this.items = [];
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
}
