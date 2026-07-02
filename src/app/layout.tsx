import type { Metadata } from "next";
import { Prompt, Inter } from "next/font/google";
import "./globals.css";
import "aos/dist/aos.css";
import { buildMetadata } from "@/lib/seo";
import { QuoteModalProvider } from "@/context/QuoteModalContext";
import Navbar from "@/components/layout/Navbar";
import NewsCategoryBar from "@/components/layout/NewsCategoryBar";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/home/CookieConsent";
import DeferredClientOverlays from "@/components/providers/DeferredClientOverlays";
import AOSProvider from "@/context/AOSProvider";
import SmoothScroll from "@/components/ui/SmoothScroll";
import WebVitalsReporter from "./WebVitalsReporter";


// Load Prompt for Thai text
const prompt = Prompt({
  variable: "--font-prompt",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  display: "swap",
  fallback: ["Tahoma", "Microsoft Sans Serif", "sans-serif"],
});

// Load Inter for English/numbers
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  ...buildMetadata(),
  verification: {
    google: "XBZroDGp_kA28tbvOnFUymh1DsDybkbicMoyPmsQ8JY",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${prompt.variable} ${inter.variable} min-h-screen antialiased`}
    >
      <body className="flex flex-col min-h-screen kimx-light-bg text-[#1D1D1F] antialiased selection:bg-sky-200 selection:text-sky-900">
        <AOSProvider>
          <WebVitalsReporter />
          <QuoteModalProvider>
            <SmoothScroll>
              {/* Main header navbar */}
              <Navbar />
              
              {/* News Category secondary bar */}
              <NewsCategoryBar />
              
              {/* Main page content */}
              <main className="grow">{children}</main>
              
              {/* Main footer section */}
              <Footer />

              {/* Cookie consent bar */}
              <CookieConsent />

              {/* Deferred Request quote modal dialog */}
              <DeferredClientOverlays />
            </SmoothScroll>
          </QuoteModalProvider>
        </AOSProvider>
      </body>
    </html>
  );
}
