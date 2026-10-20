"use client"

import * as React from "react"
import { Skeleton } from "@/components/design-system/skeleton"

export interface HeroProps {
  onNavigateToCalculator?: () => void
  onOpenGetApp?: () => void
  onOpenWebApp?: () => void
  playStoreUrl?: string
  appStoreUrl?: string
  webAppUrl?: string
  isLoading?: boolean
}

export function HeroSkeleton() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#0B0B12] text-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6 max-w-xl">
          <Skeleton className="h-6 w-20 bg-white/10 rounded-full" />
          <Skeleton className="h-14 w-full bg-white/10 rounded-2xl" />
          <Skeleton className="h-20 w-full bg-white/10 rounded-xl" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-36 bg-white/10 rounded-full" />
            <Skeleton className="h-12 w-36 bg-white/10 rounded-full" />
          </div>
        </div>
        <div className="flex justify-center">
          <Skeleton className="w-[300px] h-[580px] bg-white/5 rounded-[48px]" />
        </div>
      </div>
    </section>
  )
}

export function Hero({
  onOpenGetApp,
  onOpenWebApp,
  playStoreUrl = "https://play.google.com/store/apps/details?id=com.voltdigitalservices.app",
  webAppUrl = "https://app.voltdigitalservices.com",
  isLoading = false
}: HeroProps) {
  if (isLoading) {
    return <HeroSkeleton />
  }

  const handleGetAppClick = () => {
    if (onOpenGetApp) {
      onOpenGetApp()
    } else {
      window.open(playStoreUrl, "_blank", "noopener,noreferrer")
    }
  }

  const handleWebAppClick = () => {
    if (onOpenWebApp) {
      onOpenWebApp()
    } else {
      window.open(webAppUrl, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <section
      className="relative pt-32 sm:pt-40 pb-16 lg:pb-24 bg-ink-950 text-white overflow-hidden"
      style={{ backgroundColor: "#0b0b12", color: "#ffffff" }}
    >
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[500px] h-[400px] bg-gradient-to-b from-[#00BF63]/20 via-emerald-500/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-0" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-amber-400/10 rounded-full blur-[120px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        <div className="flex flex-col gap-6 text-left max-w-xl">
          <div className="self-start inline-flex items-center gap-2 bg-[#e6fcf0] border border-[#00BF63]/20 rounded-full px-3.5 py-1 text-xs text-[#00BF63] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00BF63]" />
            Volt
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Track your <span className="text-[#00BF63]">electricity</span> consumption
          </h1>

          <p className="text-white/70 text-base sm:text-lg font-medium leading-relaxed">
            Estimate your available units, track burn rates, and receive warnings before sudden blackouts occur. Your tariff, your appliances, your control.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <button
              type="button"
              onClick={handleGetAppClick}
              className="h-12 px-8 rounded-full bg-[#00BF63] hover:bg-[#00a656] active:bg-[#00924b] text-white text-sm font-bold transition-all shadow-xl shadow-[#00BF63]/25 cursor-pointer active:scale-95"
            >
              Get App
            </button>

            <button
              type="button"
              onClick={handleWebAppClick}
              className="h-12 px-6 rounded-full border border-white/20 bg-white/10 hover:bg-white/15 text-white text-sm font-semibold transition-all backdrop-blur-md cursor-pointer active:scale-95"
            >
              Launch Web App
            </button>
          </div>
        </div>

        <div className="relative flex items-center justify-center select-none lg:justify-end">
          <div className="relative w-[280px] sm:w-[310px] h-[580px] bg-[#121212] rounded-[48px] p-3 shadow-2xl border-4 border-[#2D2D2D] flex flex-col justify-between">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl flex items-center justify-center gap-2 z-20">
              <div className="w-2 h-2 rounded-full bg-[#1E1E1E]" />
              <div className="w-12 h-1 bg-[#1E1E1E] rounded-full" />
            </div>

            <div className="flex-1 rounded-[38px] bg-[#F8F9FA] overflow-hidden flex flex-col pt-7 pb-4 px-4 font-sans relative">
              <div className="flex justify-between items-center text-[10px] font-semibold text-gray-500 mb-3 px-2">
                <span>9:41 AM</span>
                <div className="flex items-center gap-1">
                  <span>Volt App</span>
                  <div className="w-2 h-2 rounded-full bg-[#00BF63] animate-pulse" />
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#00BF63]/10 flex items-center justify-center text-[#00BF63] font-bold text-xs">
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

              <div className="bg-white rounded-2xl p-4 border border-[#F3F4F6] shadow-sm mb-4 flex flex-col items-center text-center relative overflow-hidden">
                <div className="w-28 h-28 flex items-center justify-center relative mb-2">
                  <div className="absolute inset-0 rounded-full border-8 border-gray-100" />
                  <div className="absolute inset-0 rounded-full border-8 border-[#00BF63] border-t-transparent border-r-transparent transform -rotate-45" />
                  <div className="flex flex-col relative z-10">
                    <span className="text-2xl font-bold text-[#121212] leading-tight">18.4</span>
                    <span className="text-[10px] text-gray-500 font-semibold tracking-wide uppercase leading-none">Units left</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 w-full border-t border-gray-100 pt-3 mt-1">
                  <div className="text-left border-r border-gray-100 pr-1">
                    <div className="text-[9px] text-gray-500 uppercase font-semibold">Days Left</div>
                    <div className="text-sm font-bold text-[#00BF63]">4 Days</div>
                  </div>
                  <div className="text-left pl-1">
                    <div className="text-[9px] text-gray-500 uppercase font-semibold">Burn Rate</div>
                    <div className="text-sm font-bold text-[#121212]">4.3 kWh/d</div>
                  </div>
                </div>
              </div>

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
                <div className="w-10 h-6 bg-[#00BF63] rounded-full p-0.5 flex items-center justify-end">
                  <div className="w-5 h-5 bg-white rounded-full shadow-md" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-3 border border-[#F3F4F6] shadow-sm mb-2 flex-grow flex flex-col justify-start">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider text-left mb-2 block">
                  Recent Appliances
                </span>
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

              <div className="absolute bottom-2 left-4 right-4 h-12 bg-white rounded-xl border border-gray-100 flex items-center justify-around px-2 py-1 shadow-sm">
                <div className="flex flex-col items-center text-[#00BF63]">
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

          <div className="hidden sm:flex absolute -left-4 top-[10%] bg-white rounded-xl p-3 border border-[#F3F4F6] shadow-xl items-center gap-3 z-30">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#00BF63] flex items-center justify-center font-bold text-sm">
              ₦
            </div>
            <div className="text-left">
              <div className="text-[9px] text-[#4B5563] uppercase font-bold tracking-wider">Band Rate</div>
              <div className="text-xs font-bold text-[#121212]">₦209.50/kWh</div>
            </div>
          </div>

          <div className="hidden sm:flex absolute -right-4 bottom-[15%] bg-white rounded-xl p-3 border border-[#F3F4F6] shadow-xl items-center gap-3 z-30">
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
