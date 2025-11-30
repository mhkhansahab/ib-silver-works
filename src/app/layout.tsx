import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AppSessionProvider } from "@/components/providers/session-provider";
import { SiteHeader } from "@/components/layout/site-header";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Silver Works | IB",
  description:
    "Modern verification suite for silver bar traders—list inventory, verify SKUs, and manage authenticity in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="bg-[var(--sand)] text-[var(--ink)] antialiased">
        <AppSessionProvider>
          <SiteHeader />
          <div className="pt-24">{children}</div>
        </AppSessionProvider>
      </body>
    </html>
  );
}
