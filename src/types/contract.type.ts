import { Room } from "./room.type";

export interface ContractStore {
     contracts: Array<Contract>,
     contract: Contract | null,
     isLoadingContracts: boolean,
     isLoadingContract: boolean
}

export interface Contract {
    id: number;
    createDate?: string
    renter: {
        user: {
            id: number;
            email?: string;
            phoneNumber?: string;
            roles?: string;
            ekycId?: 0;
            password?: string;
            enabled?: boolean;
            username?: string;
            authorities?: [
                {
                    authority?: string;
                }
            ];
            accountNonExpired?: boolean;
            accountNonLocked?: boolean;
            credentialsNonExpired?: boolean;
        };
        ekyc: {
            id: number;
            idCardType?: string;
            expiredDate?: string;
            idCardNo?: string;
            issuedDate?: string;
            issuedBy?: string;
            fullName?: string;
            gender?: string;
            dateOfBirth?: string;
            permanentAddress?: string;
            contactAddress?: string;
            nationCode?: string;
            provinceCode?: string;
            districtCode?: string;
            communeCode?: string;
            hometown?: string;
            frontCardUrl?: string;
            backCardUrl?: string;
        };
    };
    owner: {
        user: {
            id: number;
            email?: string;
            phoneNumber?: string;
            roles?: string;
            ekycId?: 0;
            password?: string;
            enabled?: boolean;
            username?: string;
            authorities?: [
                {
                    authority?: string;
                }
            ];
            accountNonExpired?: boolean;
            accountNonLocked?: boolean;
            credentialsNonExpired?: boolean;
        };
        ekyc: {
            id: number;
            idCardType?: string;
            expiredDate?: string;
            idCardNo?: string;
            issuedDate?: string;
            issuedBy?: string;
            fullName?: string;
            gender?: string;
            dateOfBirth?: string;
            permanentAddress?: string;
            contactAddress?: string;
            nationCode?: string;
            provinceCode?: string;
            districtCode?: string;
            communeCode?: string;
            hometown?: string;
            frontCardUrl?: string;
            backCardUrl?: string;
        };
    },
    room: Room
}
