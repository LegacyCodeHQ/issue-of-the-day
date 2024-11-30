import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import {SpeedInsights} from "@vercel/speed-insights/next"
import React from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Issue of the Day",
  description: "Discover interesting GitHub issues from across the open source world. One random issue every day to help you explore and contribute to meaningful projects.",
  openGraph: {
    title: "Issue of the Day",
    description: "Discover interesting GitHub issues from across the open source world. One random issue every day to help you explore and contribute to meaningful projects.",
    type: "website",
    siteName: "Issue of the Day",
  },
  twitter: {
    card: "summary_large_image",
    title: "Issue of the Day",
    description: "Discover interesting GitHub issues from across the open source world. One random issue per day.",
  },
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    <SpeedInsights/>
    {children}
    </body>
    </html>
  );
}
