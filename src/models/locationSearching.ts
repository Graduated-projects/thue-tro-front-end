import { latlng } from "./latlng";

export interface LocationSearching {
    place: {
        name: string;
        position: latlng;
    };
    radius: number;
    unit: number;
    zoom: number
}
