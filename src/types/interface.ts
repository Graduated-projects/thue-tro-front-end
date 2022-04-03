export type latlng = [number, number];
export type latlngObject = {
    lat: number,
    lng: number
}

export interface BodyRequest {
     [key: string]: any;
 }

export interface DistrictOwl {
    title: string;
    content: string;
    imgUrl: string;
    latlng: latlng;
}