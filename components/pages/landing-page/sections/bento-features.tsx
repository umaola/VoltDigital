"use client"

import * as React from "react"
import {
  IconFlame,
  IconPlug,
  IconAlertTriangle,
  IconTrendingUp,
  IconBell
} from "@tabler/icons-react"
import { Skeleton } from "@/components/design-system/skeleton"

export interface BentoFeaturesProps {
  isLoading?: boolean
}

export function BentoFeaturesSkeleton() {
  return (
    <section className="py-24 bg-[#FBFBFD]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-12 w-80 rounded-2xl" />
          <Skeleton className="h-4 w-96 rounded-md" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <Skeleton className="md:col-span-8 h-80 rounded-3xl" />
          <Skeleton className="md:col-span-4 h-80 rounded-3xl" />
          <Skeleton className="md:col-span-4 h-80 rounded-3xl" />
          <Skeleton className="md:col-span-8 h-80 rounded-3xl" />
        </div>
      </div>
    </section>
  )
}

export function BentoFeatures({ isLoading = false }: BentoFeaturesProps) {
  if (isLoading) {
    return <BentoFeaturesSkeleton />
  }

  return (
    <section id="features" className="py-24 bg-[#FBFBFD] text-[#121212]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00BF63] bg-emerald-50 border border-emerald-200/60 px-3.5 py-1.5 rounded-full">
            Intelligent Energy Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#052e16] tracking-tight mt-4">
            Everything you need to master your electricity
          </h2>
          <p className="text-gray-600 text-sm sm:text-base font-medium mt-3 leading-relaxed">
            Eliminate meter anxiety with automated forecasts, appliance audits, and timely recharge warnings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 p-8 rounded-3xl bg-gradient-to-br from-[#052e16] via-[#032311] to-[#011409] text-white flex flex-col justify-between relative overflow-hidden group shadow-xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#00BF63]/20 rounded-full blur-3xl pointer-events-none group-hover:bg-[#00BF63]/30 transition-all duration-500" />

            <div className="relative z-10 text-left">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-[#00BF63] mb-6">
                <IconFlame className="w-6 h-6" />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Predictive Intelligence
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                Smart Burn Rate Prediction
              </h3>
              <p className="text-gray-300 text-sm font-medium mt-3 max-w-lg leading-relaxed">
                Volt analyzes your recharge history and active household appliances to estimate how many days and hours your prepaid units will last without needing IoT hardware.
              </p>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">Countdown</div>
                <div className="text-xl font-black text-white mt-0.5">4 Days 6 Hrs</div>
                <div className="text-[11px] text-gray-400 font-medium">Until next recharge</div>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">Daily Average</div>
                <div className="text-xl font-black text-white mt-0.5">4.3 kWh</div>
                <div className="text-[11px] text-gray-400 font-medium">Calibrated burn rate</div>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">Status</div>
                <div className="text-xl font-black text-[#00BF63] mt-0.5">Optimized</div>
                <div className="text-[11px] text-gray-400 font-medium">Within safe range</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 p-8 rounded-3xl bg-white border border-gray-200/80 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-xl hover:border-emerald-300 transition-all duration-300 text-left">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
                <IconAlertTriangle className="w-6 h-6" />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                Prevent Surprises
              </span>
              <h3 className="text-xl font-black text-[#121212] tracking-tight mt-1">
                Low Unit Warning Alerts
              </h3>
              <p className="text-gray-600 text-sm font-medium mt-3 leading-relaxed">
                Receive proactive push alerts before your units run dry. Keep essential refrigeration and lighting active.
              </p>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-[#F8F9FA] border border-gray-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                <IconBell className="w-4 h-4" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <div className="text-xs font-bold text-[#121212] truncate">Low Units Warning</div>
                <div className="text-[11px] text-gray-500 font-medium">Recharge recommended today</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 p-8 rounded-3xl bg-white border border-gray-200/80 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-xl hover:border-emerald-300 transition-all duration-300 text-left">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                <IconTrendingUp className="w-6 h-6" />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Anomaly Detection
              </span>
              <h3 className="text-xl font-black text-[#121212] tracking-tight mt-1">
                Spike and Leak Detection
              </h3>
              <p className="text-gray-600 text-sm font-medium mt-3 leading-relaxed">
                Identify abnormal spikes in energy consumption caused by faulty appliance compressors or grounding faults.
              </p>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-[#F8F9FA] border border-gray-100 flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-gray-500">Normal Range</span>
                <span className="font-bold text-[#121212]">3.8 kWh daily</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="bg-[#00BF63] h-full rounded-full w-2/3" />
              </div>
            </div>
          </div>

          <div className="md:col-span-8 p-8 rounded-3xl bg-white border border-gray-200/80 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-xl hover:border-emerald-300 transition-all duration-300 text-left">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00BF63] flex items-center justify-center mb-6">
                <IconPlug className="w-6 h-6" />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Load Auditing
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#121212] tracking-tight mt-1">
                Appliance Energy Auditor
              </h3>
              <p className="text-gray-600 text-sm font-medium mt-3 max-w-xl leading-relaxed">
                Add household devices like air conditioners, freezers, and inverters. Discover immediately which device consumes the majority of your recharge budget.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="p-3.5 rounded-2xl bg-[#F8F9FA] border border-gray-100">
                <div className="text-[10px] font-bold text-gray-400 uppercase">Inverter AC</div>
                <div className="text-sm font-black text-[#121212] mt-0.5">1.2 kW load</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#F8F9FA] border border-gray-100">
                <div className="text-[10px] font-bold text-gray-400 uppercase">Deep Freezer</div>
                <div className="text-sm font-black text-[#121212] mt-0.5">250 Watts</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#F8F9FA] border border-gray-100">
                <div className="text-[10px] font-bold text-gray-400 uppercase">Standing Fan</div>
                <div className="text-sm font-black text-[#121212] mt-0.5">75 Watts</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#F8F9FA] border border-gray-100">
                <div className="text-[10px] font-bold text-gray-400 uppercase">Smart TV</div>
                <div className="text-sm font-black text-[#121212] mt-0.5">100 Watts</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
