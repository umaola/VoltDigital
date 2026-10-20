"use client"

import * as React from "react"
import { IconArrowRight, IconBook, IconClock } from "@tabler/icons-react"
import { StandardCard } from "@/components/design-system/card"
import { Skeleton } from "@/components/design-system/skeleton"

export interface SpotlightPost {
  id: string
  title: string
  snippet: string
  category: string
  readTime: string
  date: string
}

export interface BlogSpotlightProps {
  onNavigateToBlog?: (postId?: string) => void
  posts?: SpotlightPost[]
  isLoading?: boolean
}

const DEFAULT_POSTS: SpotlightPost[] = [
  {
    id: "7",
    title: "How to Verify Your Electricity Tariff Band Across All 11 DisCos",
    snippet: "Understanding your electricity tariff band is vital for managing power expenses. Complete verification guide with direct verification links for every Nigerian electricity provider.",
    category: "Tariffs",
    readTime: "6 min read",
    date: "July 10, 2026",
  },
  {
    id: "6",
    title: "Why Your ₦10,000 Recharge Yields Fewer Units Today",
    snippet: "A detailed breakdown of how VAT deductions, feeder band upgrades, and multi year tariff order reviews determine your actual token units received.",
    category: "Education",
    readTime: "5 min read",
    date: "July 10, 2026",
  },
]

export function BlogSpotlightSkeleton() {
  return (
    <section className="py-20 bg-white">
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

export function BlogSpotlight({
  onNavigateToBlog,
  posts = DEFAULT_POSTS,
  isLoading = false
}: BlogSpotlightProps) {
  if (isLoading) {
    return <BlogSpotlightSkeleton />
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-[#e6fcf0] px-3.5 py-1.5 rounded-full">
              Power Knowledge
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#052e16] tracking-tight mt-4">
              Latest from our Electricity Blog
            </h2>
            <p className="text-[#4B5563] text-sm sm:text-base font-medium mt-3 leading-relaxed max-w-xl">
              Practical guides on meter calibration, Nigerian tariff regulations, and home appliance efficiency.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigateToBlog?.()}
            className="self-start md:self-auto h-11 px-5 rounded-xl border border-gray-200 text-xs font-bold text-[#121212] hover:bg-gray-50 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>Explore All Articles</span>
            <IconArrowRight className="w-4 h-4 text-primary" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <StandardCard
              key={post.id}
              className="p-7 bg-white border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-2xl flex flex-col justify-between text-left"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#e6fcf0] text-primary">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                    <IconClock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#121212] tracking-tight leading-snug">
                  {post.title}
                </h3>

                <p className="text-sm font-medium text-[#4B5563] mt-3 leading-relaxed">
                  {post.snippet}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400 font-semibold">
                  {post.date}
                </span>

                <button
                  type="button"
                  onClick={() => onNavigateToBlog?.(post.id)}
                  className="text-xs font-bold text-primary hover:text-[#00a656] flex items-center gap-1 cursor-pointer"
                >
                  <span>Read Article</span>
                  <IconArrowRight className="w-4 h-4" />
                </button>
              </div>
            </StandardCard>
          ))}
        </div>
      </div>
    </section>
  )
}
