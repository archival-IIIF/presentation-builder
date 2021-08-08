import * as assert from 'chai';
import Image from '../src/v3/Image';
import Service from '../src/v3/Service';
import * as fs from "fs";

// https://iiif.io/api/image/3.0/#59-complete-response
describe('Image Information V3', function() {
    it('Outputs should be equal', function() {

        const imageShould = JSON.parse(
            fs.readFileSync(__dirname + '/image.json', {encoding: 'utf8'})
        );
        const imageActual = new Image(
            'https://example.org/image-service/abcd1234/1E34750D-38DB-4825-A38A-B60A345E591C',
            6000,
            4000
        );
        imageActual["@context"] = [
            "http://example.org/extension/context1.json",
            "http://iiif.io/api/image/3/context.json"
        ];
        imageActual.profile = 'level1';
        imageActual.maxWidth = 3000;
        imageActual.maxHeight = 2000;
        imageActual.maxArea = 4000000;
        imageActual.sizes = [
            { "width": 150, "height": 100 },
            { "width": 600, "height": 400 },
            { "width": 3000, "height": 2000 }
        ];
        imageActual.tiles = [
            { "width": 512, "scaleFactors": [ 1, 2, 4 ] },
            { "width": 1024, "height": 2048, "scaleFactors": [ 8, 16 ] }
        ];
        imageActual.rights = "http://rightsstatements.org/vocab/InC-EDU/1.0/";
        imageActual.preferredFormats = [ "png", "gif"];
        imageActual.extraFormats = [ "png", "gif", "pdf" ];
        imageActual.extraQualities = [ "color", "gray" ];
        imageActual.extraFeatures = [ "canonicalLinkHeader", "rotationArbitrary", "profileLinkHeader" ];
        imageActual.service = [new Service(
            'https://example.org/service/example',
            'Service',
            'https://example.org/docs/example-service.html'
        )];


        assert.expect(imageShould).to.eql(JSON.parse(JSON.stringify(imageActual)));

    });
});
