# Archival IIIF presentation builder

Javascript library for generating IIIF manifests

## Installation

```npm -i @archival-iiif/presentation-builder``` or ```yarn add @archival-iiif/presentation-builder```

## Usage

### Simple manifest

```typescript
import {Manifest} from "@archival-iiif/presentation-builder";

new Manifest('https://example.org/iiif/book1/manifest', 'Book 1');
```

```json
{
  "id": "https://example.org/iiif/book1/manifest", 
  "type": "Manifest",
  "@context": "http://iiif.io/api/presentation/3/context.json",
  "label": {"none": "Book 1"}
}
```

