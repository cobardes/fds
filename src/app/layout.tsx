import { Geist_Mono, Instrument_Sans } from "next/font/google";

import type { Metadata } from "next";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
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
      <body className={`${instrumentSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
