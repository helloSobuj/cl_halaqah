"use client";
import Link from "next/link";
import { Megaphone, Clock, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useTranslation } from "@/hooks/useTranslation";
import { formatRelativeTime } from "@/lib/utils";

export interface Notice {
  id: string;
  titleBn: string;
  titleEn: string;
  contentBn: string;
  contentEn: string;
  important: boolean;
  createdAt: string;
}

const DEMO_NOTICES: Notice[] = [
  {
    id: "1",
    titleBn: "বার্ষিক ইজতেমা ২০২৫",
    titleEn: "Annual Ijtema 2025",
    contentBn: "আগামী মাসে বার্ষিক ইজতেমা অনুষ্ঠিত হবে। সকলকে অংশগ্রহণের আমন্ত্রণ জানানো হচ্ছে।",
    contentEn: "The annual Ijtema will be held next month. Everyone is invited to participate.",
    important: true,
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
  {
    id: "2",
    titleBn: "রমজান কুইজ প্রতিযোগিতা",
    titleEn: "Ramadan Quiz Competition",
    contentBn: "রমজান মাস উপলক্ষে বিশেষ কুইজ প্রতিযোগিতার আয়োজন করা হয়েছে।",
    contentEn: "A special quiz competition has been organized for the month of Ramadan.",
    important: false,
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
  },
  {
    id: "3",
    titleBn: "নতুন বই সংযোজন",
    titleEn: "New Books Added",
    contentBn: "পাঠাগারে ৫০টি নতুন ইসলামিক বই যোগ করা হয়েছে।",
    contentEn: "50 new Islamic books have been added to the library.",
    important: false,
    createdAt: new Date(Date.now() - 3 * 24 * 3600000).toISOString(),
  },
];

export function NoticeCard({ notice }: { notice: Notice }) {
  const { locale } = useTranslation();
  const title = locale === "bn" ? notice.titleBn : notice.titleEn;
  const content = locale === "bn" ? notice.contentBn : notice.contentEn;

  return (
    <Link href={`/notices/${notice.id}`} className="card block p-4 hover:-translate-y-0.5 transition-all group">
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${notice.important ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" : "bg-primary-700/10 dark:bg-primary-500/15 text-primary-700 dark:text-primary-400"}`}>
          <Megaphone className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {notice.important && (
              <Badge variant="danger" className="text-[10px] py-0.5">
                {locale === "bn" ? "গুরুত্বপূর্ণ" : "Important"}
              </Badge>
            )}
          </div>
          <h3 className={`font-semibold text-[var(--text-primary)] text-sm leading-snug mb-1 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors ${locale === "bn" ? "font-bangla" : ""}`}>
            {title}
          </h3>
          <p className={`text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed ${locale === "bn" ? "font-bangla" : ""}`}>
            {content}
          </p>
          <div className="flex items-center gap-1 mt-2 text-[var(--text-muted)]">
            <Clock className="w-3 h-3" />
            <span className="text-xs">{formatRelativeTime(notice.createdAt, locale)}</span>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-[var(--text-muted)] shrink-0 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}

export function NoticesSection() {
  const { t, locale } = useTranslation();

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className={`section-title ${locale === "bn" ? "font-bangla" : ""}`}>
          {t.home.latestNotices}
        </h2>
        <Link
          href="/notices"
          className={`text-sm font-semibold text-primary-700 dark:text-primary-400 hover:underline flex items-center gap-1 ${locale === "bn" ? "font-bangla" : ""}`}
        >
          {t.common.viewAll}
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="space-y-3">
        {DEMO_NOTICES.map((n) => <NoticeCard key={n.id} notice={n} />)}
      </div>
    </section>
  );
}
