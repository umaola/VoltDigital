import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Volt — Electricity Management and Usage Tracking",
  description: "Smart electricity management and usage tracking platform. Predict prepaid units, monitor burn rates, audit home appliances, and get alerts before sudden blackouts.",
  keywords: ["Volt", "prepaid meter", "prepaid", "tariff band", "EKEDP", "IKEDC", "NERC", "electricity tracker", "Nigeria", "energy auditor"],
  icons: {
    icon: "/favicon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth h-full antialiased font-sans"
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
