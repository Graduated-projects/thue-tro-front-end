// import { latlng } from "@/models/interface";
import { latlng } from "@/types/interface";

export interface LocationOpenStreetMap {
    boundingbox?: Array<number>;
    class?: string;
    display_name: string;
    icon?: string;
    importance?: number;
    lat: string | number;
    licence?: string;
    lon: string | number;
    osm_id?: number;
    osm_type?: string;
    place_id: number;
    type?: string;
}

export interface LocationSearching {
    place: {
        name: string;
        position: latlng;
    };
    radius: number;
    unit: number;
    zoom: number
}

