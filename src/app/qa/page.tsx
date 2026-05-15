"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "@/hooks/useTranslation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  BookOpen, MessageCircle, Eye, ThumbsUp, CheckCircle,
  Search, PlusCircle, TrendingUp, Clock, Filter,
} from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

const TAGS = [
  { bn: "নামাজ", en: "Salah" }, { bn: "রোজা", en: "Fasting" },
  { bn: "হালাল-হারাম", en: "Halal/Haram" }, { bn: "বিবাহ", en: "Marriage" },
  { bn: "ব্যবসা", en: "Business" }, { bn: "পরিবার", en: "Family" },
  { bn: "আকিদা", en: "Aqeedah" }, { bn: "দোয়া", en: "Dua" },
];

const QUESTIONS = [
  {
    id: "1", titleBn: "নামাজে ভুলে গেলে সিজদায়ে সাহু কীভাবে আদায় করতে হয়?",
    titleEn: "How to perform Sujood al-Sahw when forgetting in prayer?",
    answers: 5, views: 342, votes: 28, tags: ["Salah"], accepted: true,
    authorBn: "আব্দুর রহমান", authorEn: "Abdur Rahman",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "2", titleBn: "ক্রিপ্টোকারেন্সিতে বিনিয়োগ কি ইসলামে হালাল?",
    titleEn: "Is investing in cryptocurrency halal in Islam?",
    answers: 12, views: 1240, votes: 67, tags: ["Business", "Halal/Haram"], accepted: false,
    authorBn: "মুহাম্মদ আলী", authorEn: "Muhammad Ali",
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
  {
    id: "3", titleBn: "স্ত্রীর মহরানা কত হওয়া উচিত এবং কি কি হতে পারে?",
    titleEn: "How much should Mahr be and what can it consist of?",
    answers: 8, views: 567, votes: 45, tags: ["Marriage"], accepted: true,
    authorBn: "ফাতিমা বেগম", authorEn: "Fatima Begum",
    createdAt: new Date(Date.now() - 5 * 3600000).toISOString(),
  },
  {
    id: "4", titleBn: "তারাবীহ নামাজ কত রাকাত পড়া উত্তম?",
    titleEn: "How many rakats of Taraweeh is best to pray?",
    answers: 3, views: 890, votes: 34, tags: ["Salah"], accepted: false,
    authorBn: "আব্দুল কারিম", authorEn: "Abdul Karim",
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
  },
  {
    id: "5", titleBn: "পশু জবাই করার সময় বিসমিল্লাহ না বলা হলে কি হয়?",
    titleEn: "What happens if Bismillah is not said when slaughtering?",
    answers: 6, views: 421, votes: 29, tags: ["Halal/Haram"], accepted: true,
    authorBn: "ইউসুফ আহমেদ", authorEn: "Yusuf Ahmed",
    createdAt: new Date(Date.now() - 2 * 24 * 3600000).toISOString(),
  },
];

type SortType = "newest" | "votes" | "unanswered";

export default function QAPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, locale } = useTranslation();
  const [sort, setSort] = useState<SortType>("newest");
  const [search, setSearch] = useState("");

  useGSAP(() => {
    gsap.fromTo(".qa-item", { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.07, ease: "power2.out" });
  }, { scope: containerRef });

  const sorted = [...QUESTIONS].sort((a, b) => {
    if (sort === "votes") return b.votes - a.votes;
    if (sort === "unanswered") return a.answers - b.answers;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const filtered = sorted.filter(q => {
    const text = locale === "bn" ? q.titleBn : q.titleEn;
    return text.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div ref={containerRef} className="page-container py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className={`text-2xl font-bold text-[var(--text-primary)] ${locale === "bn" ? "font-bangla" : ""}`}>
              {t.qa.title}
            </h1>
            <p className={`text-sm text-[var(--text-muted)] ${locale === "bn" ? "font-bangla" : ""}`}>
              {t.qa.subtitle}
            </p>
          </div>
        </div>
        <Link href="/qa/ask">
          <Button variant="primary" className="shrink-0">
            <PlusCircle className="w-4 h-4" />
            <span className={locale === "bn" ? "font-bangla" : ""}>{t.qa.askQuestion}</span>
          </Button>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Search & Sort */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="flex-1">
              <Input
                placeholder={t.common.search}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon={<Search className="w-4 h-4" />}
                className={locale === "bn" ? "font-bangla" : ""}
              />
            </div>
            <div className="flex gap-2">
              {(["newest", "votes", "unanswered"] as SortType[]).map((s) => {
                const labels = {
                  newest: { bn: "নতুন", en: "Newest" },
                  votes: { bn: "ভোট", en: "Votes" },
                  unanswered: { bn: "অনুত্তরিত", en: "Unanswered" },
                };
                return (
                  <button
                    key={s}
                    onClick={() => setSort(s)}
                    className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                      sort === s
                        ? "bg-primary-700 text-white"
                        : "bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)]"
                    } ${locale === "bn" ? "font-bangla" : ""}`}
                  >
                    {locale === "bn" ? labels[s].bn : labels[s].en}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-3">
            {filtered.map((q) => (
              <Link key={q.id} href={`/qa/${q.id}`} className="qa-item card block p-4 group hover:-translate-y-0.5 transition-all">
                <div className="flex items-start gap-4">
                  {/* Vote & Answer counts */}
                  <div className="hidden sm:flex flex-col items-center gap-3 text-center min-w-[60px]">
                    <div className={`text-sm ${q.votes > 20 ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-[var(--text-muted)]"}`}>
                      <div className="font-bold text-base">{q.votes}</div>
                      <div className="text-xs">{locale === "bn" ? "ভোট" : "votes"}</div>
                    </div>
                    <div className={`px-2 py-1 rounded-lg text-xs font-bold ${
                      q.accepted
                        ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                        : q.answers > 0
                        ? "bg-[var(--border)] text-[var(--text-secondary)]"
                        : "border border-[var(--border)] text-[var(--text-muted)]"
                    }`}>
                      <div>{q.answers}</div>
                      <div>{locale === "bn" ? "উত্তর" : "ans"}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      {q.accepted && (
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      )}
                      <h3 className={`font-semibold text-[var(--text-primary)] group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors leading-snug ${locale === "bn" ? "font-bangla" : ""}`}>
                        {locale === "bn" ? q.titleBn : q.titleEn}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {q.tags.map((tag) => (
                        <Badge key={tag} variant="primary" className="text-[10px]">{tag}</Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {q.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1 sm:hidden">
                        <ThumbsUp className="w-3 h-3" />
                        {q.votes}
                      </span>
                      <span className="flex items-center gap-1 sm:hidden">
                        <MessageCircle className="w-3 h-3" />
                        {q.answers}
                      </span>
                      <span>
                        {locale === "bn" ? q.authorBn : q.authorEn}
                        {" · "}
                        {formatRelativeTime(q.createdAt, locale)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Sidebar: Popular Tags */}
        <aside className="lg:w-56 shrink-0">
          <div className="card p-4 sticky top-24">
            <h3 className={`font-bold text-[var(--text-primary)] mb-4 text-sm ${locale === "bn" ? "font-bangla" : ""}`}>
              {locale === "bn" ? "জনপ্রিয় ট্যাগ" : "Popular Tags"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <button
                  key={tag.en}
                  className={`badge badge-primary hover:opacity-80 cursor-pointer transition-opacity ${locale === "bn" ? "font-bangla" : ""}`}
                >
                  {locale === "bn" ? tag.bn : tag.en}
                </button>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border)]">
              <h3 className={`font-bold text-[var(--text-primary)] mb-3 text-sm ${locale === "bn" ? "font-bangla" : ""}`}>
                {locale === "bn" ? "পরিসংখ্যান" : "Statistics"}
              </h3>
              {[
                { bn: "মোট প্রশ্ন", en: "Total Questions", value: "৫৪২" },
                { bn: "উত্তরিত", en: "Answered", value: "৪৮৭" },
                { bn: "অনুত্তরিত", en: "Unanswered", value: "৫৫" },
              ].map((stat) => (
                <div key={stat.en} className="flex justify-between items-center py-1.5 text-sm">
                  <span className={`text-[var(--text-muted)] ${locale === "bn" ? "font-bangla" : ""}`}>
                    {locale === "bn" ? stat.bn : stat.en}
                  </span>
                  <span className={`font-bold text-[var(--text-primary)] ${locale === "bn" ? "font-bangla" : ""}`}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
