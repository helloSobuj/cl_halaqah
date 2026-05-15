"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "@/hooks/useTranslation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  User, MapPin, Calendar, Edit2, BookOpen, HelpCircle,
  MessageCircle, Star, Bookmark, Award, Activity, Library,
} from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(useGSAP);

const DEMO_USER = {
  nameBn: "আব্দুর রহমান",
  nameEn: "Abdur Rahman",
  email: "abdur@example.com",
  locationBn: "ঢাকা, বাংলাদেশ",
  locationEn: "Dhaka, Bangladesh",
  bioBn: "আলহামদুলিল্লাহ। ইসলামিক জ্ঞান অর্জনে আগ্রহী একজন মুসলিম।",
  bioEn: "Alhamdulillah. A Muslim eager to acquire Islamic knowledge.",
  joinedDate: "2024-01-15",
  stats: { quizzes: 45, questions: 12, answers: 38, events: 8, points: 1250 },
  badges: ["প্রথম কুইজ", "১০টি উত্তর", "ইভেন্ট অংশগ্রহণকারী"],
  badgesEn: ["First Quiz", "10 Answers", "Event Participant"],
  recentQuizzes: [
    { titleBn: "কুরআনের সূরা পরিচিতি", titleEn: "Introduction to Surahs", score: 90, date: "2025-05-10" },
    { titleBn: "ইসলামের পাঁচ স্তম্ভ", titleEn: "Five Pillars of Islam", score: 85, date: "2025-05-08" },
    { titleBn: "নবীদের জীবনী", titleEn: "Lives of the Prophets", score: 75, date: "2025-05-05" },
  ],
};

