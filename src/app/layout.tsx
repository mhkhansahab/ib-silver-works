import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AppSessionProvider } from "@/components/providers/session-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { CustomCursor } from "@/components/ui/custom-cursor";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IB Metal Works",
  description:
    "Physical gold and silver, sourced with precision and backed by clear verification.",
  icons: {
    icon: "/fav-icon.webp",
    shortcut: "/fav-icon.webp",
    apple: "/fav-icon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${playfair.variable}`}
    >
      <body className="bg-ivory text-ink antialiased font-sans">
        <AppSessionProvider>
          <CustomCursor />
          <SiteHeader />
          {children}
        </AppSessionProvider>
      </body>
    </html>
  );
}
