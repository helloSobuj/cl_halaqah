"use client";
import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "@/hooks/useTranslation";
import {
  Shield, Users, HelpCircle, BookOpen, Megaphone, Calendar,
  Library, Video, PenSquare, TrendingUp, Activity, Plus,
  ArrowUpRight, Eye, Heart,
} from "lucide-react";

gsap.registerPlugin(useGSAP);

const STATS = [
  { bn: "মোট সদস্য", en: "Total Members", value: "2,547", icon: Users, color: "from-blue-500 to-indigo-600", change: "+12%" },
  { bn: "মোট কুইজ", en: "Total Quizzes", value: "152", icon: HelpCircle, color: "from-emerald-500 to-teal-600", change: "+5%" },
  { bn: "মোট বই", en: "Total Books", value: "523", icon: Library, color: "from-amber-500 to-orange-600", change: "+18%" },
  { bn: "মোট ভিডিও", en: "Total Videos", value: "314", icon: Video, color: "from-red-500 to-rose-600", change: "+8%" },
];

const ADMIN_MODULES = [
  { href: "/admin/quiz", bn: "কুইজ পরিচালনা", en: "Manage Quiz", icon: HelpCircle, color: "bg-emerald-500" },
  { href: "/admin/qa", bn: "প্রশ্নোত্তর পরিচালনা", en: "Manage Q&A", icon: BookOpen, color: "bg-blue-500" },
  { href: "/admin/notices", bn: "নোটিশ পরিচালনা", en: "Manage Notices", icon: Megaphone, color: "bg-orange-500" },
  { href: "/admin/events", bn: "ইভেন্ট পরিচালনা", en: "Manage Events", icon: Calendar, color: "bg-purple-500" },
  { href: "/admin/library", bn: "পাঠাগার পরিচালনা", en: "Manage Library", icon: Library, color: "bg-amber-500" },
  { href: "/admin/videos", bn: "ভিডিও পরিচালনা", en: "Manage Videos", icon: Video, color: "bg-red-500" },
  { href: "/admin/blog", bn: "ব্লগ পরিচালনা", en: "Manage Blog", icon: PenSquare, color: "bg-cyan-500" },
  { href: "/admin/users", bn: "ব্যবহারকারী", en: "Users", icon: Users, color: "bg-violet-500" },
];

const RECENT_ACTIVITY = [
  { bn: "নতুন সদস্য যোগ দিয়েছেন: আব্দুর রহমান", en: "New member joined: Abdur Rahman", time: "2m ago", type: "user" },
  { bn: "নতুন প্রশ্ন: তারাবীহ নামাজ কত রাকাত?", en: "New question: How many rakats of Taraweeh?", time: "15m ago", type: "qa" },
  { bn: "কুইজ সম্পন্ন: মুহাম্মদ আলী — ৯০%", en: "Quiz completed: Muhammad Ali — 90%", time: "32m ago", type: "quiz" },
  { bn: "নতুন ইভেন্ট রেজিস্ট্রেশন: ইসলামিক সেমিনার", en: "New event registration: Islamic Seminar", time: "1h ago", type: "event" },
  { bn: "নতুন বই আপলোড: রিয়াদুস সালেহীন", en: "New book uploaded: Riyad as-Salihin", time: "2h ago", type: "library" },
];

export default function AdminPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, locale } = useTranslation();

  useGSAP(() => {
    gsap.fromTo(".stat-card", { opacity: 0, y: 24, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.08, ease: "power2.out" });
    gsap.fromTo(".admin-module", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power2.out", delay: 0.3 });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="page-container py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-violet-600 flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className={`text-2xl font-bold text-[var(--text-primary)] ${locale === "bn" ? "font-bangla" : ""}`}>
            {locale === "bn" ? "অ্যাডমিন ড্যাশবোর্ড" : "Admin Dashboard"}
          </h1>
          <p className={`text-sm text-[var(--text-muted)] ${locale === "bn" ? "font-bangla" : ""}`}>
            {locale === "bn" ? "সমস্ত কার্যক্রম পরিচালনা করুন" : "Manage all platform activities"}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.en} className="stat-card card p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-[var(--text-primary)] mb-1">{stat.value}</div>
              <div className={`text-xs text-[var(--text-muted)] ${locale === "bn" ? "font-bangla" : ""}`}>
                {locale === "bn" ? stat.bn : stat.en}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h2 className={`font-bold text-[var(--text-primary)] mb-4 ${locale === "bn" ? "font-bangla" : ""}`}>
            {locale === "bn" ? "পরিচালনা মডিউল" : "Management Modules"}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {ADMIN_MODULES.map((mod) => {
              const Icon = mod.icon;
              return (
                <Link
                  key={mod.href}
                  href={mod.href}
                  className="admin-module card p-4 flex flex-col items-center gap-2 text-center group hover:-translate-y-0.5 transition-all"
                >
                  <div className={`w-10 h-10 rounded-xl ${mod.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className={`text-xs font-semibold text-[var(--text-secondary)] group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors ${locale === "bn" ? "font-bangla" : ""}`}>
                    {locale === "bn" ? mod.bn : mod.en}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Quick Add Buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { bn: "নতুন নোটিশ", en: "New Notice", href: "/admin/notices/new" },
              { bn: "নতুন ইভেন্ট", en: "New Event", href: "/admin/events/new" },
              { bn: "নতুন কুইজ", en: "New Quiz", href: "/admin/quiz/new" },
              { bn: "নতুন বই", en: "New Book", href: "/admin/library/new" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`btn-ghost text-sm ${locale === "bn" ? "font-bangla" : ""}`}
              >
                <Plus className="w-4 h-4" />
                {locale === "bn" ? item.bn : item.en}
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className={`font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2 ${locale === "bn" ? "font-bangla" : ""}`}>
            <Activity className="w-4 h-4 text-primary-700 dark:text-primary-400" />
            {locale === "bn" ? "সাম্প্রতিক কার্যক্রম" : "Recent Activity"}
          </h2>
          <div className="card p-4 space-y-4">
            {RECENT_ACTIVITY.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary-700 dark:bg-primary-400 mt-1.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm text-[var(--text-secondary)] leading-snug ${locale === "bn" ? "font-bangla" : ""}`}>
                    {locale === "bn" ? item.bn : item.en}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
