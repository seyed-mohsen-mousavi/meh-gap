// import Providers from "@/components/Providers";
import "./globals.css";
import { Metadata } from "next";
import SideBar from "@/components/SideBar";
import Chat from "@/components/Chat";
// ${geistSans.variable} ${geistMono.variable}
export const metadata: Metadata = {
  title: "مه گپ",
  description: "",
  authors: { name: "S.mohsen", url: "" },
};
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ username: string }>;
}) {
  return (
    <html lang="fa" dir="rtl" className="flex justify-center">
      <body
        className={`h-screen w-screen max-w-[1920px] text-white antialiased md:py-20 flex items-center justify-center`}
      >
        <main className="z-[10] mx-auto h-full overflow-hidden bg-black/20 backdrop-blur-sm md:container md:rounded-2xl max-h-[1080px]">
          <Chat>{children}</Chat>
        </main>
      </body>
    </html>
  );
}
