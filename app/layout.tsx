import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const maisonNeue = localFont({
  src: [
    {
      path: "../public/fonts/maisonneueextrathin-webfont.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/maisonneuethin-webfont.woff",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/maisonneuelight-webfont.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/maisonneuebook-webfont.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/maisonneuemedium-webfont.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/maisonneuedemi-webfont.woff",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-maison-neue",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SummerHacks",
  description: "June 2026 - Waitlist open. Limited spots.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${maisonNeue.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
