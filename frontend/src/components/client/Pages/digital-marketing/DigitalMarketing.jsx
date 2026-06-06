import React from "react";
import {  ServiceDetail } from "../../services/components/ServiceDetail";
import MarketingDetails from "../../services/components/MarketingDetails";
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
  }

//   webDevelopment: {
//     label: "WHAT WE OFFER",
//     title: "Build Powerful & Scalable Web Solutions with Oasis Ascend!",
//     description:
//       "Oasis Ascend delivers cutting-edge web development services—from custom web applications and e-commerce platforms to responsive UI/UX design—built to enhance user experience, ensure optimal performance, and drive your digital transformation online.",
//     features: [
//       "Custom Web Development",
//       "E-Commerce Solutions",
//       "Responsive UI/UX Design",
//       "API & Backend Integration",
//     ],
//     buttonText: "Discover More",
//     sideText: "Development",
//   },
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
