import Base from './Base';

export default class Resource extends Base {
    value?: string;
    format?: string;
    width?: number;
    height?: number;
    duration?: number;
    language?: string;

    constructor(id: string | undefined, type: string, value?: string, format?: string, language?: string | null,
                width?: number | null, height?: number | null, duration?: number | null) {
        super(id, type);

        if (value) this.value = value;
        if (format) this.format = format;
        if (language) this.language = language;

        if (width) this.width = width;
        if (height) this.height = height;
        if (duration) this.duration = duration;
    }

    setValue(value?: string): void {
        this.value = value;
    }

    setFormat(format?: string): void {
        this.format = format;
    }

    setLanguage(language?: string): void {
        this.language = language;
    }

    setWidth(width?: number): void {
        this.width = width;
    }

    setHeight(height?: number): void {
        this.height = height;
    }

    setDuration(duration?: number): void {
        this.duration = duration;
    }

    static createNewResource(id: string, type: string, format: string,
                             width?: number | null, height?: number | null, duration?: number | null) {
        return new Resource(id, type, undefined, format, undefined, width, height, duration);
    }

    static createTextResource(value: string, language?: string | null): Resource {
        return new Resource(undefined, 'TextualBody', value, 'text/plain', language);
    }
}
