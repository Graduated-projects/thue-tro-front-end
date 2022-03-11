const baseUrl = process.env.REACT_APP_BASE_URL;
const authAPI = process.env.REACT_APP_BASE_URL;


export const server = {
    auth: authAPI + '/auth',
    room: baseUrl + '/room',
    user: baseUrl + '/user'
};

export const api = {
    auth: {
        SIGN_IN: server.auth + '/sign-in',
        IS_EXISTS_EMAIL: server.auth + '/sign-up/email/check',
        VERIFY_EMAIL :server.auth + '/sign-up/verify-otp',
        SEND_OTP: server.auth + '/send-otp'

    },
    room: {
        getAllByCondition: server.room + '/find',
        getAll: server.room + '/',
        getById: server.room + '/:id',
    },
    user: {
        ME: server.user + '/me',
        CREATE: server.user + '/create-new-user'
    }
};
