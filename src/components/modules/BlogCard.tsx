"use client";
import Link from "next/link";
import { Clock, User, MessageCircle, ChevronRight, Tag } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useTranslation } from "@/hooks/useTranslation";
import { formatRelativeTime, truncate } from "@/lib/utils";

export interface BlogPost {
  id: string;
  titleBn: string;
  titleEn: string;
  excerptBn: string;
  excerptEn: string;
  authorBn: string;
  authorEn: string;
  tagBn: string;
  tagEn: string;
  readMinutes: number;
  comments: number;
  createdAt: string;
  coverGradient: string;
}

const DEMO_POSTS: BlogPost[] = [
  {
    id: "1",
    titleBn: "সালাতের গুরুত্ব ও ফজিলত",
    titleEn: "The Importance and Virtues of Salah",
    excerptBn: "ইসলামের পাঁচটি স্তম্ভের মধ্যে সালাত সর্বোচ্চ গুরুত্বপূর্ণ। আল্লাহর সাথে বান্দার সরাসরি সংযোগ স্থাপনের মাধ্যম হলো নামাজ।",
    excerptEn: "Salah is the most important of the five pillars of Islam. It is the direct connection between a servant and Allah.",
    authorBn: "মাওলানা আব্দুল্লাহ",
    authorEn: "Maulana Abdullah",
    tagBn: "ইবাদত",
    tagEn: "Worship",
    readMinutes: 5,
    comments: 12,
    createdAt: new Date(Date.now() - 2 * 24 * 3600000).toISOString(),
    coverGradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "2",
    titleBn: "রমজানের প্রস্তুতি নিন এখন থেকেই",
    titleEn: "Prepare for Ramadan Starting Now",
    excerptBn: "রমজান মাসের আগে থেকেই প্রস্তুতি নেওয়া একজন মুমিনের জন্য অত্যন্ত গুরুত্বপূর্ণ। আসুন জানি কীভাবে প্রস্তুতি নেব।",
    excerptEn: "Preparing for Ramadan before it arrives is very important for a believer. Let's learn how to prepare.",
    authorBn: "শাইখ মুহাম্মদ",
    authorEn: "Sheikh Muhammad",
    tagBn: "রমজান",
    tagEn: "Ramadan",
    readMinutes: 7,
    comments: 24,
    createdAt: new Date(Date.now() - 5 * 24 * 3600000).toISOString(),
    coverGradient: "from-amber-500 to-orange-600",
  },
  {
    id: "3",
    titleBn: "ইসলামে পারিবারিক জীবন",
    titleEn: "Family Life in Islam",
    excerptBn: "ইসলাম পারিবারিক জীবনকে অত্যন্ত গুরুত্ব দেয়। স্বামী-স্ত্রী এবং সন্তানদের পারস্পরিক অধিকার ও দায়িত্ব নিয়ে আলোচনা।",
    excerptEn: "Islam places great importance on family life. Discussing the mutual rights and responsibilities of spouses and children.",
    authorBn: "ড. ফাতিমা খানম",
    authorEn: "Dr. Fatima Khanam",
    tagBn: "পারিবারিক",
    tagEn: "Family",
    readMinutes: 8,
    comments: 9,
    createdAt: new Date(Date.now() - 7 * 24 * 3600000).toISOString(),
    coverGradient: "from-purple-500 to-pink-600",
  },
];

export function BlogCard({ post }: { post: BlogPost }) {
  const { locale } = useTranslation();
  const title = locale === "bn" ? post.titleBn : post.titleEn;
  const excerpt = locale === "bn" ? post.excerptBn : post.excerptEn;
  const author = locale === "bn" ? post.authorBn : post.authorEn;
  const tag = locale === "bn" ? post.tagBn : post.tagEn;

  return (
    <Link href={`/blog/${post.id}`} className="card block overflow-hidden group hover:-translate-y-1 transition-all duration-200">
      {/* Cover */}
      <div className={`h-40 bg-gradient-to-br ${post.coverGradient} relative flex items-center justify-center`}>
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="absolute top-3 left-3">
          <Badge variant="primary" className="bg-white/20 border border-white/30 text-white backdrop-blur-sm">
            <Tag className="w-3 h-3" />
            {tag}
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <h3 className={`font-bold text-[var(--text-primary)] mb-2 leading-snug group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors line-clamp-2 ${locale === "bn" ? "font-bangla" : ""}`}>
          {title}
        </h3>
        <p className={`text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2 mb-3 ${locale === "bn" ? "font-bangla" : ""}`}>
          {excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-primary-700/20 dark:bg-primary-500/20 flex items-center justify-center">
              <User className="w-3 h-3 text-primary-700 dark:text-primary-400" />
            </div>
            <span className={`font-medium ${locale === "bn" ? "font-bangla" : ""}`}>{author}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readMinutes}{locale === "bn" ? " মি" : "m"}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              {post.comments}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function BlogSection() {
  const { t, locale } = useTranslation();

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className={`section-title ${locale === "bn" ? "font-bangla" : ""}`}>
          {t.home.latestBlog}
        </h2>
        <Link
          href="/blog"
          className={`text-sm font-semibold text-primary-700 dark:text-primary-400 hover:underline flex items-center gap-1 ${locale === "bn" ? "font-bangla" : ""}`}
        >
          {t.common.viewAll}
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {DEMO_POSTS.map((p) => <BlogCard key={p.id} post={p} />)}
      </div>
    </section>
  );
}
