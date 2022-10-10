import Resource from './Resource';

export default class Choice {
    type = 'Choice';
    body: Resource[];

    constructor(resources: Resource[]) {
        this.body = resources;
    }
}
