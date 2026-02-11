import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
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
import Footer from "@/components/layout/Footer";
import FloatingWidgets from "@/components/layout/FloatingWidgets";
import PageTransition from "@/components/animations/PageTransition";
import GSAPButtonHoverInit from "@/components/animations/GSAPButtonHoverInit";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import { SocketProvider } from "@/context/SocketProvider";
import { SiteConfigProvider } from "@/context/SiteConfigContext";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - World's Premium Japanese Car Marketplace`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <body className="bg-cinematic-base text-white antialiased font-body">
        <ThemeProvider>
          <AuthProvider>
            <SocketProvider>
            <SiteConfigProvider>
            <GSAPButtonHoverInit />
            <ModernHeader />
            <main className="min-h-screen w-full min-w-0 overflow-x-hidden">
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

