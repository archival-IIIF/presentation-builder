import * as assert from 'chai';
import Manifest from '../src/v3/Manifest';
import Canvas from '../src/v3/Canvas';
import AnnotationPage from '../src/v3/AnnotationPage';
import Annotation from '../src/v3/Annotation';
import Service from '../src/v3/Service';
import AuthService from '../src/v3/AuthService';
import Resource from '../src/v3/Resource';
import Provider from '../src/v3/Provider';
import * as fs from 'fs';
import Range from '../src/v3/Range';
import AnnotationCollection from '../src/v3/AnnotationCollection';
import {LabelValue} from '../src/v3/Base';

// https://iiif.io/api/presentation/3.0/#b-example-manifest-response
describe('Manifest V3', function () {
    it('Manifests should equal', function () {

        const manifestShould = JSON.parse(
            fs.readFileSync(__dirname + '/manifest.json', {encoding: 'utf8'})
        );
        const manifestActual = new Manifest('https://example.org/iiif/book1/manifest', {en: ['Book 1']});
        manifestActual.setContext();
        manifestActual.setMetadata(getMetadata());
        assert.expect(manifestShould.metadata).to.eql(JSON.parse(JSON.stringify(manifestActual.metadata)));
        manifestActual.setSummary({'en': ['Book 1, written be Anne Author, published in Paris around 1400.']});
        assert.expect(manifestShould.summary).to.eql(JSON.parse(JSON.stringify(manifestActual.summary)));
        const thumbnailResource = Resource.createResource(
            'https://example.org/iiif/book1/page1/full/80,100/0/default.jpg',
            'Image',
            'image/jpeg'
        );
        thumbnailResource.setService([new Service(
            'https://example.org/iiif/book1/page1',
            'ImageService3',
            'level1'
        )]);
        manifestActual.setThumbnail(thumbnailResource);
        assert.expect(manifestShould.thumbnail).to.eql(JSON.parse(JSON.stringify(manifestActual.thumbnail)));
        manifestActual.setViewingDirection('right-to-left');
        manifestActual.setBehaviors(['paged']);
        manifestActual.setNavDate(new Date('1856-01-01T00:00:00Z'));
        assert.expect(manifestShould.navDate).to.eql(JSON.parse(JSON.stringify(manifestActual.navDate)));
        manifestActual.setRights('https://creativecommons.org/licenses/by/4.0/');
        manifestActual.setAttribution('Provided by Example Organization');
        manifestActual.setProvider(getProvider());
        manifestActual.setHomepage({
            format: 'text/html',
            id: 'https://example.org/info/book1/',
            label: {
                en: [
                    'Home page for Book 1'
                ]
            },
            type: 'Text'
        });
        assert.expect(manifestShould.homepage).to.eql(JSON.parse(JSON.stringify(manifestActual.homepage)));
        manifestActual.setService([new Service(
            'https://example.org/service/example',
            'ExampleExtensionService',
            'https://example.org/docs/example-service.html'
        )]);
        manifestActual.setSeeAlso({
            'id': 'https://example.org/library/catalog/book1.xml',
            'type': 'Dataset',
            'format': 'text/xml',
            'profile': 'https://example.org/profiles/bibliographic'
        });
        assert.expect(manifestShould.seeAlso).to.eql(JSON.parse(JSON.stringify(manifestActual.seeAlso)));
        manifestActual.setRendering({
            id: 'https://example.org/iiif/book1.pdf',
            label: {'en': ['Download as PDF']},
            format: 'application/pdf',
            type: 'Text'
        });
        manifestActual.setParent({
            'id': 'https://example.org/collections/books/',
            'type': 'Collection'
        });
        manifestActual.setStart(new Canvas('https://example.org/iiif/book1/canvas/p2'));
        const authService = new AuthService(
            'https://example.org/iiif/auth/login',
            'AuthCookieService1',
            'http://iiif.io/api/auth/1/login'
        );
        authService.setLabel('Login to Example Institution');
        authService.setService(new AuthService(
            'https://example.org/iiif/auth/token',
            'AuthTokenService1',
            'http://iiif.io/api/auth/1/token'
        ));
        manifestActual.setService([authService]);
        assert.expect(manifestShould.service).to.eql(JSON.parse(JSON.stringify(manifestActual.service)));

        manifestActual.setItems(getItems());
        assert.expect(manifestShould.items).to.eql(JSON.parse(JSON.stringify(manifestActual.items)));
        manifestActual.setStructures(getStructures());
        assert.expect(manifestShould.structures).to.eql(JSON.parse(JSON.stringify(manifestActual.structures)));

        manifestActual.setAnnotations(getAnnotations());
        assert.expect(manifestShould.annotations).to.eql(JSON.parse(JSON.stringify(manifestActual.annotations)));

        assert.expect(manifestShould).to.eql(JSON.parse(JSON.stringify(manifestActual)));
    });
});

