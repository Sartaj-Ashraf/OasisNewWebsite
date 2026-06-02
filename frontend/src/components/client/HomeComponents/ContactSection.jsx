"use client";

import React, { useState } from "react";
import Image from "next/image";

import bgImage from "@/assets/svg/download.svg";
import contactBg from "@/assets/bgcontact.jpg";

import { Button } from "@/shared/ClickAble";
// import { socailLinks, contactLinks } from "@/utils/navLink";
import { createContactApi } from "@/services/contact.service";
import bgImage2 from "@/assets/contactSvg.png";

export const ContactSection = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const [formMessage, setFormMessage] = useState({
    type: "",
    text: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    // clear message while typing
    if (formMessage.text) {
      setFormMessage({
        type: "",
        text: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.fullName.trim() ||
      !form.email.trim() ||
      !form.phoneNumber.trim() ||
      !form.message.trim()
    ) {
      setFormMessage({
        type: "error",
        text: "Please fill all fields.",
      });

      return;
    }

    try {
      setLoading(true);

      const response = await createContactApi(form);

      console.log(response);

      setFormMessage({
        type: "success",
        text: "Message sent successfully!",
      });

      setForm({
        fullName: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
    } catch (error) {
      console.log(error);

      setFormMessage({
        type: "error",
        text: error?.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-10 ">
      <div
        className="relative overflow-hidden rounded-3xl p-4 md:p-8"
        style={{
          backgroundImage: `url(${contactBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.8,
        }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-white/50 to-transparent"></div>

        <div className=" grid lg:grid-cols-2 gap-8 relative z-10">
          {/* LEFT CONTENT */}
          <div className="  text-white relative z-10">
            <h2 className=" relative z-10 text-secondary-dark font-medium leading-tight">
              We’re here to{" "}
              <span className="italic text-transparent bg-clip-text bg-linear-to-r from-primary to-primary-dark px-1">
                help
              </span>{" "}
              with your{" "}
              <span className="italic text-transparent bg-clip-text bg-linear-to-r from-primary to-primary-dark px-1">
                questions
              </span>
              .
            </h2>
            
          <div className="w-full h-full  ">
            <Image src={bgImage2} alt="bgimage" className="object-cover"/>
          </div>
        
          </div>

          {/* RIGHT FORM CARD */}
          <div className="relative w-full max-w-xl mx-auto">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10 ">
              <Image
                src={bgImage}
                alt="form bg"
                fill
                className="object-cover rounded-3xl opacity-80"
              />
            </div>

            {/* FORM CONTAINER */}
            <div
              className="rounded-3xl p-6 flex flex-col justify-between h-full min-h-[420px] max-h-[550px]"
              // style={{
              //   backgroundImage: `url(${bgImage.src})`,
              //   backgroundSize: "cover",
              //   backgroundPosition: "center",
              //   backgroundRepeat: "no-repeat",
              // }}
            >
              <h2 className="font-medium mb-4">Get In Touch</h2>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-between flex-1"
              >
                <div className="space-y-5">
                  {/* FULL NAME */}
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name*"
                    value={form.fullName}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 bg-transparent outline-none py-2 focus:border-black text-sm sm:text-base"
                  />

                  {/* EMAIL */}
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail*"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 bg-transparent outline-none py-2 focus:border-black text-sm sm:text-base"
                  />

                  {/* PHONE NUMBER */}
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number*"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 bg-transparent outline-none py-2 focus:border-black text-sm sm:text-base"
                  />

                  {/* MESSAGE */}
                  <textarea
                    name="message"
                    placeholder="Message*"
                    rows={3}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 bg-transparent outline-none py-2 focus:border-black resize-none text-sm sm:text-base"
                  />

                  {/* FORM MESSAGE */}
                  {formMessage.text && (
                    <div
                      className={`text-sm font-medium rounded-lg px-3 py-2 ${
                        formMessage.type === "success"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {formMessage.text}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="button mt-6 bg-linear-to-br from-primary via-primary to-primary-dark hover:primary-dark hover:via-primary hover:to-primary disabled:opacity-70"
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
