import React from 'react'
import HeroBanner from '@/shared/HeroBanner'
import { AboutSection } from '../HomeComponents/AboutSection'
import Services from '../HomeComponents/Services'
import Marque from '../../../shared/Marque'
import { TestimonialSection } from '../HomeComponents/TestimonialSection'
import { BlogSection } from '../HomeComponents/BlogSection'
import { ContactSection } from '../HomeComponents/ContactSection'
import ProductSection from '@/shared/Product'
import BrandMarquee from '@/shared/ClientsSlider'

export const HomePage = () => {
  return (
    <div>
      <HeroBanner />
      <AboutSection/>
      <Marque/>
      <Services/>
      <BrandMarquee/>
      <TestimonialSection/>
      <BlogSection/>
      <ProductSection/>
      <ContactSection/>
    </div>
  )
}
