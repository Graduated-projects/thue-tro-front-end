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
