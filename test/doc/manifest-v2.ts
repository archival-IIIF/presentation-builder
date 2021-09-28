import {ManifestV2} from "../../src";
import * as assert from 'chai';

describe('Doc: Manifest V2', function () {
    it('Manifest should equal', function () {
        const m = new ManifestV2('https://example.org/iiif/book1/manifest', 'Book 1');
        m.setContext();

        const should = {
            "@id": "https://example.org/iiif/book1/manifest",
            "@type": "sc:Manifest",
            "@context": "http://iiif.io/api/presentation/2/context.json",
            "label": "Book 1"
        };

        assert.expect(should).to.eql(JSON.parse(JSON.stringify(m)));
    })
})
