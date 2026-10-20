"use client"

import * as React from "react"
import { IconBrandGooglePlay, IconWorld, IconCheck } from "@tabler/icons-react"
import { Skeleton } from "@/components/design-system/skeleton"

export interface PlatformShowcaseProps {
  onOpenGetApp?: () => void
  onOpenWebApp?: () => void
  playStoreUrl?: string
  appStoreUrl?: string
  webAppUrl?: string
  isLoading?: boolean
}

export function PlatformShowcaseSkeleton() {
  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-10 w-80 rounded-xl" />
          <Skeleton className="h-4 w-96 rounded-md" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-72 rounded-2xl" />
          <Skeleton className="h-72 rounded-2xl" />
        </div>
      </div>
    </section>
  )
}

export function PlatformShowcase({
  onOpenGetApp,
  onOpenWebApp,
  playStoreUrl = "https://play.google.com/store/apps/details?id=com.voltdigitalservices.app",
  webAppUrl = "https://app.voltdigitalservices.com",
  isLoading = false
}: PlatformShowcaseProps) {
  if (isLoading) {
    return <PlatformShowcaseSkeleton />
  }

  const handlePlayStoreClick = () => {
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
    <section className="py-24 bg-[#FBFBFD] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00BF63] bg-emerald-50 border border-emerald-200/60 px-3.5 py-1.5 rounded-full">
            Platform Availability
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#052e16] tracking-tight mt-4">
            Access Volt anywhere on your terms
          </h2>
          <p className="text-[#4B5563] text-sm sm:text-base font-medium mt-3 leading-relaxed">
            The native Android app is ready today on the Google Play Store, and all users can access our responsive web application instantly. The iOS edition is coming soon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div
            className="p-8 sm:p-10 rounded-3xl text-white flex flex-col justify-between text-left relative overflow-hidden shadow-2xl border border-white/10 group"
            style={{ backgroundColor: "#0b0b12" }}
          >
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#00BF63]/15 rounded-full blur-3xl pointer-events-none group-hover:bg-[#00BF63]/25 transition-all duration-500" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 text-[#00BF63] flex items-center justify-center shadow-lg">
                  <IconBrandGooglePlay className="w-8 h-8" />
                </div>
                <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#00BF63]/20 border border-[#00BF63]/30 text-emerald-300">
                  Ready on Google Play
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Volt for Android
              </h3>

              <p className="text-sm font-medium text-gray-300 mt-3 leading-relaxed">
                Download directly from the Google Play Store for your Android phone. Track estimated daily burn rates, receive recharge warnings, and manage your electricity budget.
              </p>

              <div className="flex flex-col gap-3 mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 text-xs font-semibold text-gray-300">
                  <IconCheck className="w-4 h-4 text-[#00BF63] flex-shrink-0" />
                  <span>Instant push alerts when balance is estimated low</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-gray-300">
                  <IconCheck className="w-4 h-4 text-[#00BF63] flex-shrink-0" />
                  <span>Smart appliance energy audit without IoT sensors</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-gray-300">
                  <IconCheck className="w-4 h-4 text-[#00BF63] flex-shrink-0" />
                  <span>Full offline functionality with local device storage</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-10">
              <button
                type="button"
                onClick={handlePlayStoreClick}
                className="w-full h-12 rounded-full bg-[#00BF63] hover:bg-[#00a656] active:bg-[#00924b] text-white text-sm font-semibold transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-[#00BF63]/25 cursor-pointer active:scale-95"
              >
                <IconBrandGooglePlay className="w-5 h-5" />
                <span>Get on Google Play</span>
              </button>
            </div>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-200/80 shadow-md flex flex-col justify-between text-left relative overflow-hidden group hover:shadow-xl hover:border-emerald-300 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#00BF63] border border-emerald-200/50 flex items-center justify-center shadow-sm">
                  <IconWorld className="w-8 h-8" />
                </div>
                <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">
                  Universal Web App
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#121212] tracking-tight">
                Volt Web Application
              </h3>

              <p className="text-sm font-medium text-gray-600 mt-3 leading-relaxed">
                Available to Android users, iOS users, and desktop browsers. No installation needed, access your electricity estimates directly from your browser.
              </p>

              <div className="flex flex-col gap-3 mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3 text-xs font-semibold text-gray-600">
                  <IconCheck className="w-4 h-4 text-[#00BF63] flex-shrink-0" />
                  <span>Works across Android, iPhone, Mac, and Windows</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-gray-600">
                  <IconCheck className="w-4 h-4 text-[#00BF63] flex-shrink-0" />
                  <span>Installable directly as a home screen PWA</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-gray-600">
                  <IconCheck className="w-4 h-4 text-[#00BF63] flex-shrink-0" />
                  <span>Apple App Store native release coming soon</span>
                </div>
              </div>
            </div>

            <div className="pt-10">
              <button
                type="button"
                onClick={handleWebAppClick}
                className="w-full h-12 rounded-full border border-gray-300 bg-white text-[#121212] text-sm font-semibold hover:bg-gray-50 active:bg-gray-100 transition-all flex items-center justify-center gap-2.5 shadow-sm cursor-pointer active:scale-95"
              >
                <IconWorld className="w-5 h-5 text-[#00BF63]" />
                <span>Launch Web App</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
