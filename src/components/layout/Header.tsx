"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { useAppStore } from "@/store/appStore";
import { useTranslation } from "@/hooks/useTranslation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Search, Sun, Moon, Globe, Menu, Bell, User, ChevronDown,
} from "lucide-react";
import { CrescentMoon } from "@/components/ui/Icon";

gsap.registerPlugin(useGSAP);

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const { t, locale } = useTranslation();
  const { theme, toggleTheme, setLocale, toggleSidebar } = useAppStore();

  useGSAP(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );
    gsap.fromTo(
      logoRef.current,
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.2 }
    );
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 glass border-b border-[var(--border)]"
    >
      <div className="page-container">
        <div className="flex items-center justify-between h-16">
          {/* Left: Menu + Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--border)] transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-700 to-primary-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <CrescentMoon className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className={`font-bold text-[var(--text-primary)] leading-tight ${locale === "bn" ? "font-bangla text-lg" : "text-lg"}`}>
                  {t.common.appName}
                </div>
                <div className="text-[10px] text-[var(--text-muted)] leading-tight">
                  {locale === "bn" ? "ইসলামিক কমিউনিটি" : "Islamic Community"}
                </div>
              </div>
            </Link>
          </div>

          {/* Center: Search (desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder={t.common.search}
                className={`input-base pl-10 h-10 text-sm ${locale === "bn" ? "font-bangla" : ""}`}
              />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5">
            {/* Language Toggle */}
            <button
              onClick={() => setLocale(locale === "bn" ? "en" : "bn")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--border)] transition-colors text-sm font-semibold"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{locale === "bn" ? "EN" : "বাং"}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--border)] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Notifications */}
            <button className="relative p-2 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--border)] transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-[var(--bg-card)]" />
            </button>

            {/* User Menu */}
            <Link
              href="/auth/login"
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary-700 text-white hover:bg-primary-800 transition-colors text-sm font-semibold ml-1"
            >
              <User className="w-4 h-4" />
              <span className={`hidden sm:inline ${locale === "bn" ? "font-bangla" : ""}`}>
                {t.common.login}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
