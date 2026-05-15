"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import {
  Home, HelpCircle, BookOpen, Calendar, Video,
} from "lucide-react";

const mobileNavItems = [
  { labelKey: "home" as const, href: "/", icon: Home },
  { labelKey: "quiz" as const, href: "/quiz", icon: HelpCircle },
  { labelKey: "qa" as const, href: "/qa", icon: BookOpen },
  { labelKey: "events" as const, href: "/events", icon: Calendar },
  { labelKey: "videos" as const, href: "/videos", icon: Video },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { t, locale } = useTranslation();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass border-t border-[var(--border)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="flex">
        {mobileNavItems.map(({ labelKey, href, icon: Icon }) => {
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex-1 flex flex-col items-center justify-center py-2 gap-1 transition-colors",
                isActive
                  ? "text-primary-700 dark:text-primary-400"
                  : "text-[var(--text-muted)]"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-xl transition-all",
                isActive && "bg-primary-700/10 dark:bg-primary-500/15"
              )}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={cn(
                "text-[10px] font-semibold leading-none",
                locale === "bn" ? "font-bangla" : ""
              )}>
                {t.nav[labelKey]}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
