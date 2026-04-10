import React from 'react'
import HeroBanner from '@/shared/HeroBanner'
import { AboutSection } from '../HomeComponents/AboutSection'
import Services from '../HomeComponents/Services'
import Marque from '../../../shared/Marque'
import { TestimonialSection } from '../HomeComponents/TestimonialSection'
import { BlogSection } from '../HomeComponents/BlogSection'

export const HomePage = () => {
  return (
    <div>
      <HeroBanner />
      <AboutSection/>
      <Marque/>
      <Services/>
      <TestimonialSection/>
      <BlogSection/>
    </div>
  )
}
