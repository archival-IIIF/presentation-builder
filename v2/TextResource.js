"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = require("./Base");
class TextResource extends Base_1.default {
    constructor(chars) {
        super(undefined, 'cnt:ContentAsText');
        this.chars = chars;
    }
}
exports.default = TextResource;
//# sourceMappingURL=TextResource.js.map