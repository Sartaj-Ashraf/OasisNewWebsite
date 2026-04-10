import React from 'react'
import { navLinks } from '@/utils/navLink'
import Image from 'next/image'
import svgImg from '@/assets/svg/angle-header.svg'
import svgImgBottom from '@/assets/svg/angle-footer.svg'
import logo from '@/assets/logoColored.png'
export const Footer = () => {
  return (
    <footer className='container py-6'>

    <div className='pl-0 md:pl-[21%] h-screen md:h-[70vh] bg-secondary-dark rounded-3xl relative'>
          <div className="absolute -top-[1px] left-0 ">
                <Image src={svgImg} alt="svg" className="w-[70%] md:w-full md:h-full " />
                <div className="flex items-center gap-2 absolute md:top-5 top-0 md:left-10 left-5">
                   <Image
                    src={logo}
                    alt="logo"
                    width={100}
                    height={100}
                    className="w-36 md:w-48"
                  />
                </div>
              </div>
               <div className="absolute  md:-right-[1px] -right-26 -bottom-1 ">
                <Image src={svgImgBottom} alt="svg" width={100} height={100} className="w-full md:h-full " />
                <p className="text-secondary-dark absolute bottom-5 md:bottom-5 left-15 md:left-20 z-10 text-[8px] md:text-sm">Copyright © 2025 Oasis. All rights reserved.</p>
              </div>
      <div className='container mx-auto px-4 h-full'>
        <div className='flex flex-col gap-4 h-full'>
        
          <div className='flex flex-col md:justify-center h-full gap-2 pt-20 md:pt-10'>
            <span className='text-lg md:text-2xl font-bold text-primary-light'>Quick Links</span>
            <ul className='flex flex-col gap-2'>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className='text-white hover:text-primary transition-colors'>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
    </footer>
  )
}
