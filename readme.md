<p align="center">
  <a href="https://material-ui.com/" rel="noopener" target="_blank"><img width="150" src="https://archival-iiif.github.io/logos/iiif.png" alt="Material-UI logo"></a>
</p>

<h1 align="center">Archival IIIF presentation builder</h1>

<div align="center">Javascript library for generating IIIF manifests</div>


## Supported specifications

* [Presentation API 3.0](https://iiif.io/api/presentation/3.0/)
* [Presentation API 2.1](https://iiif.io/api/presentation/2.1/)
* [Image API 3.0](https://iiif.io/api/image/3.0/)
* [Image API 2.1](https://iiif.io/api/image/2.1/)
* [Authentication API 1.0](https://iiif.io/api/auth/1.0/)
* [Search API 1.0](https://iiif.io/api/search/1.0/)

## Installation

presentation-builder is available as an [npm package](https://www.npmjs.com/package/@archival-iiif/presentation-builder).

```sh
// with npm
npm -i @archival-iiif/presentation-builder```

// with yarn
yarn add @archival-iiif/presentation-builder```
```

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
* Manifest (Presentation API 2.1)
* Collection (Presentation API 2.1)
* Image Information (Image API 2.0)

## License

This software is released under the MIT license.
