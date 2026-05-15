"use client";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "@/hooks/useTranslation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  HelpCircle, Clock, Star, Filter, ChevronRight, Trophy, Zap, BookOpen,
} from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CATEGORIES = [
  { id: "all", bn: "সব", en: "All" },
  { id: "aqeedah", bn: "আকিদা", en: "Aqeedah" },
  { id: "fiqh", bn: "ফিকহ", en: "Fiqh" },
  { id: "hadith", bn: "হাদিস", en: "Hadith" },
  { id: "quran", bn: "কুরআন", en: "Quran" },
  { id: "seerah", bn: "সিরাহ", en: "Seerah" },
  { id: "history", bn: "ইতিহাস", en: "History" },
];

const QUIZZES = [
  { id: "1", titleBn: "কুরআনের সূরা পরিচিতি", titleEn: "Introduction to Surahs", category: "quran", difficulty: "easy", questions: 10, timeMin: 10, rating: 4.8, attempts: 1240 },
  { id: "2", titleBn: "ইসলামের পাঁচ স্তম্ভ", titleEn: "Five Pillars of Islam", category: "aqeedah", difficulty: "easy", questions: 15, timeMin: 15, rating: 4.9, attempts: 2100 },
  { id: "3", titleBn: "সহীহ বুখারীর মূল হাদিস", titleEn: "Key Hadiths from Bukhari", category: "hadith", difficulty: "hard", questions: 20, timeMin: 25, rating: 4.7, attempts: 870 },
  { id: "4", titleBn: "নামাজের বিধি-বিধান", titleEn: "Rules of Salah", category: "fiqh", difficulty: "medium", questions: 15, timeMin: 20, rating: 4.6, attempts: 1560 },
  { id: "5", titleBn: "নবীদের জীবনী", titleEn: "Lives of the Prophets", category: "seerah", difficulty: "medium", questions: 12, timeMin: 15, rating: 4.8, attempts: 990 },
  { id: "6", titleBn: "ইসলামী ইতিহাসের যুদ্ধসমূহ", titleEn: "Battles in Islamic History", category: "history", difficulty: "hard", questions: 20, timeMin: 25, rating: 4.5, attempts: 680 },
  { id: "7", titleBn: "রমজান ও রোজার বিধান", titleEn: "Rules of Ramadan and Fasting", category: "fiqh", difficulty: "medium", questions: 15, timeMin: 20, rating: 4.7, attempts: 1320 },
  { id: "8", titleBn: "জান্নাত ও জাহান্নামের বর্ণনা", titleEn: "Description of Jannah & Jahannam", category: "aqeedah", difficulty: "easy", questions: 10, timeMin: 12, rating: 4.9, attempts: 1800 },
];

const diffColors = {
  easy: { badge: "success" as const, bn: "সহজ", en: "Easy" },
  medium: { badge: "warning" as const, bn: "মাঝারি", en: "Medium" },
  hard: { badge: "danger" as const, bn: "কঠিন", en: "Hard" },
};

export default function QuizPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, locale } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");

  useGSAP(() => {
    gsap.fromTo(".page-header", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
    gsap.fromTo(".quiz-card", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power2.out", delay: 0.2 });
  }, { scope: containerRef });

  const filtered = activeCategory === "all" ? QUIZZES : QUIZZES.filter(q => q.category === activeCategory);

  return (
    <div ref={containerRef} className="page-container py-8">
      {/* Page Header */}
      <div className="page-header mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className={`text-2xl font-bold text-[var(--text-primary)] ${locale === "bn" ? "font-bangla" : ""}`}>
              {t.quiz.title}
            </h1>
            <p className={`text-sm text-[var(--text-muted)] ${locale === "bn" ? "font-bangla" : ""}`}>
              {t.quiz.subtitle}
            </p>
          </div>
        </div>

        {/* Leaderboard link */}
        <Link href="/quiz/leaderboard" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-500/10 text-accent-600 dark:text-accent-400 text-sm font-semibold hover:bg-accent-500/20 transition-colors mt-4">
          <Trophy className="w-4 h-4" />
          <span className={locale === "bn" ? "font-bangla" : ""}>{t.quiz.leaderboard}</span>
        </Link>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeCategory === cat.id
                ? "bg-primary-700 text-white shadow-md"
                : "bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)] hover:border-primary-700/50"
            } ${locale === "bn" ? "font-bangla" : ""}`}
          >
            {locale === "bn" ? cat.bn : cat.en}
          </button>
        ))}
      </div>

      {/* Quiz Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((quiz) => {
          const diff = diffColors[quiz.difficulty as keyof typeof diffColors];
          const catLabel = CATEGORIES.find(c => c.id === quiz.category);
          return (
            <div key={quiz.id} className="quiz-card card p-5 flex flex-col gap-4 group hover:-translate-y-1 transition-all duration-200">
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={diff.badge}>
                      {locale === "bn" ? diff.bn : diff.en}
                    </Badge>
                    <Badge variant="muted" className={locale === "bn" ? "font-bangla" : ""}>
                      {locale === "bn" ? catLabel?.bn : catLabel?.en}
                    </Badge>
                  </div>
                  <h3 className={`font-bold text-[var(--text-primary)] leading-snug group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors ${locale === "bn" ? "font-bangla" : ""}`}>
                    {locale === "bn" ? quiz.titleBn : quiz.titleEn}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-[var(--bg)] rounded-xl py-2">
                  <div className={`text-sm font-bold text-[var(--text-primary)] ${locale === "bn" ? "font-bangla" : ""}`}>{quiz.questions}</div>
                  <div className={`text-[10px] text-[var(--text-muted)] ${locale === "bn" ? "font-bangla" : ""}`}>{t.quiz.questions}</div>
                </div>
                <div className="bg-[var(--bg)] rounded-xl py-2">
                  <div className={`text-sm font-bold text-[var(--text-primary)] ${locale === "bn" ? "font-bangla" : ""}`}>{quiz.timeMin}</div>
                  <div className={`text-[10px] text-[var(--text-muted)] ${locale === "bn" ? "font-bangla" : ""}`}>{t.quiz.minutes}</div>
                </div>
                <div className="bg-[var(--bg)] rounded-xl py-2">
                  <div className="flex items-center justify-center gap-0.5">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-bold text-[var(--text-primary)]">{quiz.rating}</span>
                  </div>
                  <div className={`text-[10px] text-[var(--text-muted)] ${locale === "bn" ? "font-bangla" : ""}`}>
                    {quiz.attempts.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Link
                href={`/quiz/${quiz.id}`}
                className="btn-primary w-full justify-center text-sm"
              >
                <Zap className="w-4 h-4" />
                <span className={locale === "bn" ? "font-bangla" : ""}>{t.quiz.start}</span>
                <ChevronRight className="w-4 h-4 ml-auto" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
