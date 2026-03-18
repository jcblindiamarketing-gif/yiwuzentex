import React, { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import PhoneInput from "react-phone-input-2";
import { AiOutlineClose } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
const axios = require("axios");

const notify = (msg) => toast(msg);

function FormModal({
  formVisible,
  selectedCatalogue,
  formRef,
  setFormVisible,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const closeForm = () => {
    setFormVisible(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        closeForm();
      }
    }

    function handleKeyDown(event) {
      if (event.key == "Escape") {
        closeForm();
      }
    }

    if (formVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [formVisible, closeForm]);

  const validateForm = (e) => {
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim()
    ) {
      notify("All fields are required");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      notify("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    setLoading(false);
    e.preventDefault();

    setLoading(true);
    try {
      if (validateForm(e)) {
        const result = await axios.post(process.env.NEXT_PUBLIC_API_EMAIL_URL, {
          name: formData.name,
          clientEmail: formData.email,
          phone: formData.phone,
          catalogueLink:
            selectedCatalogue.url || selectedCatalogue.catalogueUrl,
          subject: `Thankyou for your interest in Zentrex | Here is your Catalogue for ${selectedCatalogue.name || selectedCatalogue.title}`,
          website: window.location.hostname,
        });

        console.log("result", result);

        if (result?.data.success === true) {
          notify("Email sent successfully");
          setFormData({ name: "", email: "", phone: "" });
          closeForm();
        } else {
          notify("Something went wrong, please try again");
        }
      }
    } catch (error) {
      notify("Something went wrong, please try again");
      console.error("Error sending email:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <AnimatePresence>
        {formVisible && (
          <motion.div
            className="fixed inset-0 bg-[#10797C]/70 backdrop-blur-sm flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              ref={formRef}
            >
              <button
                onClick={closeForm}
                className="absolute top-4 right-4 text-gray-400 cursor-pointer hover:text-[#10797C] transition-colors"
              >
                <AiOutlineClose size={22} />
              </button>

              <h3 className="text-xl font-semibold text-[#10797C] mb-6">
                Request Catalogue
                <span className="block text-sm text-gray-500 font-normal">
                  {selectedCatalogue?.title || selectedCatalogue?.name}
                </span>
              </h3>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-gray-300 focus:border-[#10797C] outline-none px-4 py-2 rounded-lg shadow-sm focus:ring-1 focus:ring-[#10797C] transition"
                  value={formData?.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full border border-gray-300 focus:border-[#10797C] outline-none px-4 py-2 rounded-lg shadow-sm focus:ring-1 focus:ring-[#10797C] transition"
                  value={formData?.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />

                <PhoneInput
                  country={"cn"}
                  // value={phone}
                  // onChange={(phone) => setPhone(phone)}
                  // inputClass="!w-full !border !border-gray-300 !rounded-lg !shadow-sm !px-4 !py-2 focus:!border-[#10797C] focus:!ring-1 focus:!ring-[#10797C]"
                  // containerClass="!w-full "
                  inputClass="!w-full !shadow-sm  !border !border-gray-300 !py-5"
                  onChange={(e) => setFormData({ ...formData, phone: e })}
                  value={formData?.phone}
                />

                {loading ? (
                  <button
                    className="w-full bg-[#10797C] cursor-not-allowed text-white py-2 rounded-lg transition-colors font-medium"
                    disabled={loading}
                    role="button"
                    type="button"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <AiOutlineLoading3Quarters className="animate-spin" />
                      Delivering Catalogue...
                    </span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-[#10797C] cursor-pointer hover:bg-[#0b5a5d] text-white py-2 rounded-lg transition-colors font-medium"
                    // disabled={loading}
                  >
                    Submit Request
                  </button>
                )}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default FormModal;
