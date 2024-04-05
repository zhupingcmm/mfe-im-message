import React, { useEffect, useState, useCallback } from 'react'
import './App.css';
import { contact, my } from "./displayData";
import DisplayWrapper from "./DisplayWrapper";
import { ContactList, Chat } from 'react-jwchat'
import { contactList } from './displayData'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { handleBlobData, login, ping } from './utils';
import { ChatPack, MessagePack } from './types';





function App() {
  const [chatListData, setChatListData] = useState<any[]>([]);
  //Public API that will echo messages sent to it back to the client
  const [messageHistory, setMessageHistory] = useState<MessagePack<ChatPack>[]>([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:19000/ws', {
    onOpen: (event) => {
      console.log('onOpen', event)
    },
    onMessage: (event: WebSocketEventMap['message']) => {
      console.log('bbbbbbbbb', event)
    }
  });



  useEffect(() => {
    // login
    login({userid: '123'}, sendMessage);

    const intervalId = setInterval(() => {
      ping(sendMessage);
    }, 2000);
    return () => {
      clearInterval(intervalId);
    }
  }, [])

  useEffect(() => {
    (async () => {
      if (lastMessage !== null) {
        if (lastMessage.data instanceof Blob) {
          const message = await handleBlobData<MessagePack<ChatPack>>(lastMessage);
          console.log('message', message);
          if (message.command === '') {
            setMessageHistory(pre => pre.concat(message));
          }
        }
      }
    })();
  }, [lastMessage]);



  // const handleClickSendMessage = useCallback(() => sendMessage(getLoginData('123')), [sendMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  console.log('messageHistory', messageHistory)
  console.log('lastMessage', lastMessage)

  return (
    <DisplayWrapper>
      <div>
        {/* <button onClick={handleClickChangeSocketUrl}>
          Click Me to change Socket Url
        </button> */}
        <button
          // onClick={handleClickSendMessage}
          disabled={readyState !== ReadyState.OPEN}
        >
          Click Me to send 'Hello'
        </button>
        <span>The WebSocket is currently {connectionStatus}</span>
        {/* {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
        <ul>
          {messageHistory.map((message, idx) => (
            <span key={idx}>{message ? message.data : null}</span>
          ))}
        </ul> */}
      </div>
      <ContactList
        data={contactList}
        style={{
          marginRight: 10,
          height: 500,
          borderRadius: 5,
          overflow: 'hidden',
          width: 240,
          border: '1px solid rgb(226, 226, 226)'
        }}
      />
      <Chat
        contact={contact}
        me={my}
        chatList={chatListData}
        onSend={(msg: any) => setChatListData([...chatListData, msg])}
        onEarlier={() => console.log('EarlierEarlier')}
        style={{
          width: 600,
          height: 500,
          borderRadius: 5,
          border: '1px solid rgb(226, 226, 226)'
        }}
      />
    </DisplayWrapper>
  )
}

export default App;
