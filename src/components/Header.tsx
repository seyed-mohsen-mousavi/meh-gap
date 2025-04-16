import { Chat, FullChat } from "@/types/chat";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { faIR } from "date-fns/locale";

function Header({ chat }: { chat: FullChat }) {
  return (
    <header className="flex w-full items-center gap-3 border-b border-gray-300/50 p-5">
      <div className="relative">
        <Image
          src={chat?.profileImage}
          alt=""
          width={60}
          height={60}
          className="rounded-full"
        />
        {chat.isOnline && (
          <span className="absolute right-0.5 bottom-0 h-4 w-4 rounded-full bg-green-400 shadow-xl shadow-green-400/50" />
        )}
      </div>
      <div>
        <h2 className="text-lg sm:text-xl">{chat?.name}</h2>
        <p className="text-xs sm:text-sm">
          {chat?.isOnline
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
