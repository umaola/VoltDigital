"use client"

import * as React from "react"
import { IconCheck, IconX, IconChevronDown } from "@tabler/icons-react"
import { Skeleton } from "@/components/design-system/skeleton"

export interface CookiePreferences {
  necessary: boolean
  analytics: boolean
}

export interface CookieConsentProps {
  isOpen?: boolean
  onAcceptAll?: () => void
  onDecline?: () => void
  onSavePreferences?: (preferences: CookiePreferences) => void
  onNavigateToPrivacy?: () => void
  onClose?: () => void
}

export function CookieConsentSkeleton() {
  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-50 bg-white rounded-2xl p-5 border border-gray-100 shadow-2xl">
      <div className="flex items-center gap-3 mb-3">
        <Skeleton className="w-9 h-9 rounded-xl" />
        <div className="flex-1 flex flex-col gap-1.5">
          <Skeleton className="h-4 w-32 rounded-md" />
          <Skeleton className="h-3 w-48 rounded-md" />
        </div>
      </div>
      <Skeleton className="h-12 w-full rounded-md mb-4" />
      <div className="flex gap-2">
        <Skeleton className="h-9 flex-1 rounded-xl" />
        <Skeleton className="h-9 flex-1 rounded-xl" />
      </div>
    </div>
  )
}

export function CookieConsent({
  isOpen,
  onAcceptAll,
  onDecline,
  onSavePreferences,
  onNavigateToPrivacy,
  onClose
}: CookieConsentProps) {
  const [internalVisible, setInternalVisible] = React.useState(false)
  const [showPreferences, setShowPreferences] = React.useState(false)
  const [analyticsEnabled, setAnalyticsEnabled] = React.useState(true)

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("volt_cookie_consent")
      if (!stored && isOpen === undefined) {
        setInternalVisible(true)
      } else if (isOpen !== undefined) {
        setInternalVisible(isOpen)
      }
    }
  }, [isOpen])

  const visible = isOpen !== undefined ? isOpen : internalVisible

  if (!visible) return null

  const handleAcceptAll = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("volt_cookie_consent", "all")
      localStorage.setItem(
        "volt_cookie_preferences",
        JSON.stringify({ necessary: true, analytics: true })
      )
    }
    setInternalVisible(false)
    onAcceptAll?.()
    onClose?.()
  }

  const handleDecline = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("volt_cookie_consent", "essential")
      localStorage.setItem(
        "volt_cookie_preferences",
        JSON.stringify({ necessary: true, analytics: false })
      )
    }
    setInternalVisible(false)
    onDecline?.()
    onClose?.()
  }

  const handleSavePreferences = () => {
    const prefs: CookiePreferences = {
      necessary: true,
      analytics: analyticsEnabled
    }
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "volt_cookie_consent",
        analyticsEnabled ? "custom_opt_in" : "essential"
      )
      localStorage.setItem("volt_cookie_preferences", JSON.stringify(prefs))
    }
    setInternalVisible(false)
    onSavePreferences?.(prefs)
    onClose?.()
  }

  return (
    <aside
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-50 bg-white rounded-2xl p-5 border border-gray-200/80 shadow-[0_12px_40px_rgba(0,0,0,0.12)] text-[#121212] flex flex-col gap-4 text-left animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-primary border border-emerald-100 flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
              <path d="M8.5 8.5v.01" />
              <path d="M7.5 15.5v.01" />
              <path d="M15.5 15.5v.01" />
              <path d="M11.5 12.5v.01" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#052e16]">Cookie & Privacy Settings</h3>
            <p className="text-[11px] text-gray-500 font-medium">Compliance & Preferences</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setInternalVisible(false)
            onClose?.()
          }}
          className="w-7 h-7 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close cookie banner"
        >
          <IconX className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-gray-600 leading-relaxed font-normal">
        We use cookies and device storage to retain your selected DisCo tariff preferences, preserve purchase simulations, and measure app adoption under the Nigeria Data Protection Act (NDPA).
      </p>

      {showPreferences && (
        <div className="flex flex-col gap-2.5 pt-2 border-t border-gray-100 animate-in fade-in duration-200">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-200/60">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#121212]">Strictly Necessary</span>
              <span className="text-[10px] text-gray-500">Tariff selection, security & core session</span>
            </div>
            <span className="text-[10px] font-bold text-primary bg-emerald-100/70 px-2 py-0.5 rounded-md">
              Always Active
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-200/60">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#121212]">Analytics & Usage</span>
              <span className="text-[10px] text-gray-500">Anonymous metrics to improve electricity tools</span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={analyticsEnabled}
              onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
              className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                analyticsEnabled ? "bg-primary" : "bg-gray-300"
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform shadow-xs ${
                  analyticsEnabled ? "left-4.5" : "left-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2 pt-1 border-t border-gray-100">
        <div className="flex items-center justify-between text-[11px]">
          <button
            type="button"
            onClick={() => setShowPreferences(!showPreferences)}
            className="text-primary hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>{showPreferences ? "Hide details" : "Customize choices"}</span>
            <IconChevronDown
              className={`w-3 h-3 transition-transform ${showPreferences ? "rotate-180" : ""}`}
            />
          </button>

          {onNavigateToPrivacy ? (
            <button
              type="button"
              onClick={onNavigateToPrivacy}
              className="text-gray-500 hover:text-primary underline cursor-pointer"
            >
              Privacy Policy
            </button>
          ) : (
            <a href="/?page=privacy" className="text-gray-500 hover:text-primary underline">
              Privacy Policy
            </a>
          )}
        </div>

        <div className="flex items-center gap-2 mt-1">
          {showPreferences ? (
            <button
              type="button"
              onClick={handleSavePreferences}
              className="flex-1 h-9 rounded-xl bg-primary hover:bg-[#00a656] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-primary/20 cursor-pointer"
            >
              <IconCheck className="w-3.5 h-3.5" />
              <span>Save Choices</span>
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleDecline}
                className="flex-1 h-9 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Essential Only
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="flex-1 h-9 rounded-xl bg-primary hover:bg-[#00a656] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1 shadow-sm shadow-primary/20 cursor-pointer"
              >
                <IconCheck className="w-3.5 h-3.5" />
                <span>Accept All</span>
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  )
}
