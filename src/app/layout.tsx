import type { Metadata } from "next";
import { Raleway, Open_Sans } from "next/font/google";
import "./globals.css";
import { GSAPProvider } from "@/providers/GSAPProvider";
import HeaderWrapper from "@/components/header/HeaderWrapper";
import { ScreenSizeProvider } from "@/providers/ScreenSizeProvider";
import Footer from "@/components/global/Footer";
import { ThemeProvider } from "next-themes";
import RainbowkitProvider from "@/providers/RainbowkitProvider";
import { MountProvider } from "@/providers/MountContext";
import SmoothScrolling from "@/providers/SmoothScrollingProvider";
import Head from "next/head";

const raleway = Raleway({
  variable: "--font-raleway",
  weight: ["200", "400", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: "800",
});

export const metadata: Metadata = {
  title: "Ethereal",
  description: "Web3 Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const projectId = process.env.CONNECT_WALLET_ID;
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        Facebook, Instagram
        <meta property="og:title" content="Ethereal" />
        <meta property="og:description" content="Web3 Project" />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Ethereal" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ethereal" />
        <meta name="twitter:description" content="Web3 Project" />
        <meta name="twitter:site" content="@Ethereal" />
        {/* TikTok, YouTube, and Others */}
        <meta property="og:video" content="https://www.youtube.com/" />
        <meta property="og:video:type" content="text/html" />
        <meta property="og:video:width" content="1280" />
        <meta property="og:video:height" content="720" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body
        className={`${raleway.variable} ${openSans.variable} light-theme antialiased overflow-hidden max-w-screen`}
      >
        <MountProvider>
          <ScreenSizeProvider>
            <GSAPProvider>
              <RainbowkitProvider projectId={projectId ?? ""}>
                <ThemeProvider attribute="data-theme" defaultTheme="dark">
                  <SmoothScrolling>
                    <HeaderWrapper />
                    {children}
                    <Footer />
                  </SmoothScrolling>
                </ThemeProvider>
              </RainbowkitProvider>
            </GSAPProvider>
          </ScreenSizeProvider>
        </MountProvider>
      </body>
    </html>
  );
}
