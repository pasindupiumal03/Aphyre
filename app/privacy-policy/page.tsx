"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/sidebar"
import { Shield, ChevronRight } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-0 lg:ml-72 p-6 lg:p-12">
        {/* Header */}
        <div className="mb-12 max-w-4xl">
          <Badge className="mb-6 bg-cyan/20 text-cyan border-cyan/30 px-6 py-2 text-sm font-bold">
            PRIVACY POLICY
          </Badge>
          <h2 className="mb-6 text-7xl font-black tracking-tighter leading-none text-balance">
            YOUR PRIVACY <span className="text-cyan drop-shadow-[0_0_30px_rgba(192,252,248,0.5)]">MATTERS</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed text-pretty font-medium">
            We're committed to protecting your privacy and ensuring you have a positive experience on Aphyre.
          </p>
          <p className="text-sm text-muted-foreground font-medium mt-4">
            Last Updated: November 15, 2024
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Introduction */}
            <Card className="p-8 border-border bg-card">
              <h3 className="text-2xl font-black tracking-tight mb-4">1. Introduction</h3>
              <p className="text-base text-muted-foreground font-medium leading-relaxed mb-4">
                Welcome to Aphyre ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our privacy practices, please contact us.
              </p>
              <p className="text-base text-muted-foreground font-medium leading-relaxed">
                Aphyre is a comprehensive crypto trading intelligence platform designed to provide traders with real-time market insights, news sentiment analysis, and blockchain analytics.
              </p>
            </Card>

            {/* Information We Collect */}
            <Card className="p-8 border-border bg-card">
              <h3 className="text-2xl font-black tracking-tight mb-4">2. Information We Collect</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-black tracking-tight mb-2">A. Information You Provide Directly</h4>
                  <ul className="space-y-3 text-base text-muted-foreground font-medium">
                    <li className="flex gap-3">
                      <span className="text-cyan font-bold">•</span>
                      <span><strong>Account Registration:</strong> When creating an Aphyre account, we collect your email address, username, and wallet address.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-cyan font-bold">•</span>
                      <span><strong>Profile Information:</strong> Optional profile details like name and preferences.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-cyan font-bold">•</span>
                      <span><strong>Communication Data:</strong> Messages, feedback, and support requests you send us.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-cyan font-bold">•</span>
                      <span><strong>Payment Information:</strong> Solana wallet addresses for subscription payments (processed securely).</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-black tracking-tight mb-2">B. Information Collected Automatically</h4>
                  <ul className="space-y-3 text-base text-muted-foreground font-medium">
                    <li className="flex gap-3">
                      <span className="text-cyan font-bold">•</span>
                      <span><strong>Usage Data:</strong> Pages viewed, features used, search queries, and interaction patterns.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-cyan font-bold">•</span>
                      <span><strong>Device Information:</strong> Device type, operating system, browser type, and IP address.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-cyan font-bold">•</span>
                      <span><strong>Cookies and Analytics:</strong> We use cookies and similar technologies to improve your experience.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-black tracking-tight mb-2">C. Blockchain Data</h4>
                  <ul className="space-y-3 text-base text-muted-foreground font-medium">
                    <li className="flex gap-3">
                      <span className="text-cyan font-bold">•</span>
                      <span><strong>Public Wallet Information:</strong> When you use our wallet tracker, we access and display publicly available blockchain data.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-cyan font-bold">•</span>
                      <span><strong>No Private Keys:</strong> We never collect, store, or access your private keys or seed phrases.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* How We Use Your Information */}
            <Card className="p-8 border-border bg-card">
              <h3 className="text-2xl font-black tracking-tight mb-4">3. How We Use Your Information</h3>
              <p className="text-base text-muted-foreground font-medium leading-relaxed mb-6">
                We use your information for the following purposes:
              </p>
              <ul className="space-y-3 text-base text-muted-foreground font-medium">
                <li className="flex gap-3">
                  <span className="text-cyan font-bold">•</span>
                  <span>Provide, maintain, and improve our services</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan font-bold">•</span>
                  <span>Process subscriptions and payments</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan font-bold">•</span>
                  <span>Send important account and service updates</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan font-bold">•</span>
                  <span>Respond to your inquiries and support requests</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan font-bold">•</span>
                  <span>Analyze usage patterns to enhance user experience</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan font-bold">•</span>
                  <span>Detect and prevent fraud and security issues</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan font-bold">•</span>
                  <span>Comply with legal obligations</span>
                </li>
              </ul>
            </Card>

            {/* Data Security */}
            <Card className="p-8 border-border bg-card">
              <h3 className="text-2xl font-black tracking-tight mb-4">4. Data Security</h3>
              <p className="text-base text-muted-foreground font-medium leading-relaxed mb-4">
                Aphyre implements comprehensive security measures to protect your information:
              </p>
              <ul className="space-y-3 text-base text-muted-foreground font-medium">
                <li className="flex gap-3">
                  <span className="text-cyan font-bold">•</span>
                  <span>HTTPS encryption for all data transmission</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan font-bold">•</span>
                  <span>Secure password hashing and storage</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan font-bold">•</span>
                  <span>Regular security audits and penetration testing</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan font-bold">•</span>
                  <span>Access controls and authentication mechanisms</span>
                </li>
              </ul>
              <p className="text-base text-muted-foreground font-medium leading-relaxed mt-6">
                While we strive to protect your information, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
              </p>
            </Card>

            {/* Your Rights */}
            <Card className="p-8 border-border bg-card">
              <h3 className="text-2xl font-black tracking-tight mb-4">5. Your Privacy Rights</h3>
              <p className="text-base text-muted-foreground font-medium leading-relaxed mb-6">
                Depending on your jurisdiction, you may have the following rights:
              </p>
              <ul className="space-y-3 text-base text-muted-foreground font-medium">
                <li className="flex gap-3">
                  <span className="text-cyan font-bold">•</span>
                  <span><strong>Right to Access:</strong> Request a copy of your personal data</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan font-bold">•</span>
                  <span><strong>Right to Deletion:</strong> Request deletion of your account and associated data</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan font-bold">•</span>
                  <span><strong>Right to Correction:</strong> Update or correct inaccurate information</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan font-bold">•</span>
                  <span><strong>Right to Opt-Out:</strong> Unsubscribe from marketing communications</span>
                </li>
              </ul>
              <p className="text-base text-muted-foreground font-medium leading-relaxed mt-6">
                To exercise these rights, please contact us at: contact@Aphyre.io
              </p>
            </Card>

            {/* Cookies */}
            <Card className="p-8 border-border bg-card">
              <h3 className="text-2xl font-black tracking-tight mb-4">6. Cookies & Tracking</h3>
              <p className="text-base text-muted-foreground font-medium leading-relaxed mb-4">
                We use cookies and similar technologies to enhance your experience. You can control cookie preferences through your browser settings. Disabling cookies may limit some functionality of Aphyre.
              </p>
              <div className="bg-secondary/20 border border-secondary/30 rounded-lg p-4">
                <p className="text-sm text-muted-foreground font-medium">
                  Types of cookies: Session cookies, persistent cookies, and analytics cookies for improving our services.
                </p>
              </div>
            </Card>

            {/* Third-Party Sharing */}
            <Card className="p-8 border-border bg-card">
              <h3 className="text-2xl font-black tracking-tightrackinge mb-4">7. Third-Party Sharing</h3>
              <p className="text-base text-muted-foreground font-medium leading-relaxed mb-4">
                We do NOT sell your personal information. We may share information with:
              </p>
              <ul className="space-y-3 text-base text-muted-foreground font-medium">
                <li className="flex gap-3">
                  <span className="text-cyan font-bold">•</span>
                  <span><strong>Service Providers:</strong> Payment processors, analytics platforms, and hosting services under strict confidentiality agreements</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan font-bold">•</span>
                  <span><strong>Legal Requirements:</strong> When required by law or to protect our rights</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan font-bold">•</span>
                  <span><strong>Business Transfers:</strong> In case of merger, acquisition, or asset sale</span>
                </li>
              </ul>
            </Card>

            {/* Contact Us */}
            <Card className="p-8 border-border bg-card">
              <h3 className="text-2xl font-black tracking-tight mb-4">8. Contact Us</h3>
              <p className="text-base text-muted-foreground font-medium leading-relaxed mb-6">
                If you have questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="space-y-2">
                <p className="text-base font-bold">Aphyre Privacy Team</p>
                <p className="text-base text-muted-foreground font-medium">Email: contact@Aphyre.io</p>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-border sticky top-20 bg-card">
              <h4 className="text-lg font-black tracking-tight mb-6">Quick Links</h4>
              <div className="space-y-3">
                <Link href="/terms-of-service">
                  <button className="w-full text-left text-base font-bold text-muted-foreground hover:text-accent transition-colors flex items-center justify-between group">
                    <span>Terms of Service</span>
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
            <Card className="p-6 border-cyan/30 bg-gradient-to-br from-card to-cyan/5 mt-6">
              <div className="flex gap-3 mb-4">
                <div className="rounded-xl bg-cyan/20 p-2 border border-cyan/30 h-fit">
                  <Shield className="h-5 w-5 text-cyan" />
                </div>
                <div>
                  <h5 className="text-sm font-black tracking-tight">Data Protection</h5>
                  <p className="text-xs text-muted-foreground font-medium mt-1">
                    Your privacy is protected with industry-standard encryption and security measures.
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
