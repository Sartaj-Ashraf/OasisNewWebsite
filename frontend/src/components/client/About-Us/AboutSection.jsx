import Image from "next/image";
import AboutImage from "@/assets/AboutImage.png";
import { Button, LinkBtn } from "@/shared/ClickAble"
import Link from "next/link";
export default function AboutSection() {
  return (
    
    <section className="">
      <div className="grid md:grid-cols-2 gap-16 items-center select-none">

        {/* LEFT */}
    <div className="max-w-xl">
  {/* Small Label */}
  <p className="text-sm tracking-[0.2em] text-gray-400 mb-4 uppercase font-medium">
    About Us
  </p>

  <h3 className="font-medium text-black leading-tight mb-6">
    Empowering Businesses Through Technology <br /> & Marketing
  </h3>

  {/* Paragraph 1 */}
  <p className="text-black/70 text-lg leading-relaxed mb-5">
    Oasis Ascend helps businesses grow through innovative software,
    modern websites, and results-driven digital marketing solutions.
  </p>

  {/* Paragraph 2 */}
  <p className="text-black/70 text-lg leading-relaxed mb-10">
    We create impactful digital experiences that boost visibility,
    improve efficiency, and drive business growth.
  </p>

  {/* Button */}
  <div className="flex justify-start">
    <LinkBtn
      link="/contact-us"
      children="Contact Us"
      className="bg-linear-to-br from-primary via-primary-dark to-primary-dark hover:from-primary-dark hover:via-primary-dark hover:primary"
    />
  </div>
</div>

        {/* RIGHT IMAGE */}
        <div className="relative w-full h-100 md:h-112.5  overflow-hidden ">
          <Image
            src={AboutImage}
            alt="About Us"
            fill
            className="object-contain"
            priority
          />
        </div>

      </div>
    </section>
  );
}