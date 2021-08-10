import Base from './Base';
import Canvas from './Canvas';
import Resource from './Resource';
import TextResource from './TextResource';

export type XYWH = { x: number; y: number; w: number; h: number; };

export type TimeMode = "trim" | "scale" | "loop";

export default class Annotation extends Base {
    textGranularity?: string;
    motivation: string;
    body: Resource | TextResource;
    target?: string;
    type: 'Annotation';
    timeMode?: TimeMode;

    constructor(id: string, resource: Resource | TextResource, motivation = 'painting') {
        super(id, 'Annotation');
        this.motivation = motivation;
        this.body = resource;
    }

    setCanvas(canvas: Canvas, xywh?: XYWH): void {
        this.target = canvas.id;
        if (xywh)
            this.target += `#xywh=${xywh.x},${xywh.y},${xywh.w},${xywh.h}`;
    }

    setTarget(target?: string) {
        this.target = target;
    }

    setTimeMode(timeMode?: TimeMode) {
        this.timeMode = timeMode;
    }

    setTextGranularity(textGranularity: string): void {
        this.textGranularity = textGranularity;
    }

    setMotivation(motivation: string) {
        this.motivation = motivation;
    }
}
