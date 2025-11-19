import { Geist_Mono, Rethink_Sans } from "next/font/google";

import type { Metadata } from "next";
import "./globals.css";

const rethinkSans = Rethink_Sans({
  variable: "--font-rethink-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "fds.",
  description: "cosas que hacer hoy en santiago",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${rethinkSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
