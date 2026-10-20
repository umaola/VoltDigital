"use client"

import * as React from "react"
import { IconMail, IconCheck } from "@tabler/icons-react"
import { StandardCard } from "@/components/design-system/card"
import { Skeleton } from "@/components/design-system/skeleton"

export interface NewsletterProps {
  onSubscribeSuccess?: (email: string) => void
  isLoading?: boolean
}

export function NewsletterSkeleton() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-gray-50 border border-gray-100 flex flex-col items-center gap-4">
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-10 w-72 rounded-xl" />
          <Skeleton className="h-4 w-96 rounded-md" />
          <Skeleton className="h-12 w-full max-w-md rounded-xl mt-4" />
        </div>
      </div>
    </section>
  )
}

export function Newsletter({ onSubscribeSuccess, isLoading = false }: NewsletterProps) {
  const [email, setEmail] = React.useState("")
  const [emailError, setEmailError] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [acceptPromotional, setAcceptPromotional] = React.useState(true)

  if (isLoading) {
    return <NewsletterSkeleton />
  }

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim()) {
      setEmailError("Please enter your email address")
      return false
    }
    if (!emailRegex.test(email.trim())) {
      setEmailError("Please enter a valid email address")
      return false
    }
    setEmailError("")
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    const emailLower = email.trim().toLowerCase()
    const existingSubscribers = JSON.parse(localStorage.getItem("volt_newsletter") || "[]")
    const emailExists = existingSubscribers.some((entry: any) => entry.email === emailLower)

    if (emailExists) {
      setEmailError("This email is already registered")
      setIsSubmitting(false)
      return
    }

    const newSubscriber = {
      type: "newsletter",
      email: emailLower,
      promo_accepted: acceptPromotional,
      timestamp: new Date().toISOString()
    }

    fetch("https://script.google.com/macros/s/AKfycbz9tvpytFwJiOK-1KvEinhlsnOJsVKrRhzxPPEj9Lk59vOj3VFBKTy-DLudgpBFKfVp/exec", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newSubscriber)
    })
      .then(() => {
        existingSubscribers.push(newSubscriber)
        localStorage.setItem("volt_newsletter", JSON.stringify(existingSubscribers))
        setIsSuccess(true)
        setIsSubmitting(false)
        onSubscribeSuccess?.(emailLower)
      })
      .catch(() => {
        existingSubscribers.push(newSubscriber)
        localStorage.setItem("volt_newsletter", JSON.stringify(existingSubscribers))
        setIsSuccess(true)
        setIsSubmitting(false)
        onSubscribeSuccess?.(emailLower)
      })
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <StandardCard className="p-8 sm:p-12 rounded-3xl bg-[#052e16] text-white border-0 shadow-xl text-center relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full mb-4">
              Energy Updates
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Stay ahead of power tariff updates
            </h2>

            <p className="text-gray-300 text-sm sm:text-base font-medium mt-3 leading-relaxed">
              Receive notifications on NERC tariff reviews, regional DisCo feeder reclassifications, and energy saving tips.
            </p>

            {isSuccess ? (
              <div className="mt-8 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center gap-2 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                  <IconCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Subscription Confirmed</h3>
                <p className="text-xs text-gray-300 font-medium">
                  We will keep you updated on electricity tariff alerts and updates.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full mt-8 flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <IconMail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (emailError) setEmailError("")
                      }}
                      placeholder="Enter your email address"
                      disabled={isSubmitting}
                      className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 px-6 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-[#00a656] active:bg-[#00924b] transition-colors shadow-md shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer flex-shrink-0"
                  >
                    <span>{isSubmitting ? "Subscribing" : "Subscribe"}</span>
                  </button>
                </div>

                {emailError && (
                  <span className="text-xs text-red-400 font-semibold text-left self-start pl-1">
                    {emailError}
                  </span>
                )}

                <label className="flex items-center gap-2 self-start cursor-pointer text-left mt-2">
                  <input
                    type="checkbox"
                    checked={acceptPromotional}
                    onChange={(e) => setAcceptPromotional(e.target.checked)}
                    className="rounded border-white/20 text-primary focus:ring-primary bg-white/10"
                  />
                  <span className="text-xs text-gray-400 font-medium">
                    Send me monthly energy insights and tariff breakdown notices
                  </span>
                </label>
              </form>
            )}
          </div>
        </StandardCard>
      </div>
    </section>
  )
}
