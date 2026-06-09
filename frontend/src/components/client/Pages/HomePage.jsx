import React from 'react'
import HeroBanner from '@/shared/HeroBanner'
import { AboutSection } from '../HomeComponents/AboutSection'
import Services from '../HomeComponents/Services'
import Marque from '../../../shared/Marque'
import { TestimonialSection } from '../HomeComponents/TestimonialSection'
import { BlogSection } from '../HomeComponents/BlogSection'
import {ClientsSlider} from '@/shared/ClientsSlider'
import { ContactSection } from '../HomeComponents/ContactSection'
import ProductSection from '@/shared/Product'

export const HomePage = () => {
  return (
    <div>
      <HeroBanner />
      <AboutSection/>
      <ProductSection/>
      <Marque/>
      <Services/>
      <ClientsSlider/>
      <TestimonialSection/>
      <BlogSection/>
      <ContactSection/>
    </div>
  )
}
