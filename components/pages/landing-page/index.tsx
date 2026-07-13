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

const DEFAULT_RATES: Record<string, Record<string, number>> = {
  "ikeja-electric": { "Band A": 206.80, "Band B": 61.20, "Band C": 49.50, "Band D": 36.80, "Band E": 36.80 },
  "eko-electric": { "Band A": 209.50, "Band B": 62.50, "Band C": 50.00, "Band D": 37.50, "Band E": 37.50 },
  "abuja-electric": { "Band A": 209.50, "Band B": 63.20, "Band C": 51.00, "Band D": 38.00, "Band E": 38.00 },
  "kano-electric": { "Band A": 209.50, "Band B": 62.50, "Band C": 50.00, "Band D": 37.50, "Band E": 37.50 },
  "portharcourt-electric": { "Band A": 209.50, "Band B": 62.50, "Band C": 50.00, "Band D": 37.50, "Band E": 37.50 },
  "jos-electric": { "Band A": 209.50, "Band B": 62.50, "Band C": 50.00, "Band D": 37.50, "Band E": 37.50 },
  "ibadan-electric": { "Band A": 205.00, "Band B": 60.50, "Band C": 48.80, "Band D": 35.50, "Band E": 35.50 },
  "kaduna-electric": { "Band A": 209.50, "Band B": 62.50, "Band C": 50.00, "Band D": 37.50, "Band E": 37.50 },
  "enugu-electric": { "Band A": 211.00, "Band B": 64.00, "Band C": 52.20, "Band D": 39.50, "Band E": 39.50 },
  "benin-electric": { "Band A": 209.50, "Band B": 62.50, "Band C": 50.00, "Band D": 37.50, "Band E": 37.50 },
  "aba-electric": { "Band A": 209.50, "Band B": 62.50, "Band C": 50.00, "Band D": 37.50, "Band E": 37.50 },
  "yola-electric": { "Band A": 209.50, "Band B": 62.50, "Band C": 50.00, "Band D": 37.50, "Band E": 37.50 }
}

export default function LandingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [isWaitlistOpen, setIsWaitlistOpen] = React.useState(false)
  const [isAdminOpen, setIsAdminOpen] = React.useState(false)
  const [activePage, setActivePage] = React.useState<string | null>(null)
  
  const [tariffs, setTariffs] = React.useState<any[] | null>(null)
  const [isTariffLoading, setIsTariffLoading] = React.useState(true)

  React.useEffect(() => {
    let active = true

    const loadLocalFallback = () => {
      fetch("/tariffs.json")
        .then((r) => r.json())
        .then((localData) => {
          if (active) {
            setTariffs(localData.discos)
            setIsTariffLoading(false)
          }
        })
        .catch(() => {
          if (active) {
            setIsTariffLoading(false)
          }
        })
    }

    fetch("https://api.arewasmart.com.ng/api/v1/electricity/variations")
      .then((r) => r.json())
      .then((res) => {
        if (res && res.status === "success" && Array.isArray(res.data)) {
          const apiDiscos = res.data.filter((d: any) => d.status === "enabled")
          const uniqueDiscos = Array.from(
            new Map(apiDiscos.map((item: any) => [item.service_id, item])).values()
          ) as any[]
          
          const mapped = uniqueDiscos.map((d: any) => ({
            code: d.service_id,
            name: d.service_name,
            rates: DEFAULT_RATES[d.service_id] || {
              "Band A": 209.50,
              "Band B": 62.50,
              "Band C": 50.00,
              "Band D": 37.50,
              "Band E": 37.50,
            }
          }))

          if (active) {
            setTariffs(mapped)
            setIsTariffLoading(false)
          }
        } else {
          loadLocalFallback()
        }
      })
      .catch(() => {
        loadLocalFallback()
      })

    return () => {
      active = false
    }
  }, [])

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
        <CalculatorSimulator onJoinWaitlist={handleOpenWaitlist} tariffs={tariffs} isLoading={isTariffLoading} />

        {/* Interactive Appliance Consumption Auditor */}
        <ApplianceSimulator onJoinWaitlist={handleOpenWaitlist} tariffs={tariffs} isLoading={isTariffLoading} />

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
