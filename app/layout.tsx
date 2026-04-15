import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";

import "@/app/globals.css";
import { Navbar } from "@/components/navbar";
import { Providers } from "@/components/providers";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans"
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display"
});

export const metadata: Metadata = {
  title: "EventSphere | Event Management System",
  description: "Discover, manage, and book live events with an admin-ready Next.js platform."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${display.variable} font-sans antialiased`}>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
