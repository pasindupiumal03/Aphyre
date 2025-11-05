"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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

export default function Phase2Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-72 border-r border-border bg-card/50 backdrop-blur-xl p-8">
        <div className="mb-12">
          <h1 className="text-3xl font-black tracking-tighter">Aphyre</h1>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mt-1">
            TRADING INTELLIGENCE
          </p>
        </div>

        <nav className="space-y-2">
          <Link href="/">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 text-base font-semibold hover:bg-secondary/30 text-foreground"
            >
              <BarChart3 className="h-5 w-5" />
              Dashboard
            </Button>
          </Link>
          <Link href="/phase-2">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 text-base font-bold bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow-accent"
            >
              <Sparkles className="h-5 w-5" />
              Phase 2
            </Button>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-72 p-12">
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
          <Card className="border border-cyan/30 bg-gradient-to-br from-card to-cyan/5 p-10 shadow-[0_0_50px_-12px_rgba(192,252,248,0.3)] relative overflow-hidden">
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
              <Button className="bg-cyan text-cyan-foreground hover:bg-cyan/90 font-bold gap-2 h-12 px-6 shadow-[0_0_30px_-10px_rgba(192,252,248,0.5)]">
                Explore AI Chat
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </Card>

          <Card className="border border-accent/30 bg-gradient-to-br from-card to-accent/5 p-10 shadow-[0_0_50px_-12px_rgba(216,105,142,0.3)] relative overflow-hidden">
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
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold gap-2 h-12 px-6 shadow-glow-accent">
                Explore Narratives
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Countdown Banner */}
        <Card className="mb-16 border border-accent/30 bg-gradient-to-r from-accent/10 via-cyan/10 to-accent/10 p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-cyan/5" />
          <div className="relative">
            <h3 className="text-5xl font-black tracking-tighter mb-4">
              Phase 2 Arrives <span className="text-cyan">Next Week</span>
            </h3>
            <p className="text-lg text-muted-foreground font-medium mb-8 max-w-3xl mx-auto">
              We're upgrading Aphyre AI with powerful new features to help you navigate the crypto markets with
              confidence. Get ready for advanced analytics, market sentiment tracking, and premium features.
            </p>
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-6xl font-black tracking-tighter mb-2">0</div>
                <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Days</div>
              </div>
              <div className="text-6xl font-black text-muted-foreground">:</div>
              <div className="text-center">
                <div className="text-6xl font-black tracking-tighter mb-2">0</div>
                <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Hours</div>
              </div>
              <div className="text-6xl font-black text-muted-foreground">:</div>
              <div className="text-center">
                <div className="text-6xl font-black tracking-tighter mb-2">0</div>
                <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Minutes</div>
              </div>
              <div className="text-6xl font-black text-muted-foreground">:</div>
              <div className="text-center">
                <div className="text-6xl font-black tracking-tighter mb-2">0</div>
                <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Seconds</div>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold h-14 px-8 text-base shadow-glow-accent"
            >
              Back to Dashboard
            </Button>
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
              <Button size="sm" className="bg-cyan text-cyan-foreground hover:bg-cyan/90 font-bold">
                Try Now
              </Button>
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
              <Button size="sm" className="bg-cyan text-cyan-foreground hover:bg-cyan/90 font-bold">
                Try Now
              </Button>
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
                Paid tiers to support Aphyre's growth with exclusive features and priority access.
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
        <Card className="border border-accent/30 bg-gradient-to-br from-card to-accent/5 p-12 text-center shadow-[0_0_50px_-12px_rgba(216,105,142,0.3)]">
          <h3 className="text-4xl font-black tracking-tighter mb-4">Stay Updated</h3>
          <p className="text-lg text-muted-foreground font-medium mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to get notified when Phase 2 launches and receive exclusive early access.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="h-14 text-base font-medium bg-background border-2"
            />
            <Button className="bg-cyan text-cyan-foreground hover:bg-cyan/90 font-bold h-14 px-8 text-base shadow-[0_0_30px_-10px_rgba(192,252,248,0.5)]">
              Notify Me
            </Button>
          </div>
        </Card>
      </main>
    </div>
  )
}
