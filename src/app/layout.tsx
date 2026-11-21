import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A-XS — Developer & Automation Builder",
  description: "A-XS is an early-career developer building automation, AI-assisted tools, and interfaces. Learning in public from Algeria.",
  icons: { icon: "/assets/favicon.svg", apple: "/assets/apple-touch-icon.png" },
  openGraph: { type: "website", locale: "en_US", siteName: "A-XS" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
