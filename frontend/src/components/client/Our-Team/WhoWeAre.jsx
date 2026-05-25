import { LinkBtn } from "@/shared/ClickAble";

const CircularProgress = ({ percentage, color, title }) => {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="3" />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-800">{percentage}%</span>
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-gray-700">{title}</p>
    </div>
  );
};

export default function WhoWeAre() {
  const skills = [
    { title: "SEO Analysis", percentage: 90, color: "#14b8a6" },
    { title: "SEO Audit", percentage: 79, color: "var(--primary)" },
    { title: "Optimization", percentage: 95, color: "#14b8a6" },
  ];

  return (
    <section className="container py-24 px-6 md:px-16">
      <div className=" grid md:grid-cols-2 gap-16 ">
        {/* LEFT SIDE */}
        <div>
          <p className="text-sm tracking-widest text-gray-500 mb-4">
            WHO WE ARE
          </p>
          <h2 className="font-medium leading-tight text-secondary-dark">
            A Professional and <br />
            <span className="bg-linear-to-r from-primary to-primary-dark font-semibold italic bg-clip-text text-transparent">
              Innovative Team
            </span>{" "}
            of <br /> Creatives.
          </h2>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <p className="text-gray-500 mb-10 leading-relaxed">
            AI-powered SEO (Search Engine Optimization) offers a bunch of benefits that can save time, boost rankings, and make your digital strategy way more efficient.
          </p>

          {/* CIRCULAR PROGRESS INDICATORS */}
          <div className="flex justify-around gap-8 mb-10">
            {skills.map((skill, index) => (
              <CircularProgress
                key={index}
                title={skill.title}
                percentage={skill.percentage}
                color={skill.color}
              />
            ))}
          </div>

          {/* BUTTON */}
          <LinkBtn
            link="#"
            children="Discover More"
            className="bg-linear-to-br from-secondary via-secondary to-secondary-dark hover:from-secondary-dark hover:via-secondary"
          />
        </div>
      </div>
    </section>
  );
}
