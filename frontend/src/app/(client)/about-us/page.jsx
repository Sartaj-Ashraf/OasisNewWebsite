import AboutSection from "@/components/client/About-Us/AboutSection";
import OurStory from "@/components/client/About-Us/OurStory";
import StatsSection from "@/components/client/About-Us/StatsSection";
import VideoSection from "@/components/client/About-Us/VideoSection";
import WhyChooseUs from "@/components/client/About-Us/WhyChooseUs";
import { TestimonialSection } from "@/components/client/HomeComponents/TestimonialSection";
import PageHeader from "@/shared/PageHeader";
import React from "react";

export const page = () => {
  return (
    <>
      <div className="container space-y-16">
        <PageHeader title="About Us" />
        <AboutSection />
        <VideoSection />
        <StatsSection />
        {/* <OurStory /> */}
        <WhyChooseUs />
        <TestimonialSection />
      </div>
    </>
  );
};
export default page;
