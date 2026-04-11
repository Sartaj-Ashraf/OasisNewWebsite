import Image from "next/image";
import Photo from "@/assets/contactheader.png"
import picture from "@/assets/OurTeam/mehran.jpeg"
export default function JoinOurTeam() {
  return (
    
    <section className="container relative w-full h-[400px] rounded-2xl overflow-hidden">
      
      {/* Background Image */}
      <Image
        src={Photo} // put your image in /public
        alt="Join Our Team"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Join Our Team
        </h1>

        <p className="max-w-xl text-sm md:text-base mb-6">
          Join our dynamic team and explore how AI can revolutionize your SEO
          efforts! Together, we can enhance your online presence, boost your
          rankings, and streamline your strategies.
        </p>

        <button className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition">
          DISCOVER MORE
        </button>
      </div>
    </section>
    
  );
}


