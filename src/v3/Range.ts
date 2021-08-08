import Base from './Base';
import AnnotationPage from "./AnnotationPage";

interface Supplementary {
    id: string;
    type: "AnnotationCollection"
}


export default class Range extends Base {

    supplementary?: Supplementary;
    annotations?: AnnotationPage[];

    constructor(id: string) {
        super(id, 'Range');
    }

}
