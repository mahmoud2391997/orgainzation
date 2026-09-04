import type { Metadata } from "next";
import { Footer, Header } from "@/components/site";
import { LanguageProvider } from "@/components/language-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Antitude — Technology partner for what matters next",
    template: "%s — Antitude",
  },
  description: "Antitude helps ambitious teams turn complex technology into clear, useful momentum.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
