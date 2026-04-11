import Image from "next/image";
import AboutImage from "@/assets/OurTeam/shahid.jpeg";
export default function AboutSection() {
  return (
    
    <section className="bg-[#f5f6f7] py-24 px-6 md:px-16">
      <div className="container max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div>
          <p className="text-xs tracking-widest text-gray-500 mb-6 uppercase">
            About Us
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-6">
            Boost your Website <br /> Traffic!
          </h1>

          <p className="text-gray-500 leading-relaxed mb-6 max-w-md">
            AI-powered SEO (Search Engine Optimization) offers a bunch
            of benefits that can save time, boost rankings, and make your
            digital strategy way more efficient.
          </p>

          <p className="text-gray-500 leading-relaxed mb-10 max-w-md">
            Using AI for SEO is super helpful. It can save you time, improve
            your rankings, and really amp up your online strategy.
          </p>

          <button className="px-6 py-3 rounded-full border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition duration-300">
            DISCOVER MORE
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-full h-[400px] md:h-[450px] rounded-3xl overflow-hidden">
          <Image
            src={AboutImage}
            alt="AI SEO"
            fill
            className="object-cover"
            priority
          />
        </div>

      </div>
    </section>
  );
}