import { ContactSection } from "../HomeComponents/ContactSection";
import ContactFaq from "../HomeComponents/ContactFaq";
import PageHeader from "@/shared/PageHeader";

export const ContactPage = () => {
  return (
    <div>
      {" "}
      <PageHeader title="Contact Us" />
      <ContactSection />
      <ContactFaq />
    </div>
  );
};
