"use client";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "@/hooks/useTranslation";
import { Megaphone, Clock, AlertCircle, Bell } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

gsap.registerPlugin(useGSAP);

const NOTICES = [
  { id: "1", titleBn: "বার্ষিক ইজতেমা ২০২৫ — গুরুত্বপূর্ণ ঘোষণা", titleEn: "Annual Ijtema 2025 — Important Announcement", contentBn: "আগামী ১৫ই জুন থেকে ১৭ই জুন বার্ষিক ইজতেমা অনুষ্ঠিত হবে। সকল সদস্যকে অংশগ্রহণের জন্য আমন্ত্রণ জানানো হচ্ছে। এই মহান ইসলামিক সম্মেলনে অংশগ্রহণ করে আপনার ঈমান ও আমলকে মজবুত করুন।", contentEn: "The Annual Ijtema will be held from June 15-17. All members are invited to participate. Strengthen your faith and deeds by attending this great Islamic gathering.", important: true, date: new Date(Date.now() - 1 * 24 * 3600000).toISOString() },
  { id: "2", titleBn: "নতুন কুইজ মডিউল চালু হয়েছে", titleEn: "New Quiz Module Launched", contentBn: "আমাদের প্ল্যাটফর্মে নতুন কুইজ মডিউল যোগ করা হয়েছে। এখন থেকে বিভিন্ন বিভাগে কুইজ দিতে পারবেন এবং লিডারবোর্ডে আপনার অবস্থান দেখতে পারবেন।", contentEn: "A new quiz module has been added to our platform. You can now take quizzes in various categories and see your position on the leaderboard.", important: false, date: new Date(Date.now() - 3 * 24 * 3600000).toISOString() },
  { id: "3", titleBn: "পাঠাগারে ১০০+ নতুন বই সংযোজন", titleEn: "100+ New Books Added to Library", contentBn: "ইসলামিক পাঠাগারে নতুন ১০০টিরও বেশি বই সংযোজন করা হয়েছে। বিভিন্ন বিষয়ের বইগুলো বিনামূল্যে পড়তে ও ডাউনলোড করতে পারবেন।", contentEn: "Over 100 new books have been added to the Islamic library. You can read and download books on various topics for free.", important: false, date: new Date(Date.now() - 5 * 24 * 3600000).toISOString() },
  { id: "4", titleBn: "রমজান কুইজ প্রতিযোগিতা — পুরস্কার ঘোষণা", titleEn: "Ramadan Quiz Competition — Prize Announcement", contentBn: "আসন্ন রমজান কুইজ প্রতিযোগিতায় বিজয়ীদের জন্য বিশেষ পুরস্কারের ব্যবস্থা করা হয়েছে। প্রথম পুরস্কার: ৫,০০০ টাকা গিফট ভাউচার।", contentEn: "Special prizes have been arranged for winners of the upcoming Ramadan Quiz Competition. First prize: ৳5,000 gift voucher.", important: true, date: new Date(Date.now() - 7 * 24 * 3600000).toISOString() },
  { id: "5", titleBn: "ওয়েবসাইট রক্ষণাবেক্ষণ বিজ্ঞপ্তি", titleEn: "Website Maintenance Notice", contentBn: "আগামী রবিবার রাত ১২টা থেকে ভোর ৪টা পর্যন্ত রক্ষণাবেক্ষণের কাজ চলবে। এই সময় সাইটটি সাময়িক বন্ধ থাকবে।", contentEn: "Maintenance work will be carried out from midnight to 4 AM next Sunday. The site will be temporarily unavailable during this time.", important: false, date: new Date(Date.now() - 10 * 24 * 3600000).toISOString() },
];

export default function NoticesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, locale } = useTranslation();
  const [filter, setFilter] = useState<"all" | "important">("all");

  useGSAP(() => {
    gsap.fromTo(".notice-item", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" });
  }, { scope: containerRef });

  const filtered = filter === "important" ? NOTICES.filter(n => n.important) : NOTICES;

  return (
    <div ref={containerRef} className="page-container py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-orange-500 flex items-center justify-center">
          <Megaphone className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className={`text-2xl font-bold text-[var(--text-primary)] ${locale === "bn" ? "font-bangla" : ""}`}>
            {t.notices.title}
          </h1>
          <p className={`text-sm text-[var(--text-muted)] ${locale === "bn" ? "font-bangla" : ""}`}>
            {t.notices.subtitle}
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {(["all", "important"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              filter === f
                ? "bg-primary-700 text-white"
                : "bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)]"
            } ${locale === "bn" ? "font-bangla" : ""}`}
          >
            {f === "all"
              ? (locale === "bn" ? "সব নোটিশ" : "All Notices")
              : (locale === "bn" ? "গুরুত্বপূর্ণ" : "Important")}
          </button>
        ))}
      </div>

      {/* Notices */}
      <div className="space-y-4 max-w-3xl">
        {filtered.map((notice) => (
          <Link key={notice.id} href={`/notices/${notice.id}`} className="notice-item card block p-5 group hover:-translate-y-0.5 transition-all">
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                notice.important
                  ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                  : "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
              }`}>
                {notice.important ? <AlertCircle className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  {notice.important && (
                    <Badge variant="danger">{t.notices.important}</Badge>
                  )}
                  <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                    <Clock className="w-3 h-3" />
                    {formatDate(notice.date, locale)}
                  </div>
                </div>
                <h3 className={`font-bold text-[var(--text-primary)] mb-2 leading-snug group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors ${locale === "bn" ? "font-bangla" : ""}`}>
                  {locale === "bn" ? notice.titleBn : notice.titleEn}
                </h3>
                <p className={`text-sm text-[var(--text-muted)] leading-relaxed line-clamp-2 ${locale === "bn" ? "font-bangla" : ""}`}>
                  {locale === "bn" ? notice.contentBn : notice.contentEn}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
