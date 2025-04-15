"use client";
import Image from "next/image";
import Link from "next/link";
import Ripple from "material-ripple-effects";
import { useState } from "react";
import { chats } from "@/data/chat";
import { useParams } from "next/navigation";

function ChatSide() {
  const { username } = useParams<{ username: string }>();
  const decodeUserName = decodeURIComponent(username).replace("@", "");

  const ripple = new Ripple();
  const [search, setSearch] = useState("");
  return (
    <div className="flex size-full flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-semibold">چت‌ها</h2>
        <input
          type="search"
          name="chatSearch"
          id="chatSearch"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="my-4 w-full rounded-lg border-none bg-black/30 px-2 py-2 text-white outline-none placeholder:text-gray-400"
          placeholder="جستجو ..."
        />
      </div>

      <div className="flex flex-1 flex-col divide-y divide-gray-300/50 overflow-auto">
        {chats
          .filter(
            (chat) =>
              chat.name.toLowerCase().includes(search.toLowerCase()) ||
              chat.lastmessage.toLowerCase().includes(search.toLowerCase()),
          )
          .map((chat, index) => (
            <Link href={`@${chat.username}`} key={chat.chatId}>
              <div
                className={`flex w-full items-center gap-3 px-3 py-4 text-left transition-all ease-linear hover:bg-black/10 ${
                  chat.username === decodeUserName ? "bg-black/20" : ""
                }`}
                onMouseUp={(e) => ripple.create(e, "dark")}
              >
                <div className="relative shrink-0">
                  <Image
                    src={chat.profileImage}
                    alt={chat.name || "بدون نام"}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                  {chat.isOnline && (
                    <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-black bg-green-500" />
                  )}
                </div>

                <div className="overflow-hidden text-right">
                  <p className="truncate text-lg text-white">
                    {chat.name || "نام ندارد"}
                  </p>
                  <p className="truncate text-sm text-gray-300">
                    {chat.lastmessage}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default ChatSide;
