"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = require("./Base");
class AnnotationCollection extends Base_1.default {
    constructor(id) {
        super(id, 'AnnotationCollection');
    }
    setFirstAndLast(type, firstId, lastId) {
        if (firstId)
            this.first = { id: firstId, type };
        if (lastId)
            this.last = { id: lastId, type };
    }
}
exports.default = AnnotationCollection;
//# sourceMappingURL=AnnotationCollection.js.map