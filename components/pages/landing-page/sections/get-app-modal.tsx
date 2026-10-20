"use client"

import * as React from "react"
import { IconBrandGooglePlay, IconBrandApple, IconWorld, IconX, IconCheck } from "@tabler/icons-react"

export interface GetAppModalProps {
  isOpen: boolean
  onClose: () => void
  playStoreUrl?: string
  appStoreUrl?: string
  webAppUrl?: string
  onNotifyIos?: (email: string) => void
}

export function GetAppModal({
  isOpen,
  onClose,
  playStoreUrl = "https://play.google.com/store/apps/details?id=com.voltdigitalservices.app",
  appStoreUrl = "https://apps.apple.com/app/volt-electricity-tracker/id6742389141",
  webAppUrl = "https://app.voltdigitalservices.com",
  onNotifyIos
}: GetAppModalProps) {
  const [iosEmail, setIosEmail] = React.useState("")
  const [iosNotified, setIosNotified] = React.useState(false)
  const [error, setError] = React.useState("")

  if (!isOpen) return null

  const handleIosSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!iosEmail.trim() || !emailRegex.test(iosEmail.trim())) {
      setError("Please enter a valid email address")
      return
    }
    setError("")
    setIosNotified(true)
    onNotifyIos?.(iosEmail.trim().toLowerCase())
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 flex flex-col text-left">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <IconX className="w-4 h-4" />
        </button>

        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-[#e6fcf0] px-3 py-1 rounded-full">
            Get Started
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#052e16] tracking-tight mt-3">
            Choose how to access Volt
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            Download our native Android app from Google Play or launch the universal web app.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="p-4 sm:p-5 rounded-2xl border border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-black text-white flex items-center justify-center flex-shrink-0">
                <IconBrandGooglePlay className="w-6 h-6 text-[#00BF63]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#121212]">Volt for Android</h3>
                <p className="text-xs text-gray-500 font-medium">Available on Google Play Store</p>
              </div>
            </div>

            <a
              href={playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 px-4 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-[#00a656] transition-colors flex items-center justify-center gap-2 flex-shrink-0 shadow-sm"
            >
              <span>Download</span>
            </a>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-primary text-white flex items-center justify-center flex-shrink-0">
                <IconWorld className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#121212]">Volt Web App</h3>
                <p className="text-xs text-gray-500 font-medium">Direct browser access for all devices</p>
              </div>
            </div>

            <a
              href={webAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 px-4 rounded-xl border border-gray-300 bg-white text-[#121212] text-xs font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 flex-shrink-0"
            >
              <span>Launch</span>
            </a>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-dashed border-gray-200 bg-white flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center flex-shrink-0">
                <IconBrandApple className="w-5 h-5 text-gray-800" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#121212]">Using an iPhone (iOS)?</h4>
                <p className="text-[11px] text-gray-500 font-medium">
                  The Apple App Store edition is coming soon. Launch the web app today or leave your email to get notified upon iOS release.
                </p>
              </div>
            </div>

            {iosNotified ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-primary bg-emerald-50 p-2.5 rounded-lg">
                <IconCheck className="w-4 h-4" />
                <span>Thank you. We will notify you once the iOS edition is live.</span>
              </div>
            ) : (
              <form onSubmit={handleIosSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={iosEmail}
                  onChange={(e) => {
                    setIosEmail(e.target.value)
                    if (error) setError("")
                  }}
                  placeholder="Enter email for iPhone notice"
                  className="flex-1 h-9 px-3 rounded-lg border border-gray-200 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="h-9 px-3 rounded-lg bg-gray-900 text-white text-xs font-semibold hover:bg-black transition-colors"
                >
                  Notify me
                </button>
              </form>
            )}

            {error && <span className="text-[11px] text-red-500 font-semibold">{error}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
