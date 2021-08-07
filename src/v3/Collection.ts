import Base, {Internationalize, Internationalized, Ref} from './Base';
import Resource from "./Resource";
import Manifest from "./Manifest";

export interface ManifestRef extends Ref {
    thumbnail?: Resource;
}

export interface CollectionRef extends Ref {
    thumbnail?: Resource;
}

export default class Collection extends Base {

    items: ManifestRef[] | CollectionRef[];
    label: Internationalized;
    id: string;
    type: 'Collection';

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
            thumbnail: collection.thumbnail[0]
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
            thumbnail: manifest.thumbnail[0]
        })
    }
}
