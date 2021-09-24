import Base, {Internationalize} from './Base';

export default class Provider extends Base {
    constructor(id: string, label?: Internationalize) {
        super(id, 'Agent', label);
    }
}
