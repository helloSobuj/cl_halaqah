"use client";
import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "@/hooks/useTranslation";
import { ArrowRight, BookOpen, Star } from "lucide-react";
import { CrescentMoon } from "@/components/ui/Icon";

gsap.registerPlugin(useGSAP);

export default function HomeHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { t, locale } = useTranslation();

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(".hero-badge", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 })
      .fromTo(".hero-title", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2")
      .fromTo(".hero-subtitle", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
      .fromTo(".hero-cta", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, "-=0.2")
      .fromTo(".hero-stat", { opacity: 0, y: 16, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.08 }, "-=0.1");

    // Floating animation for decorative elements
    gsap.to(".hero-float", {
      y: -12,
      duration: 2.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.4,
    });
  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-800 to-primary-700 dark:from-[#071f18] dark:via-[#0d2f25] dark:to-[#0f3a2d]"
    >
      {/* Pattern overlay */}
      <div className="absolute inset-0 pattern-overlay opacity-40" />

      {/* Decorative circles */}
      <div className="hero-float absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
      <div className="hero-float absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-accent-500/10 blur-3xl" />
      <div className="hero-float absolute top-1/2 right-1/4 w-40 h-40 rounded-full bg-primary-400/10 blur-2xl" />

      {/* Stars decoration */}
      <div className="absolute top-8 left-1/4 text-accent-400/30 hero-float">
        <Star className="w-4 h-4 fill-current" />
      </div>
      <div className="absolute top-16 right-1/3 text-white/20 hero-float">
        <Star className="w-3 h-3 fill-current" />
      </div>
      <div className="absolute bottom-12 right-1/4 text-accent-400/20 hero-float">
        <CrescentMoon className="w-8 h-8" />
      </div>

      <div className="relative page-container py-16 md:py-24">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold mb-6">
            <CrescentMoon className="w-3.5 h-3.5" />
            <span className={locale === "bn" ? "font-bangla" : ""}>
              {locale === "bn" ? "বিসমিল্লাহির রাহমানির রাহিম" : "In the name of Allah"}
            </span>
          </div>

          {/* Title */}
          <h1 className={`hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight ${locale === "bn" ? "font-bangla" : ""}`}>
            {t.home.heroTitle}
          </h1>

          {/* Subtitle */}
          <p className={`hero-subtitle text-lg text-white/70 mb-8 leading-relaxed ${locale === "bn" ? "font-bangla" : ""}`}>
            {t.home.heroSubtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/quiz"
              className="hero-cta btn-primary bg-white text-primary-800 hover:bg-gray-100 shadow-xl shadow-black/20"
            >
              <BookOpen className="w-4 h-4" />
              <span className={locale === "bn" ? "font-bangla" : ""}>{t.home.heroCta}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/library"
              className="hero-cta btn-ghost border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              <span className={locale === "bn" ? "font-bangla" : ""}>
                {locale === "bn" ? "পাঠাগার দেখুন" : "Browse Library"}
              </span>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/10">
          {[
            { value: "২,৫০০+", valueEn: "2,500+", label: t.home.statsMembers },
            { value: "১৫০+", valueEn: "150+", label: t.home.statsQuizzes },
            { value: "৫০০+", valueEn: "500+", label: t.home.statsBooks },
            { value: "৩০০+", valueEn: "300+", label: t.home.statsVideos },
          ].map((stat, i) => (
            <div key={i} className="hero-stat text-center">
              <div className={`text-2xl md:text-3xl font-bold text-white mb-1 ${locale === "bn" ? "font-bangla" : ""}`}>
                {locale === "bn" ? stat.value : stat.valueEn}
              </div>
              <div className={`text-sm text-white/60 ${locale === "bn" ? "font-bangla" : ""}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
