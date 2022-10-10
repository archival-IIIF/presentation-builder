import Base from './Base';
import Canvas from './Canvas';
import Resource from './Resource';
import Choice from './Choice';

export type TimeMode = 'trim' | 'scale' | 'loop';
export type XYWH = { x: number; y: number; w: number; h: number; };

export default class Annotation extends Base {
    motivation: string;
    body: Resource | Choice;

    target?: string;
    timeMode?: TimeMode;
    textGranularity?: string;

    constructor(id: string, resource: Resource | Resource[], motivation = 'painting') {
        super(id, 'Annotation');
        this.motivation = motivation;
        this.body = Array.isArray(resource) ? new Choice(resource) : resource;
    }

    setCanvas(canvas: Canvas, xywh?: XYWH): void {
        this.target = canvas.id;
        if (xywh)
            this.target += `#xywh=${xywh.x},${xywh.y},${xywh.w},${xywh.h}`;
    }

    setTarget(target?: string): void {
        this.target = target;
    }

    setTimeMode(timeMode?: TimeMode) {
        this.timeMode = timeMode;
    }

    setTextGranularity(textGranularity?: string): void {
        this.textGranularity = textGranularity;
    }
}
