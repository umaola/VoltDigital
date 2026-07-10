import LandingPage from "@/components/pages/landing-page"
import { Suspense } from "react"

export default function Home() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 relative flex items-center justify-center animate-subtle-bounce">
            <img src="/logo-mark.png" alt="Loading..." className="w-full h-full object-contain" />
          </div>
          <div className="w-24 h-1 bg-gray-100 rounded-full overflow-hidden relative">
            <div className="h-full bg-primary rounded-full absolute left-0 top-0 w-1/2 animate-[pulse-rays_1s_infinite]" />
          </div>
        </div>
      }
    >
      <LandingPage />
    </Suspense>
  )
}
