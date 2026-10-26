
import { Geist, Geist_Mono, Urbanist } from "next/font/google";
import "react-phone-input-2/lib/style.css";
import "./globals.css";

import Footer from "@/components/Footer/Footer";
import NavWrapper from "./wrapper/NavWrapper";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  weight: ["100", "200", "300", "400", "500", "600"],
  subsets: ["latin"],
});

const siteTitle = "Zentrex - Your Trusted Partner";

const siteDescription =
  "Zentrex provides cutting-edge solutions in supply chain management, product development, and more.";

const siteUrl = "https://www.yiwuzentrex.com";

const socialImage = "/og-image.jpg";

// Global SEO and social sharing metadata
export const metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: siteTitle,
    template: "%s | Zentrex",
  },

  description: siteDescription,

  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Zentrex",
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: socialImage,
        alt: siteTitle,
      },
    ],
  },

  verification: {
    google: "txn1pQuHmJj_tZiFlNitpgv4-ex54E2LNSiBjCfADEM",
  },

  icons: {
    icon: [
      {
        url: "/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon.ico",
        rel: "shortcut icon",
      },
    ],
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  appleWebApp: {
    title: "Zentrex",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${urbanist.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5L87GK7Z"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <NavWrapper />
        {children}
        <Footer />

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-L140LLTMKG"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L140LLTMKG');
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5L87GK7Z');
          `}
        </Script>
      </body>
    </html>
  );
}
