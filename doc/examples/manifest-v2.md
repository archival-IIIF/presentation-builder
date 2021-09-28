# Manifest (Presentation API 2.1)

**Code**

```typescript
import {ManifestV2} from "@archival-iiif/presentation-builder";

const m = new ManifestV2('https://example.org/iiif/book1/manifest', 'Book 1');
m.setContext();
```

**JSON output**

```json
{
  "@id": "https://example.org/iiif/book1/manifest",
  "@type": "sc:Manifest",
  "@context": "http://iiif.io/api/presentation/2/context.json",
  "label": "Book 1"
}
```
