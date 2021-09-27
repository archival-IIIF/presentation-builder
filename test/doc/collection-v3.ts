import {Collection, Manifest, Resource} from "../../src";
import * as assert from 'chai';

describe('Doc: Collection V3', function () {
    it('Collections should equal', function () {
        const c = new Collection(
            'https://example.org/iiif/collection/top',
            {"en": ["Collection for Example Organization"]}
        );
        c.setContext("http://iiif.io/api/presentation/3/context.json");
        c.setSummary({"en": ["Short summary of the Collection"]});
        c.setRequiredStatement({
            "label": {"en": ["Attribution"]},
            "value": {"en": ["Provided by Example Organization"]}
        });
        const manifest = new Manifest(
            'https://example.org/iiif/1/manifest',
            {"en": ["Example Manifest 1"]}
        );
        manifest.setThumbnail(
            new Resource(
                'https://example.org/manifest1/thumbnail.jpg',
                'Image',
                undefined,
                'image/jpeg'
            )
        );
        c.setItems(manifest);

        const should = {
            "@context": "http://iiif.io/api/presentation/3/context.json",
            "id": "https://example.org/iiif/collection/top",
            "type": "Collection",
            "label": { "en": [ "Collection for Example Organization" ] },
            "summary": { "en": [ "Short summary of the Collection" ] },
            "requiredStatement": {
                "label": { "en": [ "Attribution" ] },
                "value": { "en": [ "Provided by Example Organization" ] }
            },

            "items": [
                {
                    "id": "https://example.org/iiif/1/manifest",
                    "type": "Manifest",
                    "label": { "en": [ "Example Manifest 1" ] },
                    "thumbnail": [
                        {
                            "id": "https://example.org/manifest1/thumbnail.jpg",
                            "type": "Image",
                            "format": "image/jpeg"
                        }
                    ]
                }
            ]
        };

        assert.expect(should).to.eql(JSON.parse(JSON.stringify(c)));

        /*
        const m = new Collection('https://example.org/iiif/book1/manifest', {en: ['Book 1']});
        m.setContext();
        const c2 = new Collection('https://example.org/iiif/c2', {en: ['Book 1']})
        c2.viewingDirection = 'left-to-right';
        m.setItems(c2);
        console.log(m);
         */
    })
})
