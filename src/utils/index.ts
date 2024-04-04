import { v4 as uuidv4 } from 'uuid';

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

export const getLoginData = (userid: string) => {
    const conmandBytes = toBytes(0x2328);
    const bodyBytes = stringToBinaryData(JSON.stringify({userid}));
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