export interface ApartmentStore {
    apartments: Array<Apartment>;
    apartment: Apartment | null;
    isLoadingApartment: boolean;
    isLoadingApartments: boolean;
}

export interface Apartment {
    id?: string;
    createdBy?: string;
    createdDate?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
    reminiscentName: string;
    address: string;
    totalNumberOfRooms: number | null;
    numberOfRoomsUnAvailable: number | null;
    numberOfRoomsAvailable: number | null;
    latitude?: number;
    longitude?: number;
    description: string;
    ownerId?: number | string;
    numberOfFloors: number | null;
    imageUrls: Array<string>;
}
