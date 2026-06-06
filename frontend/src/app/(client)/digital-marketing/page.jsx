import { DigitalMarketing } from '@/components/client/Pages/digital-marketing/DigitalMarketing'
import PageHeader from '@/shared/PageHeader'
import React from 'react'

const page = () => {
  return (
    <div className="container">
        <PageHeader title="Digital Marketing"/>
        <DigitalMarketing/>
    </div>
  )
}

export default page