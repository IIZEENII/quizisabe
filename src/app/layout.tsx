import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({ subsets: ["latin"], weight: '400' });

export const metadata: Metadata = {
  title: "Quizzisabe",
  description: "Quizzess",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lexend.className}>
        <main className="m-auto flex flex-col justify-center items-center min-h-[100vh]">
          {children}
        </main>
      </body>
    </html>
  );
}
