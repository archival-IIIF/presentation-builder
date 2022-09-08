# Image Information (Image API 2.0)

**Code**

```typescript
import {Image} from "@archival-iiif/presentation-builder/v2";

const i = new Image(
    'http://www.example.org/image-service/abcd1234/1E34750D-38DB-4825-A38A-B60A345E591C',
    6000,
    4000
);
i.setContext('http://iiif.io/api/image/2/context.json');
i.setProfile(['http://iiif.io/api/image/2/level2.json']);
i.setSizes([
    {"width" : 150, "height" : 100},
    {"width" : 600, "height" : 400},
    {"width" : 3000, "height": 2000}
]);
i.setTiles([{"width" : 512, "scaleFactors" : [1,2,4,8,16]}]);
```

**JSON output**

```json
{
  "@context" : "http://iiif.io/api/image/2/context.json",
  "@id" : "http://www.example.org/image-service/abcd1234/1E34750D-38DB-4825-A38A-B60A345E591C",
  "protocol" : "http://iiif.io/api/image",
  "width" : 6000,
  "height" : 4000,
  "sizes" : [
    {"width" : 150, "height" : 100},
    {"width" : 600, "height" : 400},
    {"width" : 3000, "height": 2000}
  ],
  "tiles": [
    {"width" : 512, "scaleFactors" : [1,2,4,8,16]}
  ],
  "profile" : [ "http://iiif.io/api/image/2/level2.json" ]
}
```
