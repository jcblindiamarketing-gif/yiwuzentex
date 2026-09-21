
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  console.log("🔥 SEND EMAIL API HIT");

  try {
    // =====================================================
    // 1. READ REQUEST BODY
    // =====================================================
    const body = await req.json();

    console.log("📥 REQUEST BODY:", body);

    const {
      name,
      clientEmail,
      phone,
      catalogueTitle,
      catalogueLink,
      subject,
      website,
    } = body;

    // =====================================================
    // 2. VALIDATE REQUIRED DATA
    // =====================================================
    if (!name || !clientEmail || !phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email and phone are required.",
        },
        { status: 400 }
      );
    }

    if (!catalogueTitle) {
      return NextResponse.json(
        {
          success: false,
          message: "Catalogue title is missing.",
        },
        { status: 400 }
      );
    }

    if (!catalogueLink) {
      console.error("❌ CATALOGUE LINK IS MISSING");

      return NextResponse.json(
        {
          success: false,
          message:
            "Catalogue link is missing. Please check the catalogue data in Sanity.",
        },
        { status: 400 }
      );
    }

    // =====================================================
    // 3. EMAIL CONFIG
    // =====================================================
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    console.log("📧 EMAIL USER:", emailUser);
    console.log(
      "🔐 EMAIL PASSWORD:",
      emailPass ? "EXISTS ✅" : "MISSING ❌"
    );

    if (!emailUser || !emailPass) {
      console.error("❌ EMAIL CONFIGURATION MISSING");

      return NextResponse.json(
        {
          success: false,
          message: "Email configuration is missing.",
        },
        { status: 500 }
      );
    }

    // =====================================================
    // 4. CREATE SMTP TRANSPORTER
    // =====================================================
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.in",
      port: 587,
      secure: false,

      auth: {
        user: emailUser,
        pass: emailPass,
      },

      tls: {
        rejectUnauthorized: false,
      },
    });

    // =====================================================
    // 5. FINAL SUBJECT
    // =====================================================
    const finalSubject =
      subject ||
      `Request for ${catalogueTitle} Catalogue`;

    console.log("📌 FINAL SUBJECT:", finalSubject);

    // =====================================================
    // 6. CLEAN CATALOGUE URL
    // =====================================================
    const finalCatalogueLink = String(catalogueLink).trim();

    console.log(
      "📎 FINAL CATALOGUE LINK:",
      finalCatalogueLink
    );

    // =====================================================
    // 7. SEND CATALOGUE TO CUSTOMER
    // =====================================================
    console.log(
      "📨 Sending catalogue to customer:",
      clientEmail
    );

    await transporter.sendMail({
      from: `"Zentrex" <${emailUser}>`,

      to: clientEmail,

      subject: `Thank you for your interest in Zentrex | ${catalogueTitle} Catalogue`,

      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">

          <h2 style="color: #10797C;">
            Hello ${name},
          </h2>

          <p>
            Thank you for your interest in Zentrex.
          </p>

        <p>
  We have successfully received your request for:
</p>

<p>
  Our team will get back to you shortly regarding your request.
</p>

          <p>
            If you have any questions, please feel free to contact us.
          </p>

          <p>
            Regards,<br />
            <strong>Zentrex</strong>
          </p>

        </div>
      `,
    });

    console.log("✅ CUSTOMER EMAIL SENT");

    // =====================================================
    // 8. ADMIN / SALES LEAD EMAIL
    // =====================================================

    // Temporary testing email
    const leadEmail = "vinod_kumar@jcblmail.com";

    console.log(
      "📨 Sending lead notification to:",
      leadEmail
    );

    await transporter.sendMail({
      from: `"Zentrex Website" <${emailUser}>`,

      to: leadEmail,

      subject: finalSubject,

      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #333;">

          <h2 style="color: #10797C;">
            New Catalogue Request
          </h2>

          <hr />

          <p>
            <strong>Catalogue:</strong>
            ${catalogueTitle}
          </p>

          <p>
            <strong>Name:</strong>
            ${name}
          </p>

          <p>
            <strong>Email:</strong>
            ${clientEmail}
          </p>

          <p>
            <strong>Phone:</strong>
            ${phone}
          </p>

          <p>
            <strong>Website:</strong>
            ${website || "Not provided"}
          </p>

          <p>
            <strong>Catalogue URL:</strong>
            <a
              href="${finalCatalogueLink}"
              target="_blank"
              rel="noopener noreferrer"
            >
              ${finalCatalogueLink}
            </a>
          </p>

          <hr />

          <p>
            A visitor submitted a request for the catalogue
            <strong>${catalogueTitle}</strong>.
          </p>

        </div>
      `,
    });

    console.log("✅ LEAD EMAIL SENT");

    // =====================================================
    // 9. SUCCESS RESPONSE
    // =====================================================
    return NextResponse.json(
      {
        success: true,
        message: "Catalogue email and lead notification sent successfully.",
      },
      { status: 200 }
    );

  } catch (error) {
    // =====================================================
    // 10. ERROR HANDLING
    // =====================================================
    console.error("❌ MAIL ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ||
          "Failed to send email.",
      },
      { status: 500 }
    );
  }
}
