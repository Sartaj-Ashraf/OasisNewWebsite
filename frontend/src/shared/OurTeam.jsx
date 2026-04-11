import Image from "next/image";
import Asif from "@/assets/OurTeam/asif.jpeg";
import Mehran from "@/assets/OurTeam/mehran.jpeg";
import Shahid from "@/assets/OurTeam/shahid.jpeg";

const teamMembers = [
  { name: "Victor Lewis", role: "General Manager", image: Asif },
  { name: "Sandra Watson", role: "Chief Operating Officer", image: Shahid },
  { name: "Dan Breks", role: "Senior Digital Strategist", image: Mehran },
  { name: "Angela Lung", role: "Managing Director", image: Asif },
  { name: "John Carter", role: "SEO Specialist", image: Shahid },
  { name: "Emma Stone", role: "Marketing Lead", image: Mehran },
];

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

const FbIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LiIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function OurTeam() {
  return (
    <main className=" ">
    <section className="py-10 rounded-xl mt-5 bg-gray-50">
      <div className="container max-w-6xl mx-auto px-6 text-center">

        {/* Header */}
        <p className="text-[11px] tracking-[0.18em] text-gray-400 uppercase font-medium mb-3">
          Our Team
        </p>
        <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          Our Professionals
        </h2>
        <p className="text-gray-400 text-[15px] max-w-md mx-auto mb-14 leading-relaxed">
          Ne summo dictas pertinacia nam. Illum cetero vocent ei vim,
          case regione signiferumque vim te.
        </p>

        {/* Divider */}
        <div className="w-10 h-[2px] bg-gray-900 mx-auto mb-14" />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden cursor-pointer bg-white"
              style={{ aspectRatio: "3/4" }}
            >
              {/* Photo */}
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />

              {/* Subtle persistent gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Hover tint */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-400" />

              {/* Bottom info */}
              <div className=" flex flex-col  justify-center w-full absolute bottom-0 text-center px-4 py-4  translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h5 className="text-white  font-xs text-lg leading-snug">
                  {member.name}
                </h5>
                <span className="text-white/70 text-sm mt-0.5 mb-0 group-hover:mb-3 transition-all duration-300">
                  {member.role}
                </span>

                {/* Social icons */}
                <div className="flex gap-2 justify-center overflow-hidden max-h-0 opacity-0 group-hover:max-h-10 group-hover:opacity-100 transition-all duration-300 ease-out">
                  {[XIcon, FbIcon, LiIcon].map((Icon, i) => (
                    <button
                      key={i}
                      className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center transition-colors duration-200 flex-shrink-0"
                    >
                      <Icon />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
    </main>
  );
}