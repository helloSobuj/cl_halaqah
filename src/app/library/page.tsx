"use client";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "@/hooks/useTranslation";
import { Library, Search, BookOpen, Download, ExternalLink, User, Tag } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

gsap.registerPlugin(useGSAP);

const CATEGORIES = [
  { id: "all", bn: "সব", en: "All" },
  { id: "tafseer", bn: "তাফসীর", en: "Tafseer" },
  { id: "hadith", bn: "হাদিস", en: "Hadith" },
  { id: "fiqh", bn: "ফিকহ", en: "Fiqh" },
  { id: "aqeedah", bn: "আকিদা", en: "Aqeedah" },
  { id: "seerah", bn: "সিরাহ", en: "Seerah" },
  { id: "general", bn: "সাধারণ", en: "General" },
];

const BOOKS = [
  { id: "1", titleBn: "তাফসীর ইবনে কাসীর", titleEn: "Tafsir Ibn Kathir", authorBn: "ইমাম ইবনে কাসীর", authorEn: "Imam Ibn Kathir", category: "tafseer", pages: 1200, year: 1370, lang: "Arabic", gradient: "from-emerald-500 to-teal-600", url: "https://example.com/book1" },
  { id: "2", titleBn: "রিয়াদুস সালেহীন", titleEn: "Riyad as-Salihin", authorBn: "ইমাম নববী", authorEn: "Imam Nawawi", category: "hadith", pages: 840, year: 1234, lang: "Arabic", gradient: "from-blue-500 to-indigo-600", url: "https://example.com/book2" },
  { id: "3", titleBn: "ফাতাওয়া আলামগিরি", titleEn: "Fatawa Alamgiri", authorBn: "আলামগির", authorEn: "Alamgir", category: "fiqh", pages: 2000, year: 1669, lang: "Arabic", gradient: "from-amber-500 to-orange-600", url: "https://example.com/book3" },
  { id: "4", titleBn: "কিতাবুত তাওহীদ", titleEn: "Kitab at-Tawhid", authorBn: "শাইখ মুহাম্মদ বিন আব্দুল ওয়াহহাব", authorEn: "Sheikh Muhammad ibn Abdul-Wahhab", category: "aqeedah", pages: 320, year: 1740, lang: "Arabic", gradient: "from-purple-500 to-pink-600", url: "https://example.com/book4" },
  { id: "5", titleBn: "আর-রাহীকুল মাখতুম", titleEn: "Ar-Raheeq Al-Makhtum", authorBn: "সফিউর রহমান মুবারকপুরী", authorEn: "Safiur Rahman Mubarakpuri", category: "seerah", pages: 580, year: 1979, lang: "Bangla", gradient: "from-rose-500 to-red-600", url: "https://example.com/book5" },
  { id: "6", titleBn: "বুলুগুল মারাম", titleEn: "Bulugh al-Maram", authorBn: "ইমাম ইবনে হাজার", authorEn: "Imam Ibn Hajar", category: "hadith", pages: 720, year: 1350, lang: "Bangla", gradient: "from-cyan-500 to-sky-600", url: "https://example.com/book6" },
  { id: "7", titleBn: "ইসলামিক শরিয়াহ আইন", titleEn: "Islamic Sharia Law", authorBn: "ড. ওয়াহবা আল-জুহাইলি", authorEn: "Dr. Wahba al-Zuhayli", category: "fiqh", pages: 960, year: 1986, lang: "Bangla", gradient: "from-teal-500 to-emerald-600", url: "https://example.com/book7" },
  { id: "8", titleBn: "সহীহুল বুখারী সংক্ষিপ্ত", titleEn: "Sahih Bukhari (Abridged)", authorBn: "ইমাম বুখারী", authorEn: "Imam Bukhari", category: "hadith", pages: 1200, year: 846, lang: "Bangla", gradient: "from-violet-500 to-purple-600", url: "https://example.com/book8" },
];

export default function LibraryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, locale } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  useGSAP(() => {
    gsap.fromTo(".book-card", { opacity: 0, scale: 0.95, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power2.out" });
  }, { scope: containerRef, dependencies: [activeCategory] });

  const filtered = BOOKS.filter((b) => {
    const matchCat = activeCategory === "all" || b.category === activeCategory;
    const title = locale === "bn" ? b.titleBn : b.titleEn;
    const author = locale === "bn" ? b.authorBn : b.authorEn;
    const matchSearch = title.toLowerCase().includes(search.toLowerCase()) || author.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div ref={containerRef} className="page-container py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center">
          <Library className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className={`text-2xl font-bold text-[var(--text-primary)] ${locale === "bn" ? "font-bangla" : ""}`}>
            {t.library.title}
          </h1>
          <p className={`text-sm text-[var(--text-muted)] ${locale === "bn" ? "font-bangla" : ""}`}>
            {t.library.subtitle}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-lg mb-6">
        <Input
          placeholder={t.library.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search className="w-4 h-4" />}
          className={locale === "bn" ? "font-bangla" : ""}
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeCategory === cat.id
                ? "bg-primary-700 text-white shadow-md"
                : "bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)]"
            } ${locale === "bn" ? "font-bangla" : ""}`}
          >
            {locale === "bn" ? cat.bn : cat.en}
          </button>
        ))}
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {filtered.map((book) => (
          <div key={book.id} className="book-card card overflow-hidden group hover:-translate-y-1 transition-all duration-200">
            {/* Book Cover */}
            <div className={`h-48 bg-gradient-to-br ${book.gradient} flex flex-col items-center justify-center p-4 relative`}>
              <div className="absolute inset-0 pattern-overlay opacity-20" />
              <div className="relative z-10 text-center">
                <BookOpen className="w-12 h-12 text-white/70 mx-auto mb-3" />
                <p className={`text-white font-bold text-sm leading-snug text-center line-clamp-2 ${locale === "bn" ? "font-bangla" : ""}`}>
                  {locale === "bn" ? book.titleBn : book.titleEn}
                </p>
              </div>
              <div className="absolute top-2 right-2">
                <Badge variant="muted" className="text-[10px] bg-white/20 text-white border-none">
                  {book.lang}
                </Badge>
              </div>
            </div>

            <div className="p-4">
              <h3 className={`font-bold text-[var(--text-primary)] text-sm mb-1 leading-snug line-clamp-2 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors ${locale === "bn" ? "font-bangla" : ""}`}>
                {locale === "bn" ? book.titleBn : book.titleEn}
              </h3>
              <div className={`flex items-center gap-1 text-xs text-[var(--text-muted)] mb-3 ${locale === "bn" ? "font-bangla" : ""}`}>
                <User className="w-3 h-3 shrink-0" />
                <span className="truncate">{locale === "bn" ? book.authorBn : book.authorEn}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] mb-4">
                <span>{book.pages} {locale === "bn" ? "পৃষ্ঠা" : "pages"}</span>
                <span>•</span>
                <span>{book.year}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <a
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-primary text-xs py-2 justify-center"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className={locale === "bn" ? "font-bangla" : ""}>{t.library.read}</span>
                </a>
                <button className="btn-ghost text-xs py-2 px-3">
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-[var(--text-muted)]">
          <Library className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className={locale === "bn" ? "font-bangla" : ""}>{t.library.noBooks}</p>
        </div>
      )}
    </div>
  );
}
