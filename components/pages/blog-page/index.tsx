"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "../landing-page/sections/header"
import { Footer } from "../landing-page/sections/footer"
import { WaitlistModal } from "../landing-page/sections/waitlist-modal"
import { StandardCard } from "@/components/design-system/card"

interface BlogPageProps {
  onBack: () => void
}

interface BlogPost {
  id: string
  title: string
  snippet: string
  content: string
  date: string
  category: string
  readTime: string
  color: string
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "7",
    title: "Comprehensive Guide: How to Know Your Electricity Tariff Band",
    snippet: "Understanding your electricity tariff band is crucial for managing your power expenses. We have compiled a comprehensive list of verification portals and instructions for all 11 Nigerian electricity DisCos.",
    content: "Understanding your electricity tariff band is crucial for managing your power expenses. The Nigerian Electricity Regulatory Commission (NERC) classifies consumers into different \"Bands\" (A to E) based on the minimum number of hours of electricity they are supposed to receive daily.\n\nBand A: Minimum of 20 hours daily (Highest tariff)\nBand B: Minimum of 16 hours daily\nBand C: Minimum of 12 hours daily\nBand D: Minimum of 8 hours daily\nBand E: Minimum of 4 hours daily (Lowest tariff)\n\nSince your tariff band determines how much you pay per kilowatt-hour (kWh), it is important to know exactly where you fall. We have compiled the link to all DisCos for checking your band.\n\nWhat You Need Before You Start\n\nBefore clicking on your DisCo's link, make sure you have one of the following handy:\n- Your Prepaid Meter Number\n- Your Postpaid Account Number\n\nDisCo-by-DisCo Band Checker\n\n1. Abuja Electricity Distribution Company (AEDC)\n(Covers: FCT, Kogi, Nasarawa, Niger)\nInteractive Tool: Visit the [AEDC MAP Checker](https://map.abujaelectricity.com/) and enter your Meter Number to see your exact details.\nGeneral Feeder Lists: You can also download the latest NERC compliance lists directly from their [SBT Compliance Page](https://abujaelectricity.com/nerc-sbt-compliance/).\n\n2. Benin Electricity Distribution Company (BEDC)\n(Covers: Delta, Edo, Ekiti, Ondo)\nHow to check: Go to the [BEDC Customer Care page](https://www.bedcpower.com/customer-feeder-information/) and check the Customer Feeder Information tool to look up your specific service band and tariff.\n\n3. Eko Electricity Distribution Company (EKEDC)\n(Covers: Southern Lagos, Agbara)\nInteractive Portal: Visit the [EKEDC Feeder Information Checker](https://feederinfo.ekedp.com) and input your Account Number or Meter Number to instantly verify your band.\n\n4. Enugu Electricity Distribution Company (EEDC)\n(Covers: Abia, Anambra, Ebonyi, Enugu, Imo)\nHow to check: EEDC publishes their Band priority feeders and tariff availability as documents. Visit their [Tariff Information Page](https://enugudisco.com/tariff-information/) to find the most recent feeder classifications for your area.\n\n5. Ibadan Electricity Distribution Company (IBEDC)\n(Covers: Oyo, Ogun, Osun, Kwara, parts of Ekiti, Kogi, Niger)\nHow to check: IBEDC uploads their Revised Service Based Tariff (RSBT) classes directly to their website. Visit the [IBEDC Tariff Information Page](https://www.ibedc.com/tariff-information) or check the [IBEDC Customer Feeder Info](https://www.ibedc.com/customer-feeder-information) to view the latest service bands for your community.\n\n6. Ikeja Electricity Distribution Company (IKEDC)\n(Covers: Northern Lagos)\nHow to check: Ikeja Electric frequently updates their Band A feeders and general classifications. You can check their [Ikeja Electric Portal](https://www.ikejaelectric.com) for MYTO tariff sheets and customer feeder verification.\n\n7. Jos Electricity Distribution Company (JEDC)\n(Covers: Bauchi, Benue, Gombe, Plateau)\nHow to check: Tariff schedules and band migrations are published as general notices. Visit the [JEDC Official Website](https://www.jedplc.com/) and check the latest announcements or use their customer service portal.\n\n8. Kaduna Electricity Distribution Company (KAEDCO)\n(Covers: Kaduna, Kebbi, Sokoto, Zamfara)\nInteractive Tool: Use the [KAEDCO \"Know Your Band\" Portal](https://kadunaelectric.com/index.php/know-your-band) to look up your details.\nDaily Tracking: You can also track daily feeder availability via their [Feeder Update Page](https://kadunaelectric.com/index.php/band-tariff).\n\n9. Kano Electricity Distribution Company (KEDCO)\n(Covers: Kano, Katsina, Jigawa)\nHow to check: Visit the [KEDCO Official Website](https://www.kedco.ng/) and check the news and announcements section for updated MYTO tariff documents and feeder band upgrades.\n\n10. Port Harcourt Electricity Distribution Company (PHED)\n(Covers: Akwa Ibom, Bayelsa, Cross River, Rivers)\nInteractive Tool: Go to the [PHED Connect Portal](https://connect.phed.com.ng/) and log in with your account or meter number to verify your feeder band.\n\n11. Yola Electricity Distribution Company (YEDC)\n(Covers: Adamawa, Borno, Taraba, Yobe)\nInteractive Tool: YEDC provides a direct checking tool. Visit the [YEDC Band/Tariff Checker Portal](https://www.yedc.com.ng/), input your Meter or Account Number, and retrieve your Customer Band, Tariff (₦/kWh), and local Service Center.",
    date: "July 10, 2026",
    category: "Tariffs",
    readTime: "6 min read",
    color: "#EF4444"
  },
  {
    id: "6",
    title: "Why Your ₦10,000 Buys Fewer Units Today: The Hidden Factors Affecting Your Electricity Token",
    snippet: "If you are a Nigerian using a prepaid electricity meter, you have probably experienced this frustrating scenario: You buy ₦10,000 worth of electricity today and get a certain number of units. A few weeks later, you buy another ₦10,000 worth, but the units you receive are significantly lower.",
    content: "If you are a Nigerian using a prepaid electricity meter, you have probably experienced this frustrating scenario: You buy ₦10,000 worth of electricity today and get a certain number of units. A few weeks later, you buy another ₦10,000 worth, but the units you receive are significantly lower.\n\nDid the Distribution Company (DisCo) cheat you? Not necessarily.\n\nWhen you purchase an electricity token, your money doesn't just go straight into buying units (kilowatt-hours, or kWh). It runs through a gauntlet of taxes, fees, and classifications first. Let's break down the hidden factors that determine exactly how much electricity you get for your money.\n\n1. Your Tariff Band (The Biggest Factor)\n\nThe Nigerian Electricity Regulatory Commission (NERC) classifies neighborhoods into different \"Bands\" (A to E) based on the number of hours of electricity they receive daily.\n\nBand A (Minimum 20 hours): Pays the highest rate per unit.\nBand E (Minimum 4 hours): Pays the lowest rate per unit.\n\nIf your neighborhood is upgraded from Band B to Band A, the cost of a single unit of electricity increases significantly. Therefore, the same ₦10,000 will buy you far fewer units because you are now paying a premium for increased availability.\n\n2. Value Added Tax (VAT)\n\nElectricity is not exempt from taxes. By law, a 7.5% Value Added Tax (VAT) is deducted from your purchase amount before your units are calculated.\n\nIf you recharge ₦10,000, the entire amount doesn't go toward electricity. The government takes its 7.5% cut, leaving you with less principal money to convert into actual power.\n\n3. Vendor Convenience Fees\n\nMost of us buy our electricity tokens through bank apps, FinTech platforms (like OPay, PalmPay), or third-party vendors (like BuyPower or Quickteller). These platforms charge a convenience fee for processing the transaction—usually a flat rate of ₦100.\n\nWhile ₦100 might seem small, it is deducted from your total amount before the units are calculated.\n\n4. Outstanding Debts and Arrears\n\nIf you recently moved into a new apartment, or if your meter was migrated from the old postpaid billing system to a prepaid one, there might be an outstanding debt tied to your account.\n\nPrepaid meters automatically recover these debts. They usually deduct a certain percentage of your recharge amount (often between 20% to 50%) to service the old debt. If you notice a massive drop in your units, check your receipt—it will usually indicate if a portion of your money was swallowed by an \"Arrears Deduction.\"\n\n5. Multi-Year Tariff Order (MYTO) Adjustments\n\nElectricity tariffs in Nigeria are not static. NERC uses a framework called the Multi-Year Tariff Order (MYTO) to adjust electricity prices twice a year based on economic realities. The cost of generating electricity is affected by:\n- The inflation rate.\n- The exchange rate (Naira to Dollar), because gas suppliers and equipment are often paid in foreign currency.\n- The domestic price of natural gas.\n\nWhen these economic indicators go up, NERC approves a tariff increase for the DisCos. When the base price of electricity increases, your standard ₦10,000 recharge will naturally yield fewer units.\n\nUnit Calculation Formula\n\nTotal Available for Units = Amount Paid - Vendor Fee - Debt - VAT\n\nUnits Received (kWh) = Total Available for Units / Tariff Rate per kWh\n\nHow to Protect Yourself\n\nThe best way to ensure you are not being shortchanged is to read your receipt. Whether it is a digital receipt from your bank app or a printout, it contains a detailed breakdown of your transaction. It will show you exactly what was deducted for VAT, any vendor fees, your current tariff band, and the exact rate you were charged per unit.\n\nKnowledge is power. Keep an eye on your tariff band, and track your receipts!",
    date: "July 10, 2026",
    category: "Tariffs",
    readTime: "5 min read",
    color: "#EF4444"
  }
]

