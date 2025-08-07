import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Poppins, Space_Grotesk } from "next/font/google";
import "./globals.css";
import AnimatedCursor from '../components/AnimatedCursor';

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
  title: "Portafolio 2026 - Gustavo Rodríguez",
  description: "Portafolio personal con diseño moderno y experiencia 3D interactiva",
  keywords: ["portafolio", "desarrollo web", "React", "Next.js", "3D"],
  authors: [{ name: "Gustavo Rodríguez" }],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Portafolio 2026",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Portafolio 2026" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${poppins.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <AnimatedCursor />
        {children}
      </body>
    </html>
  );
}
