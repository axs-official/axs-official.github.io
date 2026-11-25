import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "A-XS — full-stack developer",
    template: "%s · A-XS",
  },
  description: site.description,
  keywords: [
    "A-XS",
    "full-stack developer",
    "privacy-first developer",
    "automation",
    "Next.js",
    "Python",
    "open source",
  ],
  authors: [{ name: "A-XS", url: site.github }],
  icons: {
    icon: [{ url: "/assets/favicon-32.png", sizes: "32x32", type: "image/png" }],
    apple: "/assets/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "A-XS",
    title: "A-XS",
    description: site.description,
    url: site.url,
    images: [{ url: "/assets/og.png", width: 1200, height: 630, alt: "A-XS" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "A-XS",
    description: site.description,
    images: ["/assets/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div aria-hidden className="site-bg">
          <div className="starfield" />
          <div className="site-grid" />
        </div>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
