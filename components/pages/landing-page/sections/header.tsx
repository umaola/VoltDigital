"use client"

import * as React from "react"
import { PrimaryButton } from "@/components/design-system/button"

interface HeaderProps {
  onNavigateToFeatures: () => void
  onNavigateToFaq: () => void
  onNavigateToContact: () => void
  onJoinWaitlist: () => void
  onNavigateToBlog: () => void
  onNavigateHome: () => void
  isDarkTheme?: boolean
}

export function Header({
  onNavigateToFeatures,
  onNavigateToFaq,
  onNavigateToContact,
  onJoinWaitlist,
  onNavigateToBlog,
  onNavigateHome,
  isDarkTheme = false
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isDarkHeader = isDarkTheme && !isScrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-[#F3F4F6] shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo and Brand */}
        <div 
          className="flex items-center gap-2 cursor-pointer select-none" 
          onClick={onNavigateHome}
        >
          <img src="/logo-mark.png" alt="Volt Logo" className="h-9 w-auto object-contain" />
          <span className={`font-extrabold text-xl tracking-tight leading-none transition-colors duration-300 ${
            isDarkHeader ? "text-white" : "text-[#121212]"
          }`}>
            Volt
          </span>
        </div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={onNavigateToFeatures}
            className={`text-sm font-bold transition-colors cursor-pointer duration-300 ${
              isDarkHeader ? "text-white/95 hover:text-primary" : "text-[#4B5563] hover:text-[#00BF63]"
            }`}
          >
            Features
          </button>
          <button
            onClick={onNavigateToFaq}
            className={`text-sm font-bold transition-colors cursor-pointer duration-300 ${
              isDarkHeader ? "text-white/95 hover:text-primary" : "text-[#4B5563] hover:text-[#00BF63]"
            }`}
          >
            FAQs
          </button>
          <button
            onClick={onNavigateToBlog}
            className={`text-sm font-bold transition-colors cursor-pointer duration-300 ${
              isDarkHeader ? "text-white/95 hover:text-primary" : "text-[#4B5563] hover:text-[#00BF63]"
            }`}
          >
            Blog
          </button>
          <button
            onClick={onNavigateToContact}
            className={`text-sm font-bold transition-colors cursor-pointer duration-300 ${
              isDarkHeader ? "text-white/95 hover:text-primary" : "text-[#4B5563] hover:text-[#00BF63]"
            }`}
          >
            Contact Us
          </button>
        </nav>

        {/* CTAs - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <PrimaryButton onClick={onJoinWaitlist} className="w-auto px-6 h-10 text-sm shadow-md shadow-primary/10">
            Join Our Waitlist
          </PrimaryButton>
        </div>

        {/* Hamburger Menu - Mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-1 cursor-pointer transition-colors duration-300 ${
            isDarkHeader ? "text-white" : "text-[#052e16]"
          }`}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-[#F3F4F6] shadow-lg py-6 px-6 flex flex-col gap-5 animate-in fade-in slide-in-from-top duration-200">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false)
              onNavigateToFeatures()
            }}
            className="text-left text-base font-bold text-[#4B5563] py-1 border-b border-gray-50 cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false)
              onNavigateToFaq()
            }}
            className="text-left text-base font-bold text-[#4B5563] py-1 border-b border-gray-50 cursor-pointer"
          >
            FAQs
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false)
              onNavigateToBlog()
            }}
            className="text-left text-base font-bold text-[#4B5563] py-1 border-b border-gray-50 cursor-pointer"
          >
            Blog
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false)
              onNavigateToContact()
            }}
            className="text-left text-base font-bold text-[#4B5563] py-1 border-b border-gray-50 cursor-pointer"
          >
            Contact Us
          </button>
          <div className="flex flex-col gap-3 pt-3">
            <PrimaryButton
              onClick={() => {
                setIsMobileMenuOpen(false)
                onJoinWaitlist()
              }}
              className="w-full text-sm"
            >
              Join Our Waitlist
            </PrimaryButton>
          </div>
        </div>
      )}
    </header>
  )
}
