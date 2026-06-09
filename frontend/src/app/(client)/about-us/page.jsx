import AboutSection from "@/components/client/About-Us/AboutSection";
import OurStory from "@/components/client/About-Us/OurStory";
import StatsSection from "@/components/client/About-Us/StatsSection";
import VideoSection from "@/components/client/About-Us/VideoSection";
import WhyChooseUs from "@/components/client/About-Us/WhyChooseUs";
import { TestimonialSection } from "@/components/client/HomeComponents/TestimonialSection";
import OurTeam from "@/shared/OurTeam";
import PageHeader from "@/shared/PageHeader";
import React from "react";
import ProductsSection from "@/components/client/About-Us/Products";

export const page = () => {
  return (
    <>
      <div className="container space-y-16">
        <PageHeader title="About Us" />
        <AboutSection />
        <VideoSection />
        <StatsSection />
        {/* <OurStory /> */}
          <OurTeam/>
        <WhyChooseUs />
        <TestimonialSection />
      </div>
    </>
  );
};
export default page;
