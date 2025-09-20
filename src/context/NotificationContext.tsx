"use client"
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";


interface NotificationContextType {
    messages: string[];
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children } : { children: ReactNode}) => {
    const [messages, setMessage] = useState<string[]>([]);

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5000/hubs/notifications")
            .withAutomaticReconnect()
            .build();

        connection.start().catch(err => console.error("Connection failed: ", err));

        connection.on("ReceiveNotification", (msg: string) => {
            setMessage(prev => [...prev, msg]);
        });

        // return () => connection.stop();
        return () => {
            connection.stop().catch(err => console.error("Error stopping connection:", err));
        };
    }, []);

    return (
        <NotificationContext.Provider value={{ messages }}>
            {children}
        </NotificationContext.Provider>
    );
}

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotifications must be used within NotificationProvider");
  return context;
};