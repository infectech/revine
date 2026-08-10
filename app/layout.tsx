import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Fraunces, Manrope } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import PixelInit from "@/components/PixelInit";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SITE_CONFIG, META_PIXEL_ID } from "@/lib/config";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | Premium Shirts`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  openGraph: {
    title: `${SITE_CONFIG.name} | Premium Shirts`,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | Premium Shirts`,
    description: SITE_CONFIG.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
  };

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${fraunces.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/logo golden.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="flex min-h-full flex-col bg-white text-black"
        suppressHydrationWarning
      >
        {META_PIXEL_ID && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${META_PIXEL_ID}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
        <PixelInit />
        <div className="w-full overflow-hidden bg-black py-2 text-center text-xs font-semibold uppercase tracking-widest text-gold sm:text-sm">
          <span className="inline-block animate-[marquee_18s_linear_infinite] whitespace-nowrap">
            🎉 Buy 2 or more shirts and get 50% discount + 50tk Delivery Charge!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🎉 Buy 2 or more shirts and get 50% discount + 50tk Delivery Charge!
          </span>
        </div>
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
        <CartDrawer />
        <WhatsAppButton />
        <Toaster position="top-center" richColors />
        <Analytics />
      </body>
    </html>
  );
}
