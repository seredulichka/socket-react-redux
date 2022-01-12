
import * as actions from '../modules/websocket';
import { updateFieldAC } from '../modules/game';

const socketMiddleware = () => {
  let socket = null;

  return store => next => action => {
    switch (action.type) {
      case 'WS_CONNECT':
          let state = store.getState()

        if (socket !== null) {
            socket.close();
        }
        socket = new WebSocket(action.host)

        socket.onopen = () => {
            store.dispatch(updateFieldAC(true, 'connected'));
            const message = {
                event: 'connection',
                username: state.chat.username,
                id: Date.now()
            }
            socket.send(JSON.stringify(message))
        }

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data)
            store.dispatch(updateFieldAC(message, 'messages'));
        };
        socket.onclose = () => {
            store.dispatch(actions.wsDisconnect())
            console.log('Socket закрыт')
        };
        
        socket.onerror = () => {
            console.log('Socket произошла ошибка')
        }

        break;
      case 'WS_DISCONNECT':
        if (socket !== null) {
            socket.close();
        }
        socket = null;
        console.log('websocket closed');
        break;
      case 'NEW_MESSAGE':
        console.log('sending a message', action.msg);
        socket.send(JSON.stringify(action.msg));
        store.dispatch(updateFieldAC('', 'textMessage'));
        break;
      default:
        console.log('the next action:', action);
        return next(action);
    }
  };
};

export default socketMiddleware();