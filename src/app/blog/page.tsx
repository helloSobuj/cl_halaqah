"use client";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "@/hooks/useTranslation";
import { PenSquare, Search, Clock, User, MessageCircle, Tag, TrendingUp, Bookmark } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { BlogCard } from "@/components/modules/BlogCard";
import Link from "next/link";
import { formatRelativeTime } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

const ALL_POSTS = [
  { id: "1", titleBn: "সালাতের গুরুত্ব ও ফজিলত", titleEn: "The Importance and Virtues of Salah", excerptBn: "ইসলামের পাঁচটি স্তম্ভের মধ্যে সালাত সর্বোচ্চ গুরুত্বপূর্ণ।", excerptEn: "Salah is the most important of the five pillars of Islam.", authorBn: "মাওলানা আব্দুল্লাহ", authorEn: "Maulana Abdullah", tagBn: "ইবাদত", tagEn: "Worship", readMinutes: 5, comments: 12, createdAt: new Date(Date.now() - 2 * 24 * 3600000).toISOString(), coverGradient: "from-emerald-500 to-teal-600" },
  { id: "2", titleBn: "রমজানের প্রস্তুতি নিন এখন থেকেই", titleEn: "Prepare for Ramadan Starting Now", excerptBn: "রমজান মাসের আগে থেকেই প্রস্তুতি নেওয়া অত্যন্ত গুরুত্বপূর্ণ।", excerptEn: "Preparing for Ramadan before it arrives is very important.", authorBn: "শাইখ মুহাম্মদ", authorEn: "Sheikh Muhammad", tagBn: "রমজান", tagEn: "Ramadan", readMinutes: 7, comments: 24, createdAt: new Date(Date.now() - 5 * 24 * 3600000).toISOString(), coverGradient: "from-amber-500 to-orange-600" },
  { id: "3", titleBn: "ইসলামে পারিবারিক জীবন", titleEn: "Family Life in Islam", excerptBn: "ইসলাম পারিবারিক জীবনকে অত্যন্ত গুরুত্ব দেয়।", excerptEn: "Islam places great importance on family life.", authorBn: "ড. ফাতিমা খানম", authorEn: "Dr. Fatima Khanam", tagBn: "পারিবারিক", tagEn: "Family", readMinutes: 8, comments: 9, createdAt: new Date(Date.now() - 7 * 24 * 3600000).toISOString(), coverGradient: "from-purple-500 to-pink-600" },
  { id: "4", titleBn: "যাকাত আদায়ের পদ্ধতি ও নিসাব", titleEn: "Method and Nisab of Zakat", excerptBn: "যাকাত ইসলামের একটি গুরুত্বপূর্ণ আর্থিক ইবাদত।", excerptEn: "Zakat is an important financial act of worship in Islam.", authorBn: "মুফতি আহমেদ", authorEn: "Mufti Ahmed", tagBn: "যাকাত", tagEn: "Zakat", readMinutes: 6, comments: 15, createdAt: new Date(Date.now() - 10 * 24 * 3600000).toISOString(), coverGradient: "from-blue-500 to-indigo-600" },
  { id: "5", titleBn: "ইসলামি অর্থনীতির মূলনীতি", titleEn: "Principles of Islamic Economics", excerptBn: "ইসলামি অর্থনীতি সুদমুক্ত ও ন্যায়ভিত্তিক একটি ব্যবস্থা।", excerptEn: "Islamic economics is a system free from interest and based on justice.", authorBn: "ড. উমার চাপরা", authorEn: "Dr. Umar Chapra", tagBn: "অর্থনীতি", tagEn: "Economics", readMinutes: 10, comments: 7, createdAt: new Date(Date.now() - 14 * 24 * 3600000).toISOString(), coverGradient: "from-cyan-500 to-sky-600" },
  { id: "6", titleBn: "দোয়া কবুলের শর্তসমূহ", titleEn: "Conditions for Accepted Dua", excerptBn: "আল্লাহর কাছে দোয়া কবুল হওয়ার কিছু বিশেষ শর্ত ও আদব রয়েছে।", excerptEn: "There are special conditions and etiquettes for Dua to be accepted by Allah.", authorBn: "শাইখ ইউসুফ", authorEn: "Sheikh Yusuf", tagBn: "দোয়া", tagEn: "Dua", readMinutes: 4, comments: 22, createdAt: new Date(Date.now() - 3 * 24 * 3600000).toISOString(), coverGradient: "from-rose-500 to-red-600" },
];

const TAGS_LIST = [
  { bn: "ইবাদত", en: "Worship" }, { bn: "রমজান", en: "Ramadan" },
  { bn: "পারিবারিক", en: "Family" }, { bn: "যাকাত", en: "Zakat" },
  { bn: "দোয়া", en: "Dua" }, { bn: "আকিদা", en: "Aqeedah" },
  { bn: "হালাল", en: "Halal" }, { bn: "সিরাহ", en: "Seerah" },
];

