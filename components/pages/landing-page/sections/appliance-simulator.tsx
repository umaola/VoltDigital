"use client"

import * as React from "react"
import {
  IconSnowflake,
  IconFridge,
  IconPropeller,
  IconFlame
} from "@tabler/icons-react"
import { Skeleton } from "@/components/design-system/skeleton"

export interface ApplianceItem {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  defaultWatts: number
  defaultHours: number
}

export interface ApplianceSimulatorProps {
  onOpenGetApp?: () => void
  onOpenWebApp?: () => void
  tariffs: any[] | null
  isLoading: boolean
}

const APPLIANCES: ApplianceItem[] = [
  { id: "ac", name: "Air Conditioner", icon: IconSnowflake, defaultWatts: 1500, defaultHours: 4 },
  { id: "fridge", name: "Refrigerator", icon: IconFridge, defaultWatts: 250, defaultHours: 24 },
  { id: "fan", name: "Standing Fan", icon: IconPropeller, defaultWatts: 75, defaultHours: 8 },
]

export function ApplianceSimulatorSkeleton() {
  return (
    <section id="audit" className="py-24 bg-[#FBFBFD] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-12 w-80 rounded-2xl" />
          <Skeleton className="h-4 w-96 rounded-md" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full rounded-2xl" />
            ))}
          </div>
          <div className="lg:col-span-5 h-[340px] bg-white rounded-3xl p-6" />
        </div>
      </div>
    </section>
  )
}

export function ApplianceSimulator({
  onOpenGetApp,
  onOpenWebApp,
  tariffs,
  isLoading
}: ApplianceSimulatorProps) {
  const defaultDisco = tariffs && tariffs.length > 0 ? tariffs[0].code : "ikeja-electric"
  const [selectedDisco, setSelectedDisco] = React.useState<string>(defaultDisco)
  const [selectedBand, setSelectedBand] = React.useState<string>("Band A")

  const [activeAppliances, setActiveAppliances] = React.useState<Record<string, boolean>>({
    ac: true,
    fridge: true,
    fan: true,
  })

  const [usageHours, setUsageHours] = React.useState<Record<string, number>>({
    ac: 4,
    fridge: 24,
    fan: 8,
  })

  React.useEffect(() => {
    if (tariffs && tariffs.length > 0 && !tariffs.some((t) => t.code === selectedDisco)) {
      setSelectedDisco(tariffs[0].code)
    }
  }, [tariffs, selectedDisco])

  if (isLoading || !tariffs || tariffs.length === 0) {
    return <ApplianceSimulatorSkeleton />
  }

  const currentDiscoData = tariffs.find((d) => d.code === selectedDisco) || tariffs[0]
  const baseRate = currentDiscoData.rates[selectedBand] || 209.50

  const toggleAppliance = (id: string) => {
    setActiveAppliances((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleHoursChange = (id: string, hours: number) => {
    setUsageHours((prev) => ({ ...prev, [id]: hours }))
  }

  let totalDailyKWh = 0
  APPLIANCES.forEach((app) => {
    if (activeAppliances[app.id]) {
      const hours = usageHours[app.id] || 0
      totalDailyKWh += (app.defaultWatts * hours) / 1000
    }
  })

  const estimatedDailyCost = totalDailyKWh * baseRate
  const estimatedMonthlyCost = estimatedDailyCost * 30

  return (
    <section id="audit" className="py-24 bg-[#FBFBFD] border-t border-gray-100 text-[#121212]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00BF63] bg-emerald-50 border border-emerald-200/60 px-3.5 py-1.5 rounded-full">
            Appliance Audit
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#052e16] tracking-tight mt-4">
            Interactive Energy Auditor
          </h2>
          <p className="text-gray-600 text-sm sm:text-base font-medium mt-3 leading-relaxed">
            Toggle your household equipment and adjust run times to see daily energy drain and monthly bill impact.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 flex flex-col gap-3.5">
            {APPLIANCES.map((app) => {
              const Icon = app.icon
              const isActive = activeAppliances[app.id]
              const currentHours = usageHours[app.id]
              const dailyDeviceKWh = ((app.defaultWatts * currentHours) / 1000).toFixed(2)

              return (
                <div
                  key={app.id}
                  className={`p-5 rounded-2xl border transition-all text-left ${
                    isActive
                      ? "border-[#00BF63]/40 bg-white shadow-sm"
                      : "border-gray-200/70 bg-white/60 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                          isActive ? "bg-emerald-50 text-[#00BF63]" : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#121212]">{app.name}</h4>
                        <span className="text-xs text-gray-500 font-medium">
                          {app.defaultWatts} Watts power rating
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleAppliance(app.id)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#00BF63] text-white shadow-sm"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {isActive ? "Active" : "Disabled"}
                    </button>
                  </div>

                  {isActive && (
                    <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-xs text-gray-500 font-semibold w-24">
                          {currentHours} hrs daily
                        </span>
                        <input
                          type="range"
                          min="0.5"
                          max="24"
                          step="0.5"
                          value={currentHours}
                          onChange={(e) => handleHoursChange(app.id, parseFloat(e.target.value))}
                          className="w-full accent-[#00BF63] h-1.5 bg-gray-200 rounded-lg cursor-pointer"
                        />
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-[#052e16]">
                          {dailyDeviceKWh} kWh per day
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="lg:col-span-5 p-7 sm:p-8 bg-white border border-gray-200/80 shadow-xl rounded-3xl flex flex-col gap-6 text-left sticky top-28">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <IconFlame className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#121212]">
                Total Audit Summary
              </h3>
            </div>

            <div className="flex flex-col gap-4 bg-[#F8F9FA] p-5 rounded-2xl border border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-gray-500">Daily Electricity Draw</span>
                <span className="text-base font-extrabold text-[#121212]">
                  {totalDailyKWh.toFixed(2)} kWh
                </span>
              </div>

              <div className="flex justify-between items-center border-t border-gray-200/60 pt-3">
                <span className="text-xs font-semibold text-gray-500">Estimated Daily Cost</span>
                <span className="text-base font-extrabold text-[#00BF63]">
                  ₦{estimatedDailyCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>

              <div className="flex justify-between items-center border-t border-gray-200/60 pt-3">
                <span className="text-xs font-semibold text-gray-500">Projected 30 Day Cost</span>
                <span className="text-2xl font-black text-[#052e16]">
                  ₦{estimatedMonthlyCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={onOpenGetApp}
                className="w-full h-12 rounded-full bg-[#00BF63] hover:bg-[#00a656] text-white text-xs font-semibold transition-all shadow-md shadow-[#00BF63]/25 cursor-pointer"
              >
                Download Volt on Android
              </button>
              <button
                type="button"
                onClick={onOpenWebApp}
                className="w-full h-12 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-[#121212] text-xs font-semibold transition-all cursor-pointer"
              >
                Open Universal Web App
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
