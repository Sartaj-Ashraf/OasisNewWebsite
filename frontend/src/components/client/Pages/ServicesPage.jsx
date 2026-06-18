import PageHeader from "@/shared/PageHeader";
import React from "react";
import { ServiceCard } from "../services/ServiceCard";
import { Megaphone, Code2 , Headphones } from "lucide-react";
import Marque from "@/shared/Marque";
import ServiceFaqs from "../services/ServiceFaqs";
import Cta from "@/shared/Cta";

const services = [
{
  id: "digital-media-marketing",
  title: "Digital Marketing",
  description:
    "From SEO and paid advertising to video production and graphic design, we create data-driven marketing campaigns and compelling visual content that increase visibility, engagement, and business growth.",
  bg: "bg-gradient-to-br from-[#dde3ea] via-[#c8d0db] to-[#b0bcc8]",
  titleColor: "text-[#1a2530]",
  descColor: "text-[#2a3845]",
  btnBorder: "border-[#8090a0] text-[#1a2530]",
  iconColor: "#1a2530",
  ServiceIcon: Headphones,
  link: "/digital-media-marketing"
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
  id: "video-graphic-design",
  title: "Video Editing & Graphic Design",
  description:
    "Transform your brand with professional video editing and creative graphic design services. Stunning visuals, engaging videos, and brand-focused creative assets that capture attention and leave a lasting impression.",
    bg: "bg-gradient-to-br from-[#dde3ea] via-[#c8d0db] to-[#b0bcc8]",
  titleColor: "text-[#1a2530]",
  descColor: "text-[#2a3845]",
  btnBorder: "border-[#8090a0] text-[#1a2530]",
  iconColor: "#1a2530",
  ServiceIcon: Headphones,
  link: "/video-&-design"
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
