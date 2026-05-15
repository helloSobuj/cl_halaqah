import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ui/ThemeProvider";
import Header from "@/components/layout/Header";
import { DesktopSidebar, MobileSidebar } from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";

export const metadata: Metadata = {
  title: "হালাকাহ | Halaqah — Islamic Community",
  description: "An Islamic learning and community platform with quiz, Q&A, library, events, videos and blog.",
  keywords: ["Islamic", "Halaqah", "Quran", "Muslim", "Community", "Learn Islam"],
  openGraph: {
    title: "হালাকাহ — Islamic Community Platform",
    description: "Grow in Islamic knowledge with quizzes, Q&A, library, events and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="h-full" suppressHydrationWarning>
      <body className="h-full antialiased">
        <ThemeProvider>
          <div className="min-h-screen bg-[var(--bg)] flex flex-col">
            <Header />
            <div className="flex flex-1 overflow-hidden">
              <DesktopSidebar />
              <MobileSidebar />
              <main className="flex-1 overflow-y-auto mobile-safe-bottom lg:pb-0">
                {children}
              </main>
            </div>
            <MobileNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
