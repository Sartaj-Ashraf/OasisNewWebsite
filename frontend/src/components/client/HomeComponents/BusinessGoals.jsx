import { Megaphone, TrendingUp, MonitorSmartphone, Users } from "lucide-react";

const goals = [
  {
    title: "Increase Brand Awareness",
    description:
      "Build recognition and visibility in your market through strategic branding and marketing initiatives.",
    Icon: Megaphone,
  },
  {
    title: "Drive Sales and Leads",
    description:
      "Implement conversion-focused strategies to generate qualified leads and increase revenue.",
    Icon: TrendingUp,
  },
  {
    title: "Improve Website Functionality",
    description:
      "Enhance user experience and technical performance to better serve your customers and achieve business goals.",
    Icon: MonitorSmartphone,
  },
  {
    title: "Enhance Customer Engagement",
    description:
      "Create meaningful interactions that build loyalty and strengthen relationships with your audience.",
    Icon: Users,
  },
];

export default function BusinessGoals() {
  return (
    <section className="py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="text-sm tracking-[0.2em] text-gray-400 mb-4 uppercase font-medium">
          Business Goals
        </p>
        <h3 className="font-medium text-black leading-tight mb-4">
          Oasis Ascend Helps You Achieve Your Business Objectives
        </h3>
        <p className="text-black/70 text-lg leading-relaxed">
          Our solutions are designed to address your specific business goals and
          drive measurable results.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {goals.map(({ title, description, Icon }) => (
          <div
            key={title}
            className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-shadow duration-300"
          >
            <div className="w-11 h-11 rounded-full bg-primary/20 text-secondary-dark flex items-center justify-center mb-4">
              <Icon size={22} strokeWidth={1.8} />
            </div>
            <h5 className="font-semibold text-gray-800 mb-2">{title}</h5>
            <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
