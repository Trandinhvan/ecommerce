"use client"
import { useNotifications } from "@/context/NotificationContext";

export default function NotificationList() {
    const { messages } = useNotifications();

    return (
        <div className="fixed top-4 right-4 w-80">
            {messages?.map((msg : any, idx: number) => (
                <div key={idx} className="bg-yellow-300 p-2 mb-2 rounded shadow">
                {msg}
                </div>
            ))}
        </div>
    );
}