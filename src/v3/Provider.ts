import Base, {ExtendedRef, Internationalize, Internationalized} from './Base';
import Resource from "./Resource";

export default class Provider {

    id: string;
    type: 'Agent';
    label: Internationalized;
    homepage?: ExtendedRef[];
    logo?: Resource[];
    seeAlso?: ExtendedRef[];

    constructor(id: string, label: Internationalize) {
        this.id = id;
        this.label = Base.i18n(label);
        this.type = 'Agent';
    }
}
