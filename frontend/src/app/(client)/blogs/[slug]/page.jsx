import { BlogSinglePage } from "@/components/client/Pages/blogs/BlogSinglePage";

export default async function Page({ params }) {
  const resolvedParams = await params;

  return <BlogSinglePage slug={resolvedParams.slug} />;
}