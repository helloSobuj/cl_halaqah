"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/store/appStore";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import {
  Home, BookOpen, HelpCircle, Megaphone, Calendar,
  Library, Video, PenSquare, X, Settings, Shield,
} from "lucide-react";
import { CrescentMoon } from "@/components/ui/Icon";

interface NavItem {
  labelKey: keyof ReturnType<typeof useTranslation>["t"]["nav"];
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { labelKey: "home", href: "/", icon: <Home className="w-5 h-5" /> },
  { labelKey: "quiz", href: "/quiz", icon: <HelpCircle className="w-5 h-5" /> },
  { labelKey: "qa", href: "/qa", icon: <BookOpen className="w-5 h-5" /> },
  { labelKey: "notices", href: "/notices", icon: <Megaphone className="w-5 h-5" /> },
  { labelKey: "events", href: "/events", icon: <Calendar className="w-5 h-5" /> },
  { labelKey: "library", href: "/library", icon: <Library className="w-5 h-5" /> },
  { labelKey: "videos", href: "/videos", icon: <Video className="w-5 h-5" /> },
  { labelKey: "blog", href: "/blog", icon: <PenSquare className="w-5 h-5" /> },
];

function NavLink({ item, onClick }: { item: NavItem; onClick?: () => void }) {
  const pathname = usePathname();
  const { t, locale } = useTranslation();
  const isActive =
    item.href === "/"
      ? pathname === "/"
      : pathname.startsWith(item.href);

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group",
        isActive
          ? "bg-primary-700 text-white shadow-md shadow-primary-700/30"
          : "text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--text-primary)]"
      )}
    >
      <span className={cn("transition-transform group-hover:scale-110", isActive && "text-white")}>
        {item.icon}
      </span>
      <span className={locale === "bn" ? "font-bangla" : ""}>
        {t.nav[item.labelKey]}
      </span>
      {isActive && (
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
      )}
    </Link>
  );
}

// Desktop sidebar
export function DesktopSidebar() {
  const { t, locale } = useTranslation();

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 h-[calc(100vh-4rem)] sticky top-16 bg-[var(--bg-sidebar)] border-r border-[var(--border)] overflow-y-auto">
      <div className="p-4 flex-1">
        {/* Quran verse decoration */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-primary-700/10 to-accent-500/10 border border-primary-700/10 text-center">
          <p className="arabic-text text-lg text-primary-700 dark:text-primary-400">
            اقْرَأْ بِاسْمِ رَبِّكَ
          </p>
          <p className={`text-xs text-[var(--text-muted)] mt-1 ${locale === "bn" ? "font-bangla" : ""}`}>
            {locale === "bn" ? "পড়ুন তোমার রবের নামে" : "Read in the name of your Lord"}
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </nav>

        {/* Admin & Settings */}
        <div className="mt-6 pt-6 border-t border-[var(--border)] space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--text-primary)] transition-all"
          >
            <Shield className="w-5 h-5" />
            <span className={locale === "bn" ? "font-bangla" : ""}>{t.common.admin}</span>
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--text-primary)] transition-all"
          >
            <Settings className="w-5 h-5" />
            <span className={locale === "bn" ? "font-bangla" : ""}>{t.common.settings}</span>
          </Link>
        </div>
      </div>

      {/* Footer tagline */}
      <div className="p-4 border-t border-[var(--border)]">
        <p className={`text-xs text-[var(--text-muted)] text-center ${locale === "bn" ? "font-bangla" : ""}`}>
          {t.common.tagline}
        </p>
      </div>
    </aside>
  );
}

// Mobile sidebar (drawer)
export function MobileSidebar() {
  const { sidebarOpen, setSidebarOpen } = useAppStore();
  const { t, locale } = useTranslation();

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Drawer */}
      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 z-50 w-72 bg-[var(--bg-sidebar)] border-r border-[var(--border)] flex flex-col shadow-2xl transition-transform duration-300 ease-out lg:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-700 to-primary-500 flex items-center justify-center">
              <CrescentMoon className="w-5 h-5 text-white" />
            </div>
            <span className={`font-bold text-[var(--text-primary)] text-lg ${locale === "bn" ? "font-bangla" : ""}`}>
              {t.common.appName}
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--border)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          {/* Verse */}
          <div className="mb-4 p-3 rounded-2xl bg-gradient-to-br from-primary-700/10 to-accent-500/10 border border-primary-700/10 text-center">
            <p className="arabic-text text-base text-primary-700 dark:text-primary-400">اقْرَأْ بِاسْمِ رَبِّكَ</p>
            <p className={`text-xs text-[var(--text-muted)] mt-1 ${locale === "bn" ? "font-bangla" : ""}`}>
              {locale === "bn" ? "পড়ুন তোমার রবের নামে" : "Read in the name of your Lord"}
            </p>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink key={item.href} item={item} onClick={() => setSidebarOpen(false)} />
            ))}
          </nav>

          <div className="mt-4 pt-4 border-t border-[var(--border)] space-y-1">
            <Link
              href="/admin"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--border)] transition-all"
            >
              <Shield className="w-5 h-5" />
              <span className={locale === "bn" ? "font-bangla" : ""}>{t.common.admin}</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
