import { DegitalMarketing } from '@/components/client/Pages/digital-marketing/DegitalMarketing'
import PageHeader from '@/shared/PageHeader'
import React from 'react'

const page = () => {
  return (
    <div className="container">
        <PageHeader title="Digital Marketing"/>
        <DegitalMarketing/>
    </div>
  )
}

export default page