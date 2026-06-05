import { WebDevPage } from '@/components/client/Pages/WebDevPage'
import PageHeader from '@/shared/PageHeader'
import React from 'react'

const page = () => {
  return (
    <div className="container">
        <PageHeader title="Web Development" />
        <WebDevPage/>
    </div>
  )
}

export default page