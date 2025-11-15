"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BarChart3, Check, X, Crown, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { ConfettiButton } from "@/components/confetti-button"
import { TrialActivationCard } from "@/components/trial-activation-card"

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Basic access to Aphyre AI",
    features: [
      { name: "Dashboard access", included: true },
      { name: "5 AI chat requests per day", included: true },
      { name: "Advanced analytics", included: false },
      { name: "Anti-rug protection", included: false },
      { name: "Twitter tracker", included: false },
      { name: "Bundle tracker", included: false },
      { name: "MCP server access", included: false },
      { name: "Priority support", included: false },
    ],
    cta: "Continue with Free",
    popular: false,
    color: "border-border",
  },
  {
    name: "Premium",
    price: "$60.00",
    period: "month",
    description: "Full access to all Aphyre AI features",
    features: [
      { name: "Dashboard access", included: true },
      { name: "10 AI chat requests per day", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Anti-rug protection", included: true },
      { name: "Twitter tracker", included: true },
      { name: "Bundle tracker", included: true },
      { name: "MCP server access", included: true },
      { name: "Priority support", included: true },
    ],
    cta: "Activate Your Trial",
    popular: true,
    color: "border-accent",
  },
  {
    name: "Business",
    price: "$120.00",
    period: "month",
    description: "Enterprise-grade features for professional traders",
    features: [
      { name: "Everything in Premium", included: true },
      { name: "Unlimited AI chat requests", included: true },
      { name: "API access", included: true },
      { name: "Custom analytics", included: true },
      { name: "Team collaboration", included: true },
      { name: "Dedicated support", included: true },
      { name: "Early access to new features", included: true },
      { name: "Custom integrations", included: true },
    ],
    cta: "Activate Your Trial",
    popular: false,
    color: "border-cyan",
  },
]

