import type { Metadata } from "next";
import { Playfair_Display, Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Medina Beauty | Premium Cosmetics & Skincare",
  description: "Natural beauty and skincare inspired by the Mediterranean. Discover our premium cosmetic collections.",
  openGraph: {
    title: 'Medina Beauty | Premium Cosmetics & Skincare',
    description: 'Natural beauty and skincare inspired by the Mediterranean. Discover our premium cosmetic collections.',
    url: 'https://medinabeauty.tn', // Placeholder domain
    siteName: 'Medina Beauty',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'Medina Beauty Products',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medina Beauty | Premium Cosmetics & Skincare',
    description: 'Natural beauty and skincare inspired by the Mediterranean.',
    images: ['https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=1200'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cairo.variable} ${playfair.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
