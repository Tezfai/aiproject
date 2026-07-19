import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
title: "Opticare AI – AI Powered Eye Care Assistant",
description: "Get instant eye care guidance and vision support through voice calls with our AI assistant",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
     appearance={{
      variables: {
        colorPrimary: "#4f46e5",
        colorText: "#111827",
        colorBackground: "#f9fafb",
        colorInputBackground: "#ffffff",
        
      },
      elements: {
        card: "rounded-lg shadow-md border border-gray-200",
      },
    }}
      >
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
