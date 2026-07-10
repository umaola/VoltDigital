"use client"

import * as React from "react"
import { StandardCard } from "@/components/design-system/card"
import { PrimaryButton } from "@/components/design-system/button"

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

const DISCOS = [
  "EKEDP - Eko Electricity Distribution",
  "IKEDC - Ikeja Electric",
  "AEDC - Abuja Electricity Distribution",
  "EEDC - Enugu Electricity Distribution",
  "IBEDC - Ibadan Electricity Distribution",
  "PHED - Port Harcourt Electricity",
  "KEDCO - Kano Electricity Distribution",
  "JEDC - Jos Electricity Distribution",
  "KAEDCO - Kaduna Electric",
  "YEDC - Yola Electricity Distribution",
  "BENIN - Benin Electricity Distribution",
]

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [disco, setDisco] = React.useState("")
  
  const [nameError, setNameError] = React.useState("")
  const [emailError, setEmailError] = React.useState("")
  const [discoError, setDiscoError] = React.useState("")

  const [isLoading, setIsLoading] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [queueNumber, setQueueNumber] = React.useState(2450)

  React.useEffect(() => {
    if (isOpen) {
      // Lock page body scroll
      document.body.style.overflow = "hidden"
      // Reset state
      setName("")
      setEmail("")
      setDisco("")
      setNameError("")
      setEmailError("")
      setDiscoError("")
      setIsSuccess(false)
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  const validate = () => {
    let isValid = true
    
    if (!name.trim()) {
      setNameError("Please enter your name")
      isValid = false
    } else {
      setNameError("")
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim()) {
      setEmailError("Please enter your email address")
      isValid = false
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address")
      isValid = false
    } else {
      setEmailError("")
    }

    if (!disco) {
      setDiscoError("Please select your distribution company (Disco)")
      isValid = false
    } else {
      setDiscoError("")
    }

    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validate()) return

    setIsLoading(true)

    // Simulate network latency
    setTimeout(() => {
      // Fetch current waitlist from localStorage
      const existingWaitlist = JSON.parse(localStorage.getItem("volt_waitlist") || "[]")
      
      const newEntry = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        disco,
        timestamp: new Date().toISOString()
      }

      existingWaitlist.push(newEntry)
      localStorage.setItem("volt_waitlist", JSON.stringify(existingWaitlist))

      // Set unique queue number
      setQueueNumber(2450 + existingWaitlist.length)
      setIsLoading(false)
      setIsSuccess(true)
    }, 1500)
  }

  const shareText = `I just joined the waiting list for Volt, Nigeria's smart electricity unit tracker! Get insights on your tariff and appliances. Join me here: http://localhost:3001`
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <StandardCard className="max-w-md w-full bg-white relative p-6 border-none shadow-2xl rounded-2xl animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!isSuccess ? (
          /* waitlist signup form */
          <div className="text-left">
            <h3 className="text-xl font-extrabold text-[#052e16] tracking-tight">Join Volt Waiting List</h3>
            <p className="text-xs text-gray-500 font-semibold mt-1 mb-6 leading-relaxed">
              Sign up today to lock in your priority access. We will notify you once onboarding registrations go live.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name Input */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="modal-name" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  id="modal-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full h-10 px-3 rounded-lg border text-sm text-[#121212] focus:border-primary focus:border-2 hover:border-[#D1D5DB] transition-all outline-none ${
                    nameError ? "border-red-500 focus:border-red-500" : "border-gray-200"
                  }`}
                  placeholder="e.g. Amarachi Okafor"
                />
                {nameError && <span className="text-[10px] font-bold text-red-500 mt-0.5">{nameError}</span>}
              </div>

              {/* Email Input */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="modal-email" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  id="modal-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full h-10 px-3 rounded-lg border text-sm text-[#121212] focus:border-primary focus:border-2 hover:border-[#D1D5DB] transition-all outline-none ${
                    emailError ? "border-red-500 focus:border-red-500" : "border-gray-200"
                  }`}
                  placeholder="e.g. name@domain.com"
                />
                {emailError && <span className="text-[10px] font-bold text-red-500 mt-0.5">{emailError}</span>}
              </div>

              {/* Disco Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="modal-disco" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Electricity Distribution Company
                </label>
                <select
                  id="modal-disco"
                  value={disco}
                  onChange={(e) => setDisco(e.target.value)}
                  className={`w-full h-10 px-3 rounded-lg border bg-white text-sm text-[#121212] focus:border-primary focus:border-2 hover:border-[#D1D5DB] transition-all outline-none ${
                    discoError ? "border-red-500 focus:border-red-500" : "border-gray-200"
                  }`}
                >
                  <option value="">-- Select Distribution Company --</option>
                  {DISCOS.map((d) => (
                    <option key={d} value={d.split(" - ")[0]}>
                      {d}
                    </option>
                  ))}
                </select>
                {discoError && <span className="text-[10px] font-bold text-red-500 mt-0.5">{discoError}</span>}
              </div>

              {/* Submit CTA */}
              <PrimaryButton type="submit" isLoading={isLoading} className="mt-4 shadow-lg shadow-primary/10">
                Join Our Waitlist
              </PrimaryButton>
            </form>
          </div>
        ) : (
          /* signup success overlay */
          <div className="text-center py-6 flex flex-col items-center gap-4 animate-in fade-in duration-300">
            {/* Green Animated Checkmark */}
            <div className="w-16 h-16 bg-[#e6fcf0] rounded-full flex items-center justify-center text-primary text-3xl shadow-inner border border-primary/20 scale-105 transition-transform duration-500">
              ✓
            </div>

            <div className="flex flex-col gap-1 mt-2">
              <h3 className="text-2xl font-extrabold text-[#052e16] tracking-tight">You are on the list!</h3>
              <p className="text-xs font-semibold text-[#4B5563] leading-relaxed max-w-xs mx-auto">
                Finish line is in sight. We will email you instructions as soon as the onboarding slots open up.
              </p>
            </div>

            {/* Queue position badge */}
            <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl w-full max-w-xs my-4 flex flex-col gap-1">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Your Position in Queue</span>
              <span className="text-3xl font-black text-[#121212]">#{queueNumber.toLocaleString()}</span>
              <span className="text-[9px] text-[#00BF63] font-bold mt-0.5 leading-none">
                Join 2,450+ Nigerians optimizing their meters.
              </span>
            </div>

            {/* Social Sharing */}
            <div className="w-full flex flex-col gap-2 pt-2 border-t border-gray-50 mt-2">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Help your neighbors optimize</span>
              <div className="grid grid-cols-2 gap-3 w-full">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center gap-2 text-xs font-bold transition-colors"
                >
                  <span>WhatsApp</span>
                </a>
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 rounded-xl bg-black hover:opacity-90 text-white flex items-center justify-center gap-2 text-xs font-bold transition-colors"
                >
                  <span>Share on X</span>
                </a>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-6 text-xs font-bold text-primary hover:underline"
            >
              Back to Homepage
            </button>
          </div>
        )}
      </StandardCard>
    </div>
  )
}
