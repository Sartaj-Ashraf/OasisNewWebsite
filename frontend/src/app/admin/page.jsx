"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText, Mail, Briefcase, Building2, MessageSquareQuote, Users, Package,
  Plus, ArrowUpRight,
} from "lucide-react";
import { getBlogStats } from "@/services/blogs.service";
import { getContactsApi } from "@/services/contact.service";
import { getApplications } from "@/services/jobApplication.service";
import { getCareerStatsAdmin } from "@/services/careers.service";
import { getTestimonialStats } from "@/services/testimonials.service";

const quickLinks = [
  { title: "Write a blog post", href: "/admin/blogs/create", Icon: FileText },
  { title: "Add a job opening", href: "/admin/careers", Icon: Building2 },
  { title: "Add a team member", href: "/admin/our-team/create", Icon: Users },
  { title: "Add a client", href: "/admin/clients/create", Icon: Users },
  { title: "Manage projects", href: "/admin/projects", Icon: Package },
];

function StatCard({ title, value, hint, Icon, href, loading }) {
  return (
    <Link
      href={href}
      className="group bg-white border border-border-custom rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-primary/60 transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl bg-primary/15 text-secondary-dark flex items-center justify-center">
          <Icon size={19} />
        </div>
        <ArrowUpRight size={16} className="text-text-secondary/40 group-hover:text-secondary-dark transition-colors" />
      </div>
      <p className="mt-4 text-sm text-text-secondary">{title}</p>
      {loading ? (
        <div className="mt-1 h-8 w-16 rounded bg-accent-dark animate-pulse" />
      ) : (
        <p className="mt-1 text-3xl font-semibold text-secondary-dark tracking-tight">{value ?? "—"}</p>
      )}
      <p className="mt-1 text-xs text-text-secondary/70">{hint}</p>
    </Link>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const val = (r) => (r.status === "fulfilled" ? r.value : null);
    Promise.allSettled([
      getBlogStats(),
      getContactsApi({ page: 1, limit: 1, isRead: "false" }),
      getApplications({ page: 1, limit: 1 }),
      getCareerStatsAdmin(),
      getTestimonialStats(),
    ]).then(([blogs, unread, apps, careers, testimonials]) => {
      setStats({
        blogs: val(blogs)?.data?.data,
        unread: val(unread)?.data?.pagination?.total,
        applications: val(apps)?.total,
        careers: val(careers)?.data?.data,
        testimonials: val(testimonials)?.data,
      });
    });
  }, []);

  const loading = stats === null;

  return (
    <div className="min-h-full px-6 md:px-10 py-8 md:py-10 max-w-6xl mx-auto">
      <header className="mb-8 pl-12 md:pl-0">
        <p className="text-sm text-text-secondary">Welcome back</p>
        <h1 className="text-2xl md:text-3xl font-semibold text-secondary-dark tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-text-secondary">A quick look at what needs your attention across the site.</p>
      </header>

      <section className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard
          title="Published blogs" Icon={FileText} href="/admin/blogs" loading={loading}
          value={stats?.blogs?.published}
          hint={`${stats?.blogs?.draft ?? 0} draft${stats?.blogs?.draft === 1 ? "" : "s"} waiting to be published`}
        />
        <StatCard
          title="Unread messages" Icon={Mail} href="/admin/contacts" loading={loading}
          value={stats?.unread} hint="Contact form enquiries not yet opened"
        />
        <StatCard
          title="Job applications" Icon={Briefcase} href="/admin/Job-Application" loading={loading}
          value={stats?.applications} hint="Total received across all openings"
        />
        <StatCard
          title="Open positions" Icon={Building2} href="/admin/careers" loading={loading}
          value={stats?.careers?.activeJobs}
          hint={`${stats?.careers?.totalVacancies ?? 0} vacancies, ${stats?.careers?.inactiveJobs ?? 0} inactive`}
        />
        <StatCard
          title="Testimonials" Icon={MessageSquareQuote} href="/admin/testimonials" loading={loading}
          value={stats?.testimonials?.approved}
          hint={`${stats?.testimonials?.pending ?? 0} pending approval · ${stats?.testimonials?.averageRating ?? 0} avg rating`}
        />
      </section>

      <section className="mt-8">
        <h2 className="text-base font-semibold text-secondary-dark mb-3">Quick actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickLinks.map(({ title, href, Icon }) => (
            <Link
              key={title}
              href={href}
              className="flex items-center gap-3 bg-white border border-border-custom rounded-xl px-4 py-3 text-sm font-medium text-secondary-dark hover:border-primary/60 hover:bg-primary/5 transition-all"
            >
              <span className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-secondary">
                <Icon size={16} />
              </span>
              {title}
              <Plus size={15} className="ml-auto text-text-secondary/50" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
