import { MotionDiv } from "@/components/MotionDiv";
import { fullChat } from "@/data/chat";
import Image from "next/image";
import { Image as ImagePreview } from "primereact/image";
import { notFound } from "next/navigation";
import { FileIcon, defaultStyles } from "react-file-icon";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

async function page({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const decodeUserName = decodeURIComponent(username).replace("@", "");

  const chat = fullChat.find((c) => c.username === decodeUserName);
  if (!chat) notFound();

  let lastDate = "";
  function formatFileSize(bytes: number) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["بایت", "کلیو بایت", "مگابایت", "گیگابایت", "ترابایت"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  }
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
                  className="mx-auto rounded-full bg-white/10 px-2 py-1 text-xs backdrop-blur-sm transition-all duration-150 ease-linear sm:text-sm"
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
                ) : c.file ? (
                  <div className="mt-2 flex flex-col rounded-lg">
                    <p>{c.message}</p>

                    <div className="file mt-2 flex items-center gap-5 rounded-xl px-4 py-2">
                      <div className="w-7">
                        <FileIcon
                          extension={c.file.name.split(".").pop()}
                          {...(defaultStyles[c.file.name.split(".").pop()] ||
                            defaultStyles.txt)}
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium sm:text-sm">
                          {c.file.name}
                        </p>
                        <div className="flex gap-2 text-[10px] text-white sm:text-xs">
                          <span>{c.file.type}</span>
                          <span>•</span>
                          <span>{formatFileSize(c.file.size)}</span>
                        </div>
                      </div>

                      <a
                        href={c.file.url}
                        download
                        className="icon hover:opacity-80"
                      >
                        <ArrowDownTrayIcon className="size-5" />
                      </a>
                    </div>
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
