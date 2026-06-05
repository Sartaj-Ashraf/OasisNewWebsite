"use client"
import React, { useState } from 'react'
import { LinkBtn } from './ClickAble'

export const Cta = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSignUp = () => {
    if (email.trim()) {
      setSubmitted(true)
    }
  }

  return (
    <div className="relative w-full min-h-[340px] flex items-center rounded-2xl justify-center px-5 py-16 box-border"
      style={{ background: 'linear-gradient(135deg, #fffde7 0%, #e8f4f8 50%, #dceefb 100%)' }}
    >
      <div className="text-center w-full max-w-2xl">
        <h2 className=" font-medium text-[#111111] mb-4 tracking-tight leading-tight">
          Say Hello to <span className="text-primary-dark italic">Oasis Ascend!</span>
        </h2>
       
       
        <p className="text-[1.05rem] text-[#555e6e] font-medium leading-relaxed mb-9">
          Unlock the power of Oasis Ascend. Stay ahead of the competition and
          unleash your creativity with our latest deals and updates. Sign up for
          our newsletter and get ready to take your business to the next level.
        </p>
           <div className="flex items-center justify-center gap-4 flex-wrap">
          <LinkBtn
            link="/contact-us"
            className="px-4 py-2 rounded-full bg-secondary text-white "
          >
            Get Started 
          </LinkBtn>
 
          <LinkBtn
            link="/about-us"
            className="px-4 py-2 rounded-full text-white bg-primary"
          >
            Learn More
          </LinkBtn>
        </div>
      </div>    
    </div>
  )
}

export default Cta