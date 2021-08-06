import Base from './Base';
import Resource from './Resource';
import Annotation from './Annotation';
import AnnotationList from './AnnotationList';

export default class Canvas extends Base {
    width?: number;
    height?: number;
    images?: Annotation[];

    otherContent?: AnnotationList[];

    constructor(id: string, image?: Annotation, annotationList?: AnnotationList) {
        super(id, 'sc:Canvas');
        if (image) {
            const resource = image.resource as Resource;
            this.width = resource.width as number;
            this.height = resource.height as number;
            this.images = [image];
        }
        if (annotationList) this.otherContent = [annotationList];
    }
}
