import React from 'react';
import './App.css';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { wsAddMessage, wsConnect } from './modules/websocket';
import { updateFieldAC } from './modules/game';

const ChatComponent = () => {

    const chatState = useSelector((state) => state.chat)
    const dispatch = useDispatch()

    const sendMessage = () => {
        const message = {
            username: chatState.username,
            recipient: chatState.recipient,
            message: chatState.textMessage,
            id: Date.now(),
            event: 'message'
        }
        dispatch(wsAddMessage(message))
    }


    if (!chatState.connected) {
        return (
            <div className="center">
                <div className="form">
                    <input
                        value={chatState.username}
                        onChange={e => dispatch(updateFieldAC(e.target.value, 'username'))}
                        type="text"
                        placeholder="Введите ваше имя"/>
                    <button onClick={()=>{dispatch(wsConnect('ws://localhost:5000'))}}>
                        Войти
                        </button>
                </div>
            </div>
        )
    }


    return (
        <div className="center">
            <div>
                <div className="form">
                    <input value={chatState.textMessage} 
                        onChange={e => dispatch(updateFieldAC(e.target.value, 'textMessage'))}
                        placeholder="Текст сообщения"
                        type="text"/>
                    <input
                        value={chatState.recipient}
                        onChange={e => dispatch(updateFieldAC(e.target.value, 'recipient'))}
                        type="text"
                        placeholder="Код получателя"/>
                    <button onClick={sendMessage}>Отправить</button>
                </div>
                <div className="messages">
                    {chatState.messages.map(mess =>
                        <div key={mess.id}>
                            {mess.event === 'connection'
                                ? <div className="connection_message">
                                    Пользователь {mess.username} поключен к чату . 
                                    Если вы желаете чтобы пользователи могли отправить вам личное сообщение 
                                    передайте этот код {mess.chatRoom} другим пользвателям.
                                </div>
                                : <div className="message">
                                    {mess.username}. {mess.message}
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatComponent;