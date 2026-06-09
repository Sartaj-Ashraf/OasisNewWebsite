"use client";
import React, { useEffect, useState } from "react";
import { ServiceDetail } from "../../services/components/ServiceDetail";
import { WebsiteShowCase } from "../../services/components/WebsiteShowCase";
import Cta from "@/shared/Cta";
import DevBG from "@/assets/Webdev.webp";
import { fetchAllProjects } from "@/services/Projects.service";
const servicesContent = {
  webDevelopment: {
    bgImage: DevBG,
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
  const [projects, setProjects] = useState([]);
  const fetchProject = async () => {
    try {
      const { data } = await fetchAllProjects();
      setProjects(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);
console.log(projects)
  return (
    <div>
      <ServiceDetail content={servicesContent.webDevelopment} />
      <WebsiteShowCase projects={projects} />
      <Cta />
    </div>
  );
};
