"use client"

import * as React from "react"
import { StandardCard } from "@/components/design-system/card"

interface FAQItem {
  q: string
  a: string
}

const FAQS: FAQItem[] = [
  {
    q: "What exactly is Volt?",
    a: "Volt is a power intelligence platform. It helps users track usage, manage their power, plan their finances around power and be more informed."
  },
  {
    q: "How does the Burn Rate prediction model work?",
    a: "Volt monitors your remaining prepaid meter units over time to determine your average hourly and daily usage. It matches this baseline against the active appliances in your home to forecast exactly how many days your purchase will last before running dry."
  },
  {
    q: "How do Service Feeder Bands (A-E) affect my tariffs?",
    a: "In Nigeria, electricity pricing is tiered under Service Bands set by NERC. Band A feeders get 20+ hours of supply daily at a premium rate (~₦209.50/kWh), while Bands B through E have fewer hours and cheaper tariffs. Volt automatically applies your correct Band rate and VAT (7.5%) to calculate effective units."
  },
  {
    q: "Does Volt require an IoT smart meter hookup?",
    a: "No, Volt is designed to work completely off-first! You can manually calibrate your remaining units and toggle light availability inside the app."
  },
  {
    q: "Can I buy electricity tokens directly on the Volt app?",
    a: "Volt is currently a utility tracking and energy auditing dashboard (MVP). Billing payments, direct token recharging, and community outage map integrations are planned for future versions."
  },
  {
    q: "Why do my actual electricity units received vary from the calculator?",
    a: "In practice, regional Discos (like EKEDP, IKEDC, AEDC) may deduct outstanding debts, local service fees, or collection levies from your payment before generating your token, meaning you receive fewer units. Regional tariff reviews and meter model variations can also introduce differences."
  }
]

export function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-6">
        {/* Title Block */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-[#e6fcf0] px-3 py-1 rounded-full">
            Help Center
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#052e16] tracking-tight mt-3">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordions */}
        <div className="flex flex-col gap-4">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i

            return (
              <StandardCard
                key={i}
                className="p-0 overflow-hidden border border-gray-100 bg-white transition-all shadow-sm"
              >
                {/* Header Toggle */}
                <button
                  type="button"
                  onClick={() => handleToggle(i)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-[#121212] text-sm sm:text-base tracking-tight leading-tight">
                    {faq.q}
                  </span>
                  <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center border border-gray-200 text-xs transition-transform duration-300 ${
                    isOpen ? "rotate-180 bg-primary/10 border-primary text-primary" : "text-gray-400"
                  }`}>
                    ▼
                  </div>
                </button>

                {/* Answer Content */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[300px] opacity-100 border-t border-gray-50" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-5 text-left text-sm font-medium text-[#4B5563] leading-relaxed bg-[#F8F9FA]/30">
                    {faq.a}
                  </div>
                </div>
              </StandardCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
