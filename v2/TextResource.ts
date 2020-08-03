import Base from './Base';

export default class TextResource extends Base {
    chars: string;

    constructor(chars: string) {
        super(undefined, 'cnt:ContentAsText');
        this.chars = chars;
    }
}

