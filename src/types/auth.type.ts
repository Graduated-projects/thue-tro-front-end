export interface UserStore {
    accessToken: string | null;
    user: null | User;
    isLoading: boolean;
    isLogin: boolean;
}

export interface User {
    id: string;
    backCardUrl: string;
    contactAddress: string;
    dateOfBirth: string;
    email: string;
    frontCardUrl: string;
    fullName: string;
    gender: boolean;
    idCardNo: string;
    idCardType: string;
    phoneNumber: string;
    roles: string;
}
