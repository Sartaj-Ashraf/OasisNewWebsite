import Image from "next/image";
import AboutImage from "@/assets/OurTeam/shahid.jpeg";
import { Button } from "@/shared/ClickAble"

export default function AboutSection() {
  return (
    <section className="">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div className="max-w-xl">

          {/* Small Label */}
          <p className="text-sm tracking-[0.2em] text-gray-400 mb-4 uppercase font-medium">
            About Us
          </p>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-medium text-black leading-tight mb-6">
            Boost your Website <br /> Traffic!
          </h2>

          {/* Paragraph 1 */}
          <p className="text-black/70 !text-lg leading-relaxed mb-5">
            AI-powered SEO (Search Engine Optimization) offers a bunch
            of benefits that can save time, boost rankings, and make your
            digital strategy way more efficient.
          </p>

          {/* Paragraph 2 */}
          <p className="text-black/70 !text-lg leading-relaxed mb-10">
            Using AI for SEO is super helpful. It can save you time, improve
            your rankings, and really amp up your online strategy.
          </p>

          {/* Button */}
         <div className="flex justify-start">
          <Button className="w-fit button">Get Started</Button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-full h-[400px] md:h-[450px] rounded-[28px] overflow-hidden shadow-lg">
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