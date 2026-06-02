"use client";

import HeroSlide from "@/components/home/HeroSlide";
import FeaturedVehicles from "@/components/home/FeaturedVehicles";
import ExploreOurCollection from "@/components/home/ExploreOurCollection";
import CountryCardsSection from "@/components/home/CountryCardsSection";
import PopularTagsSection from "@/components/home/PopularTagsSection";
import CarBodyShapesAndBrandsSection from "@/components/home/CarBodyShapesAndBrandsSection";
import GlobalHubSection from "@/components/home/GlobalHubSection";
import StatsSection from "@/components/home/StatsSection";
import BuyerQuestionsSection from "@/components/home/BuyerQuestionsSection";
import HomeBlogSection from "@/components/home/HomeBlogSection";
import Testimonials from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <div className="relative w-full min-w-0 overflow-x-hidden bg-white">
      <HeroSlide />
      <section className="bg-white py-3 md:py-4">
        <div className="container-custom">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 text-center tracking-tight">
            Tradeware selected quality vehicles
          </h2>
        </div>
      </section>
      <FeaturedVehicles />
      <ExploreOurCollection />
      <CountryCardsSection />
      <PopularTagsSection />
      <CarBodyShapesAndBrandsSection />
      <GlobalHubSection />
      <StatsSection />
      <BuyerQuestionsSection />
      <HomeBlogSection />
      <Testimonials />
    </div>
  );
}
