import { latlng, latlngObject } from "./interface"

export interface RoomStore {
     rooms: Array<Room>,
     room: Room | null,
     isLoadingRoom: boolean 
     isLoadingRooms: boolean 
}

export interface Room {
     id: string,
     images: Array<string>
     acreage: number
     deposit: number 
     locationImage: string 
     phoneNumber: string
     sellerName: string 
     title: string 
     description: string 
     address: string 
     location: latlngObject
}