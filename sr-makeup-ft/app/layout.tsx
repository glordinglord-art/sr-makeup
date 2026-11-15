import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PublicChrome } from "@/shared/components/layout/public-chrome";
import { MotionProvider } from "@/shared/components/ui/motion-primitives";
import { BUSINESS_CONFIG } from "@/shared/constants/business";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${BUSINESS_CONFIG.name} · Shirley Ram | Técnica Profesional en Maquillaje`,
  description: `${BUSINESS_CONFIG.tagline}. Más de 5 años de experiencia en novias, eventos sociales, quinceañeras y maquillaje artístico en Medellín.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fdfafb] text-stone-800 selection:bg-rose-200">
        <MotionProvider>
          <PublicChrome>{children}</PublicChrome>
        </MotionProvider>
      </body>
    </html>
  );
}
