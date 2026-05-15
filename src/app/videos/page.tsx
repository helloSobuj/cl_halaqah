"use client";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "@/hooks/useTranslation";
import { Video, Play, Clock, User, Search, Tv } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { getYouTubeId } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

const CATEGORIES = [
  { id: "all", bn: "সব", en: "All" },
  { id: "lecture", bn: "লেকচার", en: "Lecture" },
  { id: "tafseer", bn: "তাফসীর", en: "Tafseer" },
  { id: "dua", bn: "দোয়া", en: "Dua" },
  { id: "naseed", bn: "নাশিদ", en: "Naseed" },
  { id: "kids", bn: "শিশুদের জন্য", en: "For Kids" },
];

const VIDEOS = [
  { id: "1", titleBn: "সূরা ফাতিহার তাফসীর", titleEn: "Tafsir of Surah Al-Fatiha", speakerBn: "শাইখ আহমেদ", speakerEn: "Sheikh Ahmed", category: "tafseer", duration: "45:22", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", views: 12450 },
  { id: "2", titleBn: "রমজান মাসের বিশেষ আমল", titleEn: "Special Deeds of Ramadan", speakerBn: "মুফতি তারিক মাসউদ", speakerEn: "Mufti Tariq Masood", category: "lecture", duration: "1:02:15", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", views: 45200 },
  { id: "3", titleBn: "সকাল-সন্ধ্যার দোয়া", titleEn: "Morning and Evening Duas", speakerBn: "ক্বারী মুহাম্মদ", speakerEn: "Qari Muhammad", category: "dua", duration: "22:10", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", views: 8900 },
  { id: "4", titleBn: "ইসলামে পারিবারিক জীবন", titleEn: "Family Life in Islam", speakerBn: "ড. জাকির নায়েক", speakerEn: "Dr. Zakir Naik", category: "lecture", duration: "58:45", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", views: 67800 },
  { id: "5", titleBn: "শিশুদের ইসলামি শিক্ষা", titleEn: "Islamic Education for Children", speakerBn: "শিক্ষক আলী", speakerEn: "Teacher Ali", category: "kids", duration: "15:30", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", views: 23100 },
  { id: "6", titleBn: "আল্লাহর ৯৯ নাম", titleEn: "99 Names of Allah", speakerBn: "শিল্পী মিশারি", speakerEn: "Artist Mishary", category: "naseed", duration: "12:50", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", views: 35600 },
  { id: "7", titleBn: "হজের ফরজ ও ওয়াজিব", titleEn: "Obligatory Acts of Hajj", speakerBn: "মাওলানা সাদ", speakerEn: "Maulana Sad", category: "lecture", duration: "1:15:00", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", views: 18200 },
  { id: "8", titleBn: "সূরা ইয়াসীনের ফজিলত", titleEn: "Virtues of Surah Yasin", speakerBn: "ক্বারী আব্দুল বাসিত", speakerEn: "Qari Abdul Basit", category: "tafseer", duration: "35:20", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", views: 41500 },
];

const THUMBNAIL_GRADIENTS = [
  "from-emerald-600 to-teal-700",
  "from-blue-600 to-indigo-700",
  "from-amber-600 to-orange-700",
  "from-purple-600 to-pink-700",
  "from-rose-600 to-red-700",
  "from-cyan-600 to-sky-700",
  "from-violet-600 to-purple-700",
  "from-teal-600 to-emerald-700",
];

export default function VideosPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, locale } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  useGSAP(() => {
    gsap.fromTo(".video-card", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power2.out" });
  }, { scope: containerRef, dependencies: [activeCategory] });

  const filtered = VIDEOS.filter((v) => {
    const matchCat = activeCategory === "all" || v.category === activeCategory;
    const title = locale === "bn" ? v.titleBn : v.titleEn;
    return matchCat && title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div ref={containerRef} className="page-container py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-red-500 flex items-center justify-center">
          <Video className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className={`text-2xl font-bold text-[var(--text-primary)] ${locale === "bn" ? "font-bangla" : ""}`}>
            {t.videos.title}
          </h1>
          <p className={`text-sm text-[var(--text-muted)] ${locale === "bn" ? "font-bangla" : ""}`}>
            {t.videos.subtitle}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-lg mb-6">
        <Input
          placeholder={t.common.search}
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

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {filtered.map((video, i) => (
          <a
            key={video.id}
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="video-card card block overflow-hidden group hover:-translate-y-1 transition-all duration-200"
          >
            {/* Thumbnail */}
            <div className={`relative h-40 bg-gradient-to-br ${THUMBNAIL_GRADIENTS[i % THUMBNAIL_GRADIENTS.length]} flex items-center justify-center`}>
              <div className="absolute inset-0 pattern-overlay opacity-20" />
              <div className="relative z-10 w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Play className="w-6 h-6 text-white fill-white ml-1" />
              </div>
              <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-lg font-medium">
                {video.duration}
              </div>
              <div className="absolute top-2 left-2">
                <Tv className="w-5 h-5 text-white/70" />
              </div>
            </div>

            <div className="p-3">
              <h3 className={`font-bold text-[var(--text-primary)] text-sm mb-2 leading-snug line-clamp-2 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors ${locale === "bn" ? "font-bangla" : ""}`}>
                {locale === "bn" ? video.titleBn : video.titleEn}
              </h3>
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                <User className="w-3 h-3" />
                <span className={`truncate ${locale === "bn" ? "font-bangla" : ""}`}>
                  {locale === "bn" ? video.speakerBn : video.speakerEn}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] mt-1">
                <span>{video.views.toLocaleString()} {locale === "bn" ? "ভিউ" : "views"}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
