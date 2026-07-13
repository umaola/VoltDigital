"use client"

import * as React from "react"
import { PrimaryButton } from "@/components/design-system/button"
import { StandardCard } from "@/components/design-system/card"

interface NewsletterProps {
  onSubscribeSuccess?: (email: string) => void
}

export function Newsletter({ onSubscribeSuccess }: NewsletterProps) {
  const [email, setEmail] = React.useState("")
  const [emailError, setEmailError] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [acceptPromotional, setAcceptPromotional] = React.useState(true)

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

    setIsLoading(true)

    const emailLower = email.trim().toLowerCase()
    const existingSubscribers = JSON.parse(localStorage.getItem("volt_newsletter") || "[]")
    const emailExists = existingSubscribers.some((entry: any) => entry.email === emailLower)
    
    if (emailExists) {
      setEmailError("This email is already subscribed.")
      setIsLoading(false)
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
        setIsLoading(false)
        setIsSuccess(true)
        if (onSubscribeSuccess) {
          onSubscribeSuccess(email)
        }
        setEmail("")
      })
      .catch(() => {
        existingSubscribers.push(newSubscriber)
        localStorage.setItem("volt_newsletter", JSON.stringify(existingSubscribers))
        setIsLoading(false)
        setIsSuccess(true)
        if (onSubscribeSuccess) {
          onSubscribeSuccess(email)
        }
        setEmail("")
      })
  }

  return (
    <section id="newsletter" className="py-20 bg-gray-50 relative overflow-hidden border-t border-gray-100">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse duration-5000" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#0A140E] border border-[#1C3325] text-white rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-xl">
          {/* Subtle Grid backdrop detailing */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10">
            {/* Left Column: Headline and Features List */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              {/* Capsule Label */}
              <div className="self-start flex items-center gap-2 bg-[#122a1b] border border-primary/20 rounded-full px-3 py-1 text-xs text-primary font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Volt Newsletter Updates
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Stay updated on tariff cuts, NERC policies & energy tips.
              </h2>
              <p className="text-gray-400 text-sm sm:text-base font-medium leading-relaxed max-w-xl">
                Get monthly briefings on Nigerian power updates, smart appliance usage recommendations, and insights to maximize your prepaid meter credits.
              </p>

            </div>

            {/* Right Column: Card with Email input */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="bg-[#122218]/40 border border-[#213A28]/50 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative">
                {!isSuccess ? (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-base font-bold text-gray-200">Subscribe for Updates</h3>
                      <p className="text-[11px] text-gray-400 font-medium">
                        Join other smart households receiving our weekly optimization reports.
                      </p>
                    </div>

                    {/* Input field */}
                    <div className="flex flex-col gap-1.5 relative">
                      <label htmlFor="newsletter-email" className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        id="newsletter-email"
                        type="email"
                        placeholder="e.g. name@domain.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (emailError) setEmailError("")
                        }}
                        className={`h-11 px-4 rounded-xl border text-sm text-white bg-[#101F15]/90 outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full placeholder-gray-600 ${
                          emailError ? "border-red-500 ring-2 ring-red-500/20" : "border-[#213A28]/80 hover:border-[#355A40]"
                        }`}
                        disabled={isLoading}
                      />
                      {emailError && (
                        <span className="text-red-400 text-[10px] font-bold mt-1 pl-1">
                          {emailError}
                        </span>
                      )}
                    </div>

                    {/* Checkbox for promotional mail */}
                    <div className="flex items-start gap-2.5 my-1">
                      <input
                        id="newsletter-promo"
                        type="checkbox"
                        checked={acceptPromotional}
                        onChange={(e) => setAcceptPromotional(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-[#213A28]/85 text-primary bg-[#101F15]/95 focus:ring-primary focus:ring-offset-0 focus:ring-2 cursor-pointer accent-primary"
                      />
                      <label htmlFor="newsletter-promo" className="text-[10px] font-semibold text-gray-400 select-none cursor-pointer leading-normal">
                        I agree to receive promotional updates, offers, and product updates from Volt.
                      </label>
                    </div>

                    {/* Submit button */}
                    <PrimaryButton
                       type="submit"
                       isLoading={isLoading}
                       className="w-full h-11 text-xs shadow-lg shadow-primary/10 select-none font-bold"
                    >
                      Subscribe to Newsletter
                    </PrimaryButton>

                    <p className="text-[10px] text-center text-gray-500 font-semibold leading-relaxed">
                      We value your privacy. Unsubscribe at any time.
                    </p>
                  </form>
                ) : (
                  /* Success State Overlay */
                  <div className="py-8 flex flex-col items-center gap-4 text-center animate-in fade-in duration-300">
                    <div className="w-14 h-14 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center text-primary text-2xl shadow-inner animate-bounce">
                      ✓
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-sm font-bold text-gray-200">Subscription Confirmed!</h4>
                      <p className="text-[11px] text-gray-400 font-medium max-w-[200px] mx-auto leading-relaxed">
                        Welcome to the list. You will receive your first energy briefing shortly.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsSuccess(false)}
                      className="text-xs text-primary hover:underline font-bold mt-2"
                    >
                      Register Another Email
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
