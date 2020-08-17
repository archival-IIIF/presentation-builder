import Base from './Base';

interface Size {
    width: number;
    height: number;
}

export interface ImageProfile {
    formats: string[],
    qualities: string[],
    supports: string[]
}

export interface AccessTier {
    name: string;
    maxSize: number;
}

export default class Image extends Base {
    profile: string | [string, ImageProfile] = 'http://iiif.io/api/image/2/level2.json';

    protocol: string;
    width: number;
    height: number;
    sizes: [];

    maxWidth?: number;
    maxHeight?: number;

    constructor(id: string, width: number, height: number) {
        super(id);
        this.protocol = 'http://iiif.io/api/image';
        this.width = width;
        this.height = height;
        this.sizes = [];
    }

    setProfile(profile: ImageProfile): void {
        this.profile = ['http://iiif.io/api/image/2/level2.json', profile];
    }

    setTier(tier: AccessTier | string, seperator: string): void {
        if (typeof tier === 'string')
            this['@id'] += `${seperator}${tier}`;
        else {
            this['@id'] += `${seperator}${tier.name}`;
            const maxSize = Image.computeMaxSize(tier, this.width, this.height);
            if (maxSize.width < this.width) {
                this.width = maxSize.width;
                this.height = maxSize.height;
            }
        }
    }

    static computeMaxSize(tier: AccessTier, width: number, height: number): Size {
        if ((width <= tier.maxSize) && (height <= tier.maxSize))
            return {width, height};

        return {
            width: (width > height) ? tier.maxSize : Math.round(width * (tier.maxSize / height)),
            height: (height > width) ? tier.maxSize : Math.round(height * (tier.maxSize / width))
        }
    }
}
