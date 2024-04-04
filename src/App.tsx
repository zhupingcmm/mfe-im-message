import React, { useEffect, useState, useCallback } from 'react'
import './App.css';
import { contact, my } from "./displayData";
import DisplayWrapper from "./DisplayWrapper";
import { ContactList, Chat } from 'react-jwchat'
import { contactList } from './displayData'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { getLoginData } from './utils';





function App() {
  const [chatListData, setChatListData] = useState<any[]>([]);
  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState('ws://localhost:19000/ws');
  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

//   const handleBlobData = async (lastMessage: MessageEvent<any>) => {
//     const blob = lastMessage.data;
//     const reader = new FileReader();
//     const readAsTextPromise = new Promise((resolve, reject) => {
//         reader.onload = () => {
//             resolve(reader.result); // 包含解析后的数据的字符串
//         };
//         reader.onerror = reject;
//     });

//     reader.readAsText(blob); // 将Blob对象转换为文本
//     const result = await readAsTextPromise;
//     // const jsonData = JSON.parse(result); // 解析为 JSON 对象
//     console.log(result);
//     // 现在您可以在此处使用解析后的 JSON 数据
// };

  const handleBlobData = async (lastMessage: MessageEvent<any>) => {
    const blob = lastMessage.data;
    const reader = new FileReader();
    const readAsTextPromise = new Promise((resolve, reject) => {
        reader.onload = () => {
            resolve(reader.result); // 包含解析后的数据的字符串
        };
        reader.onerror = reject;
    });

    reader.readAsText(blob); // 将Blob对象转换为文本
    const result: any = await readAsTextPromise;
    // const jsonData = JSON.parse(result); // 解析为 JSON 对象
    console.log(result);
    // 现在您可以在此处使用解析后的 JSON 数据
    return JSON.parse( result);
  };
  useEffect(() => {
    if (lastMessage !== null) {
      if (lastMessage.data instanceof Blob) {
        handleBlobData(lastMessage);
      } else {
        setMessageHistory((prev) => prev.concat(lastMessage));
      }
      
    }
  }, [lastMessage]);

  const handleClickChangeSocketUrl = useCallback(
    () => setSocketUrl('wss://localhost:19000/ws'),
    []
  );

  const handleClickSendMessage = useCallback(() => sendMessage(getLoginData('123')), [sendMessage]);

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
        <button onClick={handleClickChangeSocketUrl}>
          Click Me to change Socket Url
        </button>
        <button
          onClick={handleClickSendMessage}
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