const faqs = [
  {
    question: "How does billing work?",
    answer:
      "You'll be charged at the beginning of each billing cycle. You can cancel anytime and your subscription will remain active until the end of the current billing period.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Yes, you can change your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, your new plan will take effect at the end of your current billing cycle.",
  },
  {
    question: "Is there a refund policy?",
    answer:
      "We offer a 7-day money-back guarantee. If you're not satisfied with your subscription, contact our support team within 7 days of purchase for a full refund.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Solana cryptocurrency payments for all subscription plans.",
  },
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "6months" | "yearly">("monthly")
  const [showTrialCard, setShowTrialCard] = useState(false)
  const [activatedPlan, setActivatedPlan] = useState<"Premium" | "Business" | null>(null)
  const [activatedPlans, setActivatedPlans] = useState<Set<string>>(new Set())
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useRouter()

  // Load activation state from localStorage on component mount
  useEffect(() => {
    const savedActivations = localStorage.getItem('aphyre-activated-plans')
    if (savedActivations) {
      try {
        const parsedActivations = JSON.parse(savedActivations)
        setActivatedPlans(new Set(parsedActivations))
      } catch (error) {
        console.error('Error parsing saved activations:', error)
      }
    }
    setIsLoaded(true)
  }, [])

  const saveActivationToStorage = (planName: string) => {
    const updated = new Set(activatedPlans)
    updated.add(planName)
    setActivatedPlans(updated)
    localStorage.setItem('aphyre-activated-plans', JSON.stringify([...updated]))
  }

  const handleTrialActivation = (planName: string) => {
    if ((planName === "Premium" || planName === "Business") && !activatedPlans.has(planName)) {
      saveActivationToStorage(planName)
      setActivatedPlan(planName)
      setShowTrialCard(true)
      // Navigate to dashboard after a short delay
      setTimeout(() => {
        router.push("/")
      }, 1500)
    }
  }

  const handleCloseTrialCard = () => {
    setShowTrialCard(false)
    setActivatedPlan(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      {/* Main Content */}
      <main className="ml-0 lg:ml-72 p-6 lg:p-12">
        {/* Header */}
        <div className="mb-16 text-center max-w-4xl mx-auto">
          <h2 className="mb-6 text-7xl font-black tracking-tighter leading-none text-balance">
            CHOOSE YOUR <span className="text-accent drop-shadow-[0_0_30px_rgba(216,105,142,0.5)]">PLAN</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed text-pretty font-medium mb-8">
            Unlock the full potential of Aphyre AI with our premium plans. Get access to advanced
            <br />
            features and higher usage limits.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <Button
              variant={billingCycle === "monthly" ? "default" : "outline"}
              onClick={() => setBillingCycle("monthly")}
              className={
                billingCycle === "monthly"
                  ? "bg-accent text-accent-foreground font-bold h-12 px-6"
                  : "font-bold h-12 px-6"
              }
            >
              Monthly
            </Button>
            <Button
              variant={billingCycle === "6months" ? "default" : "outline"}
              onClick={() => setBillingCycle("6months")}
              className={
                billingCycle === "6months" ? "bg-cyan text-cyan-foreground font-bold h-12 px-6" : "font-bold h-12 px-6"
              }
            >
              6 Months
              <Badge className="ml-2 bg-green-500 text-white text-xs">Save 20%</Badge>
            </Button>
            <Button
              variant={billingCycle === "yearly" ? "default" : "outline"}
              onClick={() => setBillingCycle("yearly")}
              className={
                billingCycle === "yearly" ? "bg-cyan text-cyan-foreground font-bold h-12 px-6" : "font-bold h-12 px-6"
              }
            >
              Yearly
              <Badge className="ml-2 bg-green-500 text-white text-xs">Save 20%</Badge>
            </Button>
          </div>

          {/* Promo Code */}
          <div className="flex gap-3 max-w-md mx-auto mb-16">
            <Input type="text" placeholder="Promo code" className="h-12 text-base font-medium bg-background border-2" />
            <Button variant="outline" className="font-bold h-12 px-6 text-base bg-transparent">
              Apply
            </Button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`p-8 ${plan.color} ${plan.popular ? "bg-linear-to-br from-card to-accent/5 shadow-[0_0_50px_-12px_rgba(216,105,142,0.3)] relative" : "bg-card"}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 text-xs font-black">
                  POPULAR
                </Badge>
              )}
              <div className="mb-6">
                <h3 className="text-2xl font-black tracking-tight mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground font-medium mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                  <span className="text-lg font-bold text-muted-foreground">/{plan.period}</span>
                </div>
              </div>

              {plan.name === "Free" ? (
                <Button
                  className="w-full h-12 font-bold text-base mb-6"
                  variant="outline"
                  onClick={() => router.push("/")}
                >
                  {plan.cta}
                </Button>
              ) : (
                <div>
                  {isLoaded && activatedPlans.has(plan.name) ? (
                    <Button
                      className={`w-full h-12 font-bold text-base mb-6 ${
                        plan.popular
                          ? "bg-accent/20 text-accent border-accent/50 hover:bg-accent/20"
                          : "bg-cyan/20 text-cyan border-cyan/50 hover:bg-cyan/20"
                      }`}
                      variant="outline"
                      disabled
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Activated
                    </Button>
                  ) : (
                    <ConfettiButton
                      className={`w-full h-12 font-bold text-base mb-6 ${
                        plan.popular
                          ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow-accent"
                          : "bg-cyan text-cyan-foreground hover:bg-cyan/90"
                      }`}
                      variant="default"
                      onClick={() => handleTrialActivation(plan.name)}
                      disabled={!isLoaded}
                      confettiOptions={{
                        particleCount: 100,
                        spread: 70,
                        colors: plan.popular ? ['#d8698e', '#ff6b9d', '#c44569'] : ['#00f5ff', '#00d4ff', '#0099cc']
                      }}
                    >
                      {plan.cta}
                    </ConfettiButton>
                  )}
                </div>
              )}

              <div className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-500 shrink-0" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground shrink-0" />
                    )}
                    <span
                      className={`text-sm font-medium ${feature.included ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-black tracking-tighter mb-8 text-center">
            FREQUENTLY ASKED <span className="text-cyan">QUESTIONS</span>
          </h3>
          <div className="grid gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-8 border-border bg-card">
                <h4 className="text-xl font-black tracking-tight mb-3">{faq.question}</h4>
                <p className="text-base text-muted-foreground font-medium leading-relaxed">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Trial Activation Card */}
      {showTrialCard && activatedPlan && (
        <TrialActivationCard
          isVisible={showTrialCard}
          onClose={handleCloseTrialCard}
          plan={activatedPlan}
        />
      )}
    </div>
  )
}
