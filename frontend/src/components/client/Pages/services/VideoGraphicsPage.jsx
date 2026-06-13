import React from 'react'
import { ServiceDetail } from '../../services/components/ServiceDetail'
import PageHeader from '@/shared/PageHeader';
import socialMedia from "@/assets/MarketingBg.png";
import { VideoGraphics } from '../../services/components/VideoGraphics';


const servicesContent = {
  bgImage: socialMedia,
  videoAndDesign: {
    label: "WHAT WE OFFER",
    title: "Transform Your Brand with Professional Video Editing & Graphic Design!",
    description:
      "Bring your ideas to life with stunning visuals and engaging content. From high-impact video editing and motion graphics to creative branding and marketing designs, we help businesses capture attention, strengthen their identity, and connect with their audience across every platform.",
    features: [
      "Professional Video Editing",
      "Motion Graphics & Animations",
      "Social Media & Marketing Designs",
      "Brand Identity & Creative Assets",
    ],
    buttonText: "Discover More",
    sideText: "Creative Solutions",
  },
};
export const VideoGraphicsPage = () => {
  return (
    <div className='container mx-auto'>
      <PageHeader title="Video Creation and Graphic Design "  />
      <ServiceDetail content={servicesContent.videoAndDesign}/>
      <VideoGraphics/>
    </div>
  )
}

