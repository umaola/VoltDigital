"use client"

import * as React from "react"
import {
  IconFlame,
  IconPlug,
  IconAlertTriangle,
  IconTrendingUp
} from "@tabler/icons-react"
import { StandardCard } from "@/components/design-system/card"
import { Skeleton } from "@/components/design-system/skeleton"

export interface FeatureItem {
  title: string
  desc: string
  icon: React.ComponentType<{ className?: string }>
  iconBg: string
  iconColor: string
}

export interface FeaturesProps {
  items?: FeatureItem[]
  isLoading?: boolean
}

const DEFAULT_BENEFITS: FeatureItem[] = [
  {
    title: "Burn Rate Prediction",
    desc: "Forecast how many days and hours your prepaid electricity units will last. Calibration algorithms adapt to changing load patterns and power grid availability.",
    icon: IconFlame,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    title: "Appliance Energy Audit",
    desc: "Catalog home appliances and usage hours to uncover real consumption. Discover immediately which device consumes the majority of your recharge budget.",
    icon: IconPlug,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
  {
    title: "Low Unit Warning Alerts",
    desc: "Receive timely smart notifications before your meter units expire. Avoid abrupt midnight blackouts and preserve stored food items effortlessly.",
    icon: IconAlertTriangle,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
  {
    title: "Spike and Leak Detection",
    desc: "Detect abnormal surges in power consumption. Spot faulty appliance compressors, line leakages, or billing mismatches from your regional DisCo.",
    icon: IconTrendingUp,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
]

export function FeaturesSkeleton() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-10 w-72 rounded-xl" />
          <Skeleton className="h-4 w-96 rounded-md" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-6 border border-gray-100 rounded-2xl flex gap-5">
              <Skeleton className="w-12 h-12 rounded-xl flex-shrink-0" />
              <div className="flex-1 flex flex-col gap-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Features({ items = DEFAULT_BENEFITS, isLoading = false }: FeaturesProps) {
  if (isLoading) {
    return <FeaturesSkeleton />
  }

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-[#e6fcf0] px-3.5 py-1.5 rounded-full">
            Core Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#052e16] tracking-tight mt-4">
            Engineered for complete energy clarity
          </h2>
          <p className="text-[#4B5563] text-sm sm:text-base font-medium mt-3 leading-relaxed">
            Volt eliminates guesswork from prepaid electricity meters, delivering full transparency over how you track and consume electricity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((benefit, i) => {
            const Icon = benefit.icon
            return (
              <StandardCard
                key={i}
                className="p-6 sm:p-7 flex gap-5 text-left border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white rounded-2xl"
              >
                <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center ${benefit.iconBg}`}>
                  <Icon className={`w-6 h-6 ${benefit.iconColor}`} />
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-[#121212] tracking-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-sm font-medium text-[#4B5563] leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </StandardCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
