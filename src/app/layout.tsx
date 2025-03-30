import type { Metadata } from "next";
import { Roboto_Mono, Ubuntu } from "next/font/google";
import "./globals.css";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto-mono",
});

const ubuntuFont = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ubuntu",
});

export const metadata: Metadata = {
  title: "HOCA",
  description: "Hellenic Outreach and Community Association",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ubuntuFont.className} bg-gray-100`}>{children}</body>
    </html>
  );
}
