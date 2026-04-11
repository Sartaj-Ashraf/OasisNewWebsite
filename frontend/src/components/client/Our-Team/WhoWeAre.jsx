export default function WhoWeAre() {
  return (
    <section className="container bg-[#f5f6f7] py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        {/* LEFT SIDE */}
        <div>
          <p className="text-sm tracking-widest text-gray-500 mb-4">
            WHO WE ARE
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#0f2b3d]">
            A Professional and <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Innovative Team
            </span>{" "}
            of <br />
            Creatives.
          </h1>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <p className="text-gray-500 mb-10 leading-relaxed">
            AI-powered SEO (Search Engine Optimization) offers a bunch of
            benefits that can save time, boost rankings, and make your digital
            strategy way more efficient.
          </p>

          {/* SKILLS */}
          <div className="space-y-6">

            {/* SEO Analysis */}
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span>SEO Analysis</span>
                <span className="text-teal-500">90%</span>
              </div>
              <div className="w-full h-[4px] bg-gray-200 rounded">
                <div className="h-full bg-teal-400 w-[90%] rounded"></div>
              </div>
            </div>

            {/* SEO Audit */}
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span>SEO Audit</span>
                <span className="text-purple-500">79%</span>
              </div>
              <div className="w-full h-[4px] bg-gray-200 rounded">
                <div className="h-full bg-purple-500 w-[79%] rounded"></div>
              </div>
            </div>

            {/* Optimization */}
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span>Optimization</span>
                <span className="text-red-500">95%</span>
              </div>
              <div className="w-full h-[4px] bg-gray-200 rounded">
                <div className="h-full bg-red-500 w-[95%] rounded"></div>
              </div>
            </div>
          </div>

          {/* BUTTON */}
          <button className="mt-10 px-6 py-3 rounded-full border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-all duration-300">
            DISCOVER MORE
          </button>
        </div>
      </div>
    </section>
  );
}