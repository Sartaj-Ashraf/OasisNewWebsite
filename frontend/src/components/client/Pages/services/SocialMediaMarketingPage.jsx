import React from 'react'
import { ServiceDetail } from '../../services/components/ServiceDetail'
import { SocialMediaDetails } from '../../services/components/SocailMediaDetials';
import PageHeader from '@/shared/PageHeader';
import socialMedia from "@/assets/MarketingBg.png";


const servicesContent = {
  bgImage:socialMedia,
  organicSocial: {
    label: "WHAT WE OFFER",
    title: "Build a Cult-Like Following with Oasis Ascend!",
    description:
      "Stop chasing vanity metrics and start building a loyal community. We craft thumb-stopping organic content, manage influencer partnerships, and engage with your audience in real-time to build deep, lasting brand affinity.",
    features: [
      "Platform-Native Content Creation",
      "Influencer & Creator Partnerships",
      "Proactive Community Management",
      "Trend Interception & Viral Strategy",
    ],
    buttonText: "Discover More",
    sideText: "Organic Growth",
  },
  paidSocial: {
    label: "WHAT WE OFFER",
    title: "Maximize Your ROI with Targeted Paid Social Campaigns!",
    description:
      "Scale your winning content and capture high-intent buyers. Our performance marketing team engineers highly optimized ad funnels across Meta, TikTok, and LinkedIn to lower your acquisition costs and maximize revenue.",
    features: [
      "Advanced Audience Targeting",
      "A/B Creative Testing",
      "Conversion Funnel Optimization",
      "Real-Time Analytics Dashboard",
    ],
    buttonText: "Discover More",
    sideText: "Paid Media",
  }
};
export const SocialMediaMarketingPage = () => {
  return (
    <div className='container mx-auto'>
      <PageHeader title="Social Media Marketing" />
      <ServiceDetail content={servicesContent.organicSocial}/>
      <SocialMediaDetails/>
    </div>
  )
}

