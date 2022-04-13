const baseUrl = process.env.REACT_APP_BASE_TEST + '/api/v1';


export const server = {
    auth: baseUrl + '/auth',
    room: baseUrl + '/room',
    user: baseUrl + '/user',
    ekyc: baseUrl + '/ekyc',
    media: baseUrl + '/media',
    apartment: baseUrl + '/apartment',
    contract: baseUrl + '/contract',
    wallet: baseUrl + '/wallet',
};

export const api = {
    auth: {
        IS_EXISTS_EMAIL: server.auth + '/sign-up/email/check',
    },
    room: {
        getAllByCondition: server.room + '/find',
        getAll: server.room + '/',
        create: server.room + '/create',
        getById: server.room + '/detail/:id',
        getAllServiceOfRoom: baseUrl + '/service/list',
        getServiceUnitByServiceId: baseUrl + '/service/:id/unit',
    },
    user: {
        ME: server.user + '/info',
        INFO_BY_ID: server.user + '/info/:id',
        CREATE: server.user + '/create-new-user',
        EXISTS: server.user + '/email/exists',
        SEND_OTP: server.user + '/email/gen-otp',
        VERIFY_EMAIL: server.user + '/email/otp/verify',
        SIGN_IN: server.user + '/login',
        REGISTER: server.user + '/register',
    },
    ekyc: {
        DETECT_FRONT_CARD: server.ekyc + '/detect/front',
        DETECT_BACK_CARD: server.ekyc + '/detect/back',
    },
    media: {
        UPLOAD_FILES: server.media + '/upload/multi-file',
    },
    apartment: {
        CREATE: server.apartment + '/create',
        GET_ALL: server.apartment + '/list',
        GET_ROOMS: server.apartment + '/rooms/:id',
        GET_BY_ID: server.apartment + '/detail/other/:id',
        SEARCH: server.apartment + '/search',
    },
    contract: {
        GET_INFO: server.contract + '/detail/:id',
        PAY_BY_VNPAY: server.contract + '/vn_pay',
        CREATE: server.contract + '/vn-pay/create',
        PAY_BY_H_WALLET: server.contract + '/h-wallet/create',
        GET_OWNER: server.contract + '/list/owner',
        GET_RENTER: server.contract + '/list/renter',
        BY_ID: server.contract + '/:id',
    },
    wallet: {
        GET_BALANCE: server.wallet,
        RECHARGE: server.wallet + '/recharge',
    },
};
