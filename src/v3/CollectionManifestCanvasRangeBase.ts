import Base from "./Base";
import Canvas from "./Canvas";
import AnnotationPage from "./AnnotationPage";

export default class CollectionManifestCanvasRangeBase extends Base {

    navDate?: string;
    placeholderCanvas?: Canvas;
    accompanyingCanvas?: Canvas;
    annotations?: AnnotationPage[];


    setNavDate(navDate?: string) {
        this.navDate = navDate;
    }

    setPlaceholderCanvas(placeholderCanvas?: Canvas) {
        this.placeholderCanvas = placeholderCanvas;
    }

    setAccompanyingCanvas(accompanyingCanvas?: Canvas) {
        this.accompanyingCanvas = accompanyingCanvas;
    }

    setAnnotations(annotations: AnnotationPage | AnnotationPage[]): void {
        if (!this.annotations)
            this.annotations = [];

        if (Array.isArray(annotations))
            this.annotations = [...this.annotations, ...annotations];
        else
            this.annotations.push(annotations);
    }
}
