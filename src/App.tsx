import React, { useEffect, useState } from 'react'
import './App.css';
import '@arco-design/web-react/dist/css/arco.css';
import { contact, my } from "./displayData";
import DisplayWrapper from "./DisplayWrapper";
import { ContactList, Chat } from 'react-jwchat'
import { contactList } from './displayData'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { handleBlobData, login, ping } from './utils';
import { ChatPack, MessagePack } from './types';
import { Logout } from './components/Logout';
import { Sidebar } from './components/Sidebar';





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
    login({ userid: '123' }, sendMessage);

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
    <div className='app'>
      <Sidebar/>
      <Logout sendMessage = {sendMessage} readyState ={readyState}/>
      <DisplayWrapper>
   
        <ContactList
          data={contactList}
          style={{
            marginRight: 10,
            height: 600,
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
            width: 800,
            height: 600,
            borderRadius: 5,
            border: '1px solid rgb(226, 226, 226)'
          }}
        />
      </DisplayWrapper>
    </div>
  )
}

export default App;
