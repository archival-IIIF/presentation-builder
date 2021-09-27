import {Image, Service} from "../../src";
import * as assert from 'chai';

describe('Doc: Simple image V3', function () {
    it('Image should equal', function () {
        const i = new Image(
            'https://example.org/image-service/abcd1234/1E34750D-38DB-4825-A38A-B60A345E591C',
            6000,
            4000
        );
        i.setContext([
            "http://example.org/extension/context1.json",
            "http://iiif.io/api/image/3/context.json"
        ]);

        const should = {
            "@context": [
                "http://example.org/extension/context1.json",
                "http://iiif.io/api/image/3/context.json"
            ],
            "id": "https://example.org/image-service/abcd1234/1E34750D-38DB-4825-A38A-B60A345E591C",
            "type": "ImageService3",
            "protocol": "http://iiif.io/api/image",
            "profile": "level2",
            "width": 6000,
            "height": 4000
        };

        assert.expect(should).to.eql(JSON.parse(JSON.stringify(i)));
    })
})

describe('Doc: Full-featured image V3', function () {
    it('Image should equal', function () {
        const i = new Image(
            'https://example.org/image-service/abcd1234/1E34750D-38DB-4825-A38A-B60A345E591C',
            6000,
            4000
        );
        i.setContext([
            "http://example.org/extension/context1.json",
            "http://iiif.io/api/image/3/context.json"
        ]);
        i.setProfile('level1');
        i.setMaxWidth(3000);
        i.setMaxHeight(2000);
        i.setMaxArea(4000000);
        i.setSizes([
            { "width": 150, "height": 100 },
            { "width": 600, "height": 400 },
            { "width": 3000, "height": 2000 }
        ]);
        i.setTiles([
            { "width": 512, "scaleFactors": [ 1, 2, 4 ] },
            { "width": 1024, "height": 2048, "scaleFactors": [ 8, 16 ] }
        ]);
        i.setRights("http://rightsstatements.org/vocab/InC-EDU/1.0/");
        i.setPreferredFormats([ "png", "gif"]);
        i.setExtraFormats([ "png", "gif", "pdf" ]);
        i.setExtraQualities([ "color", "gray" ]);
        i.setExtraFeatures([ "canonicalLinkHeader", "rotationArbitrary", "profileLinkHeader" ]);
        i.setService(new Service(
            'https://example.org/service/example',
            'Service',
            'https://example.org/docs/example-service.html'
        ));

        const should = {
            "@context": [
                "http://example.org/extension/context1.json",
                "http://iiif.io/api/image/3/context.json"
            ],
            "id": "https://example.org/image-service/abcd1234/1E34750D-38DB-4825-A38A-B60A345E591C",
            "type": "ImageService3",
            "protocol": "http://iiif.io/api/image",
            "profile": "level1",
            "width": 6000,
            "height": 4000,
            "maxWidth": 3000,
            "maxHeight": 2000,
            "maxArea": 4000000,
            "sizes": [
                { "width": 150, "height": 100 },
                { "width": 600, "height": 400 },
                { "width": 3000, "height": 2000 }
            ],
            "tiles": [
                { "width": 512, "scaleFactors": [ 1, 2, 4 ] },
                { "width": 1024, "height": 2048, "scaleFactors": [ 8, 16 ] }
            ],
            "rights": "http://rightsstatements.org/vocab/InC-EDU/1.0/",
            "preferredFormats": [ "png", "gif"],
            "extraFormats": [ "png", "gif", "pdf" ],
            "extraQualities": [ "color", "gray" ],
            "extraFeatures": [ "canonicalLinkHeader", "rotationArbitrary", "profileLinkHeader" ],
            "service": [
                {
                    "id": "https://example.org/service/example",
                    "type": "Service",
                    "profile": "https://example.org/docs/example-service.html"
                }
            ]
        };

        assert.expect(should).to.eql(JSON.parse(JSON.stringify(i)));
    })
})
