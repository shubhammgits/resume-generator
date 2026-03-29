import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { ClientToaster } from "@/components/layout/ClientToaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://resumeforge.app"),
  title: "ResumeForge | Modern Resume Generator",
  description:
    "Build polished, ATS-friendly resumes with live preview, rich animations, and one-click PDF export.",
  openGraph: {
    title: "ResumeForge",
    description:
      "A production-ready resume builder with live preview and high-quality PDF output.",
    images: ["/og-image.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <ClientToaster />
      </body>
    </html>
  );
}
