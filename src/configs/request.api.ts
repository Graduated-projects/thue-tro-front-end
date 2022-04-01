const baseUrl = process.env.REACT_APP_BASE_URL + '/api/v1';

export const server = {
    auth: baseUrl + '/auth',
    room: baseUrl + '/room',
    user: baseUrl + '/user',
    ekyc: baseUrl + '/ekyc',
    media: baseUrl + '/media',
    apartment: baseUrl + '/apartment'
};

export const api = {
    auth: {
        IS_EXISTS_EMAIL: server.auth + '/sign-up/email/check',
    },
    room: {
        getAllByCondition: server.room + '/find',
        getAll: server.room + '/',
        getById: server.room + '/:id',
        getAllServiceOfRoom: baseUrl + '/service/list',
        getServiceUnitByServiceId: baseUrl + '/service/:id/unit'
    },
    user: {
        ME: server.user + '/info',
        CREATE: server.user + '/create-new-user',
        EXISTS: server.user + '/email/exists',
        SEND_OTP: server.user + '/email/gen-otp',
        VERIFY_EMAIL: server.user + '/email/otp/verify',
        SIGN_IN: server.user + '/login',
    },
    ekyc: {
        DETECT_FRONT_CARD: server.ekyc + '/detect/front',
        DETECT_BACK_CARD: server.ekyc + '/detect/back',
    },
    media: {
        UPLOAD_FILES: server.media + '/upload/multi-file'
    },
    apartment: {
        CREATE: server.apartment + '/create',
        GET_ALL: server.apartment + '/list',

    }
};
