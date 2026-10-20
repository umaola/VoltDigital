"use client"

import * as React from "react"
import { Skeleton } from "@/components/design-system/skeleton"

export interface TariffItem {
  code: string
  name: string
  rates: Record<string, number>
}

export interface CalculatorSimulatorProps {
  initialAmount?: number
  initialBand?: string
  initialDisco?: string
  onOpenGetApp?: () => void
  onOpenWebApp?: () => void
  tariffs: TariffItem[] | null
  isLoading: boolean
}

const BANDS = [
  { letter: "A", desc: "Premium priority feed", hours: "20+ hrs/day" },
  { letter: "B", desc: "High supply feed", hours: "16+ hrs/day" },
  { letter: "C", desc: "Commercial supply feed", hours: "12+ hrs/day" },
  { letter: "D", desc: "Residential supply feed", hours: "8+ hrs/day" },
  { letter: "E", desc: "Low supply feed", hours: "4+ hrs/day" },
]

export function CalculatorSimulatorSkeleton() {
  return (
    <section id="calculator" className="py-20 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
          <Skeleton className="h-6 w-40 rounded-full" />
          <Skeleton className="h-10 w-96 rounded-2xl" />
          <Skeleton className="h-4 w-full max-w-xl rounded-md" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 h-[380px] bg-white rounded-xl border border-[#F3F4F6] p-6" />
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="h-[180px] bg-white rounded-xl border border-gray-100 p-6" />
            <div className="h-[180px] bg-white rounded-xl border border-gray-100 p-6" />
          </div>
        </div>
      </div>
    </section>
  )
}

export function CalculatorSimulator({
  initialAmount = 5000,
  initialBand = "B",
  initialDisco,
  onOpenGetApp,
  onOpenWebApp,
  tariffs,
  isLoading
}: CalculatorSimulatorProps) {
  const [amount, setAmount] = React.useState<number | string>(initialAmount)
  const [selectedBand, setSelectedBand] = React.useState<string>(
    initialBand.replace("Band ", "").trim() || "B"
  )

  const defaultDisco =
    initialDisco || (tariffs && tariffs.length > 0 ? tariffs[0].code : "ikeja-electric")
  const [selectedDisco, setSelectedDisco] = React.useState<string>(defaultDisco)

  React.useEffect(() => {
    if (tariffs && tariffs.length > 0 && !tariffs.some((t) => t.code === selectedDisco)) {
      setSelectedDisco(tariffs[0].code)
    }
  }, [tariffs, selectedDisco])

  if (isLoading || !tariffs || tariffs.length === 0) {
    return <CalculatorSimulatorSkeleton />
  }

  const currentDiscoData = tariffs.find((d) => d.code === selectedDisco) || tariffs[0]
  const currentBandMeta = BANDS.find((b) => b.letter === selectedBand) || BANDS[1]

  const bandKey = `Band ${selectedBand}`
  const baseRate =
    currentDiscoData?.rates?.[bandKey] ?? currentDiscoData?.rates?.[selectedBand] ?? 61.20

  const numericAmount = Number(amount) || 0
  const estimatedUnits = numericAmount > 0 && baseRate > 0 ? numericAmount / baseRate : 0

  const acHours = estimatedUnits / 1.2
  const fridgeHours = estimatedUnits / 0.25
  const fanHours = estimatedUnits / 0.075

  const handleReset = () => {
    setAmount(5000)
    setSelectedBand("B")
    if (tariffs && tariffs.length > 0) {
      setSelectedDisco(tariffs[0].code)
    }
  }

  return (
    <section className="py-20 bg-gray-50 border-y border-gray-100" id="calculator">
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
            <div className="rounded-xl border border-[#F3F4F6] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6 h-full flex flex-col gap-6 bg-white justify-between">
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
                    {tariffs.map((disco) => (
                      <option key={disco.code} value={disco.code}>
                        {disco.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col text-left gap-1.5">
                  <label htmlFor="band" className="text-xs font-semibold text-[#4B5563] uppercase tracking-wider">
                    Select Service Feeder Band
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {BANDS.map((band) => (
                      <button
                        key={band.letter}
                        type="button"
                        onClick={() => setSelectedBand(band.letter)}
                        className={`h-10 rounded-lg flex items-center justify-center font-bold text-xs border transition-all ${
                          selectedBand === band.letter
                            ? "bg-primary border-primary text-white"
                            : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                        }`}
                      >
                        {band.letter}
                      </button>
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold text-gray-400 mt-1 block">
                    {currentBandMeta.desc} • Expected supply hours: {currentBandMeta.hours}
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
                      value={amount}
                      onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                      placeholder="e.g. 5000"
                      className="w-full h-10 pl-8 pr-3 rounded-lg border border-[#E5E7EB] bg-white text-sm text-[#121212] font-semibold focus:border-primary focus:border-2 hover:border-[#D1D5DB] transition-all outline-none"
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
                  onClick={handleReset}
                  className="flex-1 h-10 rounded-lg border border-gray-200 text-xs font-semibold text-[#4B5563] hover:bg-gray-50 transition-colors"
                >
                  Reset Calculator
                </button>
                <button
                  type="button"
                  onClick={onOpenGetApp}
                  className="flex-1 h-10 rounded-lg bg-primary hover:bg-[#00a656] text-white flex items-center justify-center text-xs font-semibold shadow-md shadow-primary/10 transition-colors cursor-pointer"
                >
                  Save in App
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6 bg-white border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-left w-full md:w-auto">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Estimated Balance
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-5xl font-extrabold text-[#121212] tracking-tight">
                    {estimatedUnits.toFixed(2)}
                  </span>
                  <span className="text-lg font-bold text-[#4B5563]">kWh</span>
                </div>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  Based on current {currentDiscoData.name} rates for Band {selectedBand}.
                </p>
                <div className="flex items-start gap-1.5 mt-3 max-w-[280px] border-t border-gray-100 pt-3">
                  <span className="text-[10px] shrink-0">⚠️</span>
                  <p className="text-[10px] text-gray-400 font-semibold leading-normal">
                    The above units are estimates. Actual values may vary.{" "}
                    <a href="/?page=blog&post=6" className="text-primary hover:underline font-bold">
                      Understand why
                    </a>
                    .
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
            </div>

            <div className="rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6 bg-white border border-gray-100 text-left">
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
                  <span className="text-xs font-bold text-[#EF4444] uppercase tracking-wider mt-1">
                    1.5 HP Inverter AC
                  </span>
                  <span className="text-base font-extrabold text-[#121212]">
                    {acHours.toFixed(1)} hrs
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
                  <span className="text-xs font-bold text-[#16A34A] uppercase tracking-wider mt-1">
                    Double Door Fridge
                  </span>
                  <span className="text-base font-extrabold text-[#121212]">
                    {fridgeHours.toFixed(1)} hrs
                  </span>
                  <span className="text-[10px] text-gray-500">Food preservation</span>
                </div>

                <div className="bg-[#eff6ff] p-4 rounded-xl border border-[#dbeafe] flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-lg border border-[#dbeafe] bg-white flex items-center justify-center text-[#3B82F6]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0 -6 0M12 2v7M12 15v7M2 12h7M15 12h7" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider mt-1">
                    Standing Fan
                  </span>
                  <span className="text-base font-extrabold text-[#121212]">
                    {fanHours.toFixed(1)} hrs
                  </span>
                  <span className="text-[10px] text-gray-500">Constant ventilation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
