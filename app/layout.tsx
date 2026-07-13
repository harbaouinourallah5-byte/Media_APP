import type { Metadata } from "next";
import { Playfair_Display, Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Medina Beauty | Premium Cosmetics",
  description: "Natural beauty and skincare inspired by the Mediterranean.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cairo.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
