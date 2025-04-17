import { MotionDiv } from "@/components/MotionDiv";
import { fullChat } from "@/data/chat";
import Image from "next/image";
import { notFound } from "next/navigation";
async function page({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const decodeUserName = decodeURIComponent(username).replace("@", "");

  const chat = fullChat.find((c) => c.username === decodeUserName);
  if (!chat) notFound();
  return (
    <div className="px-6 py-4">
      {chat.chatHistory.map((c, i) => {
        return (
          <div
            key={i}
            className={`chat_con ${c.sender === decodeUserName ? "sender" : ""}`}
          >
            <img src="https://placehold.co/50" alt="Jese image" />
            <MotionDiv
              initial={{ scale: 0, opacity: 0, x: c.sender === decodeUserName ? 100 : -100 }}
              animate={{ scale: 1, opacity: 100, x: 0 }}
              className="bubble transition-all ease-linear duration-75"
            >
              <span>11:46</span>
              <p>{c.message}</p>
            </MotionDiv>
          </div>
        );
      })}

      {/* <LoadingBubble src="https://picsum.photos/200" />
      <LoadingBubble sender src="https://picsum.photos/200" /> */}
    </div>
  );
}

function LoadingBubble({ sender, src }: { sender?: boolean; src: string }) {
  return (
    <div className={`chat_con ${sender ? "sender" : ""} `}>
      <Image
        src={src}
        alt="Profile"
        width={40}
        height={40}
        className="h-10 w-10 rounded-full object-cover"
      />
      <div className="bubble max-w-xs rounded-2xl bg-blue-500 text-white shadow">
        <div className="flex items-center justify-center space-x-1 p-2">
          <span className="dot delay-0" />
          <span className="dot delay-1" />
          <span className="dot delay-2" />
        </div>
      </div>
    </div>
  );
}

export default page;
