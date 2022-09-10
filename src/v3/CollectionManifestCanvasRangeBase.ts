import Base from './Base';
import Canvas from './Canvas';
import AnnotationPage from './AnnotationPage';

export default class CollectionManifestCanvasRangeBase extends Base {
    navDate?: Date;
    placeholderCanvas?: Canvas;
    accompanyingCanvas?: Canvas;
    annotations?: AnnotationPage[];

    setNavDate(navDate?: Date) {
        this.navDate = navDate;
    }

    setPlaceholderCanvas(placeholderCanvas?: Canvas) {
        this.placeholderCanvas = placeholderCanvas;
    }

    setAccompanyingCanvas(accompanyingCanvas?: Canvas) {
        this.accompanyingCanvas = accompanyingCanvas;
    }

    setAnnotations(annotations: AnnotationPage[] | undefined): void {
        this.annotations = annotations;
    }

    addAnnotation(annotation: AnnotationPage): void {
        if (!this.annotations) {
            this.annotations = [annotation];
        } else {
            this.annotations.push(annotation);
        }
    }
}
