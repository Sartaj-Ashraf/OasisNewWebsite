import React from 'react'
import { TestimonialCard } from './Testimonials/TestimonialCard'
import TestimonialForm from './Testimonials/TestimonialForm'

export const TestimonialSection = () => {
  return (
    <section className='flex flex-col md:flex-row  gap-4 pt-8'>
        <TestimonialCard/>
        <TestimonialForm/>
        </section>
  )
}
