export const path = {
    main: {
        home: '/',
        finding: '/finding',
        userInfo: '/user',
        owner: '/onwer',
    },
    auth: {
        login: '/login',
        register: '/register',
        changePassword: '/changePassword',
        forgot: '/forgot'
    },
    room: {
        byId: '/room/:id',
        create: '/room/create/:id',
        contract: '/room/contract/:id',
        success: '/room/contract/payment-success'
    },
    apartment: {
        post: '/apartment/post',
        my: '/apartment/my',
        byId: '/apartment/:id'
    },
    contract: {
        my: '/contract/my',
        other: '/contract/other',
        byId: '/contract/:id'
    },
    wallet: {
        history: '/wallet/history'
    }
};
