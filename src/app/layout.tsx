import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter, Poppins, Space_Grotesk } from "next/font/google";
import { profile } from '@/data/profile';
import "./globals.css";
import AnimatedCursor from '../components/AnimatedCursor';
import SmoothScrollHandler from '@/components/SmoothScrollHandler';
import TouchIndicator from '@/components/TouchIndicator';
import { ThemeProvider } from '@/components/utils/ThemeProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ["latin"],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${profile.brandTitle} - ${profile.shortName}`,
  description: "Portafolio personal profesional con diseño moderno y experiencia 3D interactiva",
  keywords: ["portafolio", "desarrollo web", "React", "Next.js", "3D"],
  authors: [{ name: profile.shortName }],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: profile.brandTitle,
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${poppins.variable} ${spaceGrotesk.variable} antialiased`}
        style={{ position: 'relative' }}
      >
        <ThemeProvider>
          <AnimatedCursor />
          <SmoothScrollHandler />
          <TouchIndicator />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
