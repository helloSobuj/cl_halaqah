"use client";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Textarea } from "@/components/ui/Input";
import {
  ChevronLeft, ThumbsUp, ThumbsDown, CheckCircle2,
  MessageCircle, Share2, Bookmark, Clock, User,
} from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(useGSAP);

const QA_DATA: Record<string, {
  titleBn: string; titleEn: string;
  bodyBn: string; bodyEn: string;
  authorBn: string; authorEn: string;
  date: string; votes: number; views: number;
  tags: string[];
  answers: { id: string; authorBn: string; authorEn: string; date: string; votes: number; accepted: boolean; bodyBn: string; bodyEn: string }[];
}> = {
  "1": {
    titleBn: "ফজরের নামাজ কত রাকাত?",
    titleEn: "How many Rakats are there in Fajr prayer?",
    bodyBn: "আমি জানতে চাই ফজরের নামাজে মোট কত রাকাত পড়তে হয়? সুন্নত ও ফরজ মিলিয়ে বিস্তারিত জানাবেন।",
    bodyEn: "I want to know how many total Rakats are required in Fajr prayer? Please explain including Sunnah and Fard.",
    authorBn: "মুহাম্মদ আলী",
    authorEn: "Muhammad Ali",
    date: "2025-05-10",
    votes: 24,
    views: 892,
    tags: ["সালাত", "ফিকহ"],
    answers: [
      {
        id: "a1",
        authorBn: "শাইখ আহমেদ",
        authorEn: "Sheikh Ahmed",
        date: "2025-05-10",
        votes: 45,
        accepted: true,
        bodyBn: "ফজরের নামাজে মোট ৪ রাকাত পড়তে হয়:\n\n১. **২ রাকাত সুন্নতে মুয়াক্কাদা**: ফরজের আগে পড়তে হয়। এটি নবী করিম (সা.) নিয়মিত পড়তেন।\n\n২. **২ রাকাত ফরজ**: ইমামের সাথে জামাতে বা একা পড়া যায়।\n\nসুন্নত দুই রাকাত সংক্ষিপ্ত করে পড়া উত্তম। হাদিসে এসেছে: 'ফজরের দুই রাকাত সুন্নত দুনিয়া ও দুনিয়ার সবকিছু থেকে উত্তম।' (মুসলিম)",
        bodyEn: "Fajr prayer consists of 4 Rakats total:\n\n1. **2 Rakats Sunnah Muakkadah**: To be prayed before Fard. The Prophet (PBUH) regularly prayed these.\n\n2. **2 Rakats Fard**: Can be prayed in congregation with an Imam or alone.\n\nIt is recommended to keep the Sunnah 2 Rakats brief. The Hadith states: 'The two Rakats of Fajr Sunnah are better than the world and everything in it.' (Muslim)",
      },
      {
        id: "a2",
        authorBn: "আব্দুর রহমান",
        authorEn: "Abdur Rahman",
        date: "2025-05-11",
        votes: 12,
        accepted: false,
        bodyBn: "শাইখ আহমেদের উত্তর সঠিক। আরও যোগ করতে চাই যে, ফজরের ওয়াক্ত সুবহে সাদিক থেকে সূর্যোদয়ের আগ পর্যন্ত।",
        bodyEn: "Sheikh Ahmed's answer is correct. I would add that the time for Fajr prayer is from dawn (Subh Sadiq) until just before sunrise.",
      },
    ],
  },
};

