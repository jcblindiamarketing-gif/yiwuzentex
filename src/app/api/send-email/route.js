import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  console.log("🔥 API HIT");

  try {
    const body = await req.json();
    const { name, clientEmail, catalogueLink, subject } = body;

    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log(
      "EMAIL_PASS:",
      process.env.EMAIL_PASS ? "EXISTS ✅" : "MISSING ❌"
    );

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json({
        success: false,
        message: "Email config missing ❌",
      });
    }

    // ✅ FIX: Use explicit SMTP config (more reliable than "service")
  const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // ✅ MUST be false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // ✅ fix SSL issue
  },
});

    // ❌ REMOVE verify() (can fail unnecessarily on some systems)

    const info = await transporter.sendMail({
      from: `"Zentrex" <${process.env.EMAIL_USER}>`,
      to: clientEmail,
      subject: subject,
      html: `
        <h2>Hello ${name}</h2>
        <p>Thank you for your interest in Zentrex.</p>
        <p><strong>Download your catalogue:</strong></p>
        <a href="${catalogueLink}" target="_blank">
          Click here to download
        </a>
      `,
    });

    console.log("📨 Email sent:", info.messageId);

    return NextResponse.json({
      success: true,
      message: "Email sent ✅",
    });

  } catch (error) {
    console.error("❌ MAIL ERROR FULL:", error);

    return NextResponse.json({
      success: false,
      message: error.message || "Email failed ❌",
    });
  }
}