import { BlogsPage } from '@/components/client/Pages/blogs/BlogsPage'
import PageHeader from '@/shared/PageHeader'

const page = () => {
  return (
    <>
    <div className='container'>
      <PageHeader title="Blogs" />
    </div>
      <BlogsPage />
    </>
  )
}

export default page