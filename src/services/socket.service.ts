import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient: any = null;

const connect = (user: any) => {
    const WEB_SOCKET_URL = process.env.REACT_APP_WEB_SOCKET;
    let socket = new SockJS(WEB_SOCKET_URL || '');
    stompClient = Stomp.over(socket);

    const onConnected = () => {
        stompClient.subscribe('/users/queue/messages', function (resp: any) {});
    };

    stompClient.connect(user, onConnected);
};

const disconnect = () => {
    return stompClient !== null && stompClient.disconnect();
};



export const socketService = {
    connect,
    disconnect,
  
};
