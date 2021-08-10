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

export type Profile = 'level0' | 'level1' | 'level2';

export default class Image {
    "@context": "http://iiif.io/api/image/3/context.json" | string[]
    id: string;
    type: 'ImageService3';
    protocol: 'http://iiif.io/api/image';
    profile: Profile;
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

    setId(id: string) {
        this.id = id;
    }

    setProfile(profile: Profile) {
        this.profile = profile;
    }

    setWidth(width: number) {
        this.width = width;
    }

    setHeight(height: string) {
        this.height = height;
    }

    setSizes(sizes?: Size[]) {
        this.sizes = sizes;
    }

    setMaxWidth(maxWidth?: number) {
        this.maxWidth = maxWidth;
    }

    setMaxHeight(maxHeight?: number) {
        this.maxHeight = maxHeight;
    }


    setMaxArea(maxArea?: number) {
        this.maxArea = maxArea;
    }

    setTiles(tiles?: Tiles[]) {
        this.tiles = tiles;
    }


    setExtraFormats(extraFormats?: string[]) {
        this.extraFormats = extraFormats;
    }

    setPreferredFormats(preferredFormats?: string[]) {
        this.preferredFormats = preferredFormats;
    }


    setRights(rights?: string) {
        this.rights = rights;
    }

    setExtraQualities(extraQualities?: Quality[]) {
        this.extraQualities = extraQualities;
    }

    setExtraFeatures(extraFeatures?: Features[]) {
        this.extraFeatures = extraFeatures;
    }

    setPartOf(partOf?: Ref[]) {
        this.partOf = partOf;
    }

    setSeeAlso(seeAlso?: ExtendedRef[]) {
        this.seeAlso = seeAlso;
    }

    setService(service?: Service[]) {
        this.service = service;
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
