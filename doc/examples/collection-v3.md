# Collection (Presentation API 3.0)

**Code**

```typescript
import {Collection} from "@archival-iiif/presentation-builder";

const c = new Collection(
    'https://example.org/iiif/collection/top',
    {"en": ["Collection for Example Organization"]}
);
c.setContext("http://iiif.io/api/presentation/3/context.json");
c.setSummary({"en": ["Short summary of the Collection"]});
c.setRequiredStatement({
    "label": {"en": ["Attribution"]},
    "value": {"en": ["Provided by Example Organization"]}
});
const manifest = new Manifest(
    'https://example.org/iiif/1/manifest',
    {"en": ["Example Manifest 1"]}
);
manifest.setThumbnail(
    new Resource(
        'https://example.org/manifest1/thumbnail.jpg',
        'Image',
        undefined,
        'image/jpeg'
    )
);
c.setItems(manifest);
```

**JSON output**

```json
{
  "@context": "http://iiif.io/api/presentation/3/context.json",
  "id": "https://example.org/iiif/collection/top",
  "type": "Collection",
  "label": { "en": [ "Collection for Example Organization" ] },
  "summary": { "en": [ "Short summary of the Collection" ] },
  "requiredStatement": {
    "label": { "en": [ "Attribution" ] },
    "value": { "en": [ "Provided by Example Organization" ] }
  },

  "items": [
    {
      "id": "https://example.org/iiif/1/manifest",
      "type": "Manifest",
      "label": { "en": [ "Example Manifest 1" ] },
      "thumbnail": [
        {
          "id": "https://example.org/manifest1/thumbnail.jpg",
          "type": "Image",
          "format": "image/jpeg"
        }
      ]
    }
  ]
}
```
