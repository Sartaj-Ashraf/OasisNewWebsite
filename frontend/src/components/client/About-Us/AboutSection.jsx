import Image from "next/image";
import AboutImage from "@/assets/AboutImage.png";
import { Button } from "@/shared/ClickAble"
import Link from "next/link";
export default function AboutSection() {
  return (
    
    <section className="">
      <div className="container max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center select-none">

        {/* LEFT */}
        <div className="max-w-xl">

          {/* Small Label */}
          <p className="text-sm tracking-[0.2em] text-gray-400 mb-4 uppercase font-medium">
            About Us
          </p>

          <h3 className=" font-medium text-black leading-tight mb-6">
            Empowering Businesses Through Technology <br /> Marketing
          </h3>

          {/* Paragraph 1 */}
          <p className="text-black/70 text-lg! leading-relaxed mb-5">
           At Oasis Ascend, we help businesses grow by combining innovative technology with result-driven digital marketing. From custom software development and modern websites to social media management and advertising campaigns, we create solutions tailored to your goals.
          </p>

          {/* Paragraph 2 */}
          <p className="text-black/70 text-lg! leading-relaxed mb-10">
           Our team focuses on building powerful digital experiences that increase visibility, streamline operations, and drive measurable growth. Whether you&apos;re launching a new brand or scaling an existing business, we&apos;re here to turn your vision into reality.
          </p>

          {/* Button */}
         <div className="flex justify-start">
          <Button  className="w-fit button bg-[#007bff] text-white hover:bg-[#0056b3] cursor-pointer"> <Link href="/contact-us">Contact Us</Link> </Button>
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