import * as React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

export function PrimaryButton({
  className,
  disabled,
  isLoading,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "w-full h-12 rounded-xl bg-primary text-white font-semibold text-base flex items-center justify-center gap-2 transition-colors active:bg-[#00a656] disabled:bg-[#D1D5DB] disabled:text-[#9CA3AF] disabled:cursor-not-allowed",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : children}
    </button>
  )
}

export function SecondaryButton({
  className,
  disabled,
  isLoading,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "w-full h-12 rounded-xl border border-primary bg-transparent text-primary font-semibold text-base flex items-center justify-center gap-2 transition-colors active:bg-emerald-50 disabled:border-[#D1D5DB] disabled:text-[#9CA3AF] disabled:cursor-not-allowed",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : children}
    </button>
  )
}

export function GhostButton({
  className,
  disabled,
  isLoading,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "w-full h-12 rounded-xl bg-transparent text-primary font-semibold text-base flex items-center justify-center gap-2 transition-colors active:bg-zinc-50 disabled:text-[#9CA3AF] disabled:cursor-not-allowed",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : children}
    </button>
  )
}
