"use client"

import * as React from "react"
import { IconMenu2, IconX } from "@tabler/icons-react"
import { Skeleton } from "@/components/design-system/skeleton"

export interface HeaderProps {
  onNavigateToFeatures?: () => void
  onNavigateToCalculator?: () => void
  onNavigateToBlog?: () => void
  onNavigateToFaq?: () => void
  onNavigateToContact?: () => void
  onNavigateHome?: () => void
  onOpenGetApp?: () => void
  onOpenWebApp?: () => void
  onJoinWaitlist?: () => void
  playStoreUrl?: string
  appStoreUrl?: string
  webAppUrl?: string
  isDarkTheme?: boolean
  isLoading?: boolean
}

export function HeaderSkeleton() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-20 border-b border-white/10 bg-[#0B0B12]/80 backdrop-blur-md px-6">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        <Skeleton className="h-8 w-28 bg-white/10 rounded-lg" />
        <div className="hidden md:flex items-center gap-6">
          <Skeleton className="h-4 w-16 bg-white/10" />
          <Skeleton className="h-4 w-20 bg-white/10" />
          <Skeleton className="h-4 w-14 bg-white/10" />
          <Skeleton className="h-4 w-12 bg-white/10" />
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Skeleton className="h-10 w-24 bg-white/10 rounded-full" />
          <Skeleton className="h-10 w-36 bg-white/10 rounded-full" />
        </div>
        <Skeleton className="md:hidden h-9 w-9 bg-white/10 rounded-lg" />
      </div>
    </header>
  )
}

export function Header({
  onNavigateToFeatures,
  onNavigateToCalculator,
  onNavigateToBlog,
  onNavigateToFaq,
  onNavigateToContact,
  onNavigateHome,
  onOpenGetApp,
  onOpenWebApp,
  onJoinWaitlist,
  playStoreUrl = "https://play.google.com/store/apps/details?id=com.voltdigitalservices.app",
  appStoreUrl = "https://apps.apple.com/app/volt-electricity-tracker/id6742389141",
  webAppUrl = "https://app.voltdigitalservices.com",
  isLoading = false
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (isLoading) {
    return <HeaderSkeleton />
  }

  const handleGetAppClick = () => {
    if (onOpenGetApp) {
      onOpenGetApp()
    } else if (onJoinWaitlist) {
      onJoinWaitlist()
    } else {
      window.open(playStoreUrl, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-ink-950/95 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3.5"
          : "bg-transparent py-5"
      }`}
      style={{
        backgroundColor: isScrolled ? "rgba(11, 11, 18, 0.95)" : "transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        <button
          type="button"
          onClick={onNavigateHome}
          className="flex items-center gap-2 cursor-pointer bg-transparent border-0 p-0 select-none group"
        >
          <img
            src="/logo-white.png"
            alt="Volt Logo"
            className="h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </button>

        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.04] border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-full">
          <button
            type="button"
            onClick={onNavigateToFeatures}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            Features
          </button>
          <button
            type="button"
            onClick={onNavigateToCalculator}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            Calculator
          </button>
          <button
            type="button"
            onClick={onNavigateToBlog}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            DisCo Guides
          </button>
          <button
            type="button"
            onClick={onNavigateToFaq}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            FAQs
          </button>
          <button
            type="button"
            onClick={onNavigateToContact}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            Contact
          </button>
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={handleGetAppClick}
            className="h-10 px-6 rounded-full bg-[#00BF63] hover:bg-[#00a656] active:bg-[#00924b] text-white text-xs font-bold transition-all shadow-lg shadow-[#00BF63]/25 border border-emerald-400/40 cursor-pointer active:scale-95"
          >
            Get App
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <IconX className="w-6 h-6" /> : <IconMenu2 className="w-6 h-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full inset-x-0 bg-[#0B0B12]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 shadow-2xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false)
              onNavigateToFeatures?.()
            }}
            className="text-left text-sm font-semibold text-white/80 hover:text-white py-2 border-b border-white/5 cursor-pointer"
          >
            Features
          </button>
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false)
              onNavigateToCalculator?.()
            }}
            className="text-left text-sm font-semibold text-white/80 hover:text-white py-2 border-b border-white/5 cursor-pointer"
          >
            Calculator
          </button>
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false)
              onNavigateToBlog?.()
            }}
            className="text-left text-sm font-semibold text-white/80 hover:text-white py-2 border-b border-white/5 cursor-pointer"
          >
            DisCo Guides
          </button>
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false)
              onNavigateToFaq?.()
            }}
            className="text-left text-sm font-semibold text-white/80 hover:text-white py-2 border-b border-white/5 cursor-pointer"
          >
            FAQs
          </button>
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false)
              onNavigateToContact?.()
            }}
            className="text-left text-sm font-semibold text-white/80 hover:text-white py-2 border-b border-white/5 cursor-pointer"
          >
            Contact
          </button>

          <div className="pt-3">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false)
                handleGetAppClick()
              }}
              className="w-full h-11 rounded-full bg-[#00BF63] hover:bg-[#00a656] text-white font-bold text-xs flex items-center justify-center shadow-md shadow-[#00BF63]/25 border border-emerald-400/40 cursor-pointer"
            >
              Get App
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