export default function BlogPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, locale } = useTranslation();
  const [search, setSearch] = useState("");

  useGSAP(() => {
    gsap.fromTo(".blog-card-wrap", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: "power2.out" });
  }, { scope: containerRef });

  const filtered = ALL_POSTS.filter((p) => {
    const title = locale === "bn" ? p.titleBn : p.titleEn;
    return title.toLowerCase().includes(search.toLowerCase());
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div ref={containerRef} className="page-container py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500 flex items-center justify-center">
            <PenSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className={`text-2xl font-bold text-[var(--text-primary)] ${locale === "bn" ? "font-bangla" : ""}`}>
              {t.blog.title}
            </h1>
            <p className={`text-sm text-[var(--text-muted)] ${locale === "bn" ? "font-bangla" : ""}`}>
              {t.blog.subtitle}
            </p>
          </div>
        </div>
        <div className="max-w-xs w-full">
          <Input
            placeholder={t.common.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search className="w-4 h-4" />}
            className={locale === "bn" ? "font-bangla" : ""}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Featured Post */}
          {featured && (
            <Link href={`/blog/${featured.id}`} className="blog-card-wrap card block mb-6 overflow-hidden group hover:-translate-y-0.5 transition-all">
              <div className={`h-52 bg-gradient-to-br ${featured.coverGradient} flex items-center justify-center relative`}>
                <div className="absolute inset-0 pattern-overlay opacity-20" />
                <div className="absolute top-3 left-3">
                  <Badge variant="primary" className="bg-white/20 border border-white/30 text-white backdrop-blur-sm text-xs">
                    <TrendingUp className="w-3 h-3" />
                    {locale === "bn" ? "বিশেষ" : "Featured"}
                  </Badge>
                </div>
              </div>
              <div className="p-5">
                <Badge variant="primary" className={`mb-3 ${locale === "bn" ? "font-bangla" : ""}`}>
                  <Tag className="w-3 h-3" />
                  {locale === "bn" ? featured.tagBn : featured.tagEn}
                </Badge>
                <h2 className={`font-bold text-xl text-[var(--text-primary)] mb-2 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors ${locale === "bn" ? "font-bangla" : ""}`}>
                  {locale === "bn" ? featured.titleBn : featured.titleEn}
                </h2>
                <p className={`text-sm text-[var(--text-muted)] mb-4 ${locale === "bn" ? "font-bangla" : ""}`}>
                  {locale === "bn" ? featured.excerptBn : featured.excerptEn}
                </p>
                <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                  <span className={`flex items-center gap-1 ${locale === "bn" ? "font-bangla" : ""}`}>
                    <User className="w-3 h-3" />
                    {locale === "bn" ? featured.authorBn : featured.authorEn}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {featured.readMinutes}{locale === "bn" ? " মি" : "m"}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    {featured.comments}
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Post Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rest.map((post) => (
              <div key={post.id} className="blog-card-wrap">
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:w-64 shrink-0 space-y-4">
          {/* Tags */}
          <div className="card p-4">
            <h3 className={`font-bold text-[var(--text-primary)] mb-4 text-sm ${locale === "bn" ? "font-bangla" : ""}`}>
              {locale === "bn" ? "ট্যাগসমূহ" : "Tags"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {TAGS_LIST.map((tag) => (
                <button
                  key={tag.en}
                  className={`badge badge-primary hover:opacity-80 cursor-pointer transition-opacity ${locale === "bn" ? "font-bangla" : ""}`}
                >
                  <Tag className="w-3 h-3" />
                  {locale === "bn" ? tag.bn : tag.en}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Posts */}
          <div className="card p-4">
            <h3 className={`font-bold text-[var(--text-primary)] mb-4 text-sm flex items-center gap-2 ${locale === "bn" ? "font-bangla" : ""}`}>
              <TrendingUp className="w-4 h-4 text-primary-700 dark:text-primary-400" />
              {locale === "bn" ? "জনপ্রিয় পোস্ট" : "Popular Posts"}
            </h3>
            <div className="space-y-3">
              {ALL_POSTS.slice(0, 3).map((post, i) => (
                <Link key={post.id} href={`/blog/${post.id}`} className="flex items-start gap-3 group">
                  <span className="text-lg font-bold text-[var(--border)] group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className={`text-xs font-semibold text-[var(--text-primary)] line-clamp-2 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors leading-snug ${locale === "bn" ? "font-bangla" : ""}`}>
                      {locale === "bn" ? post.titleBn : post.titleEn}
                    </p>
                    <p className="text-[10px] text-[var(--text-muted)] mt-1">
                      {formatRelativeTime(post.createdAt, locale)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
