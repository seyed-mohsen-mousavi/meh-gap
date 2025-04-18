"use client";
import { ReactNode } from "react";
import SideBar from "./SideBar";
import { useParams } from "next/navigation";

function Chat({ children }: { children: ReactNode }) {
  const { username } = useParams();
  const hasUsername = !!username;

  return (
    <div className="flex size-full ">
      <div
        className={`fixed z-10 h-full overflow-auto bg-black/20 transition-transform duration-300 ease-in-out sm:relative ${
          hasUsername
            ? "w-0 translate-x-full sm:w-1/3 sm:translate-x-0"
            : "w-full translate-x-0 sm:w-1/3"
        }`}
      >
        <SideBar />
      </div>

      <section
        className={` size-full border-r border-gray-300/50 transition-transform duration-300 ease-in-out ${
          hasUsername
            ? "w-0 -translate-x-0 sm:w-full sm:translate-x-0"
            : "w-full -translate-x-full sm:translate-x-0 sm:w-full"
        } ${hasUsername ? "w-full" : "sm:w-full"}`}
      >
        {children}
      </section>
    </div>
  );
}

export default Chat;
