const steps = [
  {
    num: "01",
    title: "Understand",
    description:
      "We take the time to deeply understand your business, challenges, and goals before proposing solutions.",
  },
  {
    num: "02",
    title: "Innovate",
    description:
      "We leverage the latest technologies and methodologies to create innovative solutions tailored to your needs.",
  },
  {
    num: "03",
    title: "Implement",
    description:
      "We deliver solutions with precision and provide ongoing support to ensure long-term success.",
  },
];

export default function OurApproach() {
  return (
    <section>
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="text-sm tracking-[0.2em] text-gray-400 mb-4 uppercase font-medium">
          Our Approach
        </p>
        <h3 className="font-medium text-black leading-tight mb-4">
          How We Drive Success
        </h3>
        <p className="text-black/70 text-lg leading-relaxed">
          We believe in building lasting partnerships based on trust,
          innovation, and real results.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {steps.map((s) => (
          <div
            key={s.num}
            className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-shadow duration-300"
          >
            <span className="text-primary-dark font-bold text-sm tracking-[0.18em]">
              {s.num}
            </span>
            <h5 className="font-semibold text-gray-800 mt-2 mb-2">{s.title}</h5>
            <p className="text-gray-500 text-sm leading-relaxed">{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
