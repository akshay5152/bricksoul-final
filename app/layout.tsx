import type { Metadata, Viewport } from "next"
import { Inter, Fraunces } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz"],
})

export const metadata: Metadata = {
  title: "Brick & Soul — Architecture Studio",
  description:
    "Brick & Soul is an architecture studio crafting spaces where material meets meaning. Residential, cultural and public architecture built with brick, light and soul.",
}

export const viewport: Viewport = {
  themeColor: "#1a1b1d",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${inter.variable} ${fraunces.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
