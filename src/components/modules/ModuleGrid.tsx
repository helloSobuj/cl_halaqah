"use client";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "@/hooks/useTranslation";
import {
  HelpCircle, BookOpen, Megaphone, Calendar,
  Library, Video, PenSquare, Users, ArrowRight,
} from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const modules = [
  {
    href: "/quiz",
    icon: HelpCircle,
    labelBn: "কুইজ",
    labelEn: "Quiz",
    descBn: "ইসলামিক জ্ঞান পরীক্ষা করুন",
    descEn: "Test your Islamic knowledge",
    countBn: "১৫০+ কুইজ",
    countEn: "150+ Quizzes",
    gradient: "from-emerald-500 to-teal-600",
    lightBg: "#ecfdf5",
    darkBg: "rgba(16,185,129,0.08)",
    accent: "#10b981",
  },
  {
    href: "/qa",
    icon: BookOpen,
    labelBn: "প্রশ্নোত্তর",
    labelEn: "Q&A",
    descBn: "প্রশ্ন করুন ও উত্তর দিন",
    descEn: "Ask questions & share answers",
    countBn: "৫০০+ প্রশ্ন",
    countEn: "500+ Questions",
    gradient: "from-blue-500 to-indigo-600",
    lightBg: "#eff6ff",
    darkBg: "rgba(59,130,246,0.08)",
    accent: "#3b82f6",
  },
  {
    href: "/notices",
    icon: Megaphone,
    labelBn: "নোটিশ",
    labelEn: "Notices",
    descBn: "গুরুত্বপূর্ণ ঘোষণা ও বিজ্ঞপ্তি",
    descEn: "Important announcements",
    countBn: "৩০+ নোটিশ",
    countEn: "30+ Notices",
    gradient: "from-orange-500 to-red-500",
    lightBg: "#fff7ed",
    darkBg: "rgba(249,115,22,0.08)",
    accent: "#f97316",
  },
  {
    href: "/events",
    icon: Calendar,
    labelBn: "ইভেন্ট",
    labelEn: "Events",
    descBn: "ইসলামিক অনুষ্ঠান ও কার্যক্রম",
    descEn: "Islamic programs & activities",
    countBn: "২০+ ইভেন্ট",
    countEn: "20+ Events",
    gradient: "from-purple-500 to-violet-600",
    lightBg: "#f5f3ff",
    darkBg: "rgba(139,92,246,0.08)",
    accent: "#8b5cf6",
  },
  {
    href: "/library",
    icon: Library,
    labelBn: "পাঠাগার",
    labelEn: "Library",
    descBn: "ইসলামিক বই ও পাণ্ডুলিপি",
    descEn: "Islamic books & manuscripts",
    countBn: "৫০০+ বই",
    countEn: "500+ Books",
    gradient: "from-amber-500 to-yellow-500",
    lightBg: "#fffbeb",
    darkBg: "rgba(245,158,11,0.08)",
    accent: "#f59e0b",
  },
  {
    href: "/videos",
    icon: Video,
    labelBn: "ভিডিও",
    labelEn: "Videos",
    descBn: "ইসলামিক লেকচার ও ভিডিও",
    descEn: "Islamic lectures & videos",
    countBn: "৩০০+ ভিডিও",
    countEn: "300+ Videos",
    gradient: "from-red-500 to-rose-600",
    lightBg: "#fff1f2",
    darkBg: "rgba(239,68,68,0.08)",
    accent: "#ef4444",
  },
  {
    href: "/blog",
    icon: PenSquare,
    labelBn: "ব্লগ",
    labelEn: "Blog",
    descBn: "ইসলামিক প্রবন্ধ ও আলোচনা",
    descEn: "Islamic articles & discussions",
    countBn: "২০০+ পোস্ট",
    countEn: "200+ Posts",
    gradient: "from-cyan-500 to-sky-600",
    lightBg: "#ecfeff",
    darkBg: "rgba(6,182,212,0.08)",
    accent: "#06b6d4",
  },
  {
    href: "/profile",
    icon: Users,
    labelBn: "সদস্যপদ",
    labelEn: "Community",
    descBn: "আমাদের সম্প্রদায়ে যোগ দিন",
    descEn: "Join our growing community",
    countBn: "২,৫০০+ সদস্য",
    countEn: "2,500+ Members",
    gradient: "from-primary-600 to-primary-800",
    lightBg: "#f0fdf4",
    darkBg: "rgba(26,116,89,0.08)",
    accent: "#1a7459",
  },
];

export default function ModuleGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { locale } = useTranslation();

  useGSAP(() => {
    gsap.fromTo(
      ".mod-card",
      { opacity: 0, y: 28, scale: 0.97 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.45, stagger: 0.06, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 82%" },
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-10">
      <div className="flex items-center gap-3 mb-7">
        <div className="w-1 h-6 rounded-full bg-accent-500" />
        <h2 className={`text-xl font-bold text-[var(--text-primary)] ${locale === "bn" ? "font-bangla" : ""}`}>
          {locale === "bn" ? "বিভাগসমূহ" : "Explore Modules"}
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
        {modules.map((mod) => {
          const Icon = mod.icon;
          return (
            <Link
              key={mod.href}
              href={mod.href}
              className="mod-card group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 md:p-5 flex flex-col gap-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-250"
            >
              {/* Subtle gradient tint top-right */}
              <div
                className={`absolute top-0 right-0 w-20 h-20 rounded-bl-[4rem] bg-gradient-to-br ${mod.gradient} opacity-10 group-hover:opacity-20 transition-opacity`}
              />

              {/* Icon */}
              <div
                className={`relative w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${mod.gradient} shadow-sm group-hover:scale-110 transition-transform duration-200`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className={`font-bold text-[var(--text-primary)] text-sm mb-1 ${locale === "bn" ? "font-bangla" : ""}`}>
                  {locale === "bn" ? mod.labelBn : mod.labelEn}
                </h3>
                <p className={`text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2 ${locale === "bn" ? "font-bangla" : ""}`}>
                  {locale === "bn" ? mod.descBn : mod.descEn}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold text-[var(--text-muted)] ${locale === "bn" ? "font-bangla" : ""}`}>
                  {locale === "bn" ? mod.countBn : mod.countEn}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
