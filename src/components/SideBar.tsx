"use client";
import Image from "next/image";
import Link from "next/link";
import Ripple from "material-ripple-effects";
import { useState } from "react";
import { chats } from "@/data/chat";
import { useParams } from "next/navigation";
import {
  ArrowLeftStartOnRectangleIcon,
  EllipsisHorizontalIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

function SideBar() {
  const { username } = useParams<{ username: string }>();
  const decodeUserName = decodeURIComponent(username).replace("@", "");

  const ripple = new Ripple();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "private" | "channel" | "group"
  >("all");

  const filteredChats = chats
    .filter(
      (chat) =>
        chat.name.toLowerCase().includes(search.toLowerCase()) ||
        chat.lastmessage.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((chat) => {
      if (selectedCategory === "all") return true;
      return chat.chatType === selectedCategory;
    });
  return (
    <div className="flex size-full flex-col">
      <div className="p-6">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={`https://picsum.photos/50`}
              alt={"user"}
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
            <h2 className="text-2xl font-semibold">چت‌ها</h2>
          </div>
          <div className="hidden items-center space-x-1 lg:flex">
            <button
              type="button"
              className="cursor-pointer rounded-full bg-black/30 p-1.5 transition-colors ease-linear hover:bg-black/40"
            >
              <ArrowLeftStartOnRectangleIcon className="size-4" />
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-full bg-black/30 p-1.5 transition-colors ease-linear hover:bg-black/40"
            >
              <PencilSquareIcon className="size-4" />
            </button>
            <button
              type="button"
              className="cursor-pointer rounded-full bg-black/30 p-1 transition-colors ease-linear hover:bg-black/40"
            >
              <EllipsisHorizontalIcon className="size-5" />
            </button>
          </div>
        </div>
        <input
          type="search"
          name="chatSearch"
          id="chatSearch"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="my-4 w-full rounded-lg border-none bg-black/30 px-2 py-2 text-white outline-none placeholder:text-gray-400"
          placeholder="جستجو ..."
        />
        <div className="flex w-full items-center gap-2 overflow-hidden text-sm">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`cursor-pointer rounded-4xl ${selectedCategory === "all" ? "bg-white/50 text-black hover:bg-white/40": "bg-black/10 hover:bg-black/20"}  px-2 py-1 `}
            onMouseUp={(e) => ripple.create(e, "light")}
          >
            همه
          </button>
          <button
            onClick={() => setSelectedCategory("private")}
            className={`cursor-pointer rounded-4xl ${selectedCategory === "private" ? "bg-white/50 text-black hover:bg-white/40": "bg-black/10 hover:bg-black/20"}  px-2 py-1 `}
            onMouseUp={(e) => ripple.create(e, "light")}
          >
            شخصی
          </button>
          <button
            onClick={() => setSelectedCategory("channel")}
            className={`cursor-pointer rounded-4xl ${selectedCategory === "channel" ? "bg-white/50 text-black hover:bg-white/40": "bg-black/10 hover:bg-black/20"}  px-2 py-1 `}
            onMouseUp={(e) => ripple.create(e, "light")}
          >
            کانال
          </button>
          <button
            onClick={() => setSelectedCategory("group")}
            className={`cursor-pointer rounded-4xl ${selectedCategory === "group" ? "bg-white/50 text-black hover:bg-white/40": "bg-black/10 hover:bg-black/20"}  px-2 py-1 `}
            onMouseUp={(e) => ripple.create(e, "light")}
          >
            گروه
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col divide-y divide-gray-300/50 overflow-auto">
        {filteredChats.map((chat, index) => (
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
                  <span className="absolute right-0.5 bottom-0 h-3 w-3 rounded-full bg-green-400 shadow-xl shadow-green-400/50" />
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

export default SideBar;
// پوشه خالی است
// در حال حاضر هیچ گفتگویی متعلق به این پوشه نیست.
