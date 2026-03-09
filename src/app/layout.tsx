import type { Metadata } from "next";

import "./globals.css";
import Navbar from "./_components/Navbar";
import ToastProvider from "./_components/ToastProvider";


export const metadata: Metadata = {
  title: "Contact Manager",
  description: "A simple contact manager app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ToastProvider />
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
