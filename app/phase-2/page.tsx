"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Sidebar } from "@/components/sidebar"
import {
  BarChart3,
  MessageSquare,
  TrendingUp,
  Zap,
  Star,
  DollarSign,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"

// Confetti type for window.confetti
type ConfettiOptions = {
  particleCount?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  ticks?: number;
  origin?: {
    x?: number;
    y?: number;
  };
  colors?: string[];
  shapes?: string[];
  scalar?: number;
  zIndex?: number;
  disableForReducedMotion?: boolean;
};

declare global {
  interface Window {
    confetti?: (options?: ConfettiOptions) => void;
  }
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Initialize countdown with 6 days, 23 hours, 59 minutes, 59 seconds from now
    const initializeCountdown = () => {
      const savedEndTime = localStorage.getItem('Alphyre-phase2-countdown-end')
      let endTime: number

      if (savedEndTime) {
        endTime = parseInt(savedEndTime)
      } else {
        // Set countdown to 6 days, 23 hours, 59 minutes, 59 seconds from now
        const now = new Date().getTime()
        endTime = now + (6 * 24 * 60 * 60 * 1000) + (23 * 60 * 60 * 1000) + (59 * 60 * 1000) + (59 * 1000)
        localStorage.setItem('Alphyre-phase2-countdown-end', endTime.toString())
      }

      return endTime
    }

    const endTime = initializeCountdown()
    setIsLoaded(true)

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = endTime - now

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        // Optionally clear the stored end time when countdown reaches 0
        localStorage.removeItem('Alphyre-phase2-countdown-end')
      }
    }

    // Update immediately
    updateCountdown()

    // Update every second
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center gap-8 mb-8">
        <div className="text-center">
          <div className="text-6xl font-black tracking-tighter mb-2">-</div>
          <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Days</div>
        </div>
        <div className="text-6xl font-black text-muted-foreground">:</div>
        <div className="text-center">
          <div className="text-6xl font-black tracking-tighter mb-2">-</div>
          <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Hours</div>
        </div>
        <div className="text-6xl font-black text-muted-foreground">:</div>
        <div className="text-center">
          <div className="text-6xl font-black tracking-tighter mb-2">-</div>
          <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Minutes</div>
        </div>
        <div className="text-6xl font-black text-muted-foreground">:</div>
        <div className="text-center">
          <div className="text-6xl font-black tracking-tighter mb-2">-</div>
          <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Seconds</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center gap-8 mb-8">
      <div className="text-center">
        <div className="text-6xl font-black tracking-tighter mb-2">{timeLeft.days}</div>
        <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Days</div>
      </div>
      <div className="text-6xl font-black text-muted-foreground">:</div>
      <div className="text-center">
        <div className="text-6xl font-black tracking-tighter mb-2">{timeLeft.hours}</div>
        <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Hours</div>
      </div>
      <div className="text-6xl font-black text-muted-foreground">:</div>
      <div className="text-center">
        <div className="text-6xl font-black tracking-tighter mb-2">{timeLeft.minutes}</div>
        <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Minutes</div>
      </div>
      <div className="text-6xl font-black text-muted-foreground">:</div>
      <div className="text-center">
        <div className="text-6xl font-black tracking-tighter mb-2">{timeLeft.seconds}</div>
        <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Seconds</div>
      </div>
    </div>
  )
}

function NewsletterForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [touched, setTouched] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const isValid = emailRegex.test(email)

  // Load confetti script dynamically
  useEffect(() => {
    if (!window.confetti) {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js";
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    } else {
      setScriptLoaded(true);
    }
  }, []);

  const triggerConfetti = (buttonElement: HTMLButtonElement) => {
    if (scriptLoaded && window.confetti && buttonElement) {
      const rect = buttonElement.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      window.confetti({
        particleCount: 100,
        spread: 70,
        origin: { x, y },
      });
    }
  };

  const handleNotifyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isValid && scriptLoaded) {
      triggerConfetti(e.currentTarget);
      // Navigate to dashboard after confetti animation
      setTimeout(() => router.push("/"), 900);
    }
  };

  return (
    <div className="w-full">
      <div className="flex gap-3 max-w-md mx-auto">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="Enter your email"
          className="h-14 text-base font-medium bg-background border-2"
        />
        <Button 
          className="bg-cyan text-cyan-foreground hover:bg-cyan/90 font-bold h-14 px-8 text-base shadow-[0_0_30px_-10px_rgba(192,252,248,0.5)]"
          disabled={!isValid}
          onClick={handleNotifyClick}
        >
          Notify Me
        </Button>
      </div>

      {touched && !isValid && (
        <p className="mt-3 text-sm text-red-500 text-center">Please enter a valid email address.</p>
      )}
    </div>
  )
}

