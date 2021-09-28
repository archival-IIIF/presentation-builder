import {CollectionV2, Manifest, Resource} from "../../src";
import * as assert from 'chai';

describe('Doc: Collection V2', function () {
    it('Collections should equal', function () {
        const c = new CollectionV2(
            'https://example.org/iiif/collection/top',
            'Collection for Example Organization'
        );
        c.setContext();

        const should = {
            "@context": "http://iiif.io/api/presentation/2/context.json",
            "@id": "https://example.org/iiif/collection/top",
            "@type": "sc:Collection",
            "label": "Collection for Example Organization",
        };

        assert.expect(should).to.eql(JSON.parse(JSON.stringify(c)));
    })
})
