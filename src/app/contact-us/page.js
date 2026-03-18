"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import images from "@/assets"; // make sure this imports your AboutHeader
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export default function ContactPage() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
    phone: ""
  })
  const [isLoading, setIsLoading] = useState(false);

  const notify = (msg) => toast(msg);

  const handleFormSubmit = async (e) => {
    setIsLoading(false);
    e.preventDefault();
    // Handle form submission logic here

    if (!contactForm.name || !contactForm.email || !contactForm.message || !contactForm.phone) {
      notify("All fields are required");
      return;
    }

    setIsLoading(true);
    // Send form data to server
    const { data } = await axios.post(process.env.NEXT_PUBLIC_CONTACT_API_URL, { ...contactForm, website: window.location.hostname });

    if (data.success) {
      notify(data.message);
      setContactForm({ name: "", email: "", message: "", phone: "" });
      setIsLoading(false);
    }
    else {
      notify(data.message || "Something went wrong, please try again");
      setIsLoading(false);
    }

  };

  return (
    <>
      <Toaster />
      <div className="w-full">
        {/* Banner */}
        <header className="relative w-full max-md:h-[300px]">
          <Image
            src={images.AboutHeader}
            alt="Contact"
            className="w-full max-md:h-full object-cover"
          />
          <div className="absolute bottom-10 left-20 max-md:left-5 max-md:bottom-7">
            <h2 className="text-6xl max-md:text-3xl font-semibold text-white">Contact Us</h2>
          </div>
        </header>

        {/* Intro */}
        <section className="py-16 px-4 text-center max-w-3xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-semibold text-[#10797C] mb-4"
          >
            Let’s Connect
          </motion.h3>
          <p className="text-gray-600 text-lg">
            Whether you have a query, partnership idea, or business proposal — we’re here to help. Fill the form below and we’ll get back to you promptly.
          </p>
        </section>

        {/* Form & Info */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 px-6 md:px-20 pb-20">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-xl p-8 rounded-2xl space-y-6"
            onSubmit={handleFormSubmit}
          >
            <div>
              <label className="block text-sm text-[#10797C] font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#10797C]"
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                value={contactForm?.name}
              />
            </div>
            <div>
              <label className="block text-sm text-[#10797C] font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#10797C]"
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                value={contactForm?.email}
              />
            </div>
            <div>
              <label className="block text-sm text-[#10797C] font-medium mb-1">Contact Number</label>
              <input
                type="number"
                placeholder="+86 1234567890"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#10797C]"
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                value={contactForm?.phone}
              />
            </div>
            <div>
              <label className="block text-sm text-[#10797C] font-medium mb-1">Message</label>
              <textarea
                placeholder="Write your message here..."
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#10797C]"
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                value={contactForm?.message}
              ></textarea>
            </div>
            {isLoading ? (
              <button
                className=" bg-[#10797C] cursor-not-allowed text-white  rounded-lg px-6 py-3 transition-colors font-medium"
                disabled={isLoading}
                role="button"
                type="button"
              >
                <span className="flex items-center justify-center gap-2">
                  <AiOutlineLoading3Quarters className="animate-spin" />
                  Sending...
                </span>
              </button>
            ) : <button
              type="submit"
              className="bg-[#10797C] cursor-pointer hover:bg-[#0d6163] text-white font-medium px-6 py-3 rounded-lg transition duration-300"
            >
              Send Message
            </button>}
          </motion.form>

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-[#10797C]"
          >
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-2xl mt-1" />
              <div>
                <h4 className="text-lg font-semibold">Our Office</h4>
                <p className="text-gray-600">
                  Room 3019, 3rd Floor, No.399 Jiangbin North Road, Choucheng Street, Yiwu City, Jinhua City, Zhejiang Province, China
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaEnvelope className="text-2xl mt-1" />
              <div>
                <h4 className="text-lg font-semibold">Email</h4>
                <p className="text-gray-600">info@yiwuzentrex.com
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-2xl mt-1" />
              <div>
                <h4 className="text-lg font-semibold">Call Us</h4>
                <p className="text-gray-600">+86 - 19557958903</p>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </>

  );
}
