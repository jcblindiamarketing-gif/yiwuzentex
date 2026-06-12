import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  console.log("🔥 API HIT");

  try {
    const body = await req.json();
  const { name, email, catalogueLink, subject } = body;

const clientEmail = email;

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
  host: "smtp.zoho.in",
  port: 587,
  secure: false, // ✅ IMPORTANT
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // ✅ prevents SSL issues
  },
});

    // ❌ REMOVE verify() (can fail unnecessarily on some systems)

    const info = await transporter.sendMail({
      from: `"Zentrex" <${process.env.EMAIL_USER}>`,
      to: body.email,
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

// ✅ Second email: Notify the admin
await transporter.sendMail({
  from: `"Zentrex" <${process.env.EMAIL_USER}>`,
  to: "vinod_kumar@jcblmail.com",
  subject: "New Catalogue Request",
  html: `
    <h2>New User Enquiry</h2>

    <p><strong>Name:</strong> ${name}</p>

    <p><strong>Email:</strong> ${clientEmail}</p>

    <p>The user has requested the catalogue.</p>
  `,
});


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
