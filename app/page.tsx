"use client";

import ModernHero from "@/components/home/ModernHero";
import HomeVehicleFilter from "@/components/home/HomeVehicleFilter";
import FeaturedVehicles from "@/components/home/FeaturedVehicles";
import AuthoritySection from "@/components/home/AuthoritySection";
import BuyerQuestionsSection from "@/components/home/BuyerQuestionsSection";
import JourneyOverviewSection from "@/components/home/JourneyOverviewSection";
import OperationalProofSection from "@/components/home/OperationalProofSection";
import HighTicketReassuranceSection from "@/components/home/HighTicketReassuranceSection";
import Phase11TrustEngagementSection from "@/components/home/Phase11TrustEngagementSection";
import VisualGallerySection from "@/components/home/VisualGallerySection";
import HomeVideoStripSection from "@/components/home/HomeVideoStripSection";
import HowItWorks from "@/components/home/HowItWorks";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TrustSection from "@/components/home/TrustSection";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";

export default function HomePage() {
  return (
    <div className="relative w-full min-w-0 overflow-x-hidden">
      <ModernHero />
      <HomeVehicleFilter />
      <FeaturedVehicles />
      <AuthoritySection />
      <BuyerQuestionsSection />
      <JourneyOverviewSection />
      <OperationalProofSection />
      <HighTicketReassuranceSection />
      <Phase11TrustEngagementSection />
      <VisualGallerySection />
      <HomeVideoStripSection />
      <HowItWorks />
      <WhyChooseUs />
      <TrustSection />
      <Testimonials />
      <CTA />
    </div>
  );
}
