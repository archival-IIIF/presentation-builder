import * as assert from 'chai';
import Manifest from '../src/v3/Manifest';
import Canvas from '../src/v3/Canvas';
import AnnotationPage from '../src/v3/AnnotationPage';
import Annotation from '../src/v3/Annotation';
import Service from '../src/v3/Service';
import AuthService from '../src/v3/AuthService';
import Resource from '../src/v3/Resource';
import Rendering from '../src/v3/Rendering';
import Provider from '../src/v3/Provider';
import * as fs from "fs";
import Range from "../src/v3/Range";
import AnnotationCollection from "../src/v3/AnnotationCollection";

// https://iiif.io/api/presentation/3.0/#b-example-manifest-response
describe('Manifest V3', function() {
    it('Manifests should equal', function() {

        const manifestShould = JSON.parse(
            fs.readFileSync(__dirname + '/manifest.json', {encoding: 'utf8'})
        );
        const manifestActual = new Manifest('https://example.org/iiif/book1/manifest', {en: ['Book 1']});
        manifestActual.metadata = getMetadata();
        manifestActual.summary = { "en": [ "Book 1, written be Anne Author, published in Paris around 1400." ] };
        const thumbnailResource = new Resource(
            'https://example.org/iiif/book1/page1/full/80,100/0/default.jpg',
            'Image',
            'image/jpeg'
        );
        thumbnailResource.service = [new Service(
            'https://example.org/iiif/book1/page1',
            'ImageService3',
            'level1'
        )];
        manifestActual.thumbnail = [thumbnailResource];
        manifestActual.viewingDirection = "right-to-left";
        manifestActual.behavior = ["paged"];
        manifestActual.navDate = "1856-01-01T00:00:00Z";
        manifestActual.rights = "https://creativecommons.org/licenses/by/4.0/";
        manifestActual.requiredStatement = {
            "label": { "en": [ "Attribution" ] },
            "value": { "en": [ "Provided by Example Organization" ] }
        };
        manifestActual.provider = [getProvider()];
        manifestActual.homepage = [{
            format: "text/html",
            id: 'https://example.org/info/book1/',
            label: {
                en: [
                    'Home page for Book 1'
                ]
            },
            type: 'Text'
        }];
        manifestActual.service = [new Service(
            'https://example.org/service/example',
            'ExampleExtensionService',
            'https://example.org/docs/example-service.html'
        )];
        manifestActual.seeAlso = [
            {
                "id": "https://example.org/library/catalog/book1.xml",
                "type": "Dataset",
                "format": "text/xml",
                "profile": "https://example.org/profiles/bibliographic"
            }
        ];
        const rendering = new Rendering(
            'https://example.org/iiif/book1.pdf',
            { "en": [ "Download as PDF" ] },
            'application/pdf'
        );
        rendering.type = 'Text';
        manifestActual.rendering = [rendering];
        manifestActual.partOf = [{
            "id": "https://example.org/collections/books/",
            "type": "Collection"
        }];
        manifestActual.start = new Canvas('https://example.org/iiif/book1/canvas/p2');
        const authService = new AuthService(
            'https://example.org/iiif/auth/login',
            'AuthCookieService1',
            'http://iiif.io/api/auth/1/login'
        );
        authService.label = 'Login to Example Institution';
        authService.service = [new AuthService(
            'https://example.org/iiif/auth/token',
            'AuthTokenService1',
            'http://iiif.io/api/auth/1/token'
        )];
        manifestActual.services = [authService];

        manifestActual.items = getItems();
        manifestActual.structures = getStructures();

        manifestActual.annotations = getAnnotations();


        assert.expect(manifestShould).to.eql(JSON.parse(JSON.stringify(manifestActual)));
    });
});

function getStructures() {
    const range0 = new Range('https://example.org/iiif/book1/range/r0');
    range0.label = { "en": [ "Table of Contents" ] };
    const range1 = new Range('https://example.org/iiif/book1/range/r1');
    range1.label = { "en": [ "Introduction" ] };
    range1.supplementary = new AnnotationCollection("https://example.org/iiif/book1/annocoll/introTexts");
    const canvas = new Canvas('https://example.org/iiif/book1/canvas/p1');
    range1.items = [canvas];
    range0.items = [range1];

    return [range0];
}

function getItems() {
    const canvas = new Canvas('https://example.org/iiif/book1/canvas/p1', 750, 1000);
    canvas.annotations = [new AnnotationPage('https://example.org/iiif/book1/comments/p1/1')];
    canvas.label = { "none": [ "p. 1" ] };
    const annotationPage = new AnnotationPage('https://example.org/iiif/book1/page/p1/1');
    const resource = new Resource(
        'https://example.org/iiif/book1/page1/full/max/0/default.jpg',
        'Image',
        'image/jpeg',
        1500,
        2000
    );
    const service = new Service('https://example.org/iiif/book1/page1', 'ImageService3', 'level2');
    service.service = [new AuthService(
        'https://example.org/iiif/auth/login',
        'AuthCookieService1',
        'http://iiif.io/api/auth/1/login')
    ];
    resource.service = [service];
    const annotation = new Annotation('https://example.org/iiif/book1/annotation/p0001-image', resource);
    annotation.target = 'https://example.org/iiif/book1/canvas/p1';
    annotationPage.items = [annotation];
    canvas.items = [annotationPage];

    return [canvas];
}

function getMetadata() {
    return [
        {
            "label": { "en": [ "Author" ] },
            "value": { "none": [ "Anne Author" ] }
        },
        {
            "label": { "en": [ "Published" ] },
            "value": {
                "en": [ "Paris, circa 1400" ],
                "fr": [ "Paris, environ 1400" ]
            }
        },
        {
            "label": { "en": [ "Notes" ] },
            "value": {
                "en": [
                    "Text of note 1",
                    "Text of note 2"
                ]
            }
        },
        {
            "label": { "en": [ "Source" ] },
            "value": { "none": [ "<span>From: <a href=\"https://example.org/db/1.html\">Some Collection</a></span>" ] }
        }
    ];
}

function getProvider() {
    const provider = new Provider('https://example.org/about', { "en": [ "Example Organization" ] });
    provider.homepage = [
        {
            "id": "https://example.org/",
            "type": "Text",
            "label": { "en": [ "Example Organization Homepage" ] },
            "format": "text/html"
        }
    ];
    provider.seeAlso = [
        {
            "id": "https://data.example.org/about/us.jsonld",
            "type": "Dataset",
            "format": "application/ld+json",
            "profile": "https://schema.org/"
        }
    ];
    const logoResource = new Resource(
        'https://example.org/service/inst1/full/max/0/default.png',
        'Image',
        'image/png'
    );
    logoResource.service = [new Service('https://example.org/service/inst1', 'ImageService3', 'level2')];
    provider.logo = [logoResource];

    return provider;
}

function getAnnotations() {
    const annotationPage = new AnnotationPage('https://example.org/iiif/book1/page/manifest/1');
    const annotationRessource = new Resource(
        'https://example.org/iiif/book1/page/manifest/r1',
        'TextualBody'
    );
    annotationRessource.language = 'en';
    const annotation = new Annotation(
        'https://example.org/iiif/book1/page/manifest/a1',
        annotationRessource,
        'commenting'
    );
    annotation.target = 'https://example.org/iiif/book1/manifest';
    annotationPage.items = [annotation]
    return [annotationPage];
}
