import Base from './Base';

export default class Resource extends Base {
    format?: string;
    width?: number;
    height?: number;
    duration?: number;
    language?: string;

    constructor(id: string, type: string, format?: string,
                width?: number | null, height?: number | null, duration?: number | null) {
        super(id, type);
        if (format) this.format = format;
        if (width) this.width = width;
        if (height) this.height = height;
        if (duration) this.duration = duration;
    }

    setFormat(format?: string) {
        this.format = format;
    }

    setWidth(width?: number | null) {
        this.width = width;
    }

    setHeight(height?: number | null) {
        this.height = height;
    }

    setDuration(duration?: number) {
        this.duration = duration;
    }

    setLanguage(language?: string) {
        this.language = language;
    }
}