export default function QADetailPage({ params }: { params: { id: string } }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { locale } = useTranslation();
  const qa = QA_DATA[params.id] ?? QA_DATA["1"];
  const [answer, setAnswer] = useState("");
  const [userVotes, setUserVotes] = useState<Record<string, 1 | -1 | 0>>({});

  useGSAP(() => {
    gsap.fromTo(".qa-section", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="page-container py-8 max-w-3xl mx-auto">
      <Link href="/qa" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] mb-6 transition-colors">
        <ChevronLeft className="w-4 h-4" />
        <span className={locale === "bn" ? "font-bangla" : ""}>{locale === "bn" ? "প্রশ্ন-উত্তর" : "Q&A"}</span>
      </Link>

      {/* Question */}
      <div className="qa-section card p-6 mb-6">
        <h1 className={`text-xl font-bold text-[var(--text-primary)] mb-4 leading-snug ${locale === "bn" ? "font-bangla" : ""}`}>
          {locale === "bn" ? qa.titleBn : qa.titleEn}
        </h1>

        <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-[var(--text-muted)]">
          <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{locale === "bn" ? qa.authorBn : qa.authorEn}</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{new Date(qa.date).toLocaleDateString(locale === "bn" ? "bn-BD" : "en-US")}</span>
          <span className={locale === "bn" ? "font-bangla" : ""}>{qa.views.toLocaleString()} {locale === "bn" ? "ভিউ" : "views"}</span>
        </div>

        <div className="flex gap-2 mb-4">
          {qa.tags.map((tag) => (
            <Badge key={tag} variant="primary" className={locale === "bn" ? "font-bangla" : ""}>{tag}</Badge>
          ))}
        </div>

        <p className={`text-[var(--text-secondary)] leading-relaxed whitespace-pre-line ${locale === "bn" ? "font-bangla" : ""}`}>
          {locale === "bn" ? qa.bodyBn : qa.bodyEn}
        </p>

        <div className="flex items-center gap-3 mt-5 pt-4 border-t border-[var(--border)]">
          <div className="flex items-center gap-1.5">
            <button className="p-1.5 rounded-lg hover:bg-[var(--border)] transition-colors">
              <ThumbsUp className="w-4 h-4 text-[var(--text-muted)]" />
            </button>
            <span className="text-sm font-semibold text-[var(--text-secondary)]">{qa.votes}</span>
            <button className="p-1.5 rounded-lg hover:bg-[var(--border)] transition-colors">
              <ThumbsDown className="w-4 h-4 text-[var(--text-muted)]" />
            </button>
          </div>
          <button className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
            <Bookmark className="w-4 h-4" />
            <span className={locale === "bn" ? "font-bangla" : ""}>{locale === "bn" ? "সেভ" : "Save"}</span>
          </button>
          <button className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
            <Share2 className="w-4 h-4" />
            <span className={locale === "bn" ? "font-bangla" : ""}>{locale === "bn" ? "শেয়ার" : "Share"}</span>
          </button>
        </div>
      </div>

      {/* Answers */}
      <h2 className={`text-base font-bold text-[var(--text-primary)] mb-4 qa-section flex items-center gap-2 ${locale === "bn" ? "font-bangla" : ""}`}>
        <MessageCircle className="w-4 h-4 text-primary-700 dark:text-primary-400" />
        {qa.answers.length} {locale === "bn" ? "টি উত্তর" : "Answers"}
      </h2>

      <div className="space-y-4 mb-8">
        {qa.answers.map((ans) => (
          <div key={ans.id} className={`qa-section card p-5 ${ans.accepted ? "border-emerald-300 dark:border-emerald-700" : ""}`}>
            {ans.accepted && (
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-3">
                <CheckCircle2 className="w-4 h-4" />
                <span className={locale === "bn" ? "font-bangla" : ""}>{locale === "bn" ? "গ্রহণযোগ্য উত্তর" : "Accepted Answer"}</span>
              </div>
            )}

            <div className="flex items-center gap-2 mb-3 text-xs text-[var(--text-muted)]">
              <div className="w-7 h-7 rounded-full bg-primary-700/20 flex items-center justify-center text-primary-700 dark:text-primary-400 font-bold text-sm">
                {(locale === "bn" ? ans.authorBn : ans.authorEn).charAt(0)}
              </div>
              <span className="font-semibold text-[var(--text-secondary)]">{locale === "bn" ? ans.authorBn : ans.authorEn}</span>
              <span>·</span>
              <span>{new Date(ans.date).toLocaleDateString(locale === "bn" ? "bn-BD" : "en-US")}</span>
            </div>

            <p className={`text-[var(--text-secondary)] leading-relaxed whitespace-pre-line text-sm ${locale === "bn" ? "font-bangla" : ""}`}>
              {locale === "bn" ? ans.bodyBn : ans.bodyEn}
            </p>

            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[var(--border)]">
              <button className="p-1.5 rounded-lg hover:bg-[var(--border)] transition-colors">
                <ThumbsUp className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              </button>
              <span className="text-sm font-semibold text-[var(--text-secondary)]">{ans.votes}</span>
              <button className="p-1.5 rounded-lg hover:bg-[var(--border)] transition-colors">
                <ThumbsDown className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Answer Form */}
      <div className="qa-section card p-5">
        <h3 className={`font-bold text-[var(--text-primary)] mb-4 ${locale === "bn" ? "font-bangla" : ""}`}>
          {locale === "bn" ? "আপনার উত্তর লিখুন" : "Your Answer"}
        </h3>
        <Textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={6}
          placeholder={locale === "bn" ? "আপনার উত্তর এখানে লিখুন... দলিল সহ উত্তর দিন।" : "Write your answer here... Include references if possible."}
          className={`mb-4 ${locale === "bn" ? "font-bangla" : ""}`}
        />
        <Button className={locale === "bn" ? "font-bangla" : ""} disabled={!answer.trim()}>
          {locale === "bn" ? "উত্তর পোস্ট করুন" : "Post Answer"}
        </Button>
      </div>
    </div>
  );
}
