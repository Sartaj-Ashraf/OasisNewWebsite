import React from 'react'
import bgImage1 from "@/assets/Status1.jpg";
import bgImage2 from "@/assets/Status2.jpg";

export const Status = () => {
  return (
<section className='grid grid-rows-2 gap-4 sm:col-span-1 h-full'>
        <div className='bg-primary/20 p-4 rounded-2xl h-full flex flex-col  justify-end'
         style={{
              backgroundImage: `url(${bgImage2.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
        >
            <h1 className='font-semibold'>+150k</h1>
            <p>Happy Customers</p>
        </div>
        <div className='bg-primary/20 p-4 rounded-2xl h-full flex flex-col justify-end' 
        
        style={{
              backgroundImage: `url(${bgImage1.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
        >
            <h1 className='font-semibold'>+500</h1>
            <p>Active Partners</p>
        </div>
    </section>
  )
}
