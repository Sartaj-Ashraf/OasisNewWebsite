const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "We offer a comprehensive range of digital services including web development, branding, social media management, content creation, SEO optimization, digital marketing, e-commerce solutions, mobile app development, and custom business solutions.",
  },
  {
    question: "How long does it take to complete a project?",
    answer:
      "Project timelines vary depending on scope and complexity. A simple website might take 2-4 weeks, while more complex projects like e-commerce sites or custom applications could take 2-3 months. We'll provide you with a detailed timeline during our initial consultation.",
  },
  {
    question: "What is your pricing structure?",
    answer:
      "We offer customized pricing based on your specific needs and project requirements. After understanding your goals and scope, we'll provide a detailed proposal with transparent pricing. We offer both project-based and retainer options for ongoing services.",
  },
  {
    question: "Do you offer ongoing support after project completion?",
    answer:
      "Yes! We provide comprehensive support and maintenance packages to ensure your digital assets continue to perform optimally. Our team is available for updates, troubleshooting, and continuous improvements to help your business grow.",
  },
];

export default function ContactFaq() {
  return (
    <section className="py-12 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="font-medium text-black leading-tight mb-3">
          Frequently Asked Questions
        </h3>
        <p className="text-black/70">
          Find answers to the most common questions about our services and
          process.
        </p>
      </div>

      <div className="divide-y divide-gray-200 bg-white rounded-2xl border border-gray-100 px-6">
        {faqs.map((f) => (
          <details key={f.question} className="group py-4">
            <summary className="cursor-pointer list-none flex items-center justify-between font-medium text-gray-900">
              {f.question}
              <span className="ml-4 text-gray-400 group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>
            <p className="mt-3 text-gray-500 text-sm leading-relaxed">{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
