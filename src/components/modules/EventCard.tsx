"use client";
import Link from "next/link";
import { Calendar, MapPin, Users, Clock, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useTranslation } from "@/hooks/useTranslation";
import { formatDate } from "@/lib/utils";

export interface Event {
  id: string;
  titleBn: string;
  titleEn: string;
  venueBn: string;
  venueEn: string;
  date: string;
  time: string;
  seatsTotal: number;
  seatsBooked: number;
  isFree: boolean;
  imagePlaceholderColor: string;
}

const DEMO_EVENTS: Event[] = [
  {
    id: "1",
    titleBn: "ইসলামিক লাইফস্টাইল সেমিনার",
    titleEn: "Islamic Lifestyle Seminar",
    venueBn: "মসজিদুল আকসা হল, ঢাকা",
    venueEn: "Masjid Al-Aqsa Hall, Dhaka",
    date: new Date(Date.now() + 7 * 24 * 3600000).toISOString(),
    time: "১০:০০ AM",
    seatsTotal: 200,
    seatsBooked: 145,
    isFree: true,
    imagePlaceholderColor: "from-emerald-500 to-teal-600",
  },
  {
    id: "2",
    titleBn: "কুরআন তিলাওয়াত প্রতিযোগিতা",
    titleEn: "Quran Recitation Competition",
    venueBn: "সিটি অডিটোরিয়াম, চট্টগ্রাম",
    venueEn: "City Auditorium, Chittagong",
    date: new Date(Date.now() + 14 * 24 * 3600000).toISOString(),
    time: "৯:০০ AM",
    seatsTotal: 500,
    seatsBooked: 120,
    isFree: false,
    imagePlaceholderColor: "from-blue-500 to-indigo-600",
  },
  {
    id: "3",
    titleBn: "ইসলামিক ফাইন্যান্স ওয়ার্কশপ",
    titleEn: "Islamic Finance Workshop",
    venueBn: "অনলাইন (Zoom)",
    venueEn: "Online (Zoom)",
    date: new Date(Date.now() + 3 * 24 * 3600000).toISOString(),
    time: "৭:০০ PM",
    seatsTotal: 100,
    seatsBooked: 98,
    isFree: false,
    imagePlaceholderColor: "from-purple-500 to-pink-600",
  },
];

export function EventCard({ event }: { event: Event }) {
  const { locale } = useTranslation();
  const title = locale === "bn" ? event.titleBn : event.titleEn;
  const venue = locale === "bn" ? event.venueBn : event.venueEn;
  const seatsLeft = event.seatsTotal - event.seatsBooked;
  const isFull = seatsLeft <= 0;

  return (
    <Link href={`/events/${event.id}`} className="card block overflow-hidden group hover:-translate-y-1 transition-all duration-200">
      {/* Image placeholder */}
      <div className={`h-36 bg-gradient-to-br ${event.imagePlaceholderColor} relative flex items-center justify-center`}>
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <Calendar className="w-12 h-12 text-white/50 relative z-10" />
        <div className="absolute top-3 right-3">
          <Badge variant={event.isFree ? "success" : "accent"}>
            {event.isFree
              ? (locale === "bn" ? "বিনামূল্যে" : "Free")
              : (locale === "bn" ? "পেইড" : "Paid")}
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <h3 className={`font-bold text-[var(--text-primary)] mb-3 leading-snug group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors ${locale === "bn" ? "font-bangla" : ""}`}>
          {title}
        </h3>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span className={locale === "bn" ? "font-bangla" : ""}>{formatDate(event.date, locale)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span className={locale === "bn" ? "font-bangla" : ""}>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className={`truncate ${locale === "bn" ? "font-bangla" : ""}`}>{venue}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <Users className="w-3.5 h-3.5 shrink-0" />
            <span className={locale === "bn" ? "font-bangla" : ""}>
              {isFull
                ? (locale === "bn" ? "আসন পূর্ণ" : "Seats Full")
                : `${seatsLeft} ${locale === "bn" ? "আসন বাকি" : "seats left"}`}
            </span>
          </div>
        </div>

        {/* Seat progress bar */}
        <div className="mt-3">
          <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${isFull ? "bg-red-500" : "bg-primary-700 dark:bg-primary-500"}`}
              style={{ width: `${Math.min(100, (event.seatsBooked / event.seatsTotal) * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function EventsSection() {
  const { t, locale } = useTranslation();

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className={`section-title ${locale === "bn" ? "font-bangla" : ""}`}>
          {t.home.upcomingEvents}
        </h2>
        <Link
          href="/events"
          className={`text-sm font-semibold text-primary-700 dark:text-primary-400 hover:underline flex items-center gap-1 ${locale === "bn" ? "font-bangla" : ""}`}
        >
          {t.common.viewAll}
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {DEMO_EVENTS.map((e) => <EventCard key={e.id} event={e} />)}
      </div>
    </section>
  );
}
