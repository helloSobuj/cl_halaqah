"use client";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, XCircle, Clock, Trophy, ArrowRight, RotateCcw, ChevronLeft } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(useGSAP);

const QUIZ_DATA: Record<string, {
  titleBn: string; titleEn: string;
  descBn: string; descEn: string;
  difficulty: "easy" | "medium" | "hard";
  timeLimit: number;
  questions: { questionBn: string; questionEn: string; options: { bn: string; en: string }[]; correct: number; explanationBn: string; explanationEn: string }[];
}> = {
  "1": {
    titleBn: "কুরআনের সূরা পরিচিতি",
    titleEn: "Introduction to Surahs",
    descBn: "কুরআনের সূরা সম্পর্কে আপনার জ্ঞান যাচাই করুন",
    descEn: "Test your knowledge about Quranic Surahs",
    difficulty: "easy",
    timeLimit: 600,
    questions: [
      {
        questionBn: "কুরআনে মোট কতটি সূরা আছে?",
        questionEn: "How many Surahs are there in the Quran?",
        options: [{ bn: "১০৮", en: "108" }, { bn: "১১৪", en: "114" }, { bn: "১২০", en: "120" }, { bn: "৯৯", en: "99" }],
        correct: 1,
        explanationBn: "পবিত্র কুরআনে মোট ১১৪টি সূরা আছে।",
        explanationEn: "The Holy Quran contains 114 Surahs in total.",
      },
      {
        questionBn: "কুরআনের প্রথম সূরার নাম কী?",
        questionEn: "What is the name of the first Surah of the Quran?",
        options: [{ bn: "সূরা বাকারা", en: "Surah Baqarah" }, { bn: "সূরা ইখলাস", en: "Surah Ikhlas" }, { bn: "সূরা ফাতিহা", en: "Surah Fatiha" }, { bn: "সূরা নাস", en: "Surah Nas" }],
        correct: 2,
        explanationBn: "সূরা আল-ফাতিহা কুরআনের প্রথম সূরা। এটিকে 'উম্মুল কিতাব'ও বলা হয়।",
        explanationEn: "Surah Al-Fatiha is the first Surah of the Quran. It is also called 'Ummul Kitab'.",
      },
      {
        questionBn: "কুরআনের সবচেয়ে বড় সূরা কোনটি?",
        questionEn: "Which is the longest Surah in the Quran?",
        options: [{ bn: "সূরা আলে ইমরান", en: "Surah Ale Imran" }, { bn: "সূরা বাকারা", en: "Surah Baqarah" }, { bn: "সূরা নিসা", en: "Surah Nisa" }, { bn: "সূরা মায়িদা", en: "Surah Maidah" }],
        correct: 1,
        explanationBn: "সূরা আল-বাকারা কুরআনের সবচেয়ে বড় সূরা। এতে ২৮৬টি আয়াত আছে।",
        explanationEn: "Surah Al-Baqarah is the longest Surah in the Quran with 286 verses.",
      },
      {
        questionBn: "কুরআনের সবচেয়ে ছোট সূরা কোনটি?",
        questionEn: "Which is the shortest Surah in the Quran?",
        options: [{ bn: "সূরা কাউসার", en: "Surah Kawthar" }, { bn: "সূরা ফাতিহা", en: "Surah Fatiha" }, { bn: "সূরা ইখলাস", en: "Surah Ikhlas" }, { bn: "সূরা নাস", en: "Surah Nas" }],
        correct: 0,
        explanationBn: "সূরা আল-কাউসার কুরআনের সবচেয়ে ছোট সূরা। এতে মাত্র ৩টি আয়াত আছে।",
        explanationEn: "Surah Al-Kawthar is the shortest Surah in the Quran with only 3 verses.",
      },
      {
        questionBn: "কুরআনে কতটি পারা (জুজ) আছে?",
        questionEn: "How many Juz (parts) are there in the Quran?",
        options: [{ bn: "২৫", en: "25" }, { bn: "৩০", en: "30" }, { bn: "২৮", en: "28" }, { bn: "৩২", en: "32" }],
        correct: 1,
        explanationBn: "পবিত্র কুরআন ৩০টি পারায় বিভক্ত।",
        explanationEn: "The Holy Quran is divided into 30 Juz (parts).",
      },
    ],
  },
};

type Phase = "intro" | "quiz" | "result";

