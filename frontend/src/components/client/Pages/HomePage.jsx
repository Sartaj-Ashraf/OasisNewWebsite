import React from 'react'
import HeroBanner from '@/shared/HeroBanner'
import { AboutSection } from '../HomeComponents/AboutSection'
import Services from '../HomeComponents/Services'

export const HomePage = () => {
  return (
    <div>
      <HeroBanner />
      <AboutSection/>
      <Services/>
    </div>
  )
}
