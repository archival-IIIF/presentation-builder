# Archival IIIF presentation builder

Javascript library for generating IIIF manifests

## Installation

```npm -i @archival-iiif/presentation-builder``` or ```yarn add @archival-iiif/presentation-builder```

## Usage

**Code**

```typescript
import {Manifest} from "@archival-iiif/presentation-builder";

new Manifest('https://example.org/iiif/book1/manifest', 'Book 1');
```

**JSON output**

```json
{
  "id": "https://example.org/iiif/book1/manifest", 
  "type": "Manifest",
  "@context": "http://iiif.io/api/presentation/3/context.json",
  "label": {"none": "Book 1"}
}
```

### More examples

* Manifest (Presentation API 3.0)
* [Collection (Presentation API 3.0)](https://github.com/archival-IIIF/presentation-builder/blob/master/doc/examples/collection-v3.md)
* [Image Information (Image API 3.0)](https://github.com/archival-IIIF/presentation-builder/blob/master/doc/examples/image-v3.md)
* Manifest (Presentation API 2.0)
* Collection (Presentation API 2.0)
* Image Information (Image API 2.0)

## License

This software is released under the MIT license.
