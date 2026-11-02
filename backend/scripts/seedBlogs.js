// Usage: node scripts/seedBlogs.js
// Inserts draft blog posts (unpublished, no cover). Insert-only: skips any slug that already exists.
// Publish from the admin panel after adding a cover image (the blog cards need one).
import "dotenv/config";
import { randomUUID } from "crypto";
import mongoose from "mongoose";
import Blog from "../models/blogsModel.js";
import { makeSlug } from "../utils/slugUtils.js";

const posts = [
  {
    title: "How to Build a Website That Turns Visitors into Customers",
    excerpt:
      "A good-looking website is not enough. Here is what a site needs, from speed to clear calls to action, to convert visitors into customers.",
    sections: [
      ["Start with one clear goal", "Every page should push the visitor toward one next step: call, book, buy or enquire. When a page tries to do everything, visitors do nothing. Decide the goal first, then design around it."],
      ["Make it fast and mobile-first", "Most visitors arrive on a phone, and many leave if a page takes more than a few seconds to load. Compress images, keep scripts lean and test on real devices, not just a desktop browser."],
      ["Say what you do in the first screen", "Visitors decide quickly whether they are in the right place. Put a plain-language headline, a short supporting line and one visible button above the fold."],
      ["Build trust where people hesitate", "Add proof close to the decision point: client logos, testimonials, clear contact details and a short FAQ that answers pricing, timelines and support."],
      ["Measure and improve", "Track where visitors drop off, test one change at a time and keep what works. A website is never finished; it improves with data."],
    ],
  },
  {
    title: "SEO Basics: How to Rank Higher and Drive Organic Traffic",
    excerpt:
      "Search engine optimization does not need to be a mystery. These fundamentals help your pages get found by the people already searching for what you offer.",
    sections: [
      ["Know what your customers search for", "Keyword research starts with the questions your customers ask. Write down their words, not your internal jargon, and check which phrases have real search demand."],
      ["Match each page to one intent", "A page that tries to rank for everything ranks for nothing. Give each page a single topic, a descriptive title, a clear heading structure and a useful answer."],
      ["Fix the technical foundations", "Search engines need to crawl and understand your site. Keep pages fast, mobile-friendly and secure, submit a sitemap and avoid broken links and duplicate pages."],
      ["Publish content that helps", "Helpful, original content earns links and keeps visitors on the page. Answer real questions in depth and update older posts instead of letting them go stale."],
      ["Be patient and track results", "SEO compounds over months, not days. Watch rankings, clicks and conversions in your analytics, and double down on the pages that already work."],
    ],
  },
  {
    title: "Why Social Media Marketing Needs a Strategy, Not Just Posts",
    excerpt:
      "Posting every day without a plan rarely builds an audience. A simple strategy turns social media from noise into a channel that supports real business goals.",
    sections: [
      ["Pick goals before platforms", "Decide whether you want awareness, leads or loyalty, then choose the platforms where your audience actually spends time. You do not need to be everywhere."],
      ["Know your audience", "Study who follows you, what they react to and when they are online. Content that answers their needs will always outperform content that only talks about you."],
      ["Mix your content", "Combine educational posts, behind-the-scenes stories, customer proof and clear offers. A steady rhythm of useful content builds trust before you ask for a sale."],
      ["Engage, do not just broadcast", "Reply to comments, answer messages and join conversations. Community is built in the replies as much as in the posts."],
      ["Review monthly", "Look at reach, engagement and the clicks that lead to your website. Keep the formats that work and retire the ones that do not."],
    ],
  },
  {
    title: "What a B2B Lead Generation Funnel Looks Like",
    excerpt:
      "Lead generation works best as a connected funnel, from the first touchpoint to a qualified conversation. Here is how the stages fit together.",
    sections: [
      ["Attract the right people", "Use SEO, content and targeted outreach to reach decision-makers who match your ideal customer profile. Quality of attention matters more than volume."],
      ["Capture interest with a clear offer", "Give visitors a reason to share their details: a free consultation, a useful guide or a short audit. Keep the form short and the promise specific."],
      ["Nurture with follow-ups", "Most leads are not ready on day one. Automated, relevant follow-ups keep your business in mind until the timing is right. A CRM such as HubSpot keeps this organised."],
      ["Qualify before you sell", "Score leads by fit and engagement so your team spends time on the conversations most likely to close."],
      ["Close the loop with data", "Track which channels produce customers, not just clicks, and move budget toward what actually drives revenue."],
    ],
  },
  {
    title: "How QR Codes Make Collecting Customer Reviews Easier",
    excerpt:
      "Reviews build trust and local visibility, but most customers never leave one unless asked at the right moment. QR codes make asking effortless.",
    sections: [
      ["Why reviews matter", "Prospective customers read reviews before they call or visit. A steady stream of recent, genuine feedback improves trust and helps your business stand out in local search."],
      ["Ask at the right moment", "The best time to ask is right after a good experience. A QR code on a receipt, table, counter or invoice lets happy customers respond in seconds."],
      ["Remove friction", "Every extra tap costs you responses. A QR flow that opens straight to the review form works better than asking people to search for your business."],
      ["Follow up automatically", "A polite automated reminder after a visit or purchase recovers feedback you would otherwise miss, without extra work for your team."],
      ["Respond and learn", "Thank customers, address problems quickly and look for patterns in the feedback. Reviews are both marketing and a free source of improvement ideas."],
    ],
  },
];

const block = (type, content) => ({ id: randomUUID(), type, content, meta: { alt: "", caption: "" } });

await mongoose.connect(process.env.MONGO_URL);
for (const p of posts) {
  const slug = makeSlug(p.title);
  if (await Blog.exists({ slug })) {
    console.log("skip (exists):", slug);
    continue;
  }
  await Blog.create({
    title: p.title,
    slug,
    excerpt: p.excerpt,
    content: p.sections.flatMap(([h, t]) => [block("h2", h), block("p", t)]),
    isPublished: false,
    publishedAt: null,
    isFeatured: false,
  });
  console.log("created draft:", slug);
}
await mongoose.disconnect();
