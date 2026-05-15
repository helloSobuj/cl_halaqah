"use client";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { ChevronLeft, X, HelpCircle, Lightbulb } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(useGSAP);

const SUGGESTED_TAGS = [
  { bn: "কুরআন", en: "Quran" },
  { bn: "হাদিস", en: "Hadith" },
  { bn: "ফিকহ", en: "Fiqh" },
  { bn: "আকিদা", en: "Aqeedah" },
  { bn: "সালাত", en: "Salat" },
  { bn: "রোজা", en: "Fasting" },
  { bn: "যাকাত", en: "Zakat" },
  { bn: "হজ", en: "Hajj" },
  { bn: "পারিবারিক", en: "Family" },
  { bn: "ইতিহাস", en: "History" },
];

export default function AskQuestionPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { locale } = useTranslation();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  useGSAP(() => {
    gsap.fromTo(".ask-section", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" });
  }, { scope: containerRef });

  function addTag(tag: string) {
    const t = tag.trim();
    if (t && !tags.includes(t) && tags.length < 5) {
      setTags([...tags, t]);
      setTagInput("");
    }
  }

  function removeTag(tag: string) {
    setTags(tags.filter((t) => t !== tag));
  }

  return (
    <div ref={containerRef} className="page-container py-8 max-w-3xl mx-auto">
      <Link href="/qa" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] mb-6 transition-colors">
        <ChevronLeft className="w-4 h-4" />
        <span className={locale === "bn" ? "font-bangla" : ""}>{locale === "bn" ? "প্রশ্ন-উত্তর" : "Q&A"}</span>
      </Link>

      <div className="flex items-center gap-3 mb-8 ask-section">
        <div className="w-10 h-10 rounded-2xl bg-primary-700 flex items-center justify-center">
          <HelpCircle className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className={`text-2xl font-bold text-[var(--text-primary)] ${locale === "bn" ? "font-bangla" : ""}`}>
            {locale === "bn" ? "প্রশ্ন করুন" : "Ask a Question"}
          </h1>
          <p className={`text-sm text-[var(--text-muted)] ${locale === "bn" ? "font-bangla" : ""}`}>
            {locale === "bn" ? "আপনার ইসলামিক প্রশ্নটি বিস্তারিত লিখুন" : "Write your Islamic question in detail"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* Title */}
          <div className="ask-section card p-5">
            <label className={`block text-sm font-bold text-[var(--text-primary)] mb-1 ${locale === "bn" ? "font-bangla" : ""}`}>
              {locale === "bn" ? "প্রশ্নের শিরোনাম" : "Question Title"}
            </label>
            <p className={`text-xs text-[var(--text-muted)] mb-3 ${locale === "bn" ? "font-bangla" : ""}`}>
              {locale === "bn" ? "সংক্ষেপে ও স্পষ্টভাবে প্রশ্নটি লিখুন" : "Be specific and clear with your question title"}
            </p>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={locale === "bn" ? "যেমন: নামাজে কোন সূরা পড়া বাধ্যতামূলক?" : "e.g. Which Surah is mandatory in prayer?"}
              className={locale === "bn" ? "font-bangla" : ""}
            />
          </div>

          {/* Body */}
          <div className="ask-section card p-5">
            <label className={`block text-sm font-bold text-[var(--text-primary)] mb-1 ${locale === "bn" ? "font-bangla" : ""}`}>
              {locale === "bn" ? "বিস্তারিত বর্ণনা" : "Detailed Description"}
            </label>
            <p className={`text-xs text-[var(--text-muted)] mb-3 ${locale === "bn" ? "font-bangla" : ""}`}>
              {locale === "bn" ? "প্রশ্নের পটভূমি, আপনি কী চেষ্টা করেছেন এবং আপনি কী জানতে চান তা লিখুন" : "Include context, what you've researched, and what specifically you want to know"}
            </p>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={8}
              placeholder={locale === "bn" ? "আপনার প্রশ্নের বিস্তারিত এখানে লিখুন..." : "Write the details of your question here..."}
              className={locale === "bn" ? "font-bangla" : ""}
            />
          </div>

          {/* Tags */}
          <div className="ask-section card p-5">
            <label className={`block text-sm font-bold text-[var(--text-primary)] mb-1 ${locale === "bn" ? "font-bangla" : ""}`}>
              {locale === "bn" ? "ট্যাগ" : "Tags"}
            </label>
            <p className={`text-xs text-[var(--text-muted)] mb-3 ${locale === "bn" ? "font-bangla" : ""}`}>
              {locale === "bn" ? "সর্বোচ্চ ৫টি ট্যাগ যোগ করুন" : "Add up to 5 tags"}
            </p>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-primary-700/10 text-primary-700 dark:text-primary-400 rounded-full text-sm font-medium">
                    {tag}
                    <button onClick={() => removeTag(tag)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(tagInput); } }}
              placeholder={locale === "bn" ? "ট্যাগ লিখুন এবং Enter চাপুন" : "Type a tag and press Enter"}
              className={locale === "bn" ? "font-bangla" : ""}
              disabled={tags.length >= 5}
            />

            <div className="flex flex-wrap gap-2 mt-3">
              {SUGGESTED_TAGS.filter((t) => !tags.includes(locale === "bn" ? t.bn : t.en)).slice(0, 6).map((tag) => (
                <button
                  key={tag.en}
                  onClick={() => addTag(locale === "bn" ? tag.bn : tag.en)}
                  className="px-2.5 py-1 text-xs rounded-full border border-[var(--border)] text-[var(--text-muted)] hover:border-primary-500 hover:text-primary-700 transition-colors"
                >
                  {locale === "bn" ? tag.bn : tag.en}
                </button>
              ))}
            </div>
          </div>

          <div className="ask-section flex gap-3">
            <Button
              className={`flex-1 ${locale === "bn" ? "font-bangla" : ""}`}
              disabled={!title.trim() || !body.trim()}
            >
              {locale === "bn" ? "প্রশ্ন প্রকাশ করুন" : "Post Question"}
            </Button>
            <Link href="/qa">
              <Button variant="ghost" className={locale === "bn" ? "font-bangla" : ""}>
                {locale === "bn" ? "বাতিল" : "Cancel"}
              </Button>
            </Link>
          </div>
        </div>

        {/* Tips Sidebar */}
        <div className="space-y-4">
          <div className="ask-section card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <h3 className={`font-bold text-sm text-[var(--text-primary)] ${locale === "bn" ? "font-bangla" : ""}`}>
                {locale === "bn" ? "ভালো প্রশ্নের টিপস" : "Tips for a Good Question"}
              </h3>
            </div>
            <ul className={`space-y-2 text-xs text-[var(--text-muted)] ${locale === "bn" ? "font-bangla" : ""}`}>
              {(locale === "bn" ? [
                "স্পষ্ট ও সংক্ষিপ্ত শিরোনাম লিখুন",
                "প্রশ্নের পটভূমি বর্ণনা করুন",
                "আপনি আগে কী অনুসন্ধান করেছেন তা উল্লেখ করুন",
                "প্রাসঙ্গিক ট্যাগ যোগ করুন",
                "বিনয়ী ভাষা ব্যবহার করুন",
              ] : [
                "Write a clear and specific title",
                "Describe the context of your question",
                "Mention what you've already researched",
                "Add relevant tags",
                "Use respectful language",
              ]).map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary-700 dark:text-primary-400 font-bold mt-0.5">{i + 1}.</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="ask-section card p-4">
            <h3 className={`font-bold text-sm text-[var(--text-primary)] mb-3 ${locale === "bn" ? "font-bangla" : ""}`}>
              {locale === "bn" ? "প্রশ্নের নিয়মাবলী" : "Community Guidelines"}
            </h3>
            <ul className={`space-y-1.5 text-xs text-[var(--text-muted)] ${locale === "bn" ? "font-bangla" : ""}`}>
              {(locale === "bn" ? [
                "ইসলামিক আদব মেনে প্রশ্ন করুন",
                "বিতর্কিত বিষয় এড়িয়ে চলুন",
                "সহজ বাংলা বা ইংরেজি ব্যবহার করুন",
              ] : [
                "Ask with Islamic etiquette",
                "Avoid controversial topics",
                "Use simple clear language",
              ]).map((rule, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500">✓</span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
