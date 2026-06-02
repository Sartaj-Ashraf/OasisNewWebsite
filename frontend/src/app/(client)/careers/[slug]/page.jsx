import { notFound } from "next/navigation";
import { DUMMY_JOBS } from "@/components/client/Careers/dummydata";
import JobDetailClient from "@/components/client/Careers/JobDetailClient";
import PageHeader from "@/shared/PageHeader";

export async function generateStaticParams() {
  return DUMMY_JOBS.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const job = DUMMY_JOBS.find((j) => j.slug === slug);
  if (!job) return {};
  return { title: `${job.title} | Careers — OasisAscend` };
}

export default async function JobDetailPage({ params }) {
  const { slug } = await params;                          // ← fix: await params
  const job = DUMMY_JOBS.find((j) => j.slug === slug);
  if (!job) notFound();
  return(
    <>
      <div className="container space-y-16">
        <PageHeader title="About Us" />
        <JobDetailClient job={job} />
      </div>
    </>
  );
}