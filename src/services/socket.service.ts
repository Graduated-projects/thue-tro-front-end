import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

// let stompClient: any = null;

// const connect = (user: any) => {
//     const WEB_SOCKET_URL = process.env.REACT_APP_WEB_SOCKET;
//     console.log(WEB_SOCKET_URL);

//     let socket = new SockJS(WEB_SOCKET_URL || '');
//     stompClient = Stomp.over(socket);

//     const onConnected = () => {
//         stompClient.subscribe('/queue/messages', function (resp: any) {
//             console.log(`===> socket On: `, resp);
//         });

//         stompClient.subscribe('/users/queue/messages', function (resp: any) {
//             console.log(`===> socket On users: `, resp);
//         });

//     };

//     stompClient.connect(user, onConnected);
// };

// const test = () => {
//     stompClient.send('/app/test', {}, JSON.stringify({ content: 2 }));
// };

// const disconnect = () => {
//     return stompClient !== null && stompClient.disconnect();
// };

// export const socketService = {
//     connect,
//     disconnect,
//     test,
// };

export const socketService = (function () {
    let stompClient: any = null;

    const connect = (user: any) => {
        const WEB_SOCKET_URL = process.env.REACT_APP_WEB_SOCKET;
        console.log(WEB_SOCKET_URL);

        let socket = new SockJS(WEB_SOCKET_URL || '');
        stompClient = Stomp.over(socket);

        const onConnected = () => {
            stompClient.subscribe('/queue/message', function (resp: any) {
                console.log(`===> socket On: `, resp);
            });

            stompClient.subscribe('/users/queue/message', function (resp: any) {
                console.log(`===> socket On users: `, resp);
            });
        };

        stompClient.connect(user,onConnected);
    };

    const test = () => {
        stompClient.send('/queue/message', {}, JSON.stringify({ content: 2 }));
    };

    const disconnect = () => {
        return stompClient !== null && stompClient.disconnect();
    };

    return {
        connect,
        test,
        disconnect,
    };
})();
