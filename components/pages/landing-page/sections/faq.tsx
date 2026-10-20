"use client"

import * as React from "react"
import { IconChevronDown } from "@tabler/icons-react"
import { StandardCard } from "@/components/design-system/card"
import { Skeleton } from "@/components/design-system/skeleton"

export interface FAQItem {
  q: string
  a: string
}

export interface FAQProps {
  items?: FAQItem[]
  isLoading?: boolean
}

const DEFAULT_FAQS: FAQItem[] = [
  {
    q: "What is Volt?",
    a: "Volt is a personal electricity tracking and budgeting application. It estimates your daily burn rate, projects when your units may run out, and helps you budget electricity expenses without guesswork."
  },
  {
    q: "Is Volt available on mobile app stores?",
    a: "Yes, the Volt mobile app is available on the Google Play Store for Android. Users on any device can also launch the responsive web app, and the Apple App Store edition for iOS is coming soon."
  },
  {
    q: "Does Volt promise exact meter measurements?",
    a: "No. Volt does not promise exact measurement because it does not use IoT sensors or direct meter hardware. It is a smart tracking and estimation tool that models your consumption based on logged recharge units, official NERC DisCo tariffs, and appliance ratings."
  },
  {
    q: "Do I need special sensors, IoT hardware, or smart meters?",
    a: "No. Volt is entirely software and requires zero external hardware, IoT devices, or physical meter wiring. You can track your usage and audit appliances directly on your phone."
  },
  {
    q: "Can I use Volt from any device or browser?",
    a: "Yes, in addition to the Google Play Android app, our universal web application runs smoothly on iPhones, iPads, Android devices, and desktop computers."
  },
  {
    q: "Why do actual token units differ from tariff calculator estimates?",
    a: "DisCos often subtract past arrears, outstanding debts, and vendor convenience fees prior to calculating token units. A statutory 7.5% Value Added Tax is also deducted from the principal payment by the provider."
  }
]

export function FAQSkeleton() {
  return (
    <section id="faq" className="py-16 bg-gray-50 border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12 flex flex-col items-center gap-3">
          <Skeleton className="h-6 w-28 rounded-full" />
          <Skeleton className="h-10 w-72 rounded-xl" />
        </div>
        <div className="flex flex-col gap-2.5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-12 w-full rounded-xl" />
          ))}
        </div>
      </div>
    </section>
  )
}

export function FAQ({ items = DEFAULT_FAQS, isLoading = false }: FAQProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  if (isLoading) {
    return <FAQSkeleton />
  }

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-16 bg-[#F8F9FA] border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-[#e6fcf0] px-3.5 py-1.5 rounded-full">
            Help Center
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#052e16] tracking-tight mt-3">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col gap-2.5">
          {items.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <StandardCard
                key={i}
                className="!p-0 overflow-hidden border border-gray-200/80 transition-all bg-white rounded-xl shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => handleToggle(i)}
                  className="w-full py-3 px-4 sm:py-3.5 sm:px-5 text-left flex items-center justify-between gap-3 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-[#121212] tracking-tight">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-emerald-50 text-primary" : "text-gray-500"
                    }`}
                  >
                    <IconChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 pt-1 text-xs sm:text-sm text-[#4B5563] leading-relaxed border-t border-gray-50 text-left">
                    {faq.a}
                  </div>
                )}
              </StandardCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
