import type { Metadata } from "next";
import "./globals.css";

import { ReduxProvider } from "@/components/providers/redux-provider"
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: "Flow Dashboard",
  description: "Financial Dashboard Application",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}