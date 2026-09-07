import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Configure the Inter font properly
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter", // Optional: for CSS custom property
  weight: ["400", "500", "600", "700", "800"], // Specify weights you need
});

export const metadata: Metadata = {
  title: "Fuel Pass Redesign",
  description: "National Fuel Pass Redesign",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}