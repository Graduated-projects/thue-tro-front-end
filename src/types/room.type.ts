import { latlng, latlngObject } from "./interface"

export interface RoomStore {
     rooms: Array<Room>,
     room: Room | null,
     isLoadingRoom: boolean 
     isLoadingRooms: boolean 
}

export interface Room {
     createdBy: string,
     createdDate: string,
     lastModifiedBy: string,
     lastModifiedDate: string,
     id: string,
     numberOfRoom: number,
     numberOfPeople: number,
     acreage: number,
     floor: number,
     available: boolean,
     currentNumberOfPeople: number,
     apartmentId: number,
     description: string,
     deposit: number,
     price: number,
     period: number
}