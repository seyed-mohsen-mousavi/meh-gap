// import Providers from "@/components/Providers";
import "./globals.css";
import { Metadata } from "next";
import SideBar from "@/components/SideBar";
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
        className={`h-screen w-screen max-w-[1920px] py-20 text-white antialiased`}
      >
        <main className="z-[10] container mx-auto h-full overflow-hidden rounded-2xl bg-black/20 backdrop-blur-sm">
          <div className="grid size-full grid-cols-4">
            <div className="size-full h-full overflow-auto bg-black/20">
              <SideBar />
            </div>
            <section className="col-span-3 size-full border-r border-gray-300/50">
              {children}
            </section>
          </div>
        </main>
      </body>
    </html>
  );
}
