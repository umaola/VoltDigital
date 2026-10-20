"use client"

import * as React from "react"
import { IconBrandGooglePlay, IconWorld } from "@tabler/icons-react"
import { Skeleton } from "@/components/design-system/skeleton"

export interface FooterProps {
  onNavigateHome?: () => void
  onNavigateToFeatures?: () => void
  onNavigateToCalculator?: () => void
  onNavigateToBlog?: () => void
  onNavigateToFaq?: () => void
  onOpenGetApp?: () => void
  onOpenWebApp?: () => void
  playStoreUrl?: string
  appStoreUrl?: string
  webAppUrl?: string
  isLoading?: boolean
}

export function FooterSkeleton() {
  return (
    <footer className="bg-[#121212] text-gray-400 py-16 border-t border-[#1E1E1E]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5 flex flex-col gap-4">
          <Skeleton className="h-8 w-28 bg-gray-800" />
          <Skeleton className="h-4 w-64 bg-gray-800" />
        </div>
        <div className="md:col-span-7 grid grid-cols-2 gap-8">
          <Skeleton className="h-32 bg-gray-800" />
          <Skeleton className="h-32 bg-gray-800" />
        </div>
      </div>
    </footer>
  )
}

export function Footer({
  onNavigateHome,
  onNavigateToFeatures,
  onNavigateToCalculator,
  onNavigateToBlog,
  onNavigateToFaq,
  onOpenGetApp,
  onOpenWebApp,
  playStoreUrl = "https://play.google.com/store/apps/details?id=com.voltdigitalservices.app",
  appStoreUrl = "https://apps.apple.com/app/volt-electricity-tracker/id6742389141",
  webAppUrl = "https://app.voltdigitalservices.com",
  isLoading = false
}: FooterProps) {
  const currentYear = new Date().getFullYear()

  if (isLoading) {
    return <FooterSkeleton />
  }

  const handlePlayStoreClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onOpenGetApp) {
      onOpenGetApp()
    } else {
      window.open(playStoreUrl, "_blank", "noopener,noreferrer")
    }
  }

  const handleWebAppClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onOpenWebApp) {
      onOpenWebApp()
    } else {
      window.open(webAppUrl, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <footer
      id="footer"
      className="bg-ink-950 text-[#9CA3AF] py-16 border-t border-white/10"
      style={{ backgroundColor: "#0b0b12" }}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-5 flex flex-col gap-4 text-left">
          <button
            type="button"
            className="flex items-center gap-2 cursor-pointer select-none bg-transparent border-0 p-0 self-start"
            onClick={onNavigateHome}
          >
            <img
              src="/logo-white.png"
              alt="Volt Logo"
              className="h-7 w-auto object-contain"
            />
          </button>

          <p className="text-sm font-semibold italic text-gray-400 leading-relaxed max-w-sm mt-1">
            &ldquo;Your tariff, your appliances, your control.&rdquo;
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handlePlayStoreClick}
              className="h-9 px-3 rounded-lg bg-neutral-800 text-white hover:bg-neutral-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <IconBrandGooglePlay className="w-4 h-4 text-[#00BF63]" />
              <span>Google Play</span>
            </button>
            <button
              type="button"
              onClick={handleWebAppClick}
              className="h-9 px-3 rounded-lg bg-neutral-800 text-white hover:bg-neutral-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <IconWorld className="w-4 h-4 text-primary" />
              <span>Web App</span>
            </button>
          </div>
        </div>

        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left w-full">
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-widest">
              Navigation
            </h4>
            <button
              type="button"
              onClick={onNavigateToFeatures}
              className="text-sm font-semibold hover:text-primary transition-colors text-left bg-transparent border-0 p-0 text-[#9CA3AF] cursor-pointer"
            >
              Features
            </button>
            <button
              type="button"
              onClick={onNavigateToCalculator}
              className="text-sm font-semibold hover:text-primary transition-colors text-left bg-transparent border-0 p-0 text-[#9CA3AF] cursor-pointer"
            >
              Calculator
            </button>
            <button
              type="button"
              onClick={onNavigateToBlog}
              className="text-sm font-semibold hover:text-primary transition-colors text-left bg-transparent border-0 p-0 text-[#9CA3AF] cursor-pointer"
            >
              Blog
            </button>
            <button
              type="button"
              onClick={onNavigateToFaq}
              className="text-sm font-semibold hover:text-primary transition-colors text-left bg-transparent border-0 p-0 text-[#9CA3AF] cursor-pointer"
            >
              FAQs
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-widest">
              Legal
            </h4>
            <a href="/?page=terms" className="text-sm font-semibold hover:text-primary transition-colors">
              Terms of Use
            </a>
            <a href="/?page=privacy" className="text-sm font-semibold hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="/?page=blog" className="text-sm font-semibold hover:text-primary transition-colors">
              DisCo Guides
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-widest">
              Contact
            </h4>
            <a
              href="mailto:info@voltdigitalservices.com"
              className="text-sm font-semibold hover:text-primary transition-colors break-all"
            >
              info@voltdigitalservices.com
            </a>
            <a href="tel:+2348118104331" className="text-sm font-semibold hover:text-primary transition-colors">
              +2348118104331
            </a>
            <span className="text-sm font-semibold text-gray-400">
              Lagos, Nigeria
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-[#1E1E1E] mt-12 pt-8 flex flex-col items-center justify-center gap-4 text-center text-xs font-semibold text-gray-600">
        <div className="flex flex-col items-center gap-3">
          <span>&copy; {currentYear} Volt Digital Services (RC: 9637947). All rights reserved</span>
          <p className="text-[10px] text-gray-500 leading-relaxed max-w-3xl font-medium">
            <span className="text-primary font-bold">Disclaimer:</span> Volt is an independent utility intelligence tracker and energy auditor. We are not officially affiliated with the Federal Ministry of Power, the Nigerian Electricity Regulatory Commission, or regional Electricity Distribution Companies.
          </p>
        </div>
      </div>
    </footer>
  )
}
