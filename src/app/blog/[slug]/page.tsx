"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "@/hooks/useTranslation";
import { Badge } from "@/components/ui/Badge";
import { ChevronLeft, Clock, User, Eye, Share2, Bookmark, MessageCircle, Calendar } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(useGSAP);

const BLOG_DATA: Record<string, {
  titleBn: string; titleEn: string;
  authorBn: string; authorEn: string;
  date: string; readTime: number; views: number;
  tagBn: string; tagEn: string;
  gradient: string;
  bodyBn: string; bodyEn: string;
}> = {
  "ramadan-guide": {
    titleBn: "রমজানের সম্পূর্ণ গাইড: ইবাদত ও আমলের সেরা সময়",
    titleEn: "Complete Ramadan Guide: The Best Time for Worship and Good Deeds",
    authorBn: "মাওলানা আব্দুল করিম",
    authorEn: "Maulana Abdul Karim",
    date: "2025-05-12",
    readTime: 8,
    views: 3240,
    tagBn: "রমজান",
    tagEn: "Ramadan",
    gradient: "from-emerald-600 to-teal-700",
    bodyBn: `বিসমিল্লাহির রাহমানির রাহিম

রমজান মাস মুসলিমদের জন্য একটি অত্যন্ত বরকতময় মাস। এই মাসে আল্লাহ তায়ালা অসংখ্য রহমত ও মাগফিরাতের দরজা খুলে দেন।

## রমজানের ফজিলত

হাদিসে বর্ণিত আছে যে, রমজান মাস শুরু হলে জান্নাতের দরজাগুলো খুলে দেওয়া হয় এবং জাহান্নামের দরজাগুলো বন্ধ করে দেওয়া হয়।

রাসূলুল্লাহ (সা.) বলেছেন: "যে ব্যক্তি ঈমান ও ইহতিসাবের সাথে রমজান মাসের রোজা রাখে, তার পূর্ববর্তী সকল গুনাহ মাফ করে দেওয়া হয়।" (বুখারি ও মুসলিম)

## রমজানের আমলসমূহ

**১. সাহরি খাওয়া**
সাহরি খাওয়া সুন্নত। নবী করিম (সা.) বলেছেন: "সাহরিতে বরকত রয়েছে।"

**২. সময়মতো ইফতার করা**
সূর্য অস্ত যাওয়ার সাথে সাথে ইফতার করা মুস্তাহাব।

**৩. তারাবির নামাজ**
রমজান মাসে রাতের তারাবির নামাজ পড়া অত্যন্ত ফজিলতপূর্ণ।

**৪. কুরআন তিলাওয়াত**
রমজান মাসে বেশি বেশি কুরআন তিলাওয়াত করা উচিত। জিবরাইল (আ.) প্রতি রমজানে নবী (সা.)-এর সাথে কুরআন মিলিয়ে পড়তেন।

**৫. দান-সদকা**
রমজান মাসে দানশীলতা বৃদ্ধি পায়। নবী (সা.) এই মাসে সবচেয়ে বেশি দান করতেন।

## লাইলাতুল কদর

রমজানের শেষ দশ দিনের বিজোড় রাতগুলোতে লাইলাতুল কদর অন্বেষণ করা উচিত। এই রাতের ইবাদত হাজার মাসের ইবাদতের চেয়ে উত্তম।

আল্লাহ তায়ালা আমাদের সকলকে রমজানের পূর্ণ ফায়দা নেওয়ার তৌফিক দান করুন। আমিন।`,
    bodyEn: `In the Name of Allah, the Most Gracious, the Most Merciful

The month of Ramadan is an extremely blessed month for Muslims. In this month, Allah opens countless doors of mercy and forgiveness.

## The Virtues of Ramadan

It is narrated in Hadith that when the month of Ramadan begins, the gates of Paradise are opened and the gates of Hell are closed.

The Prophet (PBUH) said: "Whoever fasts in Ramadan with faith and seeking reward, his previous sins will be forgiven." (Bukhari and Muslim)

## Acts of Worship in Ramadan

**1. Eating Suhoor (Pre-dawn meal)**
Eating Suhoor is Sunnah. The Prophet (PBUH) said: "There is blessing in Suhoor."

**2. Breaking Fast on Time**
It is recommended to break the fast immediately at sunset.

**3. Tarawih Prayer**
Performing the Tarawih prayer at night during Ramadan is highly virtuous.

**4. Reciting Quran**
One should recite the Quran abundantly during Ramadan. Angel Jibreel would review the Quran with the Prophet (PBUH) every Ramadan.

**5. Charity and Giving**
Generosity increases in Ramadan. The Prophet (PBUH) gave the most charity in this month.

## Laylatul Qadr

One should seek Laylatul Qadr in the odd nights of the last ten days of Ramadan. The worship on this night is better than worship for a thousand months.

May Allah grant all of us the ability to benefit fully from Ramadan. Ameen.`,
  },
};

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { locale } = useTranslation();
  const post = BLOG_DATA[params.slug] ?? BLOG_DATA["ramadan-guide"];

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(".blog-hero", { opacity: 0, scale: 1.02 }, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" });
    tl.fromTo(".blog-body", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3");
  }, { scope: containerRef });

  const bodyLines = (locale === "bn" ? post.bodyBn : post.bodyEn).split("\n");

  return (
    <div ref={containerRef} className="page-container py-8 max-w-3xl mx-auto">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] mb-6 transition-colors">
        <ChevronLeft className="w-4 h-4" />
        <span className={locale === "bn" ? "font-bangla" : ""}>{locale === "bn" ? "ব্লগ" : "Blog"}</span>
      </Link>

      {/* Cover */}
      <div className={`blog-hero relative h-64 rounded-2xl bg-gradient-to-br ${post.gradient} overflow-hidden mb-6 flex items-end`}>
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="relative z-10 p-6">
          <Badge variant="accent" className={locale === "bn" ? "font-bangla" : ""}>{locale === "bn" ? post.tagBn : post.tagEn}</Badge>
        </div>
      </div>

      {/* Meta */}
      <div className="blog-body">
        <h1 className={`text-2xl font-bold text-[var(--text-primary)] mb-4 leading-snug ${locale === "bn" ? "font-bangla" : ""}`}>
          {locale === "bn" ? post.titleBn : post.titleEn}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)] mb-6 pb-6 border-b border-[var(--border)]">
          <span className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-primary-700/20 flex items-center justify-center text-primary-700 dark:text-primary-400 font-bold text-xs">
              {(locale === "bn" ? post.authorBn : post.authorEn).charAt(0)}
            </div>
            <span className={`font-semibold text-[var(--text-secondary)] ${locale === "bn" ? "font-bangla" : ""}`}>
              {locale === "bn" ? post.authorBn : post.authorEn}
            </span>
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(post.date).toLocaleDateString(locale === "bn" ? "bn-BD" : "en-US")}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span className={locale === "bn" ? "font-bangla" : ""}>{post.readTime} {locale === "bn" ? "মিনিট পড়া" : "min read"}</span>
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            {post.views.toLocaleString()}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 mb-8">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--border)] text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--border)] transition-colors">
            <Bookmark className="w-3.5 h-3.5" />
            <span className={locale === "bn" ? "font-bangla" : ""}>{locale === "bn" ? "সেভ" : "Save"}</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--border)] text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--border)] transition-colors">
            <Share2 className="w-3.5 h-3.5" />
            <span className={locale === "bn" ? "font-bangla" : ""}>{locale === "bn" ? "শেয়ার" : "Share"}</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--border)] text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--border)] transition-colors">
            <MessageCircle className="w-3.5 h-3.5" />
            <span className={locale === "bn" ? "font-bangla" : ""}>{locale === "bn" ? "মন্তব্য" : "Comment"}</span>
          </button>
        </div>

        {/* Content */}
        <article className={`prose prose-sm max-w-none text-[var(--text-secondary)] leading-relaxed space-y-4 ${locale === "bn" ? "font-bangla" : ""}`}>
          {bodyLines.map((line, i) => {
            if (line.startsWith("## ")) {
              return <h2 key={i} className="text-lg font-bold text-[var(--text-primary)] mt-6 mb-2">{line.slice(3)}</h2>;
            }
            if (line.startsWith("**") && line.endsWith("**")) {
              return <p key={i} className="font-bold text-[var(--text-primary)]">{line.slice(2, -2)}</p>;
            }
            if (line.trim() === "") return <div key={i} className="h-2" />;
            return <p key={i}>{line}</p>;
          })}
        </article>
      </div>
    </div>
  );
}
