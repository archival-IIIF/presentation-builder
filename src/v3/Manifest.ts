import Base from './Base';

export default class Manifest extends Base {
    constructor(id: string, label: string) {
        super(id, 'Manifest', label);
        this["@context"] = "http://iiif.io/api/presentation/3/context.json";
    }
}
