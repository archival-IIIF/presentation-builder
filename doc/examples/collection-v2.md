# Collection (Presentation API 2.1)

**Code**

```typescript
import {Collection} from "@archival-iiif/presentation-builder/v2";

const c = new Collection(
    'https://example.org/iiif/collection/top',
    'Collection for Example Organization'
);
c.setContext();
```

**JSON output**

```json
{
  "@context": "http://iiif.io/api/presentation/2/context.json",
  "@id": "https://example.org/iiif/collection/top",
  "@type": "sc:Collection",
  "label": "Collection for Example Organization",
}
```
