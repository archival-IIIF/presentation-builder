# Manifest (Presentation API 2.1)

**Code**

```typescript
import {Manifest} from "@archival-iiif/presentation-builder/v2";

const m = new Manifest('https://example.org/iiif/book1/manifest', 'Book 1');
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
