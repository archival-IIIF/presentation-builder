import Base from './Base';
import AnnotationPage from './AnnotationPage';
import CollectionManifestCanvasRangeBase from "./CollectionManifestCanvasRangeBase";
import {CollectionBehavior} from "./Collection";
import Annotation from "./Annotation";

type CancasBehavior = "auto-advance" | "facing-pages" | "no-auto-advance" | "non-paged";

export default class Canvas extends CollectionManifestCanvasRangeBase {

    items?: AnnotationPage[];
    type: 'Canvas';

    width?: number;
    height?: number;
    duration?: number;
    behavior?: CancasBehavior[];

    constructor(id: string, width?: number | null, height?: number | null, duration?: number | null) {
        super(id, 'Canvas');
        if (width) this.width = width;
        if (height) this.height = height;
        if (duration) this.duration = duration;
    }

    setBehavior(behavior?: CancasBehavior | CancasBehavior[]) {
        if (!this.behavior)
            this.behavior = undefined;

        if (Array.isArray(behavior))
            this.behavior = [...this.behavior, ...behavior];
        else
            this.behavior.push(behavior);
    }

    setWidth(width?: number) {
        this.width = width;
    }

    setHeight(height?: number) {
        this.height = height;
    }

    setDuration(duration?: number) {
        this.duration = duration;
    }

    setItems(items?: AnnotationPage | AnnotationPage[]) {
        if (!items) {
            this.items = undefined;
        }

        if (Array.isArray(items)) {
            this.items = items;
        } else {
            if (!this.items) {
                this.items = [];
            }
            this.items.push(items);
        }
    }
}
