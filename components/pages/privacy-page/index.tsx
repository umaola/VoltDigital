"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Header } from "../landing-page/sections/header"
import { Footer } from "../landing-page/sections/footer"
import { WaitlistModal } from "../landing-page/sections/waitlist-modal"

interface PrivacyPageProps {
  onBack: () => void
}

export function PrivacyPage({ onBack }: PrivacyPageProps) {
  const router = useRouter()
  const [isWaitlistOpen, setIsWaitlistOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans antialiased text-[#121212] select-none">
      {/* Navigation Header */}
      <Header
        onNavigateToFeatures={() => router.push("/#features")}
        onNavigateToFaq={() => router.push("/#faq")}
        onNavigateToContact={() => router.push("/#footer")}
        onNavigateToBlog={() => router.push("/?page=blog")}
        onNavigateHome={() => router.push("/")}
        onJoinWaitlist={() => setIsWaitlistOpen(true)}
        isDarkTheme={false}
      />

      {/* Main Document Content */}
      <main className="flex-grow pt-28 pb-16 max-w-4xl mx-auto px-6 w-full text-left flex flex-col gap-6">
        <div className="flex items-center gap-3 py-4 border-b border-zinc-100 bg-white">
          <h1 className="text-xl font-bold text-[#052e16] tracking-tight">Privacy Policy</h1>
        </div>

        <div className="flex flex-col gap-6 text-sm text-[#4B5563] leading-relaxed">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-[#052e16]">Volt's Privacy Policy</h2>
            <p className="text-xs text-[#9CA3AF]">Effective Date: July 1, 2026</p>
          </div>

          <div className="border border-zinc-200 rounded-xl overflow-hidden text-left">
            <div className="bg-zinc-50 px-4 py-3 border-b border-zinc-200 font-bold text-xs text-[#121212] uppercase tracking-wider">
              Document Control Sheet
            </div>
            <div className="divide-y divide-zinc-200 text-xs bg-white">
              <div className="grid grid-cols-3 px-4 py-2.5">
                <span className="font-semibold text-[#121212]">Title</span>
                <span className="col-span-2">Privacy Policy</span>
              </div>
              <div className="grid grid-cols-3 px-4 py-2.5">
                <span className="font-semibold text-[#121212]">Status</span>
                <span className="col-span-2">Mandatory</span>
              </div>
              <div className="grid grid-cols-3 px-4 py-2.5">
                <span className="font-semibold text-[#121212]">Audience</span>
                <span className="col-span-2">All users of Volt Platform</span>
              </div>
              <div className="grid grid-cols-3 px-4 py-2.5">
                <span className="font-semibold text-[#121212]">Approver</span>
                <span className="col-span-2">Management of Volt Digital Services LTD</span>
              </div>
              <div className="grid grid-cols-3 px-4 py-2.5">
                <span className="font-semibold text-[#121212]">Effective Date</span>
                <span className="col-span-2">1st July, 2026</span>
              </div>
              <div className="grid grid-cols-3 px-4 py-2.5">
                <span className="font-semibold text-[#121212]">Version</span>
                <span className="col-span-2">1.0</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-left">
            <h3 className="font-bold text-[#121212] text-base">1. Introduction</h3>
            <p>
              Volt is committed to protecting your privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you use our platform (the &ldquo;Service&rdquo;) and applies
              to all users of Volt, including those who access the platform via mobile applications (iOS and
              Android), the website, or any other interface through which Volt is made available.
            </p>
            <p>
              By using Volt, you agree to the terms of this Privacy Policy.
            </p>
          </div>

          <div className="flex flex-col gap-4 text-left">
            <h3 className="font-bold text-[#121212] text-base">2. Consent</h3>
            <p>
              You accept and consent to this Policy when you access our platforms, or use our Services,
              technologies, features, content or functions offered on our mobile applications, website, or any
              other platform which may be used by Volt. Your continued use of the Service constitutes
              ongoing consent to the processing of your Personal Data as described herein.
            </p>
          </div>

          <div className="flex flex-col gap-4 text-left">
            <h3 className="font-bold text-[#121212] text-base">3. Information We Collect</h3>
            <p>
              We collect information to provide accurate electricity insights and improve user experience.
            </p>
            
            <div className="flex flex-col gap-2 text-left">
              <h4 className="font-semibold text-[#121212]">a. Information You Provide</h4>
              <ul className="list-disc pl-5 flex flex-col gap-1">
                <li>Name, email address</li>
                <li>Phone number</li>
                <li>Electricity Meter number</li>
                <li>Distribution Company</li>
                <li>Electricity tariff band (A&ndash;E, if provided)</li>
                <li>Appliance data (e.g., fridge, AC, TV usage)</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-left">
            <h3 className="font-bold text-[#121212] text-base">4. How We Use Your Information</h3>
            <p>We use your data to:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>Provide electricity usage estimates and insights</li>
              <li>Personalize your dashboard and recommendations</li>
              <li>Improve Volt&rsquo;s algorithms and accuracy</li>
              <li>Analyze trends and user behavior</li>
              <li>Communicate updates, features, or support responses</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 text-left">
            <h3 className="font-bold text-[#121212] text-base">5. Legal Basis for Processing Personal Data</h3>
            <p>
              Under the <strong>Nigeria Data Protection Act 2023 (NDPA)</strong>, we process your data based on:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>Consent; when you provide information voluntarily</li>
              <li>Contractual necessity: to deliver Volt&rsquo;s services where you utilise our services</li>
              <li>Legitimate interest: improving our platform and ensuring security</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 text-left">
            <h3 className="font-bold text-[#121212] text-base">6. Contact Us</h3>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data
              practices, please contact us at:
            </p>
            <p>Email: <a href="mailto:info@voltdigitalservices.com" className="font-bold underline hover:text-primary transition-colors">info@voltdigitalservices.com</a></p>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Waitlist Modal */}
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </div>
  )
}
