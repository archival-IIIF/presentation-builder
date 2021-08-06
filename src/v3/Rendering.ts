import Base, {Internationalize} from './Base';

export default class Rendering extends Base {
    format: string;

    constructor(id: string, label: Internationalize, format: string) {
        super(id, undefined, label);
        this.format = format;
    }
}
