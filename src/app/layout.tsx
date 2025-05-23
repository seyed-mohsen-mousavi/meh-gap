import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
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
export const viewport: Viewport = {
  minimumScale: 1.0,
  width: "device-width",
  initialScale: 1.0,
  userScalable: false,
};
import { PrimeReactProvider } from "primereact/api";

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
        <PrimeReactProvider>
          <main className="z-[10] mx-auto h-full max-h-[1080px] overflow-hidden bg-black/20 backdrop-blur-sm md:container md:rounded-2xl">
            <Chat>{children}</Chat>
          </main>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
