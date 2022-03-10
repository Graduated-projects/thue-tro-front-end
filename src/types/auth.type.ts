export interface UserStore {
     accessToken: string | null,
     user: null | User,
     isLoading: boolean,
     isLogin: boolean
}

export interface User {
     id: number | string
     fullName: string 
     gender: string
     address: string 
     phoneNumber: string 
     nationalIdCard?: null 
     partner: boolean
}
