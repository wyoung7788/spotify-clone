import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "./clientprovider";

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 

{
  return (
    <html lang="en">

      <body

      >
        <Provider>
        {children}
        </Provider>
      </body>
    </html>
  );
}
