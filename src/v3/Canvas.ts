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

    setItems(items: AnnotationPage[] | undefined): void {
        this.items = items;
    }

    addItem(item: AnnotationPage): void {
        if (!this.items) {
            this.items = [item];
        } else {
            this.items.push(item);
        }
    }

    setBehavior(behaviors: CanvasBehavior[] | undefined): void {
        this.behavior = behaviors;
    }

    addBehavior(behavior: CanvasBehavior): void {
        if (!this.behavior) {
            this.behavior = [behavior];
        } else {
            this.behavior.push(behavior);
        }
    }
}
