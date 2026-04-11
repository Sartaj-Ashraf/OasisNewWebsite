

export default function StatsSection() {
  return (
    <section className="px-6 md:px-16 py-10 bg-[#f5f6f7]">
      <div className="container max-w-7xl mx-auto rounded-3xl p-10 md:p-16 relative overflow-hidden text-white">

        {/* BACKGROUND GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b2b] via-[#1a0b3b] to-[#050510]" />

        {/* GLOW EFFECT */}
        <div className="absolute left-0 bottom-0 w-[300px] h-[300px] bg-blue-500 opacity-30 blur-3xl rounded-full" />
        <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-purple-500 opacity-20 blur-3xl rounded-full" />

        {/* CONTENT */}
        <div className="relative grid md:grid-cols-3 gap-10">

          {/* ITEM 1 */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl text-teal-400">↗</span>
              <h2 className="text-5xl font-semibold">+130%</h2>
            </div>
            <p className="text-gray-300">Conversion Rate Increased</p>
          </div>

          {/* ITEM 2 */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl text-purple-400">↗</span>
              <h2 className="text-5xl font-semibold">+150K</h2>
            </div>
            <p className="text-gray-300">Monthly Active Users</p>
          </div>

          {/* ITEM 3 */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl text-orange-400">↗</span>
              <h2 className="text-5xl font-semibold">+15K</h2>
            </div>
            <p className="text-gray-300">Active Followers</p>
          </div>

        </div>
      </div>
    </section>
  );
}