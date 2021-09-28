import {Manifest} from "../../src";
import * as assert from 'chai';

describe('Doc: Manifest V3', function () {
    it('Manifest should equal', function () {
        const m = new Manifest('https://example.org/iiif/book1/manifest', 'Book 1');
        m.setContext();

        const should = {
            "id": "https://example.org/iiif/book1/manifest",
            "type": "Manifest",
            "@context": [
                "http://www.w3.org/ns/anno.jsonld",
                "http://iiif.io/api/presentation/3/context.json"
            ],
            "label": {"none": ["Book 1"]}
        };

        assert.expect(should).to.eql(JSON.parse(JSON.stringify(m)));
    })
})
