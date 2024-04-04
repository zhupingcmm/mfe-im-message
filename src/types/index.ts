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