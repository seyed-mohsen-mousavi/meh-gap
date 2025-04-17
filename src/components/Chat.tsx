"use client";
import { ReactNode } from "react";
import SideBar from "./SideBar";
import { useParams } from "next/navigation";

function Chat({ children }: { children: ReactNode }) {
  const { username } = useParams();
  const hasUsername = !!username;

  return (
    <div className="flex size-full sm:grid sm:grid-cols-4">
      <div
        className={`fixed z-10 h-full overflow-auto bg-black/20 transition-transform duration-300 ease-in-out sm:relative ${
          hasUsername
            ? "w-0 translate-x-full sm:w-full sm:translate-x-0"
            : "w-full translate-x-0 sm:w-full"
        }`}
      >
        <SideBar />
      </div>

      <section
        className={`col-span-3 size-full border-r border-gray-300/50 transition-transform duration-300 ease-in-out ${
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
