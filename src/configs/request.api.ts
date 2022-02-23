const baseUrl = process.env.REACT_APP_BASE_URL;
const authService = process.env.REACT_APP_BASE_URL;


export const server = {
    auth: authService + '/auth',
};

export const api = {
    auth: {
        SIGN_UP: server.auth + '/sign-up',
        SIGN_IN: server.auth + '/sign-in',
    },
};
