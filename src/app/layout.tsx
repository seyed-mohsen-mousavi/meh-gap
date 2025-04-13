import "./globals.css";
// ${geistSans.variable} ${geistMono.variable}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased max-w-[1920px]`}>
        <main className="z-[10] ">{children}</main>
      </body>
    </html>
  );
}
