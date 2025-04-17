import "./globals.css";
import { Metadata } from "next";
import Chat from "@/components/Chat";
// ${geistSans.variable} ${geistMono.variable}
export const metadata: Metadata = {
  title: "مه گپ",
  description:
    "یک پیام‌رسان سبک، سریع و امن با طراحی بلوری و رابط کاربری مینیمال است.",
  authors: { name: "S.mohsen", url: "https://xseyed.vercel.app/" },
  openGraph: {
    title: "مه گپ",
    description:
      "یک پیام‌رسان سبک، سریع و امن با طراحی بلوری و رابط کاربری مینیمال است.",
  },
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
        className={`h-screen w-screen max-w-[1920px] items-center justify-center text-white antialiased md:flex md:py-20`}
      >
        <main className="z-[10] mx-auto h-full max-h-[1080px] overflow-hidden bg-black/20 backdrop-blur-sm md:container md:rounded-2xl">
          <Chat>{children}</Chat>
        </main>
      </body>
    </html>
  );
}
