import Base from './Base';
import AnnotationPage from './AnnotationPage';
import CollectionManifestCanvasRangeBase from './CollectionManifestCanvasRangeBase';

export type CanvasBehavior = 'auto-advance' | 'facing-pages' | 'no-auto-advance' | 'non-paged';

export default class Canvas extends CollectionManifestCanvasRangeBase {
    width?: number;
    height?: number;
    duration?: number;

    items?: AnnotationPage[];
    behavior?: CanvasBehavior[];

    constructor(id: string, width?: number | null, height?: number | null, duration?: number | null) {
        super(id, 'Canvas');
        if (width) this.width = width;
        if (height) this.height = height;
        if (duration) this.duration = duration;
    }

    setWidth(width?: number): void {
        this.width = width;
    }

    setHeight(height?: number): void {
        this.height = height;
    }

    setDuration(duration?: number): void {
        this.duration = duration;
    }

    setItems(items?: AnnotationPage | AnnotationPage[]): void {
        this.items = Base.setArrayValue(items, this.items);
    }

    setBehavior(behavior?: CanvasBehavior | CanvasBehavior[]): void {
        this.behavior = Base.setArrayValue(behavior, this.behavior);
    }
}
