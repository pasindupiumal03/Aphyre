"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/sidebar"
import { Scale, ChevronRight } from 'lucide-react'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-0 lg:ml-72 p-6 lg:p-12">
        {/* Header */}
        <div className="mb-12 max-w-4xl">
          <Badge className="mb-6 bg-accent/20 text-accent border-accent/30 px-6 py-2 text-sm font-bold">
            TERMS OF SERVICE
          </Badge>
          <h2 className="mb-6 text-7xl font-black tracking-tighter leading-none text-balance">
            TERMS AND <span className="text-accent drop-shadow-[0_0_30px_rgba(216,105,142,0.5)]">CONDITIONS</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed text-pretty font-medium">
            Please read these terms carefully before using Aphyre.
          </p>
          <p className="text-sm text-muted-foreground font-medium mt-4">
            Last Updated: November 15, 2024
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Acceptance of Terms */}
            <Card className="p-8 border-border bg-card">
              <h3 className="text-2xl font-black tracking-tight mb-4">1. Acceptance of Terms</h3>
              <p className="text-base text-muted-foreground font-medium leading-relaxed">
                By accessing and using Aphyre, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </Card>

            {/* Use License */}
            <Card className="p-8 border-border bg-card">
              <h3 className="text-2xl font-black tracking-tight mb-4">2. Use License</h3>
              <p className="text-base text-muted-foreground font-medium leading-relaxed mb-4">
                Permission is granted to temporarily download one copy of the materials (information or software) on Aphyre for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
              </p>
              <p className="text-base text-muted-foreground font-medium leading-relaxed">
                Under this license you may not: copy or modify the materials; use the materials for any commercial purpose or for any public display; attempt to decompile or reverse engineer any software contained on Aphyre; remove any copyright or other proprietary notations from the materials.
              </p>
            </Card>

            {/* Disclaimer of Warranties */}
            <Card className="p-8 border-border bg-card">
              <h3 className="text-2xl font-black tracking-tight mb-4">3. Disclaimer of Warranties</h3>
              <p className="text-base text-muted-foreground font-medium leading-relaxed mb-4">
                The materials on Aphyre are provided as is. Aphyre makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mt-4">
                <p className="text-sm text-muted-foreground font-medium">
                  <strong>Investment Disclaimer:</strong> Aphyre does not provide investment advice. All information is for educational and informational purposes only. Always conduct your own research and consult with financial advisors before making trading decisions.
                </p>
              </div>
            </Card>

            {/* Limitations of Liability */}
            <Card className="p-8 border-border bg-card">
              <h3 className="text-2xl font-black tracking-tight mb-4">4. Limitations of Liability</h3>
              <p className="text-base text-muted-foreground font-medium leading-relaxed mb-4">
                In no event shall Aphyre or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Aphyre, even if Aphyre or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
              <ul className="space-y-3 text-base text-muted-foreground font-medium mt-4">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>We are not liable for losses incurred from trading using our platform</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>We are not liable for service interruptions or data loss</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>We are not liable for third-party services or integrations</span>
                </li>
              </ul>
            </Card>

            {/* Accuracy of Materials */}
            <Card className="p-8 border-border bg-card">
              <h3 className="text-2xl font-black tracking-tight mb-4">5. Accuracy of Materials</h3>
              <p className="text-base text-muted-foreground font-medium leading-relaxed mb-4">
                The materials appearing on Aphyre could include technical, typographical, or photographic errors. Aphyre does not warrant that any of the materials on the website are accurate, complete, or current.
              </p>
              <p className="text-base text-muted-foreground font-medium leading-relaxed">
                Aphyre may make changes to the materials contained on its website at any time without notice. However, Aphyre does not make any commitment to update the materials.
              </p>
            </Card>

            {/* Materials on Website */}
            <Card className="p-8 border-border bg-card">
              <h3 className="text-2xl font-black tracking-tight mb-4">6. Materials License & Intellectual Property</h3>
              <p className="text-base text-muted-foreground font-medium leading-relaxed mb-4">
                Aphyre owns or is licensed all content, graphics, and other materials on the website. All rights to these materials are reserved.
              </p>
              <ul className="space-y-3 text-base text-muted-foreground font-medium mt-4">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>You may not reproduce or transmit any content without express permission</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>You may not use our trademarks without authorization</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Unauthorized use may violate copyright, trademark, and other applicable laws</span>
                </li>
              </ul>
            </Card>

            {/* User Accounts */}
            <Card className="p-8 border-border bg-card">
              <h3 className="text-2xl font-black tracking-tight mb-4">7. User Accounts & Responsibilities</h3>
              <p className="text-base text-muted-foreground font-medium leading-relaxed mb-4">
                If you create an account on Aphyre, you are responsible for:
              </p>
              <ul className="space-y-3 text-base text-muted-foreground font-medium">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Maintaining the confidentiality of your account credentials</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>All activities that occur under your account</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Immediately notifying us of unauthorized use</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Compliance with all applicable laws and regulations</span>
                </li>
              </ul>
            </Card>

            {/* Limitations on Use */}
            <Card className="p-8 border-border bg-card">
              <h3 className="text-2xl font-black tracking-tight mb-4">8. Limitations on Use</h3>
              <p className="text-base text-muted-foreground font-medium leading-relaxed mb-4">
                You agree not to:
              </p>
              <ul className="space-y-3 text-base text-muted-foreground font-medium">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Use the site for any illegal purpose or in violation of any applicable laws</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Harass, threaten, or abuse other users</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Attempt to gain unauthorized access to our systems</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Interfere with the normal operation of the platform</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Use automated tools or scrapers without permission</span>
                </li>
              </ul>
            </Card>

            {/* Subscriptions & Payments */}
            <Card className="p-8 border-border bg-card">
              <h3 className="text-2xl font-black tracking-tight mb-4">9. Subscriptions & Payments</h3>
              <p className="text-base text-muted-foreground font-medium leading-relaxed mb-4">
                By subscribing to a paid plan, you agree to:
              </p>
              <ul className="space-y-3 text-base text-muted-foreground font-medium">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Automatic recurring billing on your Solana wallet</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Charges continue until subscription is cancelled</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Cancellation takes effect at the end of current billing cycle</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>7-day money-back guarantee on Premium plans</span>
                </li>
              </ul>
            </Card>

            {/* Termination */}
            <Card className="p-8 border-border bg-card">
              <h3 className="text-2xl font-black tracking-tight mb-4">10. Termination</h3>
              <p className="text-base text-muted-foreground font-medium leading-relaxed mb-4">
                Aphyre reserves the right to:
              </p>
              <ul className="space-y-3 text-base text-muted-foreground font-medium">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Suspend or terminate your account at any time without notice</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>For violations of these terms or applicable laws</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Upon 30 days notice for any reason</span>
                </li>
              </ul>
              <p className="text-base text-muted-foreground font-medium leading-relaxed mt-4">
                Upon termination, your right to use the service immediately ceases.
              </p>
            </Card>

            {/* Modifications to Terms */}
            <Card className="p-8 border-border bg-card">
              <h3 className="text-2xl font-black tracking-tight mb-4">11. Modifications to Terms</h3>
              <p className="text-base text-muted-foreground font-medium leading-relaxed">
                Aphyre may revise these terms of service at any time without notice. By using the website, you are agreeing to be bound by the then current version of these terms of service. We will notify users of significant changes via email or prominent notice on the platform.
              </p>
            </Card>

            {/* Governing Law */}
            <Card className="p-8 border-border bg-card">
              <h3 className="text-2xl font-black tracking-tight mb-4">12. Governing Law</h3>
              <p className="text-base text-muted-foreground font-medium leading-relaxed">
                These terms and conditions are governed by and construed in accordance with applicable laws, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </Card>

            {/* Contact Us */}
            <Card className="p-8 border-border bg-card">
              <h3 className="text-2xl font-black tracking-tight mb-4">13. Contact Information</h3>
              <p className="text-base text-muted-foreground font-medium leading-relaxed mb-6">
                If you have questions about these Terms of Service, please contact:
              </p>
              <div className="space-y-2">
                <p className="text-base font-bold">Aphyre Legal Team</p>
                <p className="text-base text-muted-foreground font-medium">Email: contact@Aphyre.io</p>              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-border sticky top-20 bg-card">
              <h4 className="text-lg font-black tracking-tight mb-6">Quick Links</h4>
              <div className="space-y-3">
                <Link href="/privacy-policy">
                  <button className="w-full text-left text-base font-bold text-muted-foreground hover:text-accent transition-colors flex items-center justify-between group">
                    <span>Privacy Policy</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/about">
                  <button className="w-full text-left text-base font-bold text-muted-foreground hover:text-accent transition-colors flex items-center justify-between group">
                    <span>About Aphyre</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/">
                  <button className="w-full text-left text-base font-bold text-muted-foreground hover:text-accent transition-colors flex items-center justify-between group">
                    <span>Dashboard</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </Card>

            {/* Info Card */}
            <Card className="p-6 border-accent/30 bg-gradient-to-br from-card to-accent/5 mt-6">
              <div className="flex gap-3 mb-4">
                <div className="rounded-xl bg-accent/20 p-2 border border-accent/30 h-fit">
                  <Scale className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h5 className="text-sm font-black tracking-tight">Legal Compliance</h5>
                  <p className="text-xs text-muted-foreground font-medium mt-1">
                    Aphyre is committed to legal compliance and user protection.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
