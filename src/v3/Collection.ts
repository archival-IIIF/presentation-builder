import Base from './Base';

export default class Collection extends Base {
    constructor(id: string, label: string) {
        super(id, 'Collection', label);
    }
}
