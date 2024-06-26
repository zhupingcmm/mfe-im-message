export interface WebSocketState {
    connected: boolean;
    messages: string[];
    error: string | null
}

export interface WebSocketActions {
    connect: () => void;
    disconnect: () => void;
    sendMessage: (message: string) => void;
}

export interface MessagePack<T> {
    userId: string;
    appId: string;
    clientType: number;
    toId?: string;
    messageId?: string;
    imei?: string;
    command?: string;
    data?: T;
}

export interface LoginPack  extends RequestBodyPack{
    userid?: string;
    username?: string;
    password?: string;
}

export interface ReponsePack {

}

export interface ChatPack {

}

export interface RequestBodyPack {

}

export interface UserInfo {
    username: string;
    pssword: string;
    userid?: string;
}

export interface ApiResponse<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    fetchData: (url: string) => void
  }

 export type ConnectionStatus = 'default' | 'processing' | 'success' | 'warning' | 'error'