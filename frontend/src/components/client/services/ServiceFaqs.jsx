"use client";
import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import topright from "@/assets/svg/angle-section-end.svg";
import shape from "@/assets/svg/section-decor.svg";
import Image from "next/image";

const faqs = [
  {
    id: 1,
    question: "What services does Oasis Ascend offer?",
    answer:
      "Oasis Ascend provides full-spectrum digital growth solutions including Website Design & Development, Custom Software Development, Mobile App Development (iOS & Android), SEO Services, Social Media Marketing, Content Creation, Content Writing, Lead Generation, and HubSpot CRM & automation services.",
  },
  {
    id: 2,
    question: "Which industries does Oasis Ascend specialize in?",
    answer:
      "We serve a wide range of industries including Hospitality, B2B, Education, Healthcare, E-commerce, Real Estate, and Automotive. Each industry gets a tailored marketing strategy designed to deliver measurable, sector-specific results.",
  },
  {
    id: 3,
    question: "How does Oasis Ascend help grow my business?",
    answer:
      "We help you increase brand awareness, drive qualified sales and leads, improve website functionality, and enhance customer engagement — all through data-driven strategies and innovative solutions customized to your specific business objectives.",
  },
  {
    id: 4,
    question: "Does Oasis Ascend offer SEO consultancy services?",
    answer:
      "Yes! Beyond standard SEO, we offer dedicated SEO Consultancy Services to help you build a long-term organic growth strategy. Our experts analyze your current performance, identify opportunities, and create a roadmap to improve your search rankings and drive consistent organic traffic.",
  },
  {
    id: 5,
    question: "How can I get started with Oasis Ascend?",
    answer:
      "Getting started is simple — reach out via email at sales@oasisascend.com, call or WhatsApp us at +918491012121, or fill out the contact form on our website. We offer a free strategy session with no long-term contracts required, so you can explore our services risk-free.",
  },
];

export default function ServiceFaqs() {
  const [openId, setOpenId] = useState(1);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  }; 

  return (
    <div className="flex items-center justify-center py-8 ">
      <div className="w-full  bg-[#eeeef0] rounded-3xl relative max-h-fit">
        <div className="absolute -right-1 top-0 z-10 w-54 ">
          <Image
            src={topright}
            alt=""
            width={100}
            height={100}
            className="w-full "
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2 items-center justify-center w-full">
          {/* Left Column */}
          <div className="flex-1 w-full md:w-xl relative px-6 flex flex-col justify-center md:min-h-[420px] md:max-h-fit lg:ml-[18%] mt-14 md:mt-0">
            <div className="absolute lg:-left-30 z-10 w-[40%] lg:w-[80%]">
              {" "}
              <Image
                src={shape}
                alt=""
                width={100}
                height={100}
                className="w-full "
              />
            </div>
            <div className="relative z-10">
              <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-4">
                What We Offer
              </p>
              <h2 className="text-4xl lg:text-5xl! font-medium text-gray-900 leading-tight">
                We offer the most
                <br />
                exceptional <span className="text-primary italic">digital</span>
                <br />
                <span className="text-secondary italic">marketing </span>  <span className="text-primary-dark italic">services.</span>
              </h2>

              <p className="text-gray-500 text-base mb-2 md:mb-8 leading-relaxed">
                Oasis Ascend accelerates business growth through innovative
                software and digital marketing solutions where your brand goes
                viral or goes home.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className=" px-6 lg:py-8 lg:w-md flex flex-col md:mt-8">
            <div className="divide-y divide-gray-300">
              {faqs.map((faq) => (
                <div key={faq.id} className="py-4">
                  <button
                    onClick={() => toggle(faq.id)}
                    className="w-full flex items-center justify-between text-left group"
                  >
                    <span className="font-medium text-gray-900 text-sm pr-4">
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 w-7 h-7 rounded-full border border-gray-400 flex items-center justify-center">
                      {openId === faq.id ? (
                        <ChevronUp
                          className="w-3.5 h-3.5 text-gray-600"
                          strokeWidth={2.5}
                        />
                      ) : (
                        <ChevronDown
                          className="w-3.5 h-3.5 text-gray-500"
                          strokeWidth={2.5}
                        />
                      )}
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openId === faq.id
                        ? "max-h-40 opacity-100 mt-3"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-gray-500 text-sm leading-relaxed pr-8">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
