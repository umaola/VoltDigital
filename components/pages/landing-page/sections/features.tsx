"use client"

import * as React from "react"
import { StandardCard } from "@/components/design-system/card"
import {
  IconFlame,
  IconPlug,
  IconAlertTriangle,
  IconTrendingUp
} from "@tabler/icons-react"

export function Features() {
  const benefits = [
    {
      title: "Smart Burn Rate Prediction",
      desc: "Forecast how many days your electricity units will last down to the hour. Calibration models adapt dynamically to your changing loads and supply outages.",
      icon: IconFlame,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
    },
    {
      title: "Appliance Energy Audit",
      desc: "Add household appliances (AC, fridge, television, inverter) and usage times to run audit calculations. Discover immediately which device is draining your wallet.",
      icon: IconPlug,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-500",
    },
    {
      title: "Low Unit Warning Alerts",
      desc: "Receive timely push notifications and smart alerts before your units run completely dry. Avoid sudden blackouts and protect your appliances from power surges.",
      icon: IconAlertTriangle,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-500",
    },
    {
      title: "Smart Spike Monitoring",
      desc: "Spot abnormal spikes in electricity consumption. Identify faulty appliances, power leakages, or billing mismatches from your Distribution Company (Disco).",
      icon: IconTrendingUp,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
    },
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-[#e6fcf0] px-3 py-1 rounded-full">
            Product Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#052e16] tracking-tight mt-3">
            Designed for Energy Clarity
          </h2>
          <p className="text-[#4B5563] text-sm sm:text-base font-medium mt-3 leading-relaxed">
            Volt takes the complexity out of prepaid electricity meters, giving you full control over how you recharge, track, and consume power.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon
            return (
              <StandardCard
                key={i}
                className="p-6 flex gap-5 text-left border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white"
              >
                {/* Icon Wrapper */}
                <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center ${benefit.iconBg}`}>
                  <Icon className={`w-6 h-6 ${benefit.iconColor}`} />
                </div>

                {/* Text Content */}
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
