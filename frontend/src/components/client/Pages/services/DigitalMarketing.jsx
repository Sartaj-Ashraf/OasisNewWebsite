import React from "react";
import {  ServiceDetail } from "../../services/components/ServiceDetail";
import MarketingDetails from "../../services/components/MarketingDetails";
import marketingBG from "@/assets/MarketingBg.png";
import Cta from "@/shared/Cta";


const servicesContent = {
  marketing: {
    label: "WHAT WE OFFER",
    title: "Accelerate Your Brand's Digital Growth with Oasis Ascend!",
    description:
      "Oasis Ascend delivers AI-powered digital marketing strategies from SEO and lead generation to social media and content creation designed to boost your visibility, drive qualified traffic, and grow your business online.",
    features: [
      "Search Engine Optimization",
      "Social Media Marketing",
      "Content Creation & Writing",
      "Website Design & Development",
    ],
    buttonText: "Discover More",
    sideText: "Marketing",
    bgImage:marketingBG
  }


};
export const DigitalMarketing = () => {
  return (
    <div>
      <ServiceDetail content={servicesContent.marketing} />{" "}
      <MarketingDetails/>
      <Cta/>
    </div>
  );
};
