import type { Metadata } from "next";
import { Inter, Poppins, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ModernHeader from "@/components/layout/ModernHeader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const poppins = Poppins({
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
import Footer from "@/components/layout/Footer";
import FloatingWidgets from "@/components/layout/FloatingWidgets";
import PageTransition from "@/components/animations/PageTransition";
import GSAPButtonHoverInit from "@/components/animations/GSAPButtonHoverInit";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import { SocketProvider } from "@/context/SocketProvider";
import { SiteConfigProvider } from "@/context/SiteConfigContext";
import { siteConfig } from "@/lib/site-config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tradewaregroup.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} - World's Premium Japanese Car Marketplace`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - World's Premium Japanese Car Marketplace`,
    description: siteConfig.description,
    images: [
      {
        url: "/tradeware-groups-logo-transparent.png",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - World's Premium Japanese Car Marketplace`,
    description: siteConfig.description,
    images: ["/tradeware-groups-logo-transparent.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteUrl,
    logo: `${siteUrl}/tradeware-groups-logo-transparent.png`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.contact.phone,
        contactType: "customer support",
        email: siteConfig.contact.email,
      },
    ],
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${poppins.variable} ${plusJakarta.variable}`}>
      <body className="bg-[var(--bg-cinematic)] text-[var(--text-primary)] antialiased font-body min-h-dvh min-w-[320px]">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <AuthProvider>
            <SocketProvider>
            <SiteConfigProvider>
            <GSAPButtonHoverInit />
            <ModernHeader />
            <main className="min-h-screen w-full min-w-0 overflow-x-hidden pt-16 md:pt-20 section">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <Footer />
            <FloatingWidgets />
            </SiteConfigProvider>
            </SocketProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

