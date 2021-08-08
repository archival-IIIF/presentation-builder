# Image Information (Image API 3.0)

## Simple example

**Code**

```typescript
import {Image, Service} from "@archival-iiif/presentation-builder";

const image = new Image(
    'https://example.org/image-service/abcd1234/1E34750D-38DB-4825-A38A-B60A345E591C',
    6000,
    4000
);
```

**JSON output**

```json
{
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
}
```

## Full-featured example

**Code**

```typescript
import {Image, Service} from "@archival-iiif/presentation-builder";

const image = new Image(
    'https://example.org/image-service/abcd1234/1E34750D-38DB-4825-A38A-B60A345E591C',
    6000,
    4000
);
image["@context"] = [
    "http://example.org/extension/context1.json",
    "http://iiif.io/api/image/3/context.json"
];
image.profile = 'level1';
image.maxWidth = 3000;
image.maxHeight = 2000;
image.maxArea = 4000000;
image.sizes = [
    { "width": 150, "height": 100 },
    { "width": 600, "height": 400 },
    { "width": 3000, "height": 2000 }
];
image.tiles = [
    { "width": 512, "scaleFactors": [ 1, 2, 4 ] },
    { "width": 1024, "height": 2048, "scaleFactors": [ 8, 16 ] }
];
image.rights = "http://rightsstatements.org/vocab/InC-EDU/1.0/";
image.preferredFormats = [ "png", "gif"];
image.extraFormats = [ "png", "gif", "pdf" ];
image.extraQualities = [ "color", "gray" ];
image.extraFeatures = [ "canonicalLinkHeader", "rotationArbitrary", "profileLinkHeader" ];
image.service = [new Service(
    'https://example.org/service/example',
    'Service',
    'https://example.org/docs/example-service.html'
)];
```

**JSON output**

```json
{
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
}
```
