export type latlng = [number, number];

export interface BodyRequest {
     [key: string]: string;
 }

export interface DistrictOwl {
    title: string;
    content: string;
    imgUrl: string;
    latlng: latlng;
}