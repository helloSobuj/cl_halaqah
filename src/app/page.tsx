import HomeHero from "@/components/modules/HomeHero";
import ModuleGrid from "@/components/modules/ModuleGrid";
import { NoticesSection } from "@/components/modules/NoticeCard";
import { EventsSection } from "@/components/modules/EventCard";
import { BlogSection } from "@/components/modules/BlogCard";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HomeHero />
      <div className="page-container">
        <ModuleGrid />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <NoticesSection />
          </div>
          <div className="lg:col-span-2">
            <EventsSection />
          </div>
        </div>
        <BlogSection />
        {/* Bottom spacer for mobile nav */}
        <div className="h-4" />
      </div>
    </div>
  );
}
