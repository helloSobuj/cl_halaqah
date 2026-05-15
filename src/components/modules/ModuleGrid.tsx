"use client";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "@/hooks/useTranslation";
import {
  HelpCircle, BookOpen, Megaphone, Calendar, Library, Video, PenSquare, Users,
} from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const modules = [
  {
    href: "/quiz",
    icon: HelpCircle,
    labelKey: "quiz" as const,
    descBn: "ইসলামিক জ্ঞান পরীক্ষা করুন",
    descEn: "Test your Islamic knowledge",
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    iconBg: "bg-emerald-500",
    count: "১৫০+ কুইজ",
    countEn: "150+ Quizzes",
  },
  {
    href: "/qa",
    icon: BookOpen,
    labelKey: "qa" as const,
    descBn: "প্রশ্ন জিজ্ঞাসা ও উত্তর দিন",
    descEn: "Ask questions & share answers",
    color: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    iconBg: "bg-blue-500",
    count: "৫০০+ প্রশ্ন",
    countEn: "500+ Questions",
  },
  {
    href: "/notices",
    icon: Megaphone,
    labelKey: "notices" as const,
    descBn: "গুরুত্বপূর্ণ ঘোষণা ও বিজ্ঞপ্তি",
    descEn: "Important announcements",
    color: "from-orange-500 to-red-500",
    bg: "bg-orange-50 dark:bg-orange-950/30",
    iconBg: "bg-orange-500",
    count: "৩০+ নোটিশ",
    countEn: "30+ Notices",
  },
  {
    href: "/events",
    icon: Calendar,
    labelKey: "events" as const,
    descBn: "ইসলামিক অনুষ্ঠান ও কার্যক্রম",
    descEn: "Islamic programs & activities",
    color: "from-purple-500 to-pink-500",
    bg: "bg-purple-50 dark:bg-purple-950/30",
    iconBg: "bg-purple-500",
    count: "২০+ ইভেন্ট",
    countEn: "20+ Events",
  },
  {
    href: "/library",
    icon: Library,
    labelKey: "library" as const,
    descBn: "ইসলামিক বই ও পাণ্ডুলিপি",
    descEn: "Islamic books & manuscripts",
    color: "from-amber-500 to-yellow-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    iconBg: "bg-amber-500",
    count: "৫০০+ বই",
    countEn: "500+ Books",
  },
  {
    href: "/videos",
    icon: Video,
    labelKey: "videos" as const,
    descBn: "ইসলামিক লেকচার ও ভিডিও",
    descEn: "Islamic lectures & videos",
    color: "from-red-500 to-rose-600",
    bg: "bg-red-50 dark:bg-red-950/30",
    iconBg: "bg-red-500",
    count: "৩০০+ ভিডিও",
    countEn: "300+ Videos",
  },
  {
    href: "/blog",
    icon: PenSquare,
    labelKey: "blog" as const,
    descBn: "ইসলামিক প্রবন্ধ ও আলোচনা",
    descEn: "Islamic articles & discussions",
    color: "from-cyan-500 to-sky-600",
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
    iconBg: "bg-cyan-500",
    count: "২০০+ পোস্ট",
    countEn: "200+ Posts",
  },
  {
    href: "/profile",
    icon: Users,
    labelKey: "home" as const,
    descBn: "আমাদের সম্প্রদায়ে যোগ দিন",
    descEn: "Join our community",
    color: "from-primary-600 to-primary-800",
    bg: "bg-primary-50 dark:bg-primary-950/30",
    iconBg: "bg-primary-700",
    count: "২,৫০০+ সদস্য",
    countEn: "2,500+ Members",
    overrideLabel: { bn: "সদস্যপদ", en: "Community" },
  },
];

export default function ModuleGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, locale } = useTranslation();

  useGSAP(() => {
    gsap.fromTo(
      ".module-card",
      { opacity: 0, y: 32, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-12 px-4 md:px-0">
      <div className="flex items-center justify-between mb-8">
        <h2 className={`section-title ${locale === "bn" ? "font-bangla" : ""}`}>
          {t.home.featuredModules}
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {modules.map((mod) => {
          const Icon = mod.icon;
          const label = mod.overrideLabel
            ? locale === "bn" ? mod.overrideLabel.bn : mod.overrideLabel.en
            : t.nav[mod.labelKey];

          return (
            <Link
              key={mod.href}
              href={mod.href}
              className={`module-card card group p-5 flex flex-col gap-3 hover:-translate-y-1 transition-all duration-200 cursor-pointer ${mod.bg}`}
            >
              <div className={`w-12 h-12 rounded-2xl ${mod.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`font-bold text-[var(--text-primary)] mb-1 ${locale === "bn" ? "font-bangla" : ""}`}>
                  {label}
                </h3>
                <p className={`text-xs text-[var(--text-muted)] leading-relaxed ${locale === "bn" ? "font-bangla" : ""}`}>
                  {locale === "bn" ? mod.descBn : mod.descEn}
                </p>
              </div>
              <div className={`text-xs font-semibold text-[var(--text-muted)] mt-auto ${locale === "bn" ? "font-bangla" : ""}`}>
                {locale === "bn" ? mod.count : mod.countEn}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
