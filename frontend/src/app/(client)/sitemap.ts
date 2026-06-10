import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/sitemap`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  const data = await response.json();

  const staticPages = [
    "/",
    "/blogs",
    "/careers",
    "/contact-us",
    "/about-us",
  ].map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
  }));

  const blogPages = data.blogs.map((blog: any) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.updatedAt),
  }));

  const careerPages = data.careers.map((career: any) => ({
    url: `${baseUrl}/careers/${career.slug}`,
    lastModified: new Date(career.updatedAt),
  }));

  return [...staticPages, ...blogPages, ...careerPages];
}