"use client"

import * as React from "react"
import { StandardCard, DashboardCard } from "@/components/design-system/card"

interface ApplianceItem {
  id: string
  name: string
  emoji: string
  defaultWatts: number
  defaultHours: number
}

interface ApplianceSimulatorProps {
  onJoinWaitlist?: () => void
}

const APPLIANCES: ApplianceItem[] = [
  { id: "ac", name: "Air Conditioner", emoji: "❄️", defaultWatts: 1500, defaultHours: 4 },
  { id: "fridge", name: "Refrigerator", emoji: "🥦", defaultWatts: 250, defaultHours: 24 },
  { id: "fan", name: "Fan", emoji: "🌀", defaultWatts: 75, defaultHours: 8 },
  { id: "tv", name: "TV", emoji: "📺", defaultWatts: 100, defaultHours: 6 },
  { id: "microwave", name: "Microwave", emoji: "🍲", defaultWatts: 800, defaultHours: 0.5 },
]

const BAND_RATES: Record<string, number> = {
  "Band A": 209.50,
  "Band B": 62.50,
  "Band C": 50.00,
  "Band D": 37.50,
  "Band E": 37.50,
}

export function ApplianceSimulator({ onJoinWaitlist }: ApplianceSimulatorProps) {
  const [activeDisco, setActiveDisco] = React.useState<string>("Band A")
  const [activeAppliances, setActiveAppliances] = React.useState<Record<string, boolean>>({
    ac: true,
    fridge: true,
    fan: true,
    tv: false,
    microwave: false,
  })
  const [usageHours, setUsageHours] = React.useState<Record<string, number>>({
    ac: 4,
    fridge: 24,
    fan: 8,
    tv: 6,
    microwave: 0.5,
  })

  const handleToggle = (id: string) => {
    setActiveAppliances((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleHoursChange = (id: string, hours: number) => {
    setUsageHours((prev) => ({ ...prev, [id]: Math.min(24, Math.max(0.1, hours)) }))
  }

  // Calculate energy consumption
  let totalDailyKwh = 0
  APPLIANCES.forEach((app) => {
    if (activeAppliances[app.id]) {
      const watts = app.defaultWatts
      const hours = usageHours[app.id]
      totalDailyKwh += (watts * hours) / 1000
    }
  })

  const totalMonthlyKwh = totalDailyKwh * 30
  const activeRate = BAND_RATES[activeDisco] || 209.50
  const totalMonthlyCost = totalMonthlyKwh * activeRate

  return (
    <section id="auditor" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-[#e6fcf0] px-3 py-1 rounded-full">
            Interactive Energy Auditor
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#052e16] tracking-tight mt-3">
            Audit Your Household Consumption
          </h2>
          <p className="text-[#4B5563] text-sm sm:text-base font-medium mt-3 leading-relaxed">
            Find out exactly what powers your home. Toggle standard Nigerian household appliances and adjust their hours to see how they impact your monthly bill.
          </p>
        </div>

        {/* Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Appliance controls */}
          <div className="lg:col-span-7 flex flex-col gap-4 text-left">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
              Select & Configure Devices
            </h3>

            {APPLIANCES.map((app) => {
              const isActive = activeAppliances[app.id]
              const hours = usageHours[app.id]

              return (
                <StandardCard
                  key={app.id}
                  className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all border ${
                    isActive ? "border-primary bg-[#e6fcf0]/10" : "border-gray-100 bg-white"
                  }`}
                >
                  {/* Info Column */}
                  <div className="flex items-center gap-3">
                    <div
                      onClick={() => handleToggle(app.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg cursor-pointer transition-all ${
                        isActive ? "bg-primary/20 scale-105" : "bg-gray-100 opacity-60 hover:opacity-100"
                      }`}
                    >
                      {app.emoji}
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm font-bold text-[#121212]">{app.name}</h4>
                      <p className="text-[10px] text-gray-500 font-semibold">{app.defaultWatts} Watts power draw</p>
                    </div>
                  </div>

                  {/* Settings Column */}
                  {isActive ? (
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleHoursChange(app.id, hours - 1)}
                          className="w-7 h-7 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-xs"
                          disabled={hours <= 1}
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-[#121212] w-12 text-center">
                          {hours >= 1 ? `${hours.toFixed(0)} hrs` : `${Math.round(hours * 60)} min`}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleHoursChange(app.id, hours + 1)}
                          className="w-7 h-7 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-xs"
                          disabled={hours >= 24}
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs font-bold text-primary w-16 text-right">
                        {(((app.defaultWatts * hours) / 1000)).toFixed(2)} kWh/d
                      </span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleToggle(app.id)}
                      className="h-8 px-4 rounded-lg bg-gray-100 text-xs font-bold text-[#4B5563] hover:bg-gray-200 transition-colors"
                    >
                      Add Device
                    </button>
                  )}
                </StandardCard>
              )
            })}
          </div>

          {/* Right Column: Calculations & Dashboard summary */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <DashboardCard className="p-6 h-full flex flex-col gap-6 justify-between bg-white text-left">
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                  Energy Consumption Report
                </h3>

                {/* Grid tariff select */}
                <div className="flex flex-col gap-1.5 mb-6">
                  <span className="text-xs font-semibold text-[#4B5563] uppercase tracking-wider">
                    Select Billing Feeder Band
                  </span>
                  <div className="grid grid-cols-5 gap-1.5">
                    {Object.keys(BAND_RATES).map((band) => (
                      <button
                        key={band}
                        type="button"
                        onClick={() => setActiveDisco(band)}
                        className={`h-8 rounded-lg font-bold text-[10px] border transition-all ${
                          activeDisco === band
                            ? "bg-primary border-primary text-white"
                            : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                        }`}
                      >
                        {band.split(" ")[1]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* STATS Display */}
                <div className="flex flex-col gap-4 border-t border-gray-100 pt-5">
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Daily consumption</span>
                      <span className="text-2xl font-bold text-[#121212]">{totalDailyKwh.toFixed(2)} <span className="text-sm text-gray-500 font-medium">kWh/day</span></span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Monthly energy</span>
                      <span className="text-2xl font-bold text-[#121212]">{totalMonthlyKwh.toFixed(1)} <span className="text-sm text-gray-500 font-medium">kWh/mo</span></span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Cost Summary Banner */}
              <div className="bg-[#e6fcf0] p-4 rounded-xl border border-primary/20 flex flex-col gap-1 items-start mt-6">
                <span className="text-[10px] text-primary font-bold uppercase tracking-wider">Estimated Monthly Bill</span>
                <span className="text-3xl font-extrabold text-[#052e16] tracking-tight">
                  ₦{totalMonthlyCost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-[10px] text-[#334155] font-semibold mt-1">
                  At ₦{activeRate.toFixed(2)}/kWh rate (VAT inclusive).
                </span>
              </div>

              {/* App CTA Button */}
              <button
                type="button"
                onClick={onJoinWaitlist}
                className="w-full h-11 bg-[#121212] hover:bg-black text-white rounded-xl flex items-center justify-center font-bold text-xs transition-colors mt-6 shadow-md cursor-pointer"
              >
                Track Appliances in App
              </button>
            </DashboardCard>
          </div>
        </div>
      </div>
    </section>
  )
}
