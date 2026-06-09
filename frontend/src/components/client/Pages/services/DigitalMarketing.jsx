import React from "react";
import {  ServiceDetail } from "../../services/components/ServiceDetail";
import MarketingDetails from "../../services/components/MarketingDetails";
import marketingBG from "@/assets/MarketingBg.png";
import Cta from "@/shared/Cta";


const servicesContent = {
  marketing: {
    label: "WHAT WE OFFER",
    title: "Digital Media Marketing That Drives Real Business Growth",
    description:
      "We help brands reach the right audience through a powerful blend of digital marketing and social media strategies. By combining SEO, content creation, paid advertising, and audience engagement, we turn online visibility into measurable business results.",

    features: [
      "SEO & Search Visibility",
      "Social Media Marketing",
      "Performance Advertising",
      "Content Creation & Marketing",
    ],

    buttonText: "Discover More",
    sideText: "Digital Media",
    bgImage: marketingBG,
  },
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