export function BlogPage({ onBack }: BlogPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All")
  const [isWaitlistOpen, setIsWaitlistOpen] = React.useState(false)

  const activePostId = searchParams.get("post")
  const activePost = BLOG_POSTS.find(p => p.id === activePostId)

  const categories = ["All", "Tariffs", "Audits", "Guides", "Policy", "Solar Backup"]

  const filteredPosts = BLOG_POSTS.filter(post => {
    return selectedCategory === "All" || post.category === selectedCategory
  })

  // Filter similar articles (sharing same category, excluding active post)
  const similarPosts = activePost 
    ? BLOG_POSTS.filter(p => p.id !== activePost.id && p.category === activePost.category)
    : []

  // Parse markdown links [Label](URL) into React elements
  const parseLinks = (text: string) => {
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = regex.exec(text)) !== null) {
      const matchIndex = match.index
      const linkText = match[1]
      const linkUrl = match[2]

      if (matchIndex > lastIndex) {
        parts.push(text.substring(lastIndex, matchIndex))
      }

      parts.push(
        <a
          key={matchIndex}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline font-bold cursor-pointer"
        >
          {linkText}
        </a>
      )

      lastIndex = regex.lastIndex
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex))
    }

    return parts.length > 0 ? parts : text
  }

  // Dynamic Content Formatter to bold and size headers
  const renderFormattedContent = (content: string) => {
    const HEADINGS = [
      "1. Your Tariff Band (The Biggest Factor)",
      "2. Value Added Tax (VAT)",
      "3. Vendor Convenience Fees",
      "4. Outstanding Debts and Arrears",
      "5. Multi-Year Tariff Order (MYTO) Adjustments",
      "Unit Calculation Formula",
      "How to Protect Yourself",
      "To optimize your consumption:",
      "Tips to mitigate:",
      "Here is how to resolve key errors:",
      "To size your system:",
      "What You Need Before You Start",
      "DisCo-by-DisCo Band Checker",
      "1. Abuja Electricity Distribution Company (AEDC)",
      "2. Benin Electricity Distribution Company (BEDC)",
      "3. Eko Electricity Distribution Company (EKEDC)",
      "4. Enugu Electricity Distribution Company (EEDC)",
      "5. Ibadan Electricity Distribution Company (IBEDC)",
      "6. Ikeja Electricity Distribution Company (IKEDC)",
      "7. Jos Electricity Distribution Company (JEDC)",
      "8. Kaduna Electricity Distribution Company (KAEDCO)",
      "9. Kano Electricity Distribution Company (KEDCO)",
      "10. Port Harcourt Electricity Distribution Company (PHED)",
      "11. Yola Electricity Distribution Company (YEDC)"
    ]

    const lines = content.split("\n")
    return lines.map((line, idx) => {
      const trimmed = line.trim()
      if (!trimmed) {
        return <div key={idx} className="h-2" />
      }

      const isHeading = HEADINGS.includes(trimmed)

      if (isHeading) {
        return (
          <h3 key={idx} className="text-lg sm:text-xl font-bold text-[#052e16] mt-8 mb-2 tracking-tight">
            {trimmed}
          </h3>
        )
      }

      // Check for bullet items
      if (trimmed.startsWith("-")) {
        const textContent = trimmed.substring(1).trim()
        return (
          <ul key={idx} className="list-disc pl-5 my-1 text-sm sm:text-base text-gray-600 font-normal leading-relaxed text-left">
            <li>{parseLinks(textContent)}</li>
          </ul>
        )
      }

      // Check for numbered list items
      const isNumbered = /^\d+\.\s/.test(trimmed)
      if (isNumbered) {
        const match = trimmed.match(/^(\d+)\.\s(.*)$/)
        if (match) {
          return (
            <ol key={idx} className="list-decimal pl-5 my-1 text-sm sm:text-base text-gray-600 font-normal leading-relaxed text-left">
              <li value={parseInt(match[1])}>{parseLinks(match[2].trim())}</li>
            </ol>
          )
        }
      }

      return (
        <p key={idx} className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed">
          {parseLinks(trimmed)}
        </p>
      )
    })
  }

  // Full page view if an active article post is selected
  if (activePost) {
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

        <main className="flex-grow w-full flex flex-col items-center pt-28">
          {/* Article Main Text Section */}
          <div className="max-w-3xl w-full px-6 text-left flex flex-col gap-6">
            {/* Article Header details */}
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider mt-4" style={{ color: activePost.color }}>
              <span className="bg-gray-50 px-2 py-0.5 rounded-full">{activePost.category}</span>
              <span>•</span>
              <span className="text-gray-400">{activePost.readTime}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#052e16] tracking-tight leading-snug">
              {activePost.title}
            </h1>

            <div className="text-xs text-gray-400 font-semibold pb-4 border-b border-gray-100">
              <span>Published {activePost.date}</span>
            </div>

            {/* Article Content Body with formatted headers */}
            <div className="flex flex-col gap-4 mt-2">
              {renderFormattedContent(activePost.content)}
            </div>
          </div>

          {/* Similar Blogs section (Wider container for spacious cards layout) */}
          {similarPosts.length > 0 && (
            <div className="max-w-7xl w-full px-6 border-t border-gray-100 mt-16 pt-12 pb-16 text-left">
              <h3 className="text-xl font-extrabold text-[#052e16] mb-8">Similar blogs</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {similarPosts.map((post) => (
                  <StandardCard
                    key={post.id}
                    onClick={() => router.push(`/?page=blog&post=${post.id}`)}
                    className="group cursor-pointer bg-white border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between rounded-2xl relative overflow-hidden text-left"
                  >
                    <div>
                      {/* Category & Time */}
                      <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                        <span
                          style={{ color: post.color }}
                          className="bg-gray-50 px-2 py-0.5 rounded-full font-bold"
                        >
                          {post.category}
                        </span>
                        <span>{post.readTime}</span>
                      </div>

                      {/* Title & Snippet */}
                      <h3 className="text-base font-extrabold text-[#121212] group-hover:text-primary transition-colors leading-snug tracking-tight mb-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-[#4B5563] font-medium leading-relaxed mb-6 line-clamp-3">
                        {post.snippet}
                      </p>
                    </div>

                    {/* Footer details */}
                    <div className="flex justify-between items-center border-t border-gray-50 pt-4 mt-2">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-gray-400">{post.date}</span>
                      </div>
                      <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read Article <span className="text-sm">→</span>
                      </span>
                    </div>
                  </StandardCard>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Waitlist Modal */}
        <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
      </div>
    )
  }

  // Otherwise, render grid and filter list
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans antialiased text-[#121212] select-none">
      {/* Navigation Header */}
      <Header
        onNavigateToFeatures={() => router.push("/#features")}
        onNavigateToFaq={() => router.push("/#faq")}
        onNavigateToContact={() => router.push("/#footer")}
        onNavigateToBlog={() => router.push("/?page=blog")}
        onNavigateHome={() => router.push("/")}
        onJoinWaitlist={() => setIsWaitlistOpen(true)}
        isDarkTheme={true}
      />

      {/* Hero Banner Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#052e16] to-[#021f0e] text-white text-center relative overflow-hidden">
        {/* Ambient shapes detail */}
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
        
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-6 relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
            Blog
          </h1>

          {/* Category Filter Box */}
          <div className="w-full flex justify-center mt-2">
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 justify-center max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`h-10 px-5 rounded-full text-xs font-bold transition-all border shrink-0 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105"
                      : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <main className="max-w-7xl mx-auto px-6 py-16 flex-grow w-full">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {filteredPosts.map((post) => (
              <StandardCard
                key={post.id}
                onClick={() => router.push(`/?page=blog&post=${post.id}`)}
                className="group cursor-pointer bg-white border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between rounded-2xl relative overflow-hidden text-left"
              >
                <div>
                  {/* Category & Time */}
                  <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                    <span
                      style={{ color: post.color }}
                      className="bg-gray-50 px-2 py-0.5 rounded-full font-bold"
                    >
                      {post.category}
                    </span>
                    <span>{post.readTime}</span>
                  </div>

                  {/* Title & Snippet */}
                  <h3 className="text-base font-extrabold text-[#121212] group-hover:text-primary transition-colors leading-snug tracking-tight mb-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#4B5563] font-medium leading-relaxed mb-6 line-clamp-3">
                    {post.snippet}
                  </p>
                </div>

                {/* Footer details */}
                <div className="flex justify-between items-center border-t border-gray-50 pt-4 mt-2">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-400">{post.date}</span>
                  </div>
                  <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read Article <span className="text-sm">→</span>
                  </span>
                </div>
              </StandardCard>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="py-20 text-center flex flex-col items-center gap-4">
            <span className="text-5xl">📄</span>
            <h3 className="text-base font-bold text-[#121212]">No matching articles found</h3>
          </div>
        )}

        {/* Pagination Bar */}
        {filteredPosts.length > 0 && (
          <div className="flex justify-center items-center gap-2 mt-16 pt-8 border-t border-gray-100">
            <button className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center font-bold text-xs bg-white text-gray-400 select-none">
              ←
            </button>
            <button className="w-9 h-9 rounded-lg flex items-center justify-center font-extrabold text-xs bg-primary text-white">
              1
            </button>
            <button className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center font-bold text-xs bg-white text-gray-500 hover:border-gray-300">
              2
            </button>
            <button className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center font-bold text-xs bg-white text-gray-500 hover:border-gray-300">
              3
            </button>
            <button className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center font-bold text-xs bg-white text-gray-500 hover:border-gray-300">
              →
            </button>
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Waitlist Modal */}
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </div>
  )
}
