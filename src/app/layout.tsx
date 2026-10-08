import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ExitIntentPopup } from "@/components/ui/ExitIntentPopup";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { SmoothScroll } from "@/components/SmoothScroll";
const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ParamShree - SOUL Prakriti",
  description: "ParamShree - Channel partner for SOUL Prakriti by SOUL Agro Farms Pvt. Ltd.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#F5F1E9] text-[#35312F]">
        <SmoothScroll />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ExitIntentPopup />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
