# Manifest (Presentation API 3.0)

**Code**

```typescript
import {Manifest} from "@archival-iiif/presentation-builder";

const m = new Manifest('https://example.org/iiif/book1/manifest', 'Book 1');
m.setContext();
```

**JSON output**

```json
{
  "id": "https://example.org/iiif/book1/manifest",
  "type": "Manifest",
  "@context": [
    "http://www.w3.org/ns/anno.jsonld",
    "http://iiif.io/api/presentation/3/context.json"
  ],
  "label": {"none": ["Book 1"]}
}
```
