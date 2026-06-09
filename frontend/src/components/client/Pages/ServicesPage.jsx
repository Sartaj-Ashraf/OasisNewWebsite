import PageHeader from "@/shared/PageHeader";
import React from "react";
import { ServiceCard } from "../services/ServiceCard";
import { Megaphone, Code2 , Headphones } from "lucide-react";
import Marque from "@/shared/Marque";
import ServiceFaqs from "../services/ServiceFaqs";
import Cta from "@/shared/Cta";

const services = [
  {
    id: "marketing",
    title: "Digital Marketing",
    description:
      "We specialize in creating, developing, and managing a brand's identity to help businesses stand out in the marketplace and connect with their target audience.",
    bg: "bg-gradient-to-br from-[#cce8f8] via-[#a8d4f0] to-[#7bbde8]",
    titleColor: "text-[#1a2a3a]",
    descColor: "text-[#2a3a50]",
    btnBorder: "border-[#a088cc] text-[#2a1a60]",
    iconColor: "#1a2a3a",
    ServiceIcon: Megaphone,
    link:"digital-marketing"
  },
  {
    id: "web-development",
    title: "Web Development",
    description:
      "We craft visually compelling and user-centric design systems that transform complex ideas into intuitive, beautiful experiences across every touchpoint.",
    bg: "bg-gradient-to-br from-[#e8d0f8] via-[#c9a8ee] to-[#a87ad8]",
    titleColor: "text-[#2a1040]",
    descColor: "text-[#3a1860]",
    btnBorder: "border-[#c080e0] text-[#2a1040]",
    iconColor: "#2a1040",
    ServiceIcon: Code2,
    link:"web-development"
  },
  {
    id: "social-media-marketing",
    title: "Social Media Marketing",
    description:
      "We provide dedicated, around-the-clock support to ensure your business runs smoothly resolving issues swiftly and keeping your customers satisfied.",
    bg: "bg-gradient-to-br from-[#dde3ea] via-[#c8d0db] to-[#b0bcc8]",
    titleColor: "text-[#1a2530]",
    descColor: "text-[#2a3845]",
    btnBorder: "border-[#8090a0] text-[#1a2530]",
    iconColor: "#1a2530",
    ServiceIcon: Headphones,
    link:"social-media-marketing"
  },
];
export const ServicesPage = () => {
  return (
    <div>
      <PageHeader title="Services" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6 place-items-center">
        {services.map((service) => {
            return <ServiceCard key={service.id} service={service} />;
        })}
      </div>
        <Marque/>
      <ServiceFaqs />
      <Cta/>
    </div>
  );
};
