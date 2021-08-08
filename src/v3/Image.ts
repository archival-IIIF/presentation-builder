import {ExtendedRef, Ref} from "./Base";
import Service from "./Service";

interface Size {
    width: number;
    height: number;
}

export interface AccessTier {
    name: string;
    maxSize: number;
}

export interface Tiles {
    type?: "Tile";
    scaleFactors: number[];
    width: number;
    height?: number;
}

export type Features =
    "baseUriRedirect" |
    "canonicalLinkHeader" |
    "cors" |
    "jsonldMediaType" |
    "mirroring" |
    "profileLinkHeader" |
    "regionByPct" |
    "regionByPx" |
    "regionSquare" |
    "rotationArbitrary" |
    "rotationBy90s" |
    "sizeByConfinedWh" |
    "sizeByH" |
    "sizeByPct" |
    "sizeByW" |
    "sizeByWh" |
    "sizeUpscaling";

export type Quality = "color" | "gray" | "bitonal" | "default";


export default class Image {
    "@context": "http://iiif.io/api/image/3/context.json" | string[]
    id: string;
    type: 'ImageService3';
    protocol: 'http://iiif.io/api/image';
    profile: 'level0' | 'level1' | 'level2';
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
    partOf?: Ref[];
    seeAlso?: ExtendedRef[];
    service?: Service[];

    constructor(id: string, width: number, height: number) {
        this['@context'] = 'http://iiif.io/api/image/3/context.json';
        this.id = id;
        this.type = 'ImageService3'
        this.protocol = 'http://iiif.io/api/image';
        this.profile = 'level2';
        this.width = width;
        this.height = height;
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
