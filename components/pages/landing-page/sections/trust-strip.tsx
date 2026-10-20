"use client"

import * as React from "react"
import { IconCheck, IconBolt } from "@tabler/icons-react"
import { Skeleton } from "@/components/design-system/skeleton"

export interface TrustStripProps {
  isLoading?: boolean
}

export function TrustStripSkeleton() {
  return (
    <section className="py-8 bg-[#0B0B12] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <Skeleton className="h-10 w-full bg-white/10 rounded-2xl" />
      </div>
    </section>
  )
}

export function TrustStrip({ isLoading = false }: TrustStripProps) {
  if (isLoading) {
    return <TrustStripSkeleton />
  }

  return (
    <section
      className="py-8 bg-ink-950 border-t border-white/10 text-white"
      style={{ backgroundColor: "#0b0b12", color: "#ffffff" }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#00BF63]">
              <IconBolt className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Compatible with all 11 Nigerian DisCos
              </h3>
              <p className="text-xs text-white/50 font-medium">
                Tariff rate calculations for both prepaid and postpaid meters
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
              <IconCheck className="w-3.5 h-3.5 text-[#00BF63]" />
              Bands A, B, C, D, E Supported
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