export default function QuizDetailPage({ params }: { params: { id: string } }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, locale } = useTranslation();
  const quiz = QUIZ_DATA[params.id] ?? QUIZ_DATA["1"];

  const [phase, setPhase] = useState<Phase>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  useGSAP(() => {
    gsap.fromTo(".quiz-card", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
  }, { scope: containerRef, dependencies: [phase, currentQ] });

  const question = quiz.questions[currentQ];
  const total = quiz.questions.length;

  function handleSelect(idx: number) {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === question.correct) setScore((s) => s + 1);
    setAnswers((a) => { const n = [...a]; n[currentQ] = idx; return n; });
  }

  function handleNext() {
    if (currentQ + 1 < total) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setPhase("result");
    }
  }

  function handleRestart() {
    setPhase("intro");
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setAnswers([]);
  }

  const pct = Math.round((score / total) * 100);

  return (
    <div ref={containerRef} className="page-container py-8 max-w-2xl mx-auto">
      <Link href="/quiz" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] mb-6 transition-colors">
        <ChevronLeft className="w-4 h-4" />
        <span className={locale === "bn" ? "font-bangla" : ""}>{locale === "bn" ? "সব কুইজ" : "All Quizzes"}</span>
      </Link>

      {/* INTRO */}
      {phase === "intro" && (
        <div className="quiz-card card p-8 text-center">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
            quiz.difficulty === "easy" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
            quiz.difficulty === "medium" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
            "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          }`}>
            {locale === "bn"
              ? quiz.difficulty === "easy" ? "সহজ" : quiz.difficulty === "medium" ? "মাঝারি" : "কঠিন"
              : quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
          </div>
          <h1 className={`text-2xl font-bold text-[var(--text-primary)] mb-2 ${locale === "bn" ? "font-bangla" : ""}`}>
            {locale === "bn" ? quiz.titleBn : quiz.titleEn}
          </h1>
          <p className={`text-[var(--text-muted)] mb-8 ${locale === "bn" ? "font-bangla" : ""}`}>
            {locale === "bn" ? quiz.descBn : quiz.descEn}
          </p>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: locale === "bn" ? "প্রশ্ন" : "Questions", value: total },
              { label: locale === "bn" ? "সময়" : "Time", value: `${quiz.timeLimit / 60}m` },
              { label: locale === "bn" ? "পয়েন্ট" : "Points", value: total * 10 },
            ].map((item) => (
              <div key={item.label} className="bg-[var(--bg)] rounded-xl p-4">
                <div className="text-2xl font-bold text-[var(--text-primary)]">{item.value}</div>
                <div className={`text-xs text-[var(--text-muted)] mt-1 ${locale === "bn" ? "font-bangla" : ""}`}>{item.label}</div>
              </div>
            ))}
          </div>
          <Button onClick={() => setPhase("quiz")} className={`w-full ${locale === "bn" ? "font-bangla" : ""}`}>
            <ArrowRight className="w-4 h-4" />
            {locale === "bn" ? "কুইজ শুরু করুন" : "Start Quiz"}
          </Button>
        </div>
      )}

      {/* QUIZ */}
      {phase === "quiz" && (
        <div className="quiz-card space-y-4">
          {/* Progress */}
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-semibold text-[var(--text-secondary)] ${locale === "bn" ? "font-bangla" : ""}`}>
              {locale === "bn" ? `প্রশ্ন ${currentQ + 1} / ${total}` : `Question ${currentQ + 1} / ${total}`}
            </span>
            <div className="flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
              <Clock className="w-4 h-4" />
              <span className={locale === "bn" ? "font-bangla" : ""}>{locale === "bn" ? "সীমিত সময়" : "Timed"}</span>
            </div>
          </div>
          <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-700 rounded-full transition-all duration-500"
              style={{ width: `${((currentQ) / total) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <div className="card p-6">
            <p className={`text-lg font-semibold text-[var(--text-primary)] mb-6 leading-relaxed ${locale === "bn" ? "font-bangla" : ""}`}>
              {locale === "bn" ? question.questionBn : question.questionEn}
            </p>
            <div className="space-y-3">
              {question.options.map((opt, idx) => {
                let cls = "w-full text-left px-4 py-3.5 rounded-xl border-2 font-medium transition-all duration-200 ";
                if (!answered) {
                  cls += "border-[var(--border)] hover:border-primary-500 hover:bg-[var(--bg)] text-[var(--text-primary)]";
                } else if (idx === question.correct) {
                  cls += "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300";
                } else if (idx === selected && idx !== question.correct) {
                  cls += "border-red-400 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300";
                } else {
                  cls += "border-[var(--border)] text-[var(--text-muted)] opacity-60";
                }
                return (
                  <button key={idx} onClick={() => handleSelect(idx)} className={`${cls} ${locale === "bn" ? "font-bangla" : ""}`}>
                    <span className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {locale === "bn" ? opt.bn : opt.en}
                      {answered && idx === question.correct && <CheckCircle2 className="w-4 h-4 ml-auto text-emerald-500" />}
                      {answered && idx === selected && idx !== question.correct && <XCircle className="w-4 h-4 ml-auto text-red-500" />}
                    </span>
                  </button>
                );
              })}
            </div>

            {answered && (
              <div className={`mt-4 p-4 rounded-xl ${selected === question.correct ? "bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800" : "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"}`}>
                <p className={`text-sm leading-relaxed ${selected === question.correct ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"} ${locale === "bn" ? "font-bangla" : ""}`}>
                  {locale === "bn" ? question.explanationBn : question.explanationEn}
                </p>
              </div>
            )}
          </div>

          {answered && (
            <Button onClick={handleNext} className={`w-full ${locale === "bn" ? "font-bangla" : ""}`}>
              {currentQ + 1 < total
                ? (locale === "bn" ? "পরবর্তী প্রশ্ন" : "Next Question")
                : (locale === "bn" ? "ফলাফল দেখুন" : "See Results")}
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      )}

      {/* RESULT */}
      {phase === "result" && (
        <div className="quiz-card card p-8 text-center">
          <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
            pct >= 80 ? "bg-emerald-100 dark:bg-emerald-900/30" : pct >= 60 ? "bg-amber-100 dark:bg-amber-900/30" : "bg-red-100 dark:bg-red-900/30"
          }`}>
            <Trophy className={`w-10 h-10 ${pct >= 80 ? "text-emerald-600 dark:text-emerald-400" : pct >= 60 ? "text-amber-600 dark:text-amber-400" : "text-red-500"}`} />
          </div>
          <h2 className={`text-2xl font-bold text-[var(--text-primary)] mb-1 ${locale === "bn" ? "font-bangla" : ""}`}>
            {pct >= 80
              ? (locale === "bn" ? "চমৎকার!" : "Excellent!")
              : pct >= 60
              ? (locale === "bn" ? "ভালো করেছেন!" : "Good Job!")
              : (locale === "bn" ? "আরও অনুশীলন করুন" : "Keep Practicing")}
          </h2>
          <p className={`text-[var(--text-muted)] mb-6 ${locale === "bn" ? "font-bangla" : ""}`}>
            {locale === "bn"
              ? `আপনি ${total}টির মধ্যে ${score}টি সঠিক উত্তর দিয়েছেন`
              : `You answered ${score} out of ${total} correctly`}
          </p>
          <div className={`text-5xl font-bold mb-8 ${pct >= 80 ? "text-emerald-600 dark:text-emerald-400" : pct >= 60 ? "text-amber-600 dark:text-amber-400" : "text-red-500"}`}>
            {pct}%
          </div>

          {/* Answer Review */}
          <div className="text-left space-y-2 mb-8">
            {quiz.questions.map((q, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${answers[i] === q.correct ? "bg-emerald-50 dark:bg-emerald-900/20" : "bg-red-50 dark:bg-red-900/20"}`}>
                {answers[i] === q.correct
                  ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  : <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />}
                <p className={`text-sm text-[var(--text-secondary)] ${locale === "bn" ? "font-bangla" : ""}`}>
                  {locale === "bn" ? q.questionBn : q.questionEn}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Button variant="ghost" onClick={handleRestart} className={`flex-1 ${locale === "bn" ? "font-bangla" : ""}`}>
              <RotateCcw className="w-4 h-4" />
              {locale === "bn" ? "আবার চেষ্টা করুন" : "Try Again"}
            </Button>
            <Link href="/quiz" className="flex-1">
              <Button className={`w-full ${locale === "bn" ? "font-bangla" : ""}`}>
                {locale === "bn" ? "সব কুইজ" : "All Quizzes"}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
