const baseUrl =  process.env.REACT_APP_BASE_URL

const server = {
     auth: baseUrl + '/api/auth'
}

export const url = {
     auth: {
          SIGN_UP: '/signup',
          SIGN_IN: '/signin'
     }
}