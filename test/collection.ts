import * as assert from 'chai';
import Collection from '../src/v3/Collection';
import Manifest from '../src/v3/Manifest';
import Resource from '../src/v3/Resource';
import * as fs from 'fs';

describe('Collection V3', function () {
    it('Collections should equal', function () {

        const collectionShould = JSON.parse(
            fs.readFileSync(__dirname + '/collection.json', {encoding: 'utf8'})
        );
        const collectionActual = new Collection(
            'https://example.org/iiif/collection/top',
            {'en': ['Collection for Example Organization']}
        );
        collectionActual.setContext();
        collectionActual.setSummary({'en': ['Short summary of the Collection']});
        collectionActual.setAttribution('Provided by Example Organization');
        const manifest = new Manifest(
            'https://example.org/iiif/1/manifest',
            {'en': ['Example Manifest 1']}
        );
        manifest.setThumbnail(Resource.createNewResource(
            'https://example.org/manifest1/thumbnail.jpg', 'Image', 'image/jpeg'));
        collectionActual.setItems(manifest);

        assert.expect(collectionShould).to.eql(JSON.parse(JSON.stringify(collectionActual)));

    });
});
