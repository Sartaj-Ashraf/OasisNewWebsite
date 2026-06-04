
import CareersBody from "@/components/client/Careers/CareerBody";
import PageHeader from "@/shared/PageHeader";

export const metadata = {
  title: "Careers | OasisAscend",
  description: "Join OasisAscend — crafted for impact.",
};

export default function CareersPage() {
  return (
    <div className="container space-y-16">
        <PageHeader title="Career" /> 
        <CareersBody />
    </div>

  );
}