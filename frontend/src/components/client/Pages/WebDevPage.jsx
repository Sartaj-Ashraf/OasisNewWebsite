import React from 'react'
import { ServiceDetail } from '../services/components/ServiceDetail'
const servicesContent = {

  webDevelopment: {
    label: "WHAT WE OFFER",
    title: "Build Powerful & Scalable Web Solutions with Oasis Ascend!",
    description:
      "Oasis Ascend delivers cutting-edge web development services—from custom web applications and e-commerce platforms to responsive UI/UX design—built to enhance user experience, ensure optimal performance, and drive your digital transformation online.",
    features: [
      "Custom Web Development",
      "E-Commerce Solutions",
      "Responsive UI/UX Design",
      "API & Backend Integration",
    ],
    buttonText: "Discover More",
    sideText: "Development",
  },
    socialMedia: {
    label: "WHAT WE OFFER",
    title: "Build a Strong Social Presence with Oasis Ascend!",
    description:
      "Oasis Ascend helps brands grow and engage their audience through strategic social media management, creative content, targeted campaigns, and data-driven insights that increase visibility, build trust, and drive meaningful results.",
    features: [
      "Social Media Management",
      "Content Strategy & Creation",
      "Paid Advertising Campaigns",
      "Community Engagement",
    ],
    buttonText: "Discover More",
    sideText: "Social Media",
  },
};
export const WebDevPage = () => {
  return (
    <div><ServiceDetail content={servicesContent}/></div>
  )
}
