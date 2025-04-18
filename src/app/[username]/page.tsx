import { MotionDiv } from "@/components/MotionDiv";
import { fullChat } from "@/data/chat";
import Image from "next/image";
import { Image as ImagePreview } from "primereact/image";
import { notFound } from "next/navigation";

async function page({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const decodeUserName = decodeURIComponent(username).replace("@", "");

  const chat = fullChat.find((c) => c.username === decodeUserName);
  if (!chat) notFound();

  let lastDate = "";

  return (
    <div className="min-h-full px-6 py-4">
      {chat.chatHistory.map((c, i) => {
        const currentDate = new Date(c.date).toLocaleDateString("fa-IR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        const showDate = currentDate !== lastDate;
        if (showDate) lastDate = currentDate;

        return (
          <div key={i}>
            {showDate && (
              <div className="my-4 flex w-full justify-center">
                <MotionDiv
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="mx-auto rounded-full bg-white/10 px-2 py-1 text-xs backdrop-blur-sm transition-all ease-linear sm:text-sm"
                >
                  {currentDate}
                </MotionDiv>
              </div>
            )}

            <div
              className={`chat_con ${c.sender === decodeUserName ? "sender" : ""}`}
            >
              <img
                src="https://placehold.co/50"
                alt="Jese image"
                className="image"
              />
              <MotionDiv
                initial={{
                  scale: 0,
                  opacity: 0,
                  x: c.sender === decodeUserName ? 100 : -100,
                }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                className="bubble transition-all duration-75 ease-linear"
              >
                <span>
                  {new Date(c.date).toLocaleString("fa-IR", {
                    timeStyle: "medium",
                  })}
                </span>
                {c.image ? (
                  <div className="flex flex-col">
                    <p>{c.message}</p>

                    <ImagePreview
                      src={c.image}
                      alt="Image"
                      className="mt-2"
                      imageClassName="object-cover w-full h-56"
                      preview
                    />
                  </div>
                ) : (
                  <p>{c.message}</p>
                )}
              </MotionDiv>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default page;
