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

    setFormat(format?: string) {
        this.format = format;
    }

    setValue(value?: string) {
        this.value = value;
    }

    setLanguage(language?: string) {
        this.language = language;
    }
}
