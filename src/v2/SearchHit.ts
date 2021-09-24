import Base from './Base';
import Annotation from './Annotation';

type TextQuoteSelector = { '@type': 'oa:TextQuoteSelector'; exact: string; prefix?: string; suffix?: string; };

export default class SearchHit extends Base {
    annotations?: string[];

    before?: string;
    after?: string;

    selectors?: TextQuoteSelector[];

    constructor() {
        super(undefined, 'search:Hit');
    }

    addAnnotation(annotation: Annotation | Annotation[]): void {
        if (!this.annotations)
            this.annotations = [];

        if (Array.isArray(annotation))
            annotation.forEach((anno: Annotation) => this.addAnnotation(anno));
        else
            this.annotations.push(annotation['@id'] as string);
    }

    setBeforeAndAfter(before?: string, after?: string): void {
        if (before) this.before = before;
        if (after) this.after = after;
    }

    addTextQuoteSelector(exact: string, prefix?: string, suffix?: string): void {
        if (!this.selectors)
            this.selectors = [];

        this.selectors.push({
            '@type': 'oa:TextQuoteSelector',
            exact,
            prefix,
            suffix
        });
    }
}
