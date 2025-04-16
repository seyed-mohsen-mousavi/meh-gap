import { fullChat } from "@/data/chat";
import Image from "next/image";
import { ReactNode } from "react";
import { formatDistanceToNow } from "date-fns";
import { faIR } from "date-fns/locale";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Inputs from "@/components/Inputs";
async function layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const decodeUserName = decodeURIComponent(username).replace("@", "");

  const chat = fullChat.find((c) => c.username === decodeUserName);
  if (!chat) return notFound();
  return (
    <div className="flex size-full flex-col justify-between">
      <Header chat={chat} />
      <section className="flex-1 overflow-auto ">{children}</section>
      <section className="p-3">
        <Inputs />
      </section>
    </div>
  );
}

export default layout;
