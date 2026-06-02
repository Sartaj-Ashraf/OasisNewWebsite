import { notFound } from "next/navigation";
import JobDetailClient from "@/components/client/Careers/JobDetailClient";
import PageHeader from "@/shared/PageHeader";

async function getJob(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/careers/slug/${slug}`,
      { next: { revalidate: 60 } }           // ISR — revalidate every 60s
    );
    const data = await res.json();
    if (!data.success) return null;
    return data.data;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) return { title: "Job Not Found | OasisAscend" };
  return {
    title: `${job.JobTitle} | Careers — OasisAscend`,
    description: job.jobDescription?.slice(0, 155),
  };
}

export default async function JobDetailPage({ params }) {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) notFound();
  return 
  return(
    <>
      <div className="container space-y-16">
        <PageHeader title="About Us" />
        <JobDetailClient job={job} />
      </div>
    </>
  )
  ;
}