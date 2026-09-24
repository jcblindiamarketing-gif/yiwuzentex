import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  console.log("🔥 SEND EMAIL API HIT");

  try {
    const body = await req.json();

    console.log("📥 REQUEST BODY:", body);

    const {
      name,
      email,
      clientEmail,
      phone,
      message,
      catalogueTitle,
      catalogueLink,
      subject,
      website,
    } = body;

    // --------------------------------------------------
    // Support both:
    // 1. Normal Contact Form
    // 2. Catalogue Request Form
    // --------------------------------------------------

    const customerEmail = email || clientEmail;

    // --------------------------------------------------
    // Basic validation
    // --------------------------------------------------

    if (!name || !customerEmail || !phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email and phone are required.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // Email configuration
    // --------------------------------------------------

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

    // --------------------------------------------------
    // SMTP transporter
    // --------------------------------------------------

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

    // ==================================================
    // NORMAL CONTACT FORM
    // ==================================================

    if (!catalogueTitle) {
      console.log("📩 NORMAL CONTACT FORM");

      // Send notification to admin
      const leadEmail = "vinod_kumar@jcblmail.com";

      await transporter.sendMail({
        from: `"Zentrex Website" <${emailUser}>`,
        to: leadEmail,

        subject:
          subject || `New Contact Form Submission - ${name}`,

        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #333;">

            <h2 style="color: #10797C;">
              New Contact Form Submission
            </h2>

            <hr />

            <p>
              <strong>Name:</strong>
              ${name}
            </p>

            <p>
              <strong>Email:</strong>
              ${customerEmail}
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
              <strong>Message:</strong>
            </p>

            <p>
              ${message || "No message provided"}
            </p>

            <hr />

            <p>
              A visitor submitted the contact form on the website.
            </p>

          </div>
        `,
      });

      console.log("✅ CONTACT LEAD EMAIL SENT");

      // Send confirmation to customer
      await transporter.sendMail({
        from: `"Zentrex" <${emailUser}>`,
        to: customerEmail,

        subject: "Thank you for contacting Zentrex",

        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">

            <h2 style="color: #10797C;">
              Hello ${name},
            </h2>

            <p>
              Thank you for contacting Zentrex.
            </p>

            <p>
              We have received your message and our team
              will get back to you shortly.
            </p>

            <p>
              Regards,<br />
              <strong>Zentrex</strong>
            </p>

          </div>
        `,
      });

      console.log("✅ CUSTOMER CONFIRMATION EMAIL SENT");

      return NextResponse.json(
        {
          success: true,
          message: "Your message has been sent successfully.",
        },
        { status: 200 }
      );
    }

    // ==================================================
    // CATALOGUE REQUEST FORM
    // ==================================================

    console.log("📚 CATALOGUE REQUEST FORM");

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

    const finalCatalogueLink = String(catalogueLink).trim();

    const finalSubject =
      subject ||
      `Request for ${catalogueTitle} Catalogue`;

    // --------------------------------------------------
    // Send catalogue confirmation to customer
    // --------------------------------------------------

    console.log(
      "📨 Sending catalogue to customer:",
      customerEmail
    );

    await transporter.sendMail({
      from: `"Zentrex" <${emailUser}>`,

      to: customerEmail,

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
            <strong>${catalogueTitle}</strong>
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

    // --------------------------------------------------
    // Send lead notification to admin
    // --------------------------------------------------

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
            ${customerEmail}
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

    return NextResponse.json(
      {
        success: true,
        message:
          "Catalogue email and lead notification sent successfully.",
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ MAIL ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message || "Failed to send email.",
      },
      { status: 500 }
    );
  }
}