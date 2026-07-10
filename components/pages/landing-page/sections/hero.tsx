"use client"

import * as React from "react"
import { PrimaryButton } from "@/components/design-system/button"

interface HeroProps {
  onNavigateToCalculator: () => void
  onJoinWaitlist: () => void
}

export function Hero({ onNavigateToCalculator, onJoinWaitlist }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#f0fdf4]/50 via-white to-white">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-accent/15 rounded-full blur-3xl -z-10 animate-pulse duration-5000" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Headline & CTAs */}
        <div className="flex flex-col gap-6 text-left max-w-xl">
          {/* Waiting List capsule count badge */}
          <div className="self-start flex items-center gap-2 bg-[#e6fcf0] border border-primary/10 rounded-full px-3 py-1 text-xs text-primary font-bold animate-pulse-rays">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Join 2,450+ Nigerians optimizing their energy bills
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#052e16] tracking-tight leading-[1.1]">
            Track your <span className="text-primary">electricity</span> consumption
          </h1>
          <p className="text-[#334155] text-base sm:text-lg font-medium leading-relaxed">
            Estimate your available units, track burn rates, and receive warnings before sudden blackouts occur. Your tariff, your appliances, your control.
          </p>

          {/* Download & Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <PrimaryButton onClick={onJoinWaitlist} className="w-auto px-8 h-12 shadow-lg shadow-primary/20">
              Join Our Waitlist
            </PrimaryButton>
            <button
              onClick={onNavigateToCalculator}
              className="h-12 px-6 rounded-xl border border-gray-200 text-sm font-semibold hover:bg-gray-50 active:bg-gray-100 transition-colors text-[#334155] flex items-center justify-center gap-2"
            >
              Test Tariff Calculator
            </button>
          </div>


          {/* Disco Trust/Compatibility Badge */}
          <div className="flex items-center gap-3 mt-6 border-t border-[#F3F4F6] pt-6">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-primary/10 border border-white flex items-center justify-center font-bold text-[9px] text-primary">A</div>
              <div className="w-6 h-6 rounded-full bg-primary/10 border border-white flex items-center justify-center font-bold text-[9px] text-primary">B</div>
              <div className="w-6 h-6 rounded-full bg-primary/10 border border-white flex items-center justify-center font-bold text-[9px] text-primary">C</div>
            </div>
            <p className="text-xs text-[#6B7280] font-medium leading-relaxed">
              Rate calculator fully compatible with **EKEDP, IKEDC, AEDC & all major Discos** in Nigeria. Syncs with current NERC tariff caps.
            </p>
          </div>
        </div>

        {/* Right Column - Device Mockup & Floating Badges */}
        <div className="relative flex items-center justify-center select-none">
          {/* Main Angled Mockup Shell */}
          <div className="relative w-[280px] sm:w-[310px] h-[580px] bg-[#121212] rounded-[48px] p-3 shadow-2xl border-4 border-[#2D2D2D] transform hover:-rotate-1 transition-transform duration-500 flex flex-col justify-between">
            {/* Top Speaker & Camera Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl flex items-center justify-center gap-2 z-20">
              <div className="w-2 h-2 rounded-full bg-[#1E1E1E]" />
              <div className="w-12 h-1 bg-[#1E1E1E] rounded-full" />
            </div>

            {/* Inner Dashboard View */}
            <div className="flex-1 rounded-[38px] bg-[#F8F9FA] overflow-hidden flex flex-col pt-7 pb-4 px-4 font-sans relative">
              {/* App Status bar */}
              <div className="flex justify-between items-center text-[10px] font-semibold text-gray-500 mb-3 px-2">
                <span>9:41 AM</span>
                <div className="flex items-center gap-1">
                  <span>Volt App</span>
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                </div>
              </div>

              {/* Home Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                    AO
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] text-gray-500 font-medium">Welcome back</div>
                    <div className="text-xs font-bold text-[#121212] leading-tight">Amarachi Okafor</div>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center">
                  <span className="text-[10px]">🔔</span>
                </div>
              </div>

              {/* Primary Burn Prediction Card (Gauge) */}
              <div className="bg-white rounded-2xl p-4 border border-[#F3F4F6] shadow-sm mb-4 flex flex-col items-center text-center relative overflow-hidden">
                {/* Radial Indicator Background simulation */}
                <div className="w-28 h-28 flex items-center justify-center relative mb-2">
                  <div className="absolute inset-0 rounded-full border-8 border-gray-100" />
                  <div className="absolute inset-0 rounded-full border-8 border-primary border-t-transparent border-r-transparent transform -rotate-45" />
                  <div className="flex flex-col relative z-10">
                    <span className="text-2xl font-bold text-[#121212] leading-tight">18.4</span>
                    <span className="text-[10px] text-gray-500 font-semibold tracking-wide uppercase leading-none">Units left</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 w-full border-t border-gray-100 pt-3 mt-1">
                  <div className="text-left border-r border-gray-100 pr-1">
                    <div className="text-[9px] text-gray-500 uppercase font-semibold">Days Left</div>
                    <div className="text-sm font-bold text-primary">4 Days</div>
                  </div>
                  <div className="text-left pl-1">
                    <div className="text-[9px] text-gray-500 uppercase font-semibold">Burn Rate</div>
                    <div className="text-sm font-bold text-[#121212]">4.3 kWh/d</div>
                  </div>
                </div>
              </div>

              {/* Light State Toggle */}
              <div className="bg-white rounded-2xl p-3 border border-[#F3F4F6] shadow-sm mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                    <span className="text-sm">💡</span>
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-[#121212]">Light availability</div>
                    <div className="text-[10px] text-gray-500">13 hrs tracked today</div>
                  </div>
                </div>
                {/* Custom toggle component */}
                <div className="w-10 h-6 bg-primary rounded-full p-0.5 flex items-center justify-end cursor-pointer">
                  <div className="w-5 h-5 bg-white rounded-full shadow-md" />
                </div>
              </div>

              {/* Quick statistics */}
              <div className="bg-white rounded-2xl p-3 border border-[#F3F4F6] shadow-sm mb-2 flex-grow flex flex-col justify-start">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider text-left mb-2 block">Recent Appliances</span>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#121212]">Inverter AC</span>
                    <span className="font-medium text-gray-500">1.2 kW • 8 hrs</span>
                  </div>
                  <div className="flex justify-between items-center text-xs border-t border-gray-50 pt-1.5">
                    <span className="font-semibold text-[#121212]">Double Door Fridge</span>
                    <span className="font-medium text-gray-500">0.3 kW • 24 hrs</span>
                  </div>
                </div>
              </div>

              {/* Bottom Nav Simulation */}
              <div className="absolute bottom-2 left-4 right-4 h-12 bg-white rounded-xl border border-gray-100 flex items-center justify-around px-2 py-1 shadow-sm">
                <div className="flex flex-col items-center text-primary">
                  <span className="text-xs leading-none">🏠</span>
                  <span className="text-[8px] font-semibold mt-0.5">Home</span>
                </div>
                <div className="flex flex-col items-center text-gray-400">
                  <span className="text-xs leading-none">🧮</span>
                  <span className="text-[8px] font-semibold mt-0.5">Calculator</span>
                </div>
                <div className="flex flex-col items-center text-gray-400">
                  <span className="text-xs leading-none">📊</span>
                  <span className="text-[8px] font-semibold mt-0.5">Insights</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Card 1: Active Tariff rate indicator (left) */}
          <div className="absolute left-[-20px] top-[10%] bg-white rounded-xl p-3 border border-[#F3F4F6] shadow-lg flex items-center gap-3 animate-subtle-bounce z-30">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent-foreground text-sm">
              ₦
            </div>
            <div className="text-left">
              <div className="text-[9px] text-[#4B5563] uppercase font-bold tracking-wider">Band Rate</div>
              <div className="text-xs font-bold text-[#121212]">₦209.50/kWh</div>
            </div>
          </div>

          {/* Floating Card 2: Appliance Leak indicator (right) */}
          <div className="absolute right-[-20px] bottom-[15%] bg-white rounded-xl p-3 border border-[#F3F4F6] shadow-lg flex items-center gap-3 animate-subtle-bounce duration-3000 z-30">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500 font-bold text-xs">
              ⚠️
            </div>
            <div className="text-left">
              <div className="text-[9px] text-red-500 uppercase font-bold tracking-wider">Alert Status</div>
              <div className="text-xs font-bold text-[#121212]">AC drains 45% units</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
