"use client";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "@/hooks/useTranslation";
import { EventCard } from "@/components/modules/EventCard";
import { Calendar, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/Input";

// Extend with more events
const ALL_EVENTS = [
  { id: "1", titleBn: "ইসলামিক লাইফস্টাইল সেমিনার", titleEn: "Islamic Lifestyle Seminar", venueBn: "মসজিদুল আকসা হল, ঢাকা", venueEn: "Masjid Al-Aqsa Hall, Dhaka", date: new Date(Date.now() + 7 * 24 * 3600000).toISOString(), time: "১০:০০ AM", seatsTotal: 200, seatsBooked: 145, isFree: true, imagePlaceholderColor: "from-emerald-500 to-teal-600" },
  { id: "2", titleBn: "কুরআন তিলাওয়াত প্রতিযোগিতা", titleEn: "Quran Recitation Competition", venueBn: "সিটি অডিটোরিয়াম, চট্টগ্রাম", venueEn: "City Auditorium, Chittagong", date: new Date(Date.now() + 14 * 24 * 3600000).toISOString(), time: "৯:০০ AM", seatsTotal: 500, seatsBooked: 120, isFree: false, imagePlaceholderColor: "from-blue-500 to-indigo-600" },
  { id: "3", titleBn: "ইসলামিক ফাইন্যান্স ওয়ার্কশপ", titleEn: "Islamic Finance Workshop", venueBn: "অনলাইন (Zoom)", venueEn: "Online (Zoom)", date: new Date(Date.now() + 3 * 24 * 3600000).toISOString(), time: "৭:০০ PM", seatsTotal: 100, seatsBooked: 98, isFree: false, imagePlaceholderColor: "from-purple-500 to-pink-600" },
  { id: "4", titleBn: "হিফজুল কুরআন সার্টিফিকেট অনুষ্ঠান", titleEn: "Quran Memorization Certificate Ceremony", venueBn: "জামিয়া মাদানি, সিলেট", venueEn: "Jamia Madani, Sylhet", date: new Date(Date.now() + 21 * 24 * 3600000).toISOString(), time: "১১:০০ AM", seatsTotal: 300, seatsBooked: 45, isFree: true, imagePlaceholderColor: "from-amber-500 to-orange-600" },
  { id: "5", titleBn: "মুসলিম মহিলাদের অধিকার আলোচনা", titleEn: "Muslim Women Rights Discussion", venueBn: "কমিউনিটি হল, রাজশাহী", venueEn: "Community Hall, Rajshahi", date: new Date(Date.now() + 10 * 24 * 3600000).toISOString(), time: "৩:০০ PM", seatsTotal: 150, seatsBooked: 72, isFree: true, imagePlaceholderColor: "from-rose-500 to-pink-600" },
  { id: "6", titleBn: "ইসলামিক কালিগ্রাফি ওয়ার্কশপ", titleEn: "Islamic Calligraphy Workshop", venueBn: "আর্ট সেন্টার, ঢাকা", venueEn: "Art Center, Dhaka", date: new Date(Date.now() + 5 * 24 * 3600000).toISOString(), time: "১০:০০ AM", seatsTotal: 50, seatsBooked: 38, isFree: false, imagePlaceholderColor: "from-cyan-500 to-sky-600" },
];

gsap.registerPlugin(useGSAP);

export default function EventsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, locale } = useTranslation();
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [search, setSearch] = useState("");

  useGSAP(() => {
    gsap.fromTo(".event-card-wrap", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" });
  }, { scope: containerRef, dependencies: [tab] });

  const filtered = ALL_EVENTS.filter((e) => {
    const title = locale === "bn" ? e.titleBn : e.titleEn;
    return title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div ref={containerRef} className="page-container py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-purple-500 flex items-center justify-center">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className={`text-2xl font-bold text-[var(--text-primary)] ${locale === "bn" ? "font-bangla" : ""}`}>
            {t.events.title}
          </h1>
          <p className={`text-sm text-[var(--text-muted)] ${locale === "bn" ? "font-bangla" : ""}`}>
            {t.events.subtitle}
          </p>
        </div>
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex gap-2">
          {(["upcoming", "past"] as const).map((tab_) => (
            <button
              key={tab_}
              onClick={() => setTab(tab_)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                tab === tab_ ? "bg-primary-700 text-white" : "bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)]"
              } ${locale === "bn" ? "font-bangla" : ""}`}
            >
              {tab_ === "upcoming"
                ? (locale === "bn" ? "আসন্ন" : "Upcoming")
                : (locale === "bn" ? "অতীত" : "Past")}
            </button>
          ))}
        </div>
        <div className="flex-1 max-w-sm">
          <Input
            placeholder={t.common.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search className="w-4 h-4" />}
            className={locale === "bn" ? "font-bangla" : ""}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((e) => (
          <div key={e.id} className="event-card-wrap">
            <EventCard event={e} />
          </div>
        ))}
      </div>
    </div>
  );
}
