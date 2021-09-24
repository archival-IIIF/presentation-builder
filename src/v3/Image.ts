import Base from './Base';

interface Size {
    width: number;
    height: number;
}

export interface AccessTier {
    name: string;
    maxSize: number;
}

export interface Tiles {
    type?: 'Tile';
    scaleFactors: number[];
    width: number;
    height?: number;
}

export type Features =
    'baseUriRedirect' |
    'canonicalLinkHeader' |
    'cors' |
    'jsonldMediaType' |
    'mirroring' |
    'profileLinkHeader' |
    'regionByPct' |
    'regionByPx' |
    'regionSquare' |
    'rotationArbitrary' |
    'rotationBy90s' |
    'sizeByConfinedWh' |
    'sizeByH' |
    'sizeByPct' |
    'sizeByW' |
    'sizeByWh' |
    'sizeUpscaling';

export type Profile = 'level0' | 'level1' | 'level2';
export type Quality = 'color' | 'gray' | 'bitonal' | 'default';

export default class Image extends Base {
    protocol = 'http://iiif.io/api/image';
    profile: Profile = 'level2';

    width: number;
    height: number;

    sizes?: Size[];
    maxWidth?: number;
    maxHeight?: number;
    maxArea?: number;
    tiles?: Tiles[];
    extraFormats?: string[];
    preferredFormats?: string[];
    rights?: string;
    extraQualities?: Quality[];
    extraFeatures?: Features[];

    constructor(id: string, width: number, height: number) {
        super(id, 'ImageService3');
        this.width = width;
        this.height = height;
    }

    setContext(context?: string | string[]): void {
        this['@context'] = context || ['http://iiif.io/api/image/3/context.json'];
    }

    setProfile(profile: Profile): void {
        this.profile = profile;
    }

    setWidth(width: number): void {
        this.width = width;
    }

    setHeight(height: number): void {
        this.height = height;
    }

    setSizes(sizes?: Size[]): void {
        this.sizes = sizes;
    }

    setMaxWidth(maxWidth?: number): void {
        this.maxWidth = maxWidth;
    }

    setMaxHeight(maxHeight?: number): void {
        this.maxHeight = maxHeight;
    }

    setMaxArea(maxArea?: number): void {
        this.maxArea = maxArea;
    }

    setTiles(tiles?: Tiles[]): void {
        this.tiles = tiles;
    }

    setExtraFormats(extraFormats?: string[]): void {
        this.extraFormats = extraFormats;
    }

    setPreferredFormats(preferredFormats?: string[]): void {
        this.preferredFormats = preferredFormats;
    }

    setRights(rights?: string): void {
        this.rights = rights;
    }

    setExtraQualities(extraQualities?: Quality[]): void {
        this.extraQualities = extraQualities;
    }

    setExtraFeatures(extraFeatures?: Features[]): void {
        this.extraFeatures = extraFeatures;
    }

    setTier(tier: AccessTier | string, seperator: string): void {
        if (typeof tier === 'string')
            this.id += `${seperator}${tier}`;
        else {
            this.id += `${seperator}${tier.name}`;
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
