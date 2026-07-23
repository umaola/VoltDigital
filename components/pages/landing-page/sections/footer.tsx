"use client"

import * as React from "react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleJoinWaitlist = (e: React.MouseEvent) => {
    e.preventDefault()
    // Trigger waitlist globally by simulating click
    const ctaButtons = document.querySelectorAll("button")
    for (let i = 0; i < ctaButtons.length; i++) {
      if (ctaButtons[i].textContent?.includes("Join Our Waitlist")) {
        (ctaButtons[i] as HTMLButtonElement).click()
        break
      }
    }
  }

  return (
    <footer id="footer" className="bg-[#121212] text-[#9CA3AF] py-16 border-t border-[#1E1E1E]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Brand Block */}
        <div className="md:col-span-5 flex flex-col gap-4 text-left">
          <div 
            className="flex items-center gap-2 cursor-pointer select-none" 
            onClick={handleLogoClick} 
          >
            <img 
              src="/logo-white.png" 
              alt="Volt Logo" 
              className="h-7 w-auto object-contain" 
            />
          </div>
          <p className="text-sm font-semibold italic text-gray-400 leading-relaxed max-w-sm mt-1">
            "Your tariff, your appliances, your control."
          </p>
        </div>

        {/* Links Blocks */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 text-left w-full">
          {/* Resources Menu */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-widest">Resources</h4>
            <a href="#faq" className="text-sm font-semibold hover:text-primary transition-colors">FAQs</a>
            <a href="/?page=terms" className="text-sm font-semibold hover:text-primary transition-colors">Terms of Use</a>
            <a href="/?page=privacy" className="text-sm font-semibold hover:text-primary transition-colors">Privacy Policy</a>
            <a href="/?page=blog" className="text-sm font-semibold hover:text-primary transition-colors">Blog</a>
            <a href="/?page=pricing" onClick={handleJoinWaitlist} className="text-sm font-semibold hover:text-primary transition-colors">Pricing</a>
          </div>

          {/* Contact Us Menu */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-widest">Contact us</h4>
            <a href="mailto:info@voltdigitalservices.com" className="text-sm font-semibold hover:text-primary transition-colors">
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

      {/* Centered Credits and Disclaimer */}
      <div className="max-w-7xl mx-auto px-6 border-t border-[#1E1E1E] mt-12 pt-8 flex flex-col items-center justify-center gap-4 text-center text-xs font-semibold text-gray-600">
        <div className="flex flex-col items-center gap-3">
          <span>&copy; {currentYear} Volt Digital Services (RC: 9637947). All rights reserved</span>
          <p className="text-[10px] text-gray-700 leading-relaxed max-w-3xl font-medium">
            <span className="text-primary font-bold">Disclaimer:</span> Volt is an independent utility intelligence tracker and energy auditor. We are not officially affiliated with the Federal Ministry of Power, the Nigerian Electricity Regulatory Commission (NERC), or any regional Electricity Distribution Company (Disco).
          </p>
        </div>
      </div>
    </footer>
  )
}