export default function ProfilePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, locale } = useTranslation();

  useGSAP(() => {
    gsap.fromTo(".profile-section", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="page-container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: Profile Card */}
        <div className="profile-section lg:col-span-1 space-y-4">
          {/* Main Profile Card */}
          <div className="card p-6 text-center">
            {/* Avatar */}
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-700 to-primary-500 flex items-center justify-center mx-auto shadow-lg">
                <span className={`text-3xl font-bold text-white ${locale === "bn" ? "font-bangla" : ""}`}>
                  {locale === "bn" ? DEMO_USER.nameBn.charAt(0) : DEMO_USER.nameEn.charAt(0)}
                </span>
              </div>
              <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-emerald-500 border-2 border-[var(--bg-card)] flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-white" />
              </div>
            </div>

            <h1 className={`text-xl font-bold text-[var(--text-primary)] mb-1 ${locale === "bn" ? "font-bangla" : ""}`}>
              {locale === "bn" ? DEMO_USER.nameBn : DEMO_USER.nameEn}
            </h1>
            <p className="text-sm text-[var(--text-muted)] mb-3">{DEMO_USER.email}</p>

            {/* Location & Joined */}
            <div className="space-y-1 mb-4">
              <div className="flex items-center justify-center gap-1.5 text-xs text-[var(--text-muted)]">
                <MapPin className="w-3.5 h-3.5" />
                <span className={locale === "bn" ? "font-bangla" : ""}>
                  {locale === "bn" ? DEMO_USER.locationBn : DEMO_USER.locationEn}
                </span>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-xs text-[var(--text-muted)]">
                <Calendar className="w-3.5 h-3.5" />
                <span className={locale === "bn" ? "font-bangla" : ""}>
                  {t.profile.joined} {new Date(DEMO_USER.joinedDate).getFullYear()}
                </span>
              </div>
            </div>

            {/* Bio */}
            <p className={`text-sm text-[var(--text-muted)] mb-5 leading-relaxed ${locale === "bn" ? "font-bangla" : ""}`}>
              {locale === "bn" ? DEMO_USER.bioBn : DEMO_USER.bioEn}
            </p>

            <Link href="/profile/edit">
              <Button variant="ghost" className={`w-full ${locale === "bn" ? "font-bangla" : ""}`}>
                <Edit2 className="w-4 h-4" />
                {t.profile.editProfile}
              </Button>
            </Link>
          </div>

          {/* Stats Card */}
          <div className="card p-5">
            <h3 className={`font-bold text-[var(--text-primary)] mb-4 text-sm ${locale === "bn" ? "font-bangla" : ""}`}>
              {locale === "bn" ? "পরিসংখ্যান" : "Statistics"}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: HelpCircle, value: DEMO_USER.stats.quizzes, bn: "কুইজ", en: "Quizzes", color: "text-emerald-600 dark:text-emerald-400" },
                { icon: MessageCircle, value: DEMO_USER.stats.questions, bn: "প্রশ্ন", en: "Questions", color: "text-blue-600 dark:text-blue-400" },
                { icon: BookOpen, value: DEMO_USER.stats.answers, bn: "উত্তর", en: "Answers", color: "text-purple-600 dark:text-purple-400" },
                { icon: Calendar, value: DEMO_USER.stats.events, bn: "ইভেন্ট", en: "Events", color: "text-orange-600 dark:text-orange-400" },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="bg-[var(--bg)] rounded-xl p-3 text-center">
                    <Icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
                    <div className="text-xl font-bold text-[var(--text-primary)]">{stat.value}</div>
                    <div className={`text-xs text-[var(--text-muted)] ${locale === "bn" ? "font-bangla" : ""}`}>
                      {locale === "bn" ? stat.bn : stat.en}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center justify-between">
              <span className={`text-sm text-[var(--text-muted)] ${locale === "bn" ? "font-bangla" : ""}`}>
                {locale === "bn" ? "মোট পয়েন্ট" : "Total Points"}
              </span>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-bold text-[var(--text-primary)]">{DEMO_USER.stats.points.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="card p-5">
            <h3 className={`font-bold text-[var(--text-primary)] mb-4 text-sm flex items-center gap-2 ${locale === "bn" ? "font-bangla" : ""}`}>
              <Award className="w-4 h-4 text-amber-500" />
              {locale === "bn" ? "ব্যাজ" : "Badges"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {(locale === "bn" ? DEMO_USER.badges : DEMO_USER.badgesEn).map((badge) => (
                <Badge key={badge} variant="accent" className={locale === "bn" ? "font-bangla" : ""}>
                  <Award className="w-3 h-3" />
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Activity */}
        <div className="lg:col-span-2 space-y-4">
          {/* Recent Quizzes */}
          <div className="profile-section card p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className={`font-bold text-[var(--text-primary)] flex items-center gap-2 ${locale === "bn" ? "font-bangla" : ""}`}>
                <Activity className="w-4 h-4 text-primary-700 dark:text-primary-400" />
                {t.profile.myQuizzes}
              </h3>
              <Link href="/quiz" className={`text-sm text-primary-700 dark:text-primary-400 hover:underline ${locale === "bn" ? "font-bangla" : ""}`}>
                {t.common.viewAll}
              </Link>
            </div>
            <div className="space-y-3">
              {DEMO_USER.recentQuizzes.map((quiz, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0">
                  <div>
                    <p className={`font-semibold text-sm text-[var(--text-primary)] ${locale === "bn" ? "font-bangla" : ""}`}>
                      {locale === "bn" ? quiz.titleBn : quiz.titleEn}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      {new Date(quiz.date).toLocaleDateString(locale === "bn" ? "bn-BD" : "en-US")}
                    </p>
                  </div>
                  <div className={`text-right`}>
                    <div className={`text-lg font-bold ${quiz.score >= 80 ? "text-emerald-600 dark:text-emerald-400" : quiz.score >= 60 ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400"}`}>
                      {quiz.score}%
                    </div>
                    <Badge variant={quiz.score >= 60 ? "success" : "danger"} className={`text-[10px] ${locale === "bn" ? "font-bangla" : ""}`}>
                      {quiz.score >= 60
                        ? (locale === "bn" ? "পাস" : "Pass")
                        : (locale === "bn" ? "ফেল" : "Fail")}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Nav Cards */}
          <div className="profile-section grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { icon: BookOpen, bn: "আমার প্রশ্ন", en: "My Questions", href: "/qa", color: "text-blue-600 dark:text-blue-400" },
              { icon: Bookmark, bn: "বুকমার্ক", en: "Bookmarks", href: "#", color: "text-purple-600 dark:text-purple-400" },
              { icon: Library, bn: "সেভ করা বই", en: "Saved Books", href: "/library", color: "text-amber-600 dark:text-amber-400" },
              { icon: Calendar, bn: "আমার ইভেন্ট", en: "My Events", href: "/events", color: "text-orange-600 dark:text-orange-400" },
              { icon: Star, bn: "পুরস্কার", en: "Rewards", href: "#", color: "text-yellow-600 dark:text-yellow-400" },
              { icon: Edit2, bn: "সম্পাদনা", en: "Edit Profile", href: "/profile/edit", color: "text-primary-700 dark:text-primary-400" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="card p-4 flex flex-col items-center gap-2 text-center group hover:-translate-y-0.5 transition-all"
                >
                  <Icon className={`w-6 h-6 ${item.color} group-hover:scale-110 transition-transform`} />
                  <span className={`text-xs font-semibold text-[var(--text-secondary)] ${locale === "bn" ? "font-bangla" : ""}`}>
                    {locale === "bn" ? item.bn : item.en}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
