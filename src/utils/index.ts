import { v4 as uuidv4 } from 'uuid';
import { ConnectionStatus, LoginPack, RequestBodyPack } from '../types';
import { SendMessage, ReadyState } from 'react-use-websocket';

export const stringToBinaryData = (str: string) => {
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(str);
    return encodedData;
};
  
export function toBytes(input: string | number): Uint8Array {
    // 如果输入是字符串，则将其转换为整数；否则，假设输入已经是一个整数
    const num: number = typeof input === 'string' ? parseInt(input, 10) : input;
    
    // 创建一个长度为4的字节数组
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);

    // 将整数按照大端序写入字节数组
    view.setUint32(0, num, false);

    // 从字节数组中读取数据
    const byteArray = new Uint8Array(buffer);

    return byteArray;
}

export const getBaseData = () => {
    const versionBytes = toBytes(1);
    const messageTypeBytes = toBytes(0x0);
    const clientTypeBytes = toBytes(4);
    const appidBytes = toBytes(10000);
    const imei = uuidv4();
    const imeiBytes = stringToBinaryData(imei);
    const imeiLenghtBytes = toBytes(imeiBytes.length);

    return {versionBytes, messageTypeBytes, clientTypeBytes , appidBytes, imeiLenghtBytes, imeiBytes};
}

export const getLoginData = (loginpack: LoginPack): Uint8Array => {
    return getRequestData(0x2328, loginpack);
}

export const getPingData = () => {
    return getRequestData(0x270f, {});
}

export const getLogoutData = () => {
    return getRequestData(0x232b, {});
}


export const getRequestData = (command: number, body: RequestBodyPack): Uint8Array => {
    const conmandBytes = toBytes(command);
    const bodyBytes = stringToBinaryData(JSON.stringify(body));
    const bodyLengthBytes = toBytes(bodyBytes.length);

    const {versionBytes, messageTypeBytes, clientTypeBytes , appidBytes, imeiLenghtBytes, imeiBytes} = getBaseData();

     // 计算所有字节数组的总长度，包括imeiLength的1个字节和bodyLength的1个字节
     const totalLength = conmandBytes.length + versionBytes.length +  clientTypeBytes.length + messageTypeBytes.length  + appidBytes.length + imeiLenghtBytes.length + bodyLengthBytes.length + imeiBytes.length + bodyBytes.length;

    // 创建一个新的 Uint8Array 来存储所有的字节数组
    const combinedArray = new Uint8Array(totalLength);

    // 将所有字节数组拼接到一个新的 Uint8Array 中
    let offset = 0;
    combinedArray.set(conmandBytes, offset);
    offset += conmandBytes.length;
    combinedArray.set(versionBytes, offset);
    offset += versionBytes.length;
    combinedArray.set(clientTypeBytes, offset);
    offset += clientTypeBytes.length;
    combinedArray.set(messageTypeBytes, offset);
    offset += messageTypeBytes.length;
    combinedArray.set(appidBytes, offset);
    offset += appidBytes.length;
    combinedArray.set(imeiLenghtBytes, offset); // 存储imeiLength
    offset += imeiLenghtBytes.length;
    combinedArray.set(bodyLengthBytes, offset); // 存储bodyLength
    offset += bodyLengthBytes.length;
    combinedArray.set(imeiBytes, offset);
    offset += imeiBytes.length;
    combinedArray.set(bodyBytes, offset);

    return combinedArray;
}



export const handleBlobData = async<T>(lastMessage: MessageEvent<any>) : Promise<T>=> {
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
    return JSON.parse( result) as T;
  };



  export const login = (user: LoginPack, sendMessage: SendMessage): void => {
    sendMessage(getLoginData(user));
  }

  export const ping = (sendMessage: SendMessage): void => {
    sendMessage(getPingData());
  }

  export const logout = (sendMessage: SendMessage): void => {
    sendMessage(getLogoutData());
  }


  export const getConnenctionStatus = (readyState: ReadyState) => {
    const connectionStatus = {
        [ReadyState.CONNECTING]: 'processing',
        [ReadyState.OPEN]: 'success',
        [ReadyState.CLOSING]: 'error',
        [ReadyState.CLOSED]: 'default',
        [ReadyState.UNINSTANTIATED]: 'error',
      }[readyState];

      return connectionStatus as ConnectionStatus;
  }