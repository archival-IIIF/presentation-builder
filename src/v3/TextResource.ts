import Base from './Base';

export default class TextResource extends Base {
    format?: string = 'text/plain';
    value?: string;
    language?: string;

    constructor(value: string, language?: string | null) {
        super(undefined, 'TextualBody');
        this.value = value;
        if (language) this.language = language;
    }
}
