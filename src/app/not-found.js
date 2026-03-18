"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiAlertTriangle } from "react-icons/fi";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white text-center">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="mb-6"_
            >
                <FiAlertTriangle size={80} className="text-[#10797C]" />
            </motion.div>

            <motion.h1
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl font-bold text-gray-800 mb-4"
            >
                404 - Page Not Found
            </motion.h1>

            <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-gray-600 max-w-xl"
            >
                {`The page you're looking for is currently under development as we continue building the ZENTREX experience. Some links in the navigation might not be active just yet — but we’re working on it!`}
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-10"
            >
                <Link
                    href="/"
                    className="inline-block bg-[#10797C] hover:bg-[#0c5f60] text-white px-6 py-3 rounded-full text-lg font-medium transition-all"
                >
                    Go Back Home
                </Link>
            </motion.div>
        </div>
    );
}