export default function Phase2Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-0 lg:ml-72 p-6 lg:p-12">
        {/* Hero Section */}
        <div className="mb-16 text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-green-500/20 text-green-500 border-green-500/30 px-6 py-2 text-sm font-bold">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            WE ARE NOW IN PHASE 2
          </Badge>
          <h2 className="mb-6 text-7xl font-black tracking-tighter leading-none text-balance">
            ADVANCED <span className="text-cyan drop-shadow-[0_0_30px_rgba(192,252,248,0.5)]">FEATURES</span>
            <br />
            ARE LIVE
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed text-pretty font-medium mb-8">
            Get ready for advanced market analysis, sentiment tracking, and premium features.
            <br />
            Experience the next generation of crypto trading intelligence.
          </p>
        </div>

        {/* Live Features */}
        <div className="mb-16 grid grid-cols-2 gap-6">
          <Card className="border border-cyan/30 bg-linear-to-br from-card to-cyan/5 p-10 shadow-[0_0_50px_-12px_rgba(192,252,248,0.3)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/10 rounded-full blur-3xl" />
            <div className="relative">
              <Badge className="mb-4 bg-green-500 text-white px-3 py-1 text-xs font-bold">LIVE NOW</Badge>
              <div className="mb-6 rounded-2xl bg-cyan/20 p-5 w-fit border border-cyan/30">
                <MessageSquare className="h-10 w-10 text-cyan" />
              </div>
              <h3 className="text-3xl font-black tracking-tight mb-3">AI Chat is LIVE Now!</h3>
              <p className="text-base text-muted-foreground font-medium mb-6 leading-relaxed">
                Get a taste of Phase 2 by exploring our new AI Chat feature. Ask questions about crypto, blockchain, and
                more.
              </p>
              <Link href="/ai-chat">
                <Button className="bg-cyan text-cyan-foreground hover:bg-cyan/90 font-bold gap-2 h-12 px-6 shadow-[0_0_30px_-10px_rgba(192,252,248,0.5)]">
                  Explore AI Chat
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="border border-accent/30 bg-linear-to-br from-card to-accent/5 p-10 shadow-[0_0_50px_-12px_rgba(216,105,142,0.3)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            <div className="relative">
              <Badge className="mb-4 bg-green-500 text-white px-3 py-1 text-xs font-bold">LIVE NOW</Badge>
              <div className="mb-6 rounded-2xl bg-accent/20 p-5 w-fit border border-accent/30">
                <TrendingUp className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-3xl font-black tracking-tight mb-3">Market Narratives are LIVE Now!</h3>
              <p className="text-base text-muted-foreground font-medium mb-6 leading-relaxed">
                Explore the latest narratives shaping the crypto market. From trending tokens to emerging themes, gain
                insight into what's driving sentiment.
              </p>
              <Link href="/news-sentiment">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold gap-2 h-12 px-6 shadow-glow-accent">
                  Explore Narratives
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Countdown Banner */}
        <Card className="mb-16 border border-accent/30 bg-linear-to-r from-accent/10 via-cyan/10 to-accent/10 p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-accent/5 via-transparent to-cyan/5" />
          <div className="relative">
            <h3 className="text-5xl font-black tracking-tighter mb-4">
              Phase 2 Arrives <span className="text-cyan">Next Week</span>
            </h3>
            <p className="text-lg text-muted-foreground font-medium mb-8 max-w-3xl mx-auto">
              We're upgrading Alphyre AI with powerful new features to help you navigate the crypto markets with
              confidence. Get ready for advanced analytics, market sentiment tracking, and premium features.
            </p>
            <CountdownTimer />
            <Link href="/">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold h-14 px-8 text-base shadow-glow-accent"
              >
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </Card>

        {/* Coming Features Grid */}
        <div className="mb-16">
          <h3 className="text-4xl font-black tracking-tighter mb-8 text-center">
            WHAT'S <span className="text-accent">COMING</span>
          </h3>
          <div className="grid grid-cols-3 gap-6">
            <Card className="border border-cyan/30 bg-card p-8">
              <div className="mb-6 rounded-2xl bg-cyan/20 p-4 w-fit border border-cyan/30">
                <MessageSquare className="h-7 w-7 text-cyan" />
              </div>
              <h4 className="text-2xl font-black tracking-tight mb-3">AI Chat</h4>
              <p className="text-sm text-muted-foreground font-medium mb-4 leading-relaxed">
                Ask questions about crypto, blockchain, and more. Get instant answers from our AI assistant.
              </p>
              <Link href="/ai-chat">
                <Button size="sm" className="bg-cyan text-cyan-foreground hover:bg-cyan/90 font-bold">
                  Try Now
                </Button>
              </Link>
            </Card>

            <Card className="border border-accent/30 bg-card p-8">
              <div className="mb-6 rounded-2xl bg-accent/20 p-4 w-fit border border-accent/30">
                <Sparkles className="h-7 w-7 text-accent" />
              </div>
              <h4 className="text-2xl font-black tracking-tight mb-3">Redesigned UI</h4>
              <p className="text-sm text-muted-foreground font-medium mb-4 leading-relaxed">
                Clean, easy-to-use interface designed for both beginners and advanced traders.
              </p>
              <Button size="sm" variant="outline" className="font-bold bg-transparent">
                Coming Soon
              </Button>
            </Card>

            <Card className="border border-cyan/30 bg-card p-8">
              <div className="mb-6 rounded-2xl bg-cyan/20 p-4 w-fit border border-cyan/30">
                <TrendingUp className="h-7 w-7 text-cyan" />
              </div>
              <h4 className="text-2xl font-black tracking-tight mb-3">Narrative Analysis</h4>
              <p className="text-sm text-muted-foreground font-medium mb-4 leading-relaxed">
                Gain insights into market trends and token stories. Understand what's driving price action.
              </p>
              <Link href="/news-sentiment">
                <Button size="sm" className="bg-cyan text-cyan-foreground hover:bg-cyan/90 font-bold">
                  Try Now
                </Button>
              </Link>
            </Card>

            <Card className="border border-accent/30 bg-card p-8">
              <div className="mb-6 rounded-2xl bg-accent/20 p-4 w-fit border border-accent/30">
                <Zap className="h-7 w-7 text-accent" />
              </div>
              <h4 className="text-2xl font-black tracking-tight mb-3">High Performance</h4>
              <p className="text-sm text-muted-foreground font-medium mb-4 leading-relaxed">
                Faster, smoother platform with real-time updates and improved data processing.
              </p>
              <Button size="sm" variant="outline" className="font-bold bg-transparent">
                Coming Soon
              </Button>
            </Card>

            <Card className="border border-cyan/30 bg-card p-8">
              <div className="mb-6 rounded-2xl bg-cyan/20 p-4 w-fit border border-cyan/30">
                <Star className="h-7 w-7 text-cyan" />
              </div>
              <h4 className="text-2xl font-black tracking-tight mb-3">Premium Plans</h4>
              <p className="text-sm text-muted-foreground font-medium mb-4 leading-relaxed">
                Paid tiers to support Alphyre's growth with exclusive features and priority access.
              </p>
              <Button size="sm" variant="outline" className="font-bold bg-transparent">
                Coming Soon
              </Button>
            </Card>

            <Card className="border border-accent/30 bg-card p-8">
              <div className="mb-6 rounded-2xl bg-accent/20 p-4 w-fit border border-accent/30">
                <DollarSign className="h-7 w-7 text-accent" />
              </div>
              <h4 className="text-2xl font-black tracking-tight mb-3">Profit Sharing</h4>
              <p className="text-sm text-muted-foreground font-medium mb-4 leading-relaxed">
                Top holders will share premium plan profits—more details coming soon!
              </p>
              <Button size="sm" variant="outline" className="font-bold bg-transparent">
                Coming Soon
              </Button>
            </Card>
          </div>
        </div>

        {/* Newsletter Signup */}
        <Card className="border border-accent/30 bg-linear-to-br from-card to-accent/5 p-12 text-center shadow-[0_0_50px_-12px_rgba(216,105,142,0.3)]">
          <h3 className="text-4xl font-black tracking-tighter mb-4">Stay Updated</h3>
          <p className="text-lg text-muted-foreground font-medium mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to get notified when Phase 2 launches and receive exclusive early access.
          </p>
          <NewsletterForm />
        </Card>
      </main>
    </div>
  )
}
