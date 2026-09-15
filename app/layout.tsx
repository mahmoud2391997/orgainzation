import type { Metadata } from "next";
import { Footer, Header } from "@/components/site";
import { LanguageProvider } from "@/components/language-provider";
import { ThemeScript } from "@/components/theme-script";
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
        <ThemeScript />
        <LanguageProvider>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <Header />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
