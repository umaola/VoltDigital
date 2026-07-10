"use client"

import * as React from "react"
import { StandardCard } from "@/components/design-system/card"
import { PrimaryButton } from "@/components/design-system/button"

interface AdminPanelProps {
  isOpen: boolean
  onClose: () => void
}

interface WaitlistEntry {
  name: string
  email: string
  disco: string
  timestamp: string
}

interface NewsletterEntry {
  email: string
  timestamp: string
}

export function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [activeTab, setActiveTab] = React.useState<"waitlist" | "newsletter">("waitlist")
  const [waitlistEntries, setWaitlistEntries] = React.useState<WaitlistEntry[]>([])
  const [newsletterEntries, setNewsletterEntries] = React.useState<NewsletterEntry[]>([])

  const loadData = React.useCallback(() => {
    if (typeof window !== "undefined") {
      const waitlist = JSON.parse(localStorage.getItem("volt_waitlist") || "[]")
      const newsletter = JSON.parse(localStorage.getItem("volt_newsletter") || "[]")
      setWaitlistEntries(waitlist)
      setNewsletterEntries(newsletter)
    }
  }, [])

  React.useEffect(() => {
    if (isOpen) {
      loadData()
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen, loadData])

  if (!isOpen) return null

  const handleDownloadCSV = () => {
    if (activeTab === "waitlist") {
      if (waitlistEntries.length === 0) return
      const headers = "Name,Email,Electricity Distribution Company (Disco),Signup Timestamp\n"
      const rows = waitlistEntries
        .map((entry) => {
          const cleanName = entry.name.replace(/"/g, '""')
          const cleanEmail = entry.email.replace(/"/g, '""')
          const cleanDisco = entry.disco.replace(/"/g, '""')
          return `"${cleanName}","${cleanEmail}","${cleanDisco}","${entry.timestamp}"`
        })
        .join("\n")
      
      triggerDownload(headers + rows, "volt_waitlist_export")
    } else {
      if (newsletterEntries.length === 0) return
      const headers = "Email,Subscription Timestamp\n"
      const rows = newsletterEntries
        .map((entry) => {
          const cleanEmail = entry.email.replace(/"/g, '""')
          return `"${cleanEmail}","${entry.timestamp}"`
        })
        .join("\n")
      
      triggerDownload(headers + rows, "volt_newsletter_export")
    }
  }

  const triggerDownload = (csvText: string, filePrefix: string) => {
    const blob = new Blob([csvText], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `${filePrefix}_${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleClearRecords = () => {
    const databaseName = activeTab === "waitlist" ? "waitlist registrations" : "newsletter subscribers"
    const confirmClear = window.confirm(
      `Are you absolutely sure you want to delete all local ${databaseName}? This action cannot be undone.`
    )
    if (confirmClear) {
      if (activeTab === "waitlist") {
        localStorage.removeItem("volt_waitlist")
        setWaitlistEntries([])
      } else {
        localStorage.removeItem("volt_newsletter")
        setNewsletterEntries([])
      }
    }
  }

  const activeEntriesCount = activeTab === "waitlist" ? waitlistEntries.length : newsletterEntries.length

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <StandardCard className="max-w-3xl w-full bg-white relative p-6 border-none shadow-2xl rounded-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col justify-between">
        
        {/* Header Block */}
        <div className="flex flex-col gap-3 border-b border-gray-100 pb-3 mb-4">
          <div className="flex justify-between items-center">
            <div className="text-left">
              <h3 className="text-xl font-extrabold text-[#052e16] tracking-tight">Volt Admin Portal</h3>
              <p className="text-xs text-gray-500 font-semibold mt-0.5">
                Review and export local database files.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer font-bold text-xs"
            >
              Close ✕
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 border-b border-gray-100 pb-1 mt-1">
            <button
              onClick={() => setActiveTab("waitlist")}
              className={`pb-2 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === "waitlist"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              Waitlist Signups ({waitlistEntries.length})
            </button>
            <button
              onClick={() => setActiveTab("newsletter")}
              className={`pb-2 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === "newsletter"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              Newsletter Subscribers ({newsletterEntries.length})
            </button>
          </div>
        </div>

        {/* Content Table Scrollable area */}
        <div className="flex-grow overflow-y-auto min-h-[300px] border border-gray-100 rounded-xl relative no-scrollbar bg-gray-50/50">
          {activeEntriesCount > 0 ? (
            activeTab === "waitlist" ? (
              /* Waitlist Signups Table */
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200 text-[#4B5563] font-bold uppercase tracking-wider">
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Disco</th>
                    <th className="p-3">Date Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {waitlistEntries.map((entry, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 font-medium text-[#121212]">
                      <td className="p-3 font-semibold">{entry.name}</td>
                      <td className="p-3 text-gray-500 select-all">{entry.email}</td>
                      <td className="p-3 font-semibold text-primary">{entry.disco}</td>
                      <td className="p-3 text-gray-400">
                        {new Date(entry.timestamp).toLocaleString("en-NG", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              /* Newsletter Subscribers Table */
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200 text-[#4B5563] font-bold uppercase tracking-wider">
                    <th className="p-3">Email Address</th>
                    <th className="p-3">Subscription Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {newsletterEntries.map((entry, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 font-medium text-[#121212]">
                      <td className="p-3 text-gray-500 font-semibold select-all">{entry.email}</td>
                      <td className="p-3 text-gray-400">
                        {new Date(entry.timestamp).toLocaleString("en-NG", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          ) : (
            /* Empty State */
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <span className="text-4xl mb-3">📁</span>
              <h4 className="text-sm font-bold text-[#121212]">No records found</h4>
              <p className="text-xs text-gray-400 font-semibold max-w-xs mt-1 leading-relaxed">
                {activeTab === "waitlist"
                  ? "When visitors sign up through the waiting list form, their details will appear in this administrative panel."
                  : "When users subscribe to the newsletter updates, their emails will list here."}
              </p>
            </div>
          )}
        </div>

        {/* Action Panel Footer */}
        <div className="border-t border-gray-100 pt-4 mt-4 flex justify-between items-center gap-3">
          <div className="text-left">
            <span className="text-xs font-bold text-[#121212]">
              Total Records listed: <span className="text-primary">{activeEntriesCount}</span>
            </span>
          </div>
          <div className="flex gap-2">
            {activeEntriesCount > 0 && (
              <>
                <button
                  type="button"
                  onClick={handleClearRecords}
                  className="h-10 px-4 rounded-xl border border-red-200 text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors"
                >
                  Clear Database
                </button>
                <PrimaryButton onClick={handleDownloadCSV} className="w-auto px-5 h-10 text-xs shadow-md shadow-primary/10">
                  Download CSV
                </PrimaryButton>
              </>
            )}
            <button
              onClick={onClose}
              className="h-10 px-4 rounded-xl border border-gray-200 text-xs font-semibold text-[#4B5563] hover:bg-gray-50 transition-colors"
            >
              Exit Panel
            </button>
          </div>
        </div>
      </StandardCard>
    </div>
  )
}
