"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Header } from "../landing-page/sections/header"
import { Footer } from "../landing-page/sections/footer"
import { GetAppModal } from "../landing-page/sections/get-app-modal"

interface TermsPageProps {
  onBack: () => void
}

export function TermsPage({ onBack }: TermsPageProps) {
  const router = useRouter()
  const [isWaitlistOpen, setIsWaitlistOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans antialiased text-[#121212] select-none">
      {/* Navigation Header */}
      <Header
        onNavigateToFeatures={() => router.push("/#features")}
        onNavigateToFaq={() => router.push("/#faq")}
        onNavigateToContact={() => router.push("/#footer")}
        onNavigateToBlog={() => router.push("/?page=blog")}
        onNavigateHome={() => router.push("/")}
        onJoinWaitlist={() => setIsWaitlistOpen(true)}
        isDarkTheme={false}
      />

      {/* Main Document Content */}
      <main className="flex-grow pt-28 pb-16 max-w-4xl mx-auto px-6 w-full text-left flex flex-col gap-6">
        <div className="flex items-center gap-3 py-4 border-b border-zinc-100 bg-white">
          <h1 className="text-xl font-bold text-[#052e16] tracking-tight">Terms of Use</h1>
        </div>

        <div className="flex flex-col gap-6 text-sm text-[#4B5563] leading-relaxed">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-[#052e16]">Volt's Terms of Use</h2>
            <p className="text-xs text-[#9CA3AF]">Effective Date: July 1, 2026</p>
          </div>

          <div className="border border-zinc-200 rounded-xl overflow-hidden text-left">
            <div className="bg-zinc-50 px-4 py-3 border-b border-zinc-200 font-bold text-xs text-[#121212] uppercase tracking-wider">
              Document Control Sheet
            </div>
            <div className="divide-y divide-zinc-200 text-xs bg-white">
              <div className="grid grid-cols-3 px-4 py-2.5">
                <span className="font-semibold text-[#121212]">Title</span>
                <span className="col-span-2">Terms of Use</span>
              </div>
              <div className="grid grid-cols-3 px-4 py-2.5">
                <span className="font-semibold text-[#121212]">Audience</span>
                <span className="col-span-2">All users of Volt Platform</span>
              </div>
              <div className="grid grid-cols-3 px-4 py-2.5">
                <span className="font-semibold text-[#121212]">Approver</span>
                <span className="col-span-2">Management of Volt Digital Services LTD</span>
              </div>
              <div className="grid grid-cols-3 px-4 py-2.5">
                <span className="font-semibold text-[#121212]">Effective Date</span>
                <span className="col-span-2">1st July, 2026</span>
              </div>
              <div className="grid grid-cols-3 px-4 py-2.5">
                <span className="font-semibold text-[#121212]">Version</span>
                <span className="col-span-2">1.0</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-left">
            <p>
              Welcome to Volt, a digital platform designed to help users monitor, estimate and better
              understand their electricity consumption.
            </p>
            <p>
              By accessing or using Volt, you agree to be bound by these Terms of Use (&ldquo;Terms&rdquo;). If you do
              not agree, you must not use the Service. These Terms of Use help define Volt&rsquo;s relationship with
              you as you interact with our services.
            </p>
            <p>
              In addition to these terms, we publish our Privacy Policy. We encourage you to read it to
              understand better how you can update, manage, export, and delete your information.
            </p>
          </div>

          <div className="flex flex-col gap-4 text-left">
            <h3 className="font-bold text-[#121212] text-base">1. Introduction</h3>
            <p>
              These Terms of Use are a legally binding contract between you and Volt Digital Services LTD, a company
              incorporated under the laws of the Federal Republic of Nigeria (the &ldquo;Company&rdquo;), with RC number: 9637947.
              Access to and use Volt&rsquo;s product and services are expressly conditioned upon your accepting these Terms.
              If you do not accept these Terms, you will not be able to access Volt or its services.
            </p>
          </div>

          <div className="flex flex-col gap-4 text-left">
            <h3 className="font-bold text-[#121212] text-base">2. Definitions</h3>
            <p>In these Terms, unless the context otherwise requires:</p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>
                <strong>&ldquo;App&rdquo;</strong> means the Volt mobile application available on iOS and Android platforms;
              </li>
              <li>
                <strong>&ldquo;DisCo&rdquo;</strong> means a Distribution Company licensed by NERC to distribute electricity in Nigeria;
              </li>
              <li>
                <strong>&ldquo;NDPA&rdquo;</strong> means the Nigeria Data Protection Act, 2023;
              </li>
              <li>
                <strong>&ldquo;NERC&rdquo;</strong> means the Nigerian Electricity Regulatory Commission;
              </li>
              <li>
                <strong>&ldquo;Service&rdquo;</strong> means the services provided by Volt, including electricity usage tracking, estimation
                tools, predictive analytics, and related features;
              </li>
              <li>
                <strong>&ldquo;Subscription&quot;</strong> means a paid plan granting access to premium features of Volt;
              </li>
              <li>
                <strong>&ldquo;User&rdquo;</strong> or <strong>&ldquo;you&rdquo;</strong> means any individual who accesses or uses the Volt platform.
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 text-left">
            <h3 className="font-bold text-[#121212] text-base">3. Nature of the Service</h3>
            <p>Volt provides:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>electricity usage tracking and estimation tools</li>
              <li>tariff-based consumption calculations (including band A-E structures)</li>
              <li>appliance-based energy insights</li>
              <li>predictive analytics-based on user input and available data</li>
            </ul>
            <p className="font-semibold text-[#121212]">Volt is NOT:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>an electricity distribution company (DisCo)</li>
              <li>a licensed electricity supplier</li>
              <li>a metering authority</li>
              <li>a billing authority</li>
            </ul>
            <p>
              Volt does not <strong>sell electricity</strong> or issue official electricity bills. All outputs are <strong>informational
              estimates only</strong>.
            </p>
          </div>

          <div className="flex flex-col gap-4 text-left">
            <h3 className="font-bold text-[#121212] text-base">4. Regulatory Context</h3>
            <p>
              Volt operates in compliance with applicable Nigerian laws. Nothing in this service shall be
              interpreted as:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>Replacing official metering systems</li>
              <li>Interfering with electricity distribution infrastructure</li>
              <li>Acting as a regulated utility service</li>
            </ul>
            <p>
              Users remain subject to their respective distribution company (DisCo) for:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>Meter Readings</li>
              <li>Billing</li>
              <li>Tariff Classification</li>
              <li>Service Disputes</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 text-left">
            <h3 className="font-bold text-[#121212] text-base">5. User Eligibility</h3>
            <p>You must:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>You must be at least <strong>18 years old</strong> to use the Volt App</li>
              <li>We do not knowingly collect personal information from children under 18 years of age.</li>
              <li>We do not allow people to use the App and access Volt if they are younger than 18.</li>
              <li>Provide accurate and complete information</li>
              <li>Use the Service only for lawful purposes</li>
              <li>Be a resident of Nigeria or have a valid Nigerian electricity meter number</li>
              <li>Not have been previously suspended or terminated from using the Service</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 text-left">
            <h3 className="font-bold text-[#121212] text-base">6. User Responsibilities</h3>
            <p>You agree to:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>Provide accurate appliance and usage data</li>
              <li>Not manipulate or misuse Volt&rsquo;s calculations</li>
              <li>Not rely solely on Volt for financial or billing decisions</li>
              <li>Verify all estimates against your official electricity provider</li>
              <li>Keep your account credentials confidential and not share them with third parties</li>
              <li>Notify Volt immediately of any unauthorised access to your account</li>
            </ul>
            <p>You are solely responsible for:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>Any decisions made based on Volt insights</li>
              <li>Ensuring compliance with your DisCo&rsquo;s terms</li>
              <li>Maintaining the security of your account credentials</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 text-left">
            <h3 className="font-bold text-[#121212] text-base">7. Accuracy Disclaimer</h3>
            <p>Volt uses algorithms based on:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>Tariff structures (e.g., Eko Electricity Distribution Company, Ikeja Electricity Distribution Company etc.)</li>
              <li>User-provided data</li>
              <li>General energy consumption models</li>
            </ul>
            <p>however:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>results are estimates, not guarantees</li>
              <li>
                actual consumption may vary due to:
                <ul className="list-[circle] pl-5 mt-1 flex flex-col gap-1 text-xs">
                  <li>voltage fluctuations</li>
                  <li>meter inaccuracies</li>
                  <li>tariff changes</li>
                  <li>load shedding or outages</li>
                </ul>
              </li>
            </ul>
            <p>Volt shall <strong>not be liable</strong> for discrepancies between:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>estimated units and actual billed units</li>
              <li>predicted cost and actual electricity charges</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 text-left">
            <h3 className="font-bold text-[#121212] text-base">8. Prohibited Use</h3>
            <p>You may not:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>Use Volt to reverse-engineer or exploit DisCo systems</li>
              <li>Misrepresent Volt data as official billing</li>
              <li>Use the platform for fraudulent or illegal activity</li>
              <li>Attempt to gain unauthorized access to Volt systems</li>
              <li>Use automated bots, scrapers, or similar tools to access the Service</li>
              <li>Interfere with or disrupt the integrity or performance of the Service</li>
              <li>Upload viruses, malware, or other harmful code</li>
              <li>Use the Service to infringe upon the intellectual property rights of any third party</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 text-left">
            <h3 className="font-bold text-[#121212] text-base">9. Intellectual Property</h3>
            <p>
              We grant you a personal, worldwide, revocable, non-transferable and non-exclusive licence to
              access and use the App for personal and non-commercial purposes in accordance with the
              terms of these Terms. You may not copy, store, modify, distribute, transmit, perform, reproduce,
              publish, licence, create derivative works from, transfer or sell any text, graphics, logos and other
              source-identifying symbols, designs, icons, images, or other information, software or code
              obtained from the App without prior express written permission from the Company.
            </p>
          </div>

          <div className="flex flex-col gap-4 text-left">
            <h3 className="font-bold text-[#121212] text-base">10. Data Privacy</h3>
            <p>Volt collects and processes user data in accordance with:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>The Nigeria Data Protection Act 2023 and the General Application and Implementation Directive 2025</li>
              <li>Our Privacy Policy.</li>
            </ul>
            <p>By using Volt, you consent to:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>Collection of usage data</li>
              <li>Storage of appliance and consumption inputs</li>
              <li>Analytical processing for improving the Service</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 text-left">
            <h3 className="font-bold text-[#121212] text-base">11. Limitation of Liability</h3>
            <p>
              To the fullest extent permitted by applicable law, you agree that Volt, its affiliates and their
              respective employees, officers, directors, agents, partners, representatives and third-party
              service providers will not be liable to you or any third party for (a) billing discrepancies; (b)
              financial losses from reliance on estimates (c) service interruptions (d) errors in tariff
              calculations (e) any indirect, incidental, special, consequential, punitive, or exemplary damages.
            </p>
          </div>

          <div className="flex flex-col gap-4 text-left">
            <h3 className="font-bold text-[#121212] text-base">12. Contact Information</h3>
            <p>If you have any questions about these Terms, please contact us at:</p>
            <p>Email: <a href="mailto:info@voltdigitalservices.com" className="font-bold underline hover:text-primary transition-colors">info@voltdigitalservices.com</a></p>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
      <GetAppModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </div>
  )
}
