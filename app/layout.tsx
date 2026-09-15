import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Lex Interface | Advocates & Legal Consultants",
  description: "Lex Interface is a boutique law firm delivering practical legal advice and services for corporates and business associations.",
  keywords: ["Lex Interface", "law firm Noida", "legal consultants", "advocates"],
  metadataBase: new URL("https://lex-website-tawny.vercel.app"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

