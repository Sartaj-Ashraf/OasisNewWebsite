import { BlogsPage } from '@/components/client/Pages/blogs/BlogsPage'
import PageHeader from '@/shared/PageHeader'

const page = () => {
  return (
    <div>
      <PageHeader title="Blogs" />
      <BlogsPage />
    </div>
  )
}

export default page