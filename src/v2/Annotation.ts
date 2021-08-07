import Base from './Base';
import Canvas from './Canvas';
import Resource from './Resource';
import TextResource from './TextResource';

export type XYWH = { x: number; y: number; w: number; h: number; };

export default class Annotation extends Base {
    motivation: string;
    resource: Resource | TextResource;
    on?: string;
    items: undefined;

    constructor(id: string, resource: Resource | TextResource, motivation = 'sc:painting') {
        super(id, 'oa:Annotation');
        this.motivation = motivation;
        this.resource = resource;
    }

    setCanvas(canvas: Canvas, xywh?: XYWH): void {
        this.on = canvas['@id'];
        if (xywh)
            this.on += `#xywh=${xywh.x},${xywh.y},${xywh.w},${xywh.h}`;
    }
}
