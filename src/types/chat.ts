export interface Chat {
    chatId: number,
    lastmessage: string,
    name: string,
    username: string,
    profileImage: string,
    isOnline: boolean,
    lastMessageDate: Date,
    unreadCount: number
}
export interface FullChat {
    chatId: number;
    lastmessage: string;
    name: string;
    username: string;
    profileImage: string;
    isOnline: boolean;
    lastMessageDate: Date;
    unreadCount: number;
    chatHistory: {
        message: string;
        sender: string;
        date: Date;
    }[];
    chatType: "private" | "group";
    isPinned: boolean;
}
