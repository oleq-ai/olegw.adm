import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";

import MainError from "@/components/errors/main";
import { Toaster } from "@/components/ui/sonner";
import env from "@/config/server.env";
import { siteConfig } from "@/config/site.config";
import { ProgressBar } from "@/providers/progress-bar";
import QueryProvider from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    template: `%s | OleqGW Admin`,
    default: `${siteConfig.name} Admin`,
  },
  robots: {
    index: false,
    follow: false,
    noimageindex: true,
    noarchive: true,
    nosnippet: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      noarchive: true,
      nosnippet: true,
    },
  },
  description: siteConfig.description,
  icons: [
    {
      rel: "icon",
      url: `/icons/favicon.ico`,
    },
    {
      rel: "apple-touch-icon",
      url: `/icons/apple-touch-icon.png`,
    },
    {
      rel: "manifest",
      url: `/site.webmanifest`,
    },
  ],
  manifest: `/site.webmanifest`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorBoundary FallbackComponent={MainError}>
            <QueryProvider>
              {children}
              {env.NODE_ENV === "development" && (
                <ReactQueryDevtools buttonPosition="bottom-right" />
              )}
            </QueryProvider>
          </ErrorBoundary>
          <ProgressBar />
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
