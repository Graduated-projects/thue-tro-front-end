import { latlng } from "./interface"

export interface RoomStore {
     rooms: Array<Room> | null,
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
     latLong: latlng | null
}