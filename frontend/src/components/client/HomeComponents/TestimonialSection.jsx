"use client"

import React, { useEffect, useState } from 'react'
import { TestimonialCard } from './Testimonials/TestimonialCard'
import TestimonialForm from './Testimonials/TestimonialForm'
import { getAllTestimonials } from '@/services/testimonials.service'

export const TestimonialSection = () => {
 const [testimonials, setTestimonials] = useState([])

useEffect(()=>{
  const fetchTestimonials = async () => {
    const response = await getAllTestimonials()
    setTestimonials(response.data)
  }
  fetchTestimonials()
}, [])

  return (
    <section className='flex flex-col md:flex-row  gap-4 pt-8'>
        <TestimonialCard testimonials={testimonials}/>
        <TestimonialForm/>
        </section>
  )
}
