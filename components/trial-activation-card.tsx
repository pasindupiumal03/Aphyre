"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, Sparkles, X, CheckCircle, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface TrialActivationCardProps {
  isVisible: boolean
  onClose: () => void
  plan: "Premium" | "Business"
}

export function TrialActivationCard({ isVisible, onClose, plan }: TrialActivationCardProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setMounted(true)
    }
  }, [isVisible])

  if (!mounted || !isVisible) return null

  const planColor = plan === "Premium" ? "accent" : "cyan"
  const planIcon = plan === "Premium" ? Crown : Sparkles

  const PlanIcon = planIcon

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-6 pointer-events-none">
      <Card 
        className={cn(
          "w-96 pointer-events-auto transition-all duration-500 ease-out transform",
          "border shadow-2xl animate-in slide-in-from-right-5 fade-in-0",
          plan === "Premium" 
            ? "border-accent/50 bg-linear-to-br from-card to-accent/10 shadow-accent/20" 
            : "border-cyan/50 bg-linear-to-br from-card to-cyan/10 shadow-cyan/20"
        )}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div 
                className={cn(
                  "p-3 rounded-xl",
                  plan === "Premium" 
                    ? "bg-accent/20 text-accent" 
                    : "bg-cyan/20 text-cyan"
                )}
              >
                <PlanIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-black tracking-tight">
                  {plan} Trial Activated!
                </h3>
                <p className="text-sm text-muted-foreground font-medium">
                  Welcome to Alphyre
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-muted/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div 
              className={cn(
                "p-4 rounded-xl border",
                plan === "Premium" 
                  ? "bg-accent/10 border-accent/30" 
                  : "bg-cyan/10 border-cyan/30"
              )}
            >
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle 
                  className={cn(
                    "h-5 w-5",
                    plan === "Premium" ? "text-accent" : "text-cyan"
                  )} 
                />
                <span className="font-bold text-sm">Free 7-Day Trial</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Expires: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <Badge 
                className={cn(
                  "text-xs font-bold",
                  plan === "Premium" 
                    ? "bg-accent text-accent-foreground" 
                    : "bg-cyan text-cyan-foreground"
                )}
              >
                Full Access Unlocked
              </Badge>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                What's included:
              </p>
              {plan === "Premium" ? (
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>10 AI chat requests per day</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>Anti-rug protection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>Priority support</span>
                  </li>
                </ul>
              ) : (
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>Unlimited AI chat requests</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>API access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>Custom analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>Team collaboration</span>
                  </li>
                </ul>
              )}
            </div>

            <div className="pt-2">
              <p className="text-xs text-muted-foreground leading-relaxed">
                You can cancel anytime during your trial with no charges.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}