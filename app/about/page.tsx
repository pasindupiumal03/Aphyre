"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/sidebar"
import {
  BarChart3,
  Shield,
  TrendingUp,
  MessageSquare,
  Coins,
  Zap,
  Users,
  Lock,
  AlertTriangle,
  CheckCircle2,
  Server,
} from "lucide-react"

const features = [
  {
    icon: MessageSquare,
    title: "Comprehensive News Sentiment Analysis",
    description:
      "Stay ahead of the curve with our sophisticated news sentiment analysis system that transforms market chatter into clear, actionable opportunities.",
    color: "cyan",
  },
  {
    icon: TrendingUp,
    title: "Advanced Twitter Tracker",
    description:
      "Stay ahead of the curve with Aphyre's real-time Twitter monitoring, capturing market vibes, trending tokens, and emerging narratives as they unfold instantly.",
    color: "accent",
  },
  {
    icon: Shield,
    title: "Intelligent News Sentiment Analysis",
    description:
      "Our AI-powered sentiment engine analyzes thousands of news sources to give you real-time insights into market sentiment and potential price movements.",
    color: "cyan",
  },
  {
    icon: Coins,
    title: "Ethereum Chain Coin Tracker: Professional-Grade Analytics",
    description:
      "Master Ethereum trading with our comprehensive tracking tools that keep you fully informed and make data-driven decisions.",
    color: "accent",
  },
  {
    icon: Zap,
    title: "Complete Solana Ecosystem Integration",
    description:
      "Experience unmatched coverage across the entire Solana network, with our comprehensive support for all major platforms.",
    color: "cyan",
  },
]

const protectionFeatures = [
  {
    icon: AlertTriangle,
    title: "Honeypot detection",
    description: "Identify and avoid potential scams before they affect your portfolio.",
  },
  {
    icon: Users,
    title: "Token score holdings",
    description: "Comprehensive scoring system for token health and legitimacy.",
  },
  {
    icon: Lock,
    title: "Bubble map snipers",
    description: "Detect and identify underhanded gems.",
  },
]

const solanaPlatforms = ["Pump.fun", "Bonk", "Launchcoin", "Raydium", "Meteora", "Moonshot"]

const whyAphyreFeatures = [
  { title: "Secure Trading", description: "Trade confidently with comprehensive security" },
  { title: "Bundle Identification", description: "Identify bundled transactions" },
  { title: "Rug Checks", description: "Detect scams and avoid potential rug pulls" },
  { title: "Token Scores", description: "Get detailed ratings to make smart moves" },
  { title: "Holding Checks", description: "Analyze token holdings for legitimacy" },
  { title: "Bubble Maps", description: "Visualize trends and dodge overvalued assets" },
  { title: "Snipers", description: "Snipe fast-text tools for precision trading" },
  { title: "Advanced Twitter Tracker", description: "Track real-time market vibes and insights" },
]

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

