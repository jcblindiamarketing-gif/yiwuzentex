
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AiOutlineLoading3Quarters,
  AiOutlineClose,
} from "react-icons/ai";
import PhoneInput from "react-phone-input-2";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const notify = (message) => {
  toast(message);
};

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

  // =========================
  // CLOSE MODAL
  // =========================
  const closeForm = () => {
    setFormVisible(false);
    document.body.style.overflow = "auto";
  };

  // =========================
  // BODY SCROLL
  // =========================
  useEffect(() => {
    if (formVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [formVisible]);

  // =========================
  // CLOSE ON OUTSIDE CLICK / ESC
  // =========================
  useEffect(() => {
    if (!formVisible) return;

    const handleClickOutside = (event) => {
      if (
        formRef?.current &&
        !formRef.current.contains(event.target)
      ) {
        closeForm();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeForm();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [formVisible]);

  // =========================
  // VALIDATE FORM
  // =========================
  const validateForm = () => {
    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();

    if (!name || !email || !phone) {
      notify("All fields are required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      notify("Please enter a valid email address");
      return false;
    }

    if (!selectedCatalogue) {
      notify("Catalogue not selected ❌");
      return false;
    }

    return true;
  };

  // =========================
  // FORM SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🔥 FORM SUBMIT CLICKED");

    // Validate form
    if (!validateForm()) {
      return;
    }

    // =========================
    // GET CATALOGUE TITLE
    // =========================
    const catalogueTitle =
      selectedCatalogue?.title ||
      selectedCatalogue?.name ||
      "Catalogue";

    // =========================
    // GET CATALOGUE URL
    // =========================
    const catalogueLink =
      selectedCatalogue?.url ||
      selectedCatalogue?.catalogueUrl ||
      selectedCatalogue?.file ||
      selectedCatalogue?.pdfUrl;

    console.log("📚 SELECTED CATALOGUE:", selectedCatalogue);
    console.log("📌 CATALOGUE TITLE:", catalogueTitle);
    console.log("📎 CATALOGUE LINK:", catalogueLink);

    // =========================
    // CHECK CATALOGUE URL
    // =========================
    if (!catalogueLink) {
      console.error(
        "❌ Catalogue URL not found:",
        selectedCatalogue
      );

      notify("Catalogue link is missing ❌");
      return;
    }

    // =========================
    // CREATE EMAIL SUBJECT
    // =========================
    const subject = `Request for ${catalogueTitle} Catalogue`;

    console.log("📧 EMAIL SUBJECT:", subject);

    setLoading(true);

    try {
      // =========================
      // API PAYLOAD
      // =========================
      const payload = {
        name: formData.name.trim(),
        clientEmail: formData.email.trim(),
        phone: formData.phone.trim(),

        // Catalogue information
        catalogueTitle: catalogueTitle,
        catalogueLink: catalogueLink,

        // Email subject
        subject: subject,

        // Website
        website:
          typeof window !== "undefined"
            ? window.location.hostname
            : "",
      };

      console.log("📤 API PAYLOAD:", payload);

      // =========================
      // API CALL
      // =========================
      const result = await axios.post(
        "/api/send-email",
        payload
      );

      console.log("✅ API STATUS:", result.status);
      console.log("✅ API RESPONSE:", result.data);

      // =========================
      // SUCCESS
      // =========================
      if (
        result.status >= 200 &&
        result.status < 300 &&
        result?.data?.success === true
      ) {
        notify("Email sent successfully ✅");

        setFormData({
          name: "",
          email: "",
          phone: "",
        });

        closeForm();

        return;
      }

      // =========================
      // API RESPONSE BUT FAILED
      // =========================
      notify(
        result?.data?.message ||
          result?.data?.error ||
          "API responded but failed ❌"
      );
    } catch (error) {
      console.error("❌ FRONTEND ERROR:", error);

      const status = error?.response?.status;
      const responseData = error?.response?.data;

      console.error("❌ API STATUS:", status);
      console.error(
        "❌ API ERROR RESPONSE:",
        responseData
      );

      const errorMessage =
        responseData?.message ||
        responseData?.error ||
        error?.message ||
        "Something went wrong ❌";

      notify(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
  <Toaster
  position="top-center"
  containerStyle={{
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }}
  toastOptions={{
    duration: 4000,
    style: {
      padding: "16px 24px",
      fontSize: "16px",
      fontWeight: "500",
      borderRadius: "10px",
      textAlign: "center",
    },
  }}
/>

      <AnimatePresence>
        {formVisible && (
          <motion.div
            className="fixed inset-0 bg-[#10797C]/70 backdrop-blur-sm flex justify-center items-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={formRef}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 15,
              }}
            >
              {/* =========================
                  CLOSE BUTTON
              ========================= */}
              <button
                type="button"
                onClick={closeForm}
                disabled={loading}
                className="absolute top-4 right-4 text-gray-400 cursor-pointer hover:text-[#10797C] transition-colors disabled:opacity-50"
                aria-label="Close"
              >
                <AiOutlineClose size={22} />
              </button>

              {/* =========================
                  TITLE
              ========================= */}
              <h3 className="text-xl font-semibold text-[#10797C] mb-6 pr-8">
                Request Catalogue

                <span className="block text-sm text-gray-500 font-normal mt-1">
                  {selectedCatalogue?.title ||
                    selectedCatalogue?.name ||
                    "Catalogue"}
                </span>
              </h3>

              {/* =========================
                  FORM
              ========================= */}
              <form
                className="space-y-5"
                onSubmit={handleSubmit}
              >
                {/* NAME */}
                <input
                  type="text"
                  placeholder="Your Name"
                  disabled={loading}
                  autoComplete="name"
                  className="w-full border border-gray-300 focus:border-[#10797C] outline-none px-4 py-3 rounded-lg shadow-sm focus:ring-1 focus:ring-[#10797C] transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />

                {/* EMAIL */}
                <input
                  type="email"
                  placeholder="Your Email"
                  disabled={loading}
                  autoComplete="email"
                  className="w-full border border-gray-300 focus:border-[#10797C] outline-none px-4 py-3 rounded-lg shadow-sm focus:ring-1 focus:ring-[#10797C] transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />

                {/* PHONE */}
                <PhoneInput
                  country="cn"
                  value={formData.phone}
                  disabled={loading}
                  onChange={(phone) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone,
                    }))
                  }
                  inputClass="!w-full !h-[48px] !shadow-sm !border !border-gray-300 !rounded-lg"
                  containerClass="!w-full"
                  buttonClass="!border !border-gray-300 !rounded-l-lg"
                />

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-[#10797C] text-white py-3 rounded-lg transition-colors font-medium ${
                    loading
                      ? "cursor-not-allowed opacity-70"
                      : "cursor-pointer hover:bg-[#0b5a5d]"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <AiOutlineLoading3Quarters className="animate-spin" />
                      Delivering Catalogue...
                    </span>
                  ) : (
                    "Submit Request"
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default FormModal;
