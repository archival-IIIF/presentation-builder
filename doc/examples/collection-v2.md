# Collection (Presentation API 2.1)

**Code**

```typescript
import {CollectionV2} from "@archival-iiif/presentation-builder";

const c = new CollectionV2(
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
