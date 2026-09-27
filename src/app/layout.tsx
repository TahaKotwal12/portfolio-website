import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { MotionProvider } from "@/components/motion-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://marginoferror.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Margin of Error — Web & Product Engineering Studio",
    template: "%s — Margin of Error",
  },
  description:
    "Margin of Error is a web app studio that designs, builds, and ships custom software for ambitious businesses — from MVPs to full-scale platforms. Zero margin for error.",
  keywords: [
    "web app development",
    "custom software studio",
    "product engineering",
    "Next.js development agency",
    "startup MVP development",
    "Margin of Error",
  ],
  authors: [{ name: "Margin of Error" }],
  creator: "Margin of Error",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Margin of Error — Web & Product Engineering Studio",
    description:
      "We design, build, and ship custom web applications for ambitious businesses. Zero margin for error.",
    siteName: "Margin of Error",
  },
  twitter: {
    card: "summary_large_image",
    title: "Margin of Error — Web & Product Engineering Studio",
    description:
      "We design, build, and ship custom web applications for ambitious businesses. Zero margin for error.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#08080a" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased selection:bg-accent selection:text-accent-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <MotionProvider>
            <div className="noise-overlay" aria-hidden="true" />
            {children}
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
