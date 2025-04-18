export interface Chat {
    chatId: number,
    lastmessage: string,
    name: string,
    username: string,
    profileImage: string,
    isOnline?: boolean,
    lastMessageDate: Date,
    unreadCount: number,
    member?: number,
    chatType: "private" | "group" | "channel";

}
export interface FullChat {
    chatId: number;
    lastmessage: string;
    name: string;
    username: string;
    profileImage: string;
    isOnline?: boolean;
    lastSeen: Date;
    unreadCount: number;
    chatHistory: {
        message: string;
        sender: string;
        date: Date;
        image?: string;
        file?: {
            name: string;
            type: string;
            size: number;
            url: string
        };
    }[];
    member?: number;
    chatType: "private" | "group" | "channel";
    isPinned: boolean;
}
