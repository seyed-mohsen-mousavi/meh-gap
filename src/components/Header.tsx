"use client";
import { FullChat } from "@/types/chat";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { faIR } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

function Header({ chat }: { chat: FullChat }) {
  const router = useRouter();
  return (
    <header className="flex w-full items-center gap-3 border-b border-gray-300/50 p-5">
      <button
        className="block cursor-pointer rounded-full p-3 transition-colors ease-linear hover:bg-black/10 sm:hidden"
        onClick={() => router.push("/")}
      >
        <ArrowRightIcon className="size-6 stroke-2 text-white/80" />
      </button>
      <div className="relative">
        <Image
          src={chat?.profileImage}
          alt=""
          width={60}
          height={60}
          className="size-12 rounded-full sm:size-16"
        />
        {chat.isOnline && (
          <span className="absolute right-0.5 bottom-0 size-3 rounded-full bg-green-400 shadow-xl shadow-green-400/50 sm:size-4" />
        )}
      </div>
      <div>
        <h2 className="text-lg sm:text-xl">{chat?.name}</h2>
        <p className="text-xs sm:text-sm">
          {chat.member
            ? `${chat.member} عضو`
            : chat?.isOnline
              ? "آنلاین"
              : formatDistanceToNow(new Date(chat.lastSeen), {
                  addSuffix: true,
                  locale: faIR,
                })}
        </p>
      </div>
    </header>
  );
}

export default Header;
