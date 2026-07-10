"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "./sections/header"
import { Hero } from "./sections/hero"
import { Features } from "./sections/features"
import { CalculatorSimulator } from "./sections/calculator-simulator"
import { ApplianceSimulator } from "./sections/appliance-simulator"
import { FAQ } from "./sections/faq"
import { Newsletter } from "./sections/newsletter"
import { Footer } from "./sections/footer"
import { WaitlistModal } from "./sections/waitlist-modal"
import { AdminPanel } from "./sections/admin-panel"
import { TermsPage } from "../terms-page"
import { PrivacyPage } from "../privacy-page"
import { BlogPage } from "../blog-page"

export default function LandingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [isWaitlistOpen, setIsWaitlistOpen] = React.useState(false)
  const [isAdminOpen, setIsAdminOpen] = React.useState(false)
  const [activePage, setActivePage] = React.useState<string | null>(null)

  // Listen to query parameters for page routing
  React.useEffect(() => {
    const pageParam = searchParams.get("page")
    setActivePage(pageParam)
    
    if (pageParam === "admin") {
      setIsAdminOpen(true)
    } else {
      setIsAdminOpen(false)
    }

    // Scroll to anchor on home page load from a subpage redirect
    if (!pageParam) {
      const hash = window.location.hash
      if (hash) {
        setTimeout(() => {
          const id = hash.replace("#", "")
          scrollToSection(id)
        }, 150)
      }
    }
  }, [searchParams])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const handleNavigateToFeatures = () => {
    if (activePage) {
      router.push("/#features")
    } else {
      scrollToSection("features")
    }
  }

  const handleNavigateToFaq = () => {
    if (activePage) {
      router.push("/#faq")
    } else {
      scrollToSection("faq")
    }
  }

  const handleNavigateToContact = () => {
    if (activePage) {
      router.push("/#footer")
    } else {
      scrollToSection("footer")
    }
  }

  const handleOpenWaitlist = () => {
    setIsWaitlistOpen(true)
  }

  const handleCloseAdmin = () => {
    setIsAdminOpen(false)
    router.push("/")
  }

  const handleCloseSubpage = () => {
    router.push("/")
  }

  const handleNavigateHome = () => {
    if (activePage) {
      router.push("/")
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Early returns for isolated subpage components
  if (activePage === "terms") {
    return <TermsPage onBack={handleCloseSubpage} />
  }

  if (activePage === "privacy") {
    return <PrivacyPage onBack={handleCloseSubpage} />
  }

  if (activePage === "blog") {
    return <BlogPage onBack={handleCloseSubpage} />
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans antialiased overflow-x-hidden selection:bg-primary/20 selection:text-[#052e16]">
      {/* Persistent Navigation Header */}
      <Header
        onNavigateToFeatures={handleNavigateToFeatures}
        onNavigateToFaq={handleNavigateToFaq}
        onNavigateToContact={handleNavigateToContact}
        onNavigateToBlog={() => router.push("/?page=blog")}
        onNavigateHome={handleNavigateHome}
        onJoinWaitlist={handleOpenWaitlist}
        isDarkTheme={false}
      />

      <main className="flex-grow flex flex-col">
        {/* Hero Section */}
        <Hero
          onNavigateToCalculator={() => scrollToSection("calculator")}
          onJoinWaitlist={handleOpenWaitlist}
        />

        {/* Core Benefits Features Grid */}
        <Features />

        {/* Interactive Prepaid Unit Calculator */}
        <CalculatorSimulator onJoinWaitlist={handleOpenWaitlist} />

        {/* Interactive Appliance Consumption Auditor */}
        <ApplianceSimulator onJoinWaitlist={handleOpenWaitlist} />

        {/* Frequently Asked Questions */}
        <FAQ />

        {/* Newsletter Subscription */}
        <Newsletter />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Waiting List Overlay Modal */}
      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />

      {/* Administrative Download Waitlist Panel */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={handleCloseAdmin}
      />
    </div>
  )
}
