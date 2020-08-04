import Base from './Base';

type Term = { match: string; url: string; count?: number; };

export default class TermList extends Base {
    ignored?: string[];
    terms?: Term[];

    constructor(id: string) {
        super(id, 'search:TermList');
    }

    setIgnored(ignored: string[]) {
        this.ignored = ignored;
    }

    addTerm(match: string, url: string, count?: number) {
        if (!this.terms)
            this.terms = [];

        this.terms.push({match, url, count});
    }
}
