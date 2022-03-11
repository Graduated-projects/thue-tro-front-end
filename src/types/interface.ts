export type latlng = [number, number];
export type latlngObject = {
    lat: number,
    lng: number
}

export interface BodyRequest {
     [key: string]: string;
 }

export interface DistrictOwl {
    title: string;
    content: string;
    imgUrl: string;
    latlng: latlng;
}