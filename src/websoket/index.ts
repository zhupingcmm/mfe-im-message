import WebSocket from "ws";
import { useEffect, useState } from 'react';
import { WebSocketActions, WebSocketState } from "../types";



export const useWebSocket = (url: string):[WebSocketState, WebSocketActions] => {
    const [wsInstance, setWsInstance] = useState<WebSocket | null>(null);
    const [connected, setConnected] = useState<boolean>(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);


    useEffect(()=> {
        if (!wsInstance) return;
        wsInstance.on('open', () => {
            console.log('open');
            setConnected(true);

        });
        wsInstance.on('message', (data: string) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        wsInstance.on('error', (err: Error) => {
            setError(err.message);
          });

        wsInstance.on('close', () => {
            setConnected(false);
        });

        return () => {
            wsInstance.close();
        }

    },[wsInstance]);


    const connect = () => {
        const client = new WebSocket(url);
        setWsInstance(client);
    };

    const disconnect = () => {
        if (wsInstance) {
          wsInstance.close();
          setWsInstance(null);
          setConnected(false);
        }
    };
    const sendMessage = (message: string) => {
        if (wsInstance && connected) {
          wsInstance.send(message);
        }
    };
    return [
        { connected, messages, error },
        { connect, disconnect, sendMessage }
      ];
}