export default function AboutPage() {
  const router = useRouter()
  const [scriptLoaded, setScriptLoaded] = useState(false)

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
        colors: ['#d8698e', '#3b82f6', '#10b981', '#f59e0b']
      });
    }
  };

  const handleGetStartedClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (scriptLoaded) {
      triggerConfetti(e.currentTarget);
      // Navigate to dashboard after confetti animation
      setTimeout(() => router.push("/"), 900);
    } else {
      // If script not loaded, just navigate immediately
      router.push("/");
    }
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-0 lg:ml-72 p-6 lg:p-12">
        {/* Hero Section */}
        <div className="mb-16 max-w-4xl">
          <Badge className="mb-6 bg-accent/20 text-accent border-accent/30 px-6 py-2 text-sm font-bold">
            ABOUT APHYRE
          </Badge>
          <h2 className="mb-6 text-7xl font-black tracking-tighter leading-none text-balance">
            YOUR COMMUNITY-BUILT
            <br />
            <span className="text-cyan drop-shadow-[0_0_30px_rgba(192,252,248,0.5)]">TRADING SHIELD</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed text-pretty font-medium">
            Learn about our community-built trading shield and comprehensive crypto analytics platform
          </p>
        </div>

        {/* Discover Aphyre */}
        <Card className="mb-16 border border-accent/30 bg-gradient-to-br from-card to-accent/5 p-12 shadow-[0_0_50px_-12px_rgba(216,105,142,0.3)]">
          <h3 className="text-4xl font-black tracking-tighter mb-6">Discover Aphyre</h3>
          <p className="text-lg text-muted-foreground font-medium leading-relaxed mb-6">
            Your Community-Built Trading Shield
          </p>
          <p className="text-base text-muted-foreground font-medium leading-relaxed">
            Welcome, Aphyre—where everyday traders come together in revolutionize crypto trading. Say goodbye to trading
            stress and hello to peace of mind with our all-in-one, community-first platform that puts everything you
            need right at your fingertips.
          </p>
        </Card>

        {/* Your Ultimate Shield */}
        <div className="mb-16">
          <div className="mb-8">
            <h3 className="text-4xl font-black tracking-tighter mb-4">
              YOUR ULTIMATE SHIELD IN THE <span className="text-accent">CRYPTO UNIVERSE</span>
            </h3>
            <p className="text-lg text-muted-foreground font-medium">
              Aphyre stands as your robust shield in the dynamic cryptocurrency world, offering unparalleled protection
              and empowerment through:
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`p-8 border ${feature.color === "cyan" ? "border-cyan/30 bg-gradient-to-br from-card to-cyan/5" : "border-accent/30 bg-gradient-to-br from-card to-accent/5"}`}
              >
                <div
                  className={`mb-6 rounded-2xl p-4 w-fit ${feature.color === "cyan" ? "bg-cyan/20 border border-cyan/30" : "bg-accent/20 border border-accent/30"}`}
                >
                  <feature.icon className={`h-8 w-8 ${feature.color === "cyan" ? "text-cyan" : "text-accent"}`} />
                </div>
                <h4 className="text-2xl font-black tracking-tight mb-3">{feature.title}</h4>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Solana Ecosystem */}
        <Card className="mb-16 border border-cyan/30 bg-gradient-to-br from-card to-cyan/5 p-12 shadow-[0_0_50px_-12px_rgba(192,252,248,0.3)]">
          <div className="mb-8">
            <h3 className="text-4xl font-black tracking-tighter mb-4">
              COMPLETE SOLANA <span className="text-cyan">ECOSYSTEM INTEGRATION</span>
            </h3>
            <p className="text-lg text-muted-foreground font-medium">
              Experience unmatched coverage across the entire Solana network, with our comprehensive support for all
              major platforms.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {solanaPlatforms.map((platform, index) => (
              <Card key={index} className="p-6 border-border bg-card text-center">
                <h4 className="text-xl font-black tracking-tight">{platform}</h4>
              </Card>
            ))}
          </div>
          <p className="text-base text-muted-foreground font-medium mt-8 text-center">
            Navigate every corner of Solana's thriving ecosystem with confidence and precision.
          </p>
        </Card>

        {/* Advanced Protection Features */}
        <div className="mb-16">
          <div className="mb-8">
            <h3 className="text-4xl font-black tracking-tighter mb-4">
              ADVANCED <span className="text-accent">PROTECTION FEATURES</span>
            </h3>
            <p className="text-lg text-muted-foreground font-medium">
              Your security is our priority. Aphyre shields you with powerful tools to identify risks and avoid scams:
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {protectionFeatures.map((feature, index) => (
              <Card key={index} className="p-8 border-border bg-card">
                <div className="mb-6 rounded-2xl bg-accent/20 p-4 w-fit border border-accent/30">
                  <feature.icon className="h-7 w-7 text-accent" />
                </div>
                <h4 className="text-xl font-black tracking-tight mb-3">{feature.title}</h4>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>

          <p className="text-base text-muted-foreground font-medium mt-8 text-center">
            Trade with confidence knowing you're protected by real-time analytics and community-driven insights.
          </p>
        </div>

        {/* MCP Server */}
        <Card className="mb-16 border border-cyan/30 bg-gradient-to-br from-card to-cyan/5 p-12 shadow-[0_0_50px_-12px_rgba(192,252,248,0.3)]">
          <div className="flex items-start gap-8">
            <div className="rounded-2xl bg-cyan/20 p-6 border border-cyan/30">
              <Server className="h-12 w-12 text-cyan" />
            </div>
            <div className="flex-1">
              <h3 className="text-4xl font-black tracking-tighter mb-4">
                APHYRE'S MCP SERVER <span className="text-cyan">(VERSION 1.0.0)</span>
              </h3>
              <p className="text-lg text-muted-foreground font-medium mb-6">
                Powered by the Model Context Protocol (MCP), Aphyre's server connects you to live crypto data and
                analytics seamlessly. Access it at{" "}
                <a href="#" className="text-cyan font-bold hover:underline">
                  https://mcpque.run/mcp
                </a>{" "}
                (only accessible on Aphyre website) and use the MCP inspector to explore and test resources and tools.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-black tracking-tight mb-2">Resources (3 Available)</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      crypto-news: Get the latest crypto news
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      crypto-sentiment: Analyze market sentiment
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      crypto-analysis: DYO deep dive data-driven insights
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-black tracking-tight mb-2">Tools (3 Available)</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      fetch-crypto-news: Retrieve news with customizable filters
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      fetch-crypto-sentiment: Pull sentiment data for specific tokens
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      get-crypto-sentiment: Get concise sentiment summaries
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Why Aphyre Stands Apart */}
        <div className="mb-16">
          <div className="mb-8">
            <h3 className="text-4xl font-black tracking-tighter mb-4 text-center">
              WHY APHYRE <span className="text-accent">STANDS APART</span>
            </h3>
            <p className="text-lg text-muted-foreground font-medium text-center max-w-3xl mx-auto">
              We're not just another platform—we're your complete, our comprehensive solution combines MCP's sentiment
              analysis, precise tracking tools, and full Solana support to ensure you're always ahead of the curve.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {whyAphyreFeatures.map((feature, index) => (
              <Card key={index} className="p-6 border-border bg-card text-center hover:border-accent/50 transition-all">
                <h4 className="text-lg font-black tracking-tight mb-2">{feature.title}</h4>
                <p className="text-xs text-muted-foreground font-medium">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <Card className="border border-accent/30 bg-gradient-to-r from-accent/10 via-cyan/10 to-accent/10 p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-cyan/5" />
          <div className="relative">
            <h3 className="text-5xl font-black tracking-tighter mb-4">
              BUILT BY COMMUNITY, FOR THE <span className="text-cyan">COMMUNITY</span>
            </h3>
            <p className="text-lg text-muted-foreground font-medium mb-8 max-w-3xl mx-auto">
              Whether you're a newbie or a pro, join us to trade smarter, safer, and together. Peace of mind is just a
              click away—let's part of the Aphyre family today!
            </p>
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold h-14 px-8 text-base shadow-glow-accent"
              onClick={handleGetStartedClick}
            >
              Get Started Now
            </Button>
          </div>
        </Card>
      </main>
    </div>
  )
}