function getStructures() {
    const range0 = new Range('https://example.org/iiif/book1/range/r0', {'en': ['Table of Contents']});
    const range1 = new Range('https://example.org/iiif/book1/range/r1', {'en': ['Introduction']});
    range1.setSupplementary(new AnnotationCollection('https://example.org/iiif/book1/annocoll/introTexts'));
    const canvas = new Canvas('https://example.org/iiif/book1/canvas/p1');
    range1.setItems([canvas]);
    range0.setItems([range1]);

    return [range0];
}

function getItems() {
    const canvas = new Canvas('https://example.org/iiif/book1/canvas/p1', 750, 1000);
    canvas.setAnnotations([new AnnotationPage('https://example.org/iiif/book1/comments/p1/1')]);
    canvas.setLabel({'none': ['p. 1']});
    const annotationPage = new AnnotationPage('https://example.org/iiif/book1/page/p1/1');
    const resource = Resource.createResource(
        'https://example.org/iiif/book1/page1/full/max/0/default.jpg',
        'Image',
        'image/jpeg',
        1500,
        2000
    );
    const service = new Service('https://example.org/iiif/book1/page1', 'ImageService3', 'level2');
    service.setService(new AuthService(
        'https://example.org/iiif/auth/login',
        'AuthCookieService1',
        'http://iiif.io/api/auth/1/login')
    );
    resource.setService([service]);
    const annotation = new Annotation('https://example.org/iiif/book1/annotation/p0001-image', resource);
    annotation.setTarget('https://example.org/iiif/book1/canvas/p1');
    annotationPage.setItems([annotation]);
    canvas.setItems([annotationPage]);

    return [canvas];
}

function getMetadata(): LabelValue[] {
    return [
        {
            'label': {'en': ['Author']},
            'value': {'none': ['Anne Author']}
        },
        {
            'label': {'en': ['Published']},
            'value': {
                'en': ['Paris, circa 1400'],
                'fr': ['Paris, environ 1400']
            }
        },
        {
            'label': {'en': ['Notes']},
            'value': {
                'en': [
                    'Text of note 1',
                    'Text of note 2'
                ]
            }
        },
        {
            'label': {'en': ['Source']},
            'value': {'none': ['<span>From: <a href="https://example.org/db/1.html">Some Collection</a></span>']}
        }
    ];
}

function getProvider() {
    const provider = new Provider('https://example.org/about', {'en': ['Example Organization']});
    provider.setHomepage({
        'id': 'https://example.org/',
        'type': 'Text',
        'label': {'en': ['Example Organization Homepage']},
        'format': 'text/html'
    });
    provider.setSeeAlso({
        'id': 'https://data.example.org/about/us.jsonld',
        'type': 'Dataset',
        'format': 'application/ld+json',
        'profile': 'https://schema.org/'
    });
    const logoResource = Resource.createResource(
        'https://example.org/service/inst1/full/max/0/default.png',
        'Image',
        'image/png'
    );
    logoResource.setService([new Service('https://example.org/service/inst1', 'ImageService3', 'level2')]);
    provider.setLogo(logoResource);

    return provider;
}

function getAnnotations() {
    const annotationPage = new AnnotationPage('https://example.org/iiif/book1/page/manifest/1');
    const annotationRessource = Resource.createTextResourceRef(
        'https://example.org/iiif/book1/page/manifest/r1',
        'en'
    );
    annotationRessource.setLanguage('en');
    const annotation = new Annotation(
        'https://example.org/iiif/book1/page/manifest/a1',
        annotationRessource,
        'commenting'
    );
    annotation.setTarget('https://example.org/iiif/book1/manifest');
    annotationPage.setItems([annotation]);
    return [annotationPage];
}
