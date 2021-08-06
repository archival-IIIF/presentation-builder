# Archival IIIF presentation builder

Javascript library for generating IIIF manifests

## Installation

```npm -i @archival-iiif/presentation-builder``` or ```yarn add @archival-iiif/presentation-builder```

## Usage

### Simple manifest example (presentation API v3)

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

### Simple collection example (presentation API v3)

```typescript
import {Collection} from "@archival-iiif/presentation-builder";

new Collection('https://example.org/iiif/collection/top', 'Collection for Example Organization');
```

```json
{
  "id": "https://example.org/iiif/collection/top", 
  "type": "Manifest",
  "@context": "http://iiif.io/api/presentation/3/context.json",
  "label": {"none": "Collection for Example Organization"}
}
```

### Simple manifest example (presentation API v2)

```typescript
import {ManifestV2} from "@archival-iiif/presentation-builder";

new Manifest('https://example.org/iiif/book1/manifest', 'Book 1');
```

```json
{
  "@id": "https://example.org/iiif/book1/manifest", 
  "@type": "sc:Manifest",
  "@context": "http://iiif.io/api/presentation/3/context.json",
  "label": "Book 1"
}
```


