// import Providers from "@/components/Providers";
import "./globals.css";
import { Metadata } from "next";
import Chat from "@/components/Chat";
// ${geistSans.variable} ${geistMono.variable}
export const metadata: Metadata = {
  title: "مه گپ",
  description:
    "یک پیام‌رسان سبک، سریع و امن با طراحی بلوری و رابط کاربری مینیمال است.",
  authors: { name: "S.mohsen", url: "https://xseyed.vercel.app/" },
  applicationName: "مه گپ",
  openGraph: {
    title: "مه گپ",
    description:
      "یک پیام‌رسان سبک، سریع و امن با طراحی بلوری و رابط کاربری مینیمال است.",
    images: "/macOS.avif",
  },
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className="flex justify-center">
      <body
        className={`flex h-screen w-screen max-w-[1920px] items-center justify-center text-white antialiased md:py-20`}
      >
        <main className="z-[10] mx-auto h-full max-h-[1080px] overflow-hidden bg-black/20 backdrop-blur-sm md:container md:rounded-2xl">
          <Chat>{children}</Chat>
        </main>
      </body>
    </html>
  );
}
