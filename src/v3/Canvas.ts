import Base from './Base';
import AnnotationPage from './AnnotationPage';
import CollectionManifestCanvasRangeBase from "./CollectionManifestCanvasRangeBase";

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

    setBehavior(behavior?: CancasBehavior[]) {
        this.behavior = behavior;
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

    setItems(items?: AnnotationPage[]) {
        this.items = items;
    }
}
