import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/Nav/page";
import Footer from '@/components/footer/page'
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SHOP.CO | Find Clothes That Match Your Style",
  description:
    "Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="max-w-360 mx-auto overflow-x-hidden">
            <Navbar />
              {children}
              <Footer/>
              </div>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
