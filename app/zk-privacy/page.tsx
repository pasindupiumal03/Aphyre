"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Shield,
  Lock,
  Eye,
  Wallet,
  Zap,
  Globe,
  ArrowRight,
  CheckCircle2,
  Coins,
  BarChart3,
  MessageSquare,
  TrendingUp,
  Users,
  Crown,
  Sparkles,
  ChevronDown,
  Loader2,
} from "lucide-react"
import { useState } from "react"
import { Sidebar } from "@/components/sidebar"


export default function ZKPrivacyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [isEnabling, setIsEnabling] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)
  const router = useRouter()

  // Confetti animation function
  const createConfetti = () => {
    const confettiCount = 100
    const confetti = []

    for (let i = 0; i < confettiCount; i++) {
      const confettiElement = document.createElement('div')
      confettiElement.className = 'confetti-piece'
      confettiElement.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${['#D8698E', '#C0FCF8', '#EAD0D9'][Math.floor(Math.random() * 3)]};
        top: -10px;
        left: ${Math.random() * 100}%;
        transform: rotate(${Math.random() * 360}deg);
        animation: confetti-fall ${2 + Math.random() * 3}s linear forwards;
        z-index: 9999;
        pointer-events: none;
        border-radius: 2px;
      `
      document.body.appendChild(confettiElement)
      confetti.push(confettiElement)
    }

    // Add CSS animation if not already added
    if (!document.getElementById('confetti-styles')) {
      const style = document.createElement('style')
      style.id = 'confetti-styles'
      style.textContent = `
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `
      document.head.appendChild(style)
    }

    // Clean up confetti after animation
    setTimeout(() => {
      confetti.forEach(piece => {
        if (piece.parentNode) {
          piece.parentNode.removeChild(piece)
        }
      })
    }, 5000)
  }

  const handleGetStarted = () => {
    createConfetti()
    setTimeout(() => {
      router.push('/')
    }, 1000)
  }

  const handleContactSales = () => {
    router.push('/pricing')
  }

  const handleEnableZK = () => {
    setIsEnabling(true)
    // Simulate activation process
    setTimeout(() => {
      setIsEnabling(false)
      setIsEnabled(true)
      // Reset after showing success message
      setTimeout(() => {
        setIsEnabled(false)
      }, 3000)
    }, 2500)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-0 lg:ml-72 p-6 lg:p-12">
        {/* Header */}
        <section className="px-12 pt-24 pb-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan/10 rounded-full blur-3xl" />

          <div className="relative max-w-5xl mx-auto text-center">
            <Badge className="mb-6 bg-accent/20 text-accent border-accent/30 px-6 py-2 text-sm font-bold">
              ZERO-KNOWLEDGE PRIVACY
            </Badge>
            <h1 className="text-8xl font-black tracking-tighter mb-8 leading-none text-balance">
              Take Control of Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-cyan to-accent drop-shadow-[0_0_50px_rgba(216,105,142,0.5)]">
                Digital Privacy
              </span>
            </h1>
            <p className="text-2xl text-muted-foreground leading-relaxed mb-12 max-w-3xl mx-auto text-pretty font-medium">
              Aphyre ZK Privacy offers a seamless, private pay-to-use experience for Web3. Offline ZK-NFC payments,
              Zcash secure transfers, and x402 layer supporting Solana Privacy.
            </p>
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={handleEnableZK}
                disabled={isEnabling || isEnabled}
                className="h-16 px-10 text-lg font-bold bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow-accent disabled:opacity-100"
              >
                {isEnabling && (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Enabling ZK Privacy...
                  </>
                )}
                {isEnabled && (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    ZK Privacy Enabled!
                  </>
                )}
                {!isEnabling && !isEnabled && (
                  <>
                    <Shield className="mr-2 h-5 w-5" />
                    Enable ZK Now
                  </>
                )}
              </Button>
            </div>

            {isEnabled && (
              <Card className="mt-8 p-6 bg-gradient-to-br from-accent/20 to-cyan/20 border-accent/30 shadow-[0_0_50px_-12px_rgba(216,105,142,0.5)] animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-black">ZK Privacy Successfully Enabled!</h3>
                    <p className="text-sm text-muted-foreground font-medium">
                      Your wallet is now protected with zero-knowledge privacy
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {isEnabling && (
              <Card className="mt-8 p-6 bg-card/50 backdrop-blur border-cyan/30 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-5 w-5 animate-spin text-cyan" />
                    <p className="text-sm font-bold">Initializing ZK Privacy protocol...</p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-accent to-cyan animate-[progress_2.5s_ease-in-out]" />
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-cyan" />
                    <p className="text-xs font-medium">Generating zero-knowledge proofs</p>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin text-cyan" />
                    <p className="text-xs font-medium">Configuring NFC privacy layer</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </section>

        {/* Payment Networks */}
        <section className="px-12 py-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-3 gap-6 mb-16">
              <Card className="p-8 bg-card/50 backdrop-blur border-accent/30 hover:border-accent/60 transition-all hover:shadow-[0_0_50px_-12px_rgba(216,105,142,0.4)]">
                <div className="h-16 w-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-6 border border-accent/30">
                  <Shield className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-3xl font-black mb-3">Aphyre ZK</h3>
                <p className="text-sm text-muted-foreground font-medium">Zero-knowledge privacy layer</p>
              </Card>
              <Card className="p-8 bg-card/50 backdrop-blur border-cyan/30 hover:border-cyan/60 transition-all hover:shadow-[0_0_50px_-12px_rgba(192,252,248,0.4)]">
                <div className="h-16 w-16 rounded-2xl bg-cyan/20 flex items-center justify-center mb-6 border border-cyan/30">
                  <Coins className="h-8 w-8 text-cyan" />
                </div>
                <h3 className="text-3xl font-black mb-3">$Aphyre</h3>
                <p className="text-sm text-muted-foreground font-medium">Shielded transactions</p>
              </Card>
              <Card className="p-8 bg-card/50 backdrop-blur border-border hover:border-accent/60 transition-all hover:shadow-[0_0_50px_-12px_rgba(216,105,142,0.4)]">
                <div className="h-16 w-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-6 border border-accent/30">
                  <Globe className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-3xl font-black mb-3">Solana</h3>
                <p className="text-sm text-muted-foreground font-medium">Fast & affordable</p>
              </Card>
            </div>

            <div className="text-center mb-6">
              <Badge className="bg-accent/20 text-accent border-accent/30 px-4 py-2 text-xs font-bold uppercase">
                PRIVACY FEATURES
              </Badge>
            </div>
          </div>
        </section>

        {/* Reimagining Privacy */}
        <section className="px-12 py-24 bg-gradient-to-br from-card/50 to-accent/5">
          <div className="max-w-7xl mx-auto grid grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4 bg-accent/20 text-accent border-accent/30 px-4 py-2 text-xs font-bold">
                PRIVACY FIRST
              </Badge>
              <h2 className="text-6xl font-black tracking-tighter mb-6 leading-tight">
                Reimagining the Act of
                <br />
                Privacy
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Aphyre ZK isn't just another payment protocol — it's a redefinition of what payment means in the era of
                decentralization.
              </p>
            </div>
            <div className="space-y-4">
              <Card className="p-6 bg-accent/10 border-accent/30">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black mb-2">Pay per use—offline</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Use privacy by paying with your NFC wallet on any digital resource.
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 bg-cyan/10 border-cyan/30">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-cyan flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-cyan-foreground" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black mb-2">Shop without exposure</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Make purchases without revealing tracking details or personal data.
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 bg-accent/10 border-accent/30">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black mb-2">Anonymous transfers</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Enable sending (machines and devices) to autonomously accept crypto-offchain.
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 bg-cyan/10 border-cyan/30">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-cyan flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-cyan-foreground" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black mb-2">Enhanced anonymity</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Leverages proof technology to guarantee via ZK Rollups for the best Economy.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* The Power Behind ZK */}
        <section className="px-12 py-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-cyan/20 text-cyan border-cyan/30 px-4 py-2 text-xs font-bold">TECHNOLOGY</Badge>
              <h2 className="text-6xl font-black tracking-tighter mb-4">The Power Behind ZK</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                At the heart of Aphyre ZK lies a stack of revolutionary technologies, working together seamlessly.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-12">
              <Card className="p-10 bg-gradient-to-br from-card to-accent/10 border-accent/30 shadow-[0_0_50px_-12px_rgba(216,105,142,0.3)]">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-accent/20 flex items-center justify-center border border-accent/30 flex-shrink-0">
                    <Lock className="h-7 w-7 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black mb-2">ZK-NFC Wallets</h3>
                    <p className="text-sm text-muted-foreground">Tap-to-Pay Without a Trace</p>
                  </div>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  Uses Zero Knowledge Proofs to exchange anonymous payment confirmations instead of revealing public
                  addresses—meaning transactions occur instantly, without user friction, and with ephemeral
                  cryptographic proofs.
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs font-bold">
                    ZK Proofs
                  </Badge>
                  <Badge variant="outline" className="text-xs font-bold">
                    NFC
                  </Badge>
                  <Badge variant="outline" className="text-xs font-bold">
                    Offline-First
                  </Badge>
                </div>
              </Card>

              <Card className="p-10 bg-gradient-to-br from-card to-cyan/10 border-cyan/30 shadow-[0_0_50px_-12px_rgba(192,252,248,0.3)]">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-cyan/20 flex items-center justify-center border border-cyan/30 flex-shrink-0">
                    <Zap className="h-7 w-7 text-cyan" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black mb-2">x402 Authentication Layer</h3>
                    <p className="text-sm text-muted-foreground">Unified Payment Gateway</p>
                  </div>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  One of Aphyre ZK's greatest innovations is the x402 Authentication Layer — the protocol that bridges
                  offline transactions, Solana Privacy. When devices disconnect, they securely synchronize and validate
                  payments through ZK attestation.
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs font-bold">
                    Multi-Chain
                  </Badge>
                  <Badge variant="outline" className="text-xs font-bold">
                    Instant
                  </Badge>
                  <Badge variant="outline" className="text-xs font-bold">
                    Secure
                  </Badge>
                </div>
              </Card>

              <Card className="p-10 bg-gradient-to-br from-card to-accent/10 border-accent/30">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-accent/20 flex items-center justify-center border border-accent/30 flex-shrink-0">
                    <Eye className="h-7 w-7 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black mb-2">AI Risk Filter</h3>
                    <p className="text-sm text-muted-foreground">On-device Machine Learning</p>
                  </div>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  Our on-device AI scans anomalies, prevents double-spending, and detects fraudulent behavior — without
                  sending private signals to centralized third-party servers and retaining total user confidentiality.
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs font-bold">
                    AI-Powered
                  </Badge>
                  <Badge variant="outline" className="text-xs font-bold">
                    On-device
                  </Badge>
                  <Badge variant="outline" className="text-xs font-bold">
                    Private
                  </Badge>
                </div>
              </Card>

              <Card className="p-10 bg-gradient-to-br from-card to-cyan/10 border-cyan/30">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-cyan/20 flex items-center justify-center border border-cyan/30 flex-shrink-0">
                    <Shield className="h-7 w-7 text-cyan" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black mb-2">Offline-First ZK Architecture</h3>
                    <p className="text-sm text-muted-foreground">Resilient & Decentralized</p>
                  </div>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  Engineered to maintain user's control of blockchain—created to identify, verify ZK attestation, and
                  settle transactions without over-dependency on constant connectivity. As real economy shifts towards
                  edge.
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs font-bold">
                    Decentralized
                  </Badge>
                  <Badge variant="outline" className="text-xs font-bold">
                    Resilient
                  </Badge>
                  <Badge variant="outline" className="text-xs font-bold">
                    Edge-Ready
                  </Badge>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* ZK-NFC Wallets */}
        <section className="px-12 py-24 bg-gradient-to-br from-accent/5 to-card">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-accent/20 text-accent border-accent/30 px-4 py-2 text-xs font-bold">
                WALLET TECHNOLOGY
              </Badge>
              <h2 className="text-6xl font-black tracking-tighter mb-4">ZK-NFC Wallets</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Tap-to-Pay Without a Trace</p>
            </div>

            <div className="grid grid-cols-2 gap-12 items-center">
              <div className="bg-card/50 backdrop-blur border border-accent/30 rounded-3xl p-12 shadow-[0_0_50px_-12px_rgba(216,105,142,0.3)]">
                <div className="aspect-video bg-gradient-to-br from-accent/20 to-cyan/20 rounded-2xl flex items-center justify-center border-2 border-accent/30">
                  <Wallet className="h-32 w-32 text-accent" />
                </div>
              </div>

              <div>
                <h3 className="text-4xl font-black mb-6">How the ZK-NFC hardware works</h3>
                <div className="space-y-4">
                  {[
                    {
                      step: "1",
                      title: "Tap—Always sends NFC session",
                      desc: "Initiates ZK proof generation on tap.",
                    },
                    {
                      step: "2",
                      title: "Prove—Sign or attest ZK proofs & cryptography",
                      desc: "Validates without exposing identity.",
                    },
                    {
                      step: "3",
                      title: "Sync—Settle locally via NFC first",
                      desc: "Instant confirmation, syncs later.",
                    },
                    {
                      step: "4",
                      title: "Settle—later posted via L1/L2 for finality",
                      desc: "Final settlement on blockchain when online.",
                    },
                  ].map((item, index) => (
                    <Card key={index} className="p-5 bg-card/50 border-accent/20">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-xl bg-accent text-accent-foreground flex items-center justify-center font-black text-lg flex-shrink-0">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="text-lg font-black mb-1">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-12 py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-cyan/20 text-cyan border-cyan/30 px-4 py-2 text-xs font-bold">SUPPORT</Badge>
              <h2 className="text-6xl font-black tracking-tighter mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-muted-foreground">
                Everything you need to know about Aphyre ZK-NFC and how we protect layers.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "What is Aphyre ZK in simple terms?",
                  a: "Aphyre ZK is a zero-knowledge privacy layer that enables anonymous, offline payments using NFC technology without revealing your identity or transaction details.",
                },
                {
                  q: "How does the ZK-NFC offer a normal wallet taste?",
                  a: "ZK-NFC wallets use zero-knowledge proofs to verify transactions without exposing sensitive data, allowing you to tap and pay like a normal card while maintaining complete privacy.",
                },
                {
                  q: "What happens if there's no internet when I transact payment?",
                  a: "Transactions are processed offline using local ZK proofs and synchronized to the blockchain when connectivity is restored, ensuring seamless operation regardless of network status.",
                },
                {
                  q: "Which chains are supported?",
                  a: "Currently supports Solana, Zcash, and EVM-compatible chains with more networks being added regularly.",
                },
                {
                  q: "How are less funded/offline x0-txn/tx on-chain?",
                  a: "Offline transactions are batched and settled on-chain using ZK rollups, optimizing gas costs and maintaining privacy while ensuring final settlement security.",
                },
                {
                  q: "How is it decentralized?",
                  a: "The protocol uses decentralized validators and ZK proofs verified on-chain, with no central authority controlling user funds or transaction data.",
                },
              ].map((faq, index) => (
                <Card
                  key={index}
                  className="border border-border hover:border-accent/50 transition-all cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-black">{faq.q}</h4>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                      />
                    </div>
                    {openFaq === index && <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="px-12 py-24 bg-gradient-to-br from-accent/10 to-cyan/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-6xl font-black tracking-tighter mb-6">
              Ready to Experience
              <br />
              True Privacy?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join thousands of users protecting their financial privacy with Aphyre ZK
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="h-16 px-10 text-lg font-bold bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow-accent"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleContactSales}
                className="h-16 px-10 text-lg font-bold border-2 bg-transparent"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}