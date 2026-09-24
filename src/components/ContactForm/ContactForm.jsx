"use client";

import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function ContactForm() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !contactForm.name.trim() ||
      !contactForm.email.trim() ||
      !contactForm.phone.trim() ||
      !contactForm.message.trim()
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      setIsLoading(true);

      console.log("📤 Sending form:", contactForm);

      const response = await axios.post("/api/send-email", {
        name: contactForm.name.trim(),
        email: contactForm.email.trim(),
        phone: contactForm.phone.trim(),
        message: contactForm.message.trim(),
        website: window.location.hostname,
      });

      console.log("📥 API RESPONSE:", response.data);

      if (response.data?.success) {
        toast.success(
          response.data.message || "Message sent successfully!"
        );

        // Reset form
        setContactForm({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error(
          response.data?.message || "Something went wrong."
        );
      }
} catch (error) {
  console.error("❌ SEND EMAIL ERROR:", error);
  console.error("Status:", error?.response?.status);

  console.error(
    "API response:",
    JSON.stringify(error?.response?.data, null, 2)
  );

  const errorMessage =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    "Request failed";

  toast.error(errorMessage);
} finally {
  setIsLoading(false);
}
};
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
        }}
      />

      <motion.form
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.6,
        }}
        onSubmit={handleFormSubmit}
        className="bg-white shadow-xl p-6 rounded-2xl space-y-5"
      >
        {/* Heading */}
        <div>
          <h3 className="text-2xl font-semibold text-[#10797C]">
            Contact Us
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Send us your enquiry and we will get back to you.
          </p>
        </div>

        {/* Name */}
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm text-[#10797C] font-medium mb-1"
          >
            Name
          </label>

          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Your Name"
            value={contactForm.name}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#10797C] disabled:bg-gray-100"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm text-[#10797C] font-medium mb-1"
          >
            Email
          </label>

          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={contactForm.email}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#10797C] disabled:bg-gray-100"
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="contact-phone"
            className="block text-sm text-[#10797C] font-medium mb-1"
          >
            Contact Number
          </label>

          <input
            id="contact-phone"
            name="phone"
            type="tel"
            placeholder="+86 1234567890"
            value={contactForm.phone}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#10797C] disabled:bg-gray-100"
          />
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="contact-message"
            className="block text-sm text-[#10797C] font-medium mb-1"
          >
            Message
          </label>

          <textarea
            id="contact-message"
            name="message"
            placeholder="Write your message here..."
            value={contactForm.message}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full h-20 resize-none border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#10797C] disabled:bg-gray-100"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#10797C] hover:bg-[#0d6163] text-white font-medium px-6 py-3 rounded-lg transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <AiOutlineLoading3Quarters className="animate-spin" />
              Sending...
            </span>
          ) : (
            "Send Message"
          )}
        </button>
      </motion.form>
    </>
  );
}