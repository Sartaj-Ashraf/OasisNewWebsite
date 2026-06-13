"use client"

import React, { useEffect, useState } from 'react'
import { TestimonialCard } from './Testimonials/TestimonialCard'
import TestimonialForm from './Testimonials/TestimonialForm'
import { getAllTestimonials } from '@/services/testimonials.service'
import { TestimonialSectionSkeleton } from '@/components/skeleton/TestimonialSectionSkeleton'

export const TestimonialSection = () => {
 const [testimonials, setTestimonials] = useState([])
 const [loading , setLoading] = useState(true)
useEffect(()=>{
  const fetchTestimonials = async () => {
    setLoading(true)
    const response = await getAllTestimonials()
    
    setTestimonials(response.data)
    setLoading(false)

  }
  fetchTestimonials()
}, [])
if(loading){
  return <TestimonialSectionSkeleton/>
}

  return (
    <section className='flex flex-col md:flex-row  gap-4 pt-8'>
        <TestimonialCard testimonials={testimonials}/>
        <TestimonialForm/>
        </section>
  )
}
