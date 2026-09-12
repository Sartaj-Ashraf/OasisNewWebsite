import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;

  const staticPages: MetadataRoute.Sitemap = [
    "/",
    "/blogs",
    "/careers",
    "/contact-us",
    "/about-us",
  ].map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
  }));

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/sitemap`,
      {
        next: {
          revalidate: 3600, // Revalidate every hour
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch sitemap:", response.status);
      return staticPages;
    }

    const data = await response.json();

    const blogPages: MetadataRoute.Sitemap = (data.blogs ?? []).map(
      (blog: any) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: new Date(blog.updatedAt),
      })
    );

    const careerPages: MetadataRoute.Sitemap = (data.careers ?? []).map(
      (career: any) => ({
        url: `${baseUrl}/careers/${career.slug}`,
        lastModified: new Date(career.updatedAt),
      })
    );

    return [...staticPages, ...blogPages, ...careerPages];
  } catch (error) {
    console.error("Failed to fetch sitemap:", error);

    // Return only static pages if API is unavailable
    return staticPages;
  }
}