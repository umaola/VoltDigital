"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "./sections/header"
import { Hero } from "./sections/hero"
import { TrustStrip } from "./sections/trust-strip"
import { BentoFeatures } from "./sections/bento-features"
import { CalculatorSimulator } from "./sections/calculator-simulator"
import { ApplianceSimulator } from "./sections/appliance-simulator"
import { PlatformShowcase } from "./sections/platform-showcase"
import { BlogSpotlight } from "./sections/blog-spotlight"
import { FAQ } from "./sections/faq"
import { Newsletter } from "./sections/newsletter"
import { Footer } from "./sections/footer"
import { GetAppModal } from "./sections/get-app-modal"
import { AdminPanel } from "./sections/admin-panel"
import { CookieConsent } from "./sections/cookie-consent"
import { TermsPage } from "../terms-page"
import { PrivacyPage } from "../privacy-page"
import { BlogPage } from "../blog-page"
import { Skeleton } from "@/components/design-system/skeleton"

export interface LandingPageProps {
  playStoreUrl?: string
  appStoreUrl?: string
  webAppUrl?: string
  initialTariffs?: any[] | null
  isLoading?: boolean
}

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

export function LandingPageSkeleton() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <div className="h-16 w-full border-b border-gray-100 flex items-center justify-between px-6">
        <Skeleton className="h-8 w-28 rounded-lg" />
        <Skeleton className="h-10 w-32 rounded-xl" />
      </div>
      <div className="py-24 px-6 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col gap-6">
          <Skeleton className="h-12 w-3/4 rounded-xl" />
          <Skeleton className="h-20 w-full rounded-xl" />
          <Skeleton className="h-12 w-48 rounded-xl" />
        </div>
        <div className="flex justify-center">
          <Skeleton className="w-[300px] h-[520px] rounded-[48px]" />
        </div>
      </div>
    </div>
  )
}

export function LandingPage({
  playStoreUrl = "https://play.google.com/store/apps/details?id=com.voltdigitalservices.app",
  appStoreUrl = "https://apps.apple.com/app/volt-electricity-tracker/id6742389141",
  webAppUrl = "https://app.voltdigitalservices.com",
  initialTariffs = null,
  isLoading = false
}: LandingPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isGetAppOpen, setIsGetAppOpen] = React.useState(false)
  const [isAdminOpen, setIsAdminOpen] = React.useState(false)
  const [activePage, setActivePage] = React.useState<string | null>(null)

  const [tariffs, setTariffs] = React.useState<any[] | null>(initialTariffs)
  const [isTariffLoading, setIsTariffLoading] = React.useState(initialTariffs ? false : true)

  React.useEffect(() => {
    if (initialTariffs) return

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
  }, [initialTariffs])

  React.useEffect(() => {
    const pageParam = searchParams.get("page")
    setActivePage(pageParam)

    if (pageParam === "admin") {
      setIsAdminOpen(true)
    } else {
      setIsAdminOpen(false)
    }

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

  const handleNavigateToCalculator = () => {
    if (activePage) {
      router.push("/#calculator")
    } else {
      scrollToSection("calculator")
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

  const handleOpenGetApp = () => {
    setIsGetAppOpen(true)
  }

  const handleOpenWebApp = () => {
    window.open(webAppUrl, "_blank", "noopener,noreferrer")
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

  const handleNavigateToPrivacy = () => {
    router.push("/?page=privacy")
  }

  const handleNavigateToBlog = (postId?: string) => {
    if (postId) {
      router.push(`/?page=blog&post=${postId}`)
    } else {
      router.push("/?page=blog")
    }
  }

  if (isLoading) {
    return <LandingPageSkeleton />
  }

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
    <div className="min-h-screen bg-white flex flex-col font-sans antialiased overflow-x-hidden selection:bg-emerald-500/20 selection:text-[#052e16]">
      <Header
        onNavigateToFeatures={handleNavigateToFeatures}
        onNavigateToCalculator={handleNavigateToCalculator}
        onNavigateToFaq={handleNavigateToFaq}
        onNavigateToContact={handleNavigateToContact}
        onNavigateToBlog={() => handleNavigateToBlog()}
        onNavigateHome={handleNavigateHome}
        onOpenGetApp={handleOpenGetApp}
        onOpenWebApp={handleOpenWebApp}
        playStoreUrl={playStoreUrl}
        appStoreUrl={appStoreUrl}
        webAppUrl={webAppUrl}
        isDarkTheme={false}
      />

      <main className="flex-grow flex flex-col">
        <Hero
          onNavigateToCalculator={handleNavigateToCalculator}
          onOpenGetApp={handleOpenGetApp}
          onOpenWebApp={handleOpenWebApp}
          playStoreUrl={playStoreUrl}
          appStoreUrl={appStoreUrl}
          webAppUrl={webAppUrl}
        />

        <TrustStrip />

        <BentoFeatures />

        <CalculatorSimulator
          onOpenGetApp={handleOpenGetApp}
          onOpenWebApp={handleOpenWebApp}
          tariffs={tariffs}
          isLoading={isTariffLoading}
        />

        <ApplianceSimulator
          onOpenGetApp={handleOpenGetApp}
          onOpenWebApp={handleOpenWebApp}
          tariffs={tariffs}
          isLoading={isTariffLoading}
        />

        <PlatformShowcase
          onOpenGetApp={handleOpenGetApp}
          onOpenWebApp={handleOpenWebApp}
          playStoreUrl={playStoreUrl}
          appStoreUrl={appStoreUrl}
          webAppUrl={webAppUrl}
        />

        <BlogSpotlight
          onNavigateToBlog={handleNavigateToBlog}
        />

        <FAQ />

        <Newsletter />
      </main>

      <Footer
        onNavigateHome={handleNavigateHome}
        onNavigateToFeatures={handleNavigateToFeatures}
        onNavigateToCalculator={handleNavigateToCalculator}
        onNavigateToBlog={() => handleNavigateToBlog()}
        onNavigateToFaq={handleNavigateToFaq}
        onOpenGetApp={handleOpenGetApp}
        onOpenWebApp={handleOpenWebApp}
        playStoreUrl={playStoreUrl}
        appStoreUrl={appStoreUrl}
        webAppUrl={webAppUrl}
      />

      <GetAppModal
        isOpen={isGetAppOpen}
        onClose={() => setIsGetAppOpen(false)}
        playStoreUrl={playStoreUrl}
        appStoreUrl={appStoreUrl}
        webAppUrl={webAppUrl}
      />

      <AdminPanel
        isOpen={isAdminOpen}
        onClose={handleCloseAdmin}
      />

      <CookieConsent
        onNavigateToPrivacy={handleNavigateToPrivacy}
      />
    </div>
  )
}

export default LandingPage
