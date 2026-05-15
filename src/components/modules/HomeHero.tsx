"use client";
import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "@/hooks/useTranslation";
import { ArrowRight, BookOpen, Users, Star } from "lucide-react";
import { CrescentMoon } from "@/components/ui/Icon";

gsap.registerPlugin(useGSAP);

const STATS = [
  { valueBn: "২,৫০০+", valueEn: "2,500+", labelBn: "সদস্য", labelEn: "Members" },
  { valueBn: "১৫০+",   valueEn: "150+",   labelBn: "কুইজ",  labelEn: "Quizzes" },
  { valueBn: "৫০০+",   valueEn: "500+",   labelBn: "বই",    labelEn: "Books" },
  { valueBn: "৩০০+",   valueEn: "300+",   labelBn: "ভিডিও", labelEn: "Videos" },
];

export default function HomeHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { t, locale } = useTranslation();

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(".h-badge",    { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 })
      .fromTo(".h-title",    { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2")
      .fromTo(".h-sub",      { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
      .fromTo(".h-cta",      { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }, "-=0.2")
      .fromTo(".h-stat",     { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.07 }, "-=0.1")
      .fromTo(".h-deco",     { opacity: 0 },        { opacity: 1, duration: 1 }, 0);

    gsap.to(".h-float", {
      y: -10, duration: 3, ease: "sine.inOut", repeat: -1, yoyo: true, stagger: 0.5,
    });
  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-800 to-primary-700 dark:from-[#040f0c] dark:via-[#0a2119] dark:to-[#0d2e22]" />
      <div className="absolute inset-0 pattern-overlay opacity-30" />

      {/* Decorative blobs */}
      <div className="h-deco h-float absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />
      <div className="h-deco h-float absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-accent-500/10 blur-3xl pointer-events-none" />
      <div className="h-deco absolute top-6 right-[10%] text-accent-400/20">
        <Star className="w-5 h-5 fill-current" />
      </div>
      <div className="h-deco h-float absolute top-20 right-[30%] text-white/10">
        <CrescentMoon className="w-10 h-10" />
      </div>

      <div className="relative page-container py-14 md:py-20 lg:py-24">
        <div className="max-w-xl">
          {/* Bismillah badge */}
          <div className="h-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold mb-5 backdrop-blur-sm">
            <CrescentMoon className="w-3.5 h-3.5 text-accent-400" />
            <span className="font-bangla text-sm">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </span>
          </div>

          {/* Headline */}
          <h1 className={`h-title text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 ${locale === "bn" ? "font-bangla" : ""}`}>
            {t.home.heroTitle}
          </h1>

          <p className={`h-sub text-base text-white/65 mb-8 leading-relaxed ${locale === "bn" ? "font-bangla" : ""}`}>
            {t.home.heroSubtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-12">
            <Link
              href="/quiz"
              className="h-cta inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-primary-800 font-bold text-sm hover:bg-accent-50 transition-all shadow-lg shadow-black/20 hover:-translate-y-0.5"
            >
              <BookOpen className="w-4 h-4" />
              <span className={locale === "bn" ? "font-bangla" : ""}>{t.home.heroCta}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/auth/register"
              className="h-cta inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 border border-white/25 text-white font-bold text-sm hover:bg-white/20 transition-all backdrop-blur-sm hover:-translate-y-0.5"
            >
              <Users className="w-4 h-4" />
              <span className={locale === "bn" ? "font-bangla" : ""}>{locale === "bn" ? "যোগ দিন" : "Join Free"}</span>
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 pt-6 border-t border-white/10">
            {STATS.map((s, i) => (
              <div key={i} className="h-stat">
                <div className={`text-2xl font-bold text-white leading-none ${locale === "bn" ? "font-bangla" : ""}`}>
                  {locale === "bn" ? s.valueBn : s.valueEn}
                </div>
                <div className={`text-xs text-white/50 mt-1 ${locale === "bn" ? "font-bangla" : ""}`}>
                  {locale === "bn" ? s.labelBn : s.labelEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
