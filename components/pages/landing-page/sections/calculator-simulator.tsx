"use client"

import * as React from "react"
import { StandardCard } from "@/components/design-system/card"

interface CalculatorSimulatorProps {
  initialAmount?: number
  initialBand?: string
  initialDisco?: string
  onJoinWaitlist?: () => void
  tariffs: any[] | null
  isLoading: boolean
}

const BAND_META: Record<string, { hours: string; color: string; desc: string }> = {
  "Band A": { hours: "20+ hrs/day", color: "#EF4444", desc: "Premium supply feed" },
  "Band B": { hours: "16+ hrs/day", color: "#F59E0B", desc: "High supply feed" },
  "Band C": { hours: "12+ hrs/day", color: "#3B82F6", desc: "Commercial supply feed" },
  "Band D": { hours: "8+ hrs/day", color: "#10B981", desc: "Residential supply feed" },
  "Band E": { hours: "4+ hrs/day", color: "#6B7280", desc: "Low supply feed" },
}

export function CalculatorSimulator({
  initialAmount = 5000,
  initialBand = "Band A",
  initialDisco,
  onJoinWaitlist,
  tariffs,
  isLoading
}: CalculatorSimulatorProps) {
  const [amount, setAmount] = React.useState<number>(initialAmount)
  const [selectedBand, setSelectedBand] = React.useState<string>(initialBand)
  
  const defaultDisco = initialDisco || (tariffs && tariffs.length > 0 ? tariffs[0].code : "ikeja-electric")
  const [selectedDisco, setSelectedDisco] = React.useState<string>(defaultDisco)

  React.useEffect(() => {
    if (tariffs && tariffs.length > 0 && !tariffs.some(t => t.code === selectedDisco)) {
      setSelectedDisco(tariffs[0].code)
    }
  }, [tariffs])

  if (isLoading || !tariffs || tariffs.length === 0) {
    return (
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-24 mx-auto mb-3" />
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-pulse">
            <div className="lg:col-span-5 h-[380px] bg-gray-200 rounded-2xl" />
            <div className="lg:col-span-7 h-[380px] bg-gray-200 rounded-2xl" />
          </div>
        </div>
      </section>
    )
  }

  const currentDiscoData = tariffs.find((d) => d.code === selectedDisco) || tariffs[0]
  const baseRate = currentDiscoData.rates[selectedBand] || 209.50
  const activeBandMeta = BAND_META[selectedBand] || BAND_META["Band A"]
  
  const estimatedUnits = amount / baseRate

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value)
    setAmount(isNaN(val) ? 0 : val)
  }

  const acHours = estimatedUnits / 1.2
  const fanHours = estimatedUnits / 0.075
  const fridgeHours = estimatedUnits / 0.25

  return (
    <section id="calculator" className="py-20 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-[#e6fcf0] px-3 py-1 rounded-full">
            Interactive Calculator
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#052e16] tracking-tight mt-3">
            Simulate Your Electricity Purchase
          </h2>
          <p className="text-[#4B5563] text-sm sm:text-base font-medium mt-3 leading-relaxed">
            Nigerian electricity tariffs depend heavily on your Disco provider and Feeder Band. Input any amount to see exactly how many units (kWh) you will get after taxes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <StandardCard className="p-6 h-full flex flex-col gap-6 bg-white justify-between">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col text-left gap-1.5">
                  <label htmlFor="disco" className="text-xs font-semibold text-[#4B5563] uppercase tracking-wider">
                    Select Distribution Company (Disco)
                  </label>
                  <select
                    id="disco"
                    value={selectedDisco}
                    onChange={(e) => setSelectedDisco(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-[#E5E7EB] bg-white text-sm text-[#121212] focus:border-primary focus:border-2 hover:border-[#D1D5DB] transition-all outline-none"
                  >
                    {tariffs.map((d) => (
                      <option key={d.code} value={d.code}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col text-left gap-1.5">
                  <label htmlFor="band" className="text-xs font-semibold text-[#4B5563] uppercase tracking-wider">
                    Select Service Feeder Band
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {["Band A", "Band B", "Band C", "Band D", "Band E"].map((bandName) => (
                      <button
                        key={bandName}
                        type="button"
                        onClick={() => setSelectedBand(bandName)}
                        className={`h-10 rounded-lg flex items-center justify-center font-bold text-xs border transition-all ${
                          selectedBand === bandName
                            ? "bg-primary border-primary text-white"
                            : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                        }`}
                      >
                        {bandName.split(" ")[1]}
                      </button>
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold text-gray-400 mt-1 block">
                    {activeBandMeta.desc} • Expected supply hours: {activeBandMeta.hours}
                  </span>
                </div>

                <div className="flex flex-col text-left gap-1.5">
                  <label htmlFor="amount" className="text-xs font-semibold text-[#4B5563] uppercase tracking-wider">
                    Amount Paid (₦)
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-gray-400 font-bold text-sm">₦</span>
                    <input
                      id="amount"
                      type="number"
                      min="500"
                      step="500"
                      value={amount || ""}
                      onChange={handleAmountChange}
                      className="w-full h-10 pl-8 pr-3 rounded-lg border border-[#E5E7EB] bg-white text-sm text-[#121212] font-semibold focus:border-primary focus:border-2 hover:border-[#D1D5DB] transition-all outline-none"
                      placeholder="e.g. 5000"
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 font-semibold block">
                    Calculations reflect current official NERC tariff structures.
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setAmount(5000)
                    setSelectedBand("Band A")
                    if (tariffs && tariffs.length > 0) {
                      setSelectedDisco(tariffs[0].code)
                    }
                  }}
                  className="flex-1 h-10 rounded-lg border border-gray-200 text-xs font-semibold text-[#4B5563] hover:bg-gray-50 transition-colors"
                >
                  Reset Calculator
                </button>
                <button
                  type="button"
                  onClick={onJoinWaitlist}
                  className="flex-1 h-10 rounded-lg bg-primary hover:bg-[#00a656] text-white flex items-center justify-center text-xs font-semibold shadow-md shadow-primary/10 transition-colors cursor-pointer"
                >
                  Save in App
                </button>
              </div>
            </StandardCard>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <StandardCard className="p-6 bg-white border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-left w-full md:w-auto">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Estimated Balance</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-5xl font-extrabold text-[#121212] tracking-tight">
                    {estimatedUnits.toFixed(2)}
                  </span>
                  <span className="text-lg font-bold text-[#4B5563]">kWh</span>
                </div>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  Based on current {currentDiscoData.name} rates for {selectedBand}.
                </p>
                <div className="flex items-start gap-1.5 mt-3 max-w-[280px] border-t border-gray-100 pt-3">
                  <span className="text-[10px] shrink-0">⚠️</span>
                  <p className="text-[10px] text-gray-400 font-semibold leading-normal">
                    The above units are estimates. Actual values may vary.{" "}
                    <a href="/?page=blog&post=6" className="text-primary hover:underline font-bold">Understand why</a>.
                  </p>
                </div>
              </div>

              <div className="w-full md:w-[240px] flex flex-col gap-2.5 bg-gray-50 p-4 rounded-xl border border-gray-100 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-500">Tariff Band Rate</span>
                  <span className="font-bold text-[#121212]">₦{baseRate.toFixed(2)}/kWh</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-500">VAT (7.5%)</span>
                  <span className="font-bold text-primary">Included in Rate</span>
                </div>
                <div className="flex justify-between items-center border-t border-dashed border-gray-200 pt-2.5 mt-1 font-bold">
                  <span className="text-primary">Effective Rate</span>
                  <span className="text-primary">₦{baseRate.toFixed(2)}/kWh</span>
                </div>
              </div>
            </StandardCard>

            <StandardCard className="p-6 bg-white border border-gray-100 text-left">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                What does this get me?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#fef2f2] p-4 rounded-xl border border-[#fee2e2] flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-lg border border-[#fee2e2] bg-white flex items-center justify-center text-[#EF4444]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M17 5L7 19M19 12H5M17 19L7 5M12 8l3-3M12 16l-3 3M16 12l3 3M8 12l-3-3" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-[#EF4444] uppercase tracking-wider mt-1">1.5 HP Inverter AC</span>
                  <span className="text-base font-extrabold text-[#121212]">
                    {acHours >= 1 ? `${acHours.toFixed(1)} hrs` : `${Math.round(acHours * 60)} mins`}
                  </span>
                  <span className="text-[10px] text-gray-500">Continuous cooling</span>
                </div>

                <div className="bg-[#f0fdf4] p-4 rounded-xl border border-[#dcfce7] flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-lg border border-[#dcfce7] bg-white flex items-center justify-center text-[#16A34A]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 4a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM5 10h14" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6v2M9 14v4" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-[#16A34A] uppercase tracking-wider mt-1">Double Door Fridge</span>
                  <span className="text-base font-extrabold text-[#121212]">
                    {fridgeHours >= 1 ? `${fridgeHours.toFixed(1)} hrs` : `${Math.round(fridgeHours * 60)} mins`}
                  </span>
                  <span className="text-[10px] text-gray-500">Food preservation</span>
                </div>

                <div className="bg-[#eff6ff] p-4 rounded-xl border border-[#dbeafe] flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-lg border border-[#dbeafe] bg-white flex items-center justify-center text-[#3B82F6]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0 -6 0M12 2v7M12 15v7M2 12h7M15 12h7" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider mt-1">Standing Fan</span>
                  <span className="text-base font-extrabold text-[#121212]">
                    {fanHours >= 1 ? `${fanHours.toFixed(1)} hrs` : `${Math.round(fanHours * 60)} mins`}
                  </span>
                  <span className="text-[10px] text-gray-500">Constant ventilation</span>
                </div>
              </div>
            </StandardCard>
          </div>
        </div>
      </div>
    </section>
  )
}
