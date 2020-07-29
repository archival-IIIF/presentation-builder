import Base from './Base';
import AnnotationPage from './AnnotationPage';

export default class Canvas extends Base {
    width?: number;
    height?: number;
    duration?: number;

    annotations?: AnnotationPage[];

    constructor(id: string, width?: number | null, height?: number | null, duration?: number | null) {
        super(id, 'Canvas');
        if (width) this.width = width;
        if (height) this.height = height;
        if (duration) this.duration = duration;
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
