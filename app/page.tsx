"use client"

import Link from "next/link"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  Coins,
  DollarSign,
  ArrowDownRight,
  RefreshCw,
  ChevronRight,
  Zap,
  Globe,
  MessageSquare,
  Wallet,
  ArrowUpRight,
  Frown,
  PieChart,
  Sparkles,
  Crown,
  Users,
} from "lucide-react"
import { ResponsiveContainer, Line, LineChart, Area, AreaChart, XAxis, YAxis, Tooltip, Cell, Pie } from "recharts"

// Mock data
const marketData = [
  { time: "00:00", value: 42000, volume: 1200 },
  { time: "04:00", value: 41500, volume: 1400 },
  { time: "08:00", value: 43200, volume: 1800 },
  { time: "12:00", value: 42800, volume: 1600 },
  { time: "16:00", value: 44100, volume: 2100 },
  { time: "20:00", value: 43800, volume: 1900 },
  { time: "24:00", value: 44500, volume: 2300 },
]

const newsItems = [
  {
    source: "CoinDesk",
    time: "18 minutes ago",
    title: "Balancer Hit by Apparent Exploit as $70M in Crypto Moves to New Wallets",
    excerpt:
      "The affected funds include 6,850 osETH, 6,590 WETH, and 4,260 wsETH, blockchain data analyzed by CoinDesk showed.",
    sentiment: "neutral",
    tags: ["Market"],
  },
  {
    source: "Cointelegraph",
    time: "25 minutes ago",
    title: "Without Bitcoin, what happens to Ether and XRP?",
    excerpt:
      "What if Bitcoin crashes? Will Ether and XRP fall with it or hold their ground? Discover how a BTC slump could rattle the entire crypto market.",
    sentiment: "neutral",
    tags: ["BTC", "Market"],
  },
  {
    source: "CoinDesk",
    time: "51 minutes ago",
    title: "BTC's 'Indecision' Problem: Here's What the Market Is Trying to Tell Us",
    excerpt: "BTC's monthly chart shows indecision at record highs.",
    sentiment: "bullish",
    tags: ["BTC", "Market"],
  },
]

const fundingTrendData = [
  { month: "Nov-22", amount: 1.38, projects: 90 },
  { month: "Jan-23", amount: 1.37, projects: 85 },
  { month: "Mar-23", amount: 0.76, projects: 70 },
  { month: "May-23", amount: 1.68, projects: 95 },
  { month: "Jul-23", amount: 0.49, projects: 60 },
  { month: "Sep-23", amount: 1.03, projects: 80 },
  { month: "Nov-23", amount: 1.68, projects: 100 },
  { month: "Jan-24", amount: 1.26, projects: 85 },
  { month: "Mar-24", amount: 3.79, projects: 140 },
  { month: "May-24", amount: 5.79, projects: 180 },
  { month: "Jul-24", amount: 4.81, projects: 160 },
  { month: "Sep-24", amount: 5.11, projects: 170 },
  { month: "Nov-24", amount: 3.13, projects: 130 },
  { month: "Jan-25", amount: 1.24, projects: 90 },
  { month: "Mar-25", amount: 2.29, projects: 110 },
  { month: "May-25", amount: 4.06, projects: 150 },
]

const monthlyFundraisingData = [
  {
    month: "Nov-20",
    defi: 20,
    gamefi: 5,
    chain: 15,
    infrastructure: 25,
    cefi: 10,
    social: 8,
    nft: 12,
    stablecoin: 5,
    currency: 8,
    meme: 2,
    service: 10,
  },
  {
    month: "Feb-21",
    defi: 35,
    gamefi: 8,
    chain: 20,
    infrastructure: 40,
    cefi: 15,
    social: 12,
    nft: 25,
    stablecoin: 8,
    currency: 10,
    meme: 3,
    service: 15,
  },
  {
    month: "May-21",
    defi: 45,
    gamefi: 12,
    chain: 25,
    infrastructure: 50,
    cefi: 20,
    social: 15,
    nft: 35,
    stablecoin: 10,
    currency: 12,
    meme: 5,
    service: 20,
  },
  {
    month: "Aug-21",
    defi: 50,
    gamefi: 15,
    chain: 30,
    infrastructure: 55,
    cefi: 22,
    social: 18,
    nft: 40,
    stablecoin: 12,
    currency: 15,
    meme: 6,
    service: 22,
  },
  {
    month: "Nov-21",
    defi: 55,
    gamefi: 18,
    chain: 32,
    infrastructure: 60,
    cefi: 25,
    social: 20,
    nft: 45,
    stablecoin: 15,
    currency: 18,
    meme: 8,
    service: 25,
  },
  {
    month: "Feb-22",
    defi: 48,
    gamefi: 16,
    chain: 28,
    infrastructure: 52,
    cefi: 22,
    social: 18,
    nft: 38,
    stablecoin: 13,
    currency: 16,
    meme: 7,
    service: 22,
  },
  {
    month: "May-22",
    defi: 42,
    gamefi: 14,
    chain: 25,
    infrastructure: 48,
    cefi: 20,
    social: 16,
    nft: 32,
    stablecoin: 12,
    currency: 14,
    meme: 6,
    service: 20,
  },
  {
    month: "Aug-22",
    defi: 38,
    gamefi: 12,
    chain: 22,
    infrastructure: 42,
    cefi: 18,
    social: 14,
    nft: 28,
    stablecoin: 10,
    currency: 12,
    meme: 5,
    service: 18,
  },
  {
    month: "Nov-22",
    defi: 35,
    gamefi: 10,
    chain: 20,
    infrastructure: 38,
    cefi: 16,
    social: 12,
    nft: 25,
    stablecoin: 9,
    currency: 11,
    meme: 4,
    service: 16,
  },
  {
    month: "Feb-23",
    defi: 40,
    gamefi: 13,
    chain: 23,
    infrastructure: 45,
    cefi: 19,
    social: 15,
    nft: 30,
    stablecoin: 11,
    currency: 13,
    meme: 5,
    service: 19,
  },
  {
    month: "May-23",
    defi: 52,
    gamefi: 16,
    chain: 28,
    infrastructure: 58,
    cefi: 24,
    social: 19,
    nft: 38,
    stablecoin: 14,
    currency: 16,
    meme: 7,
    service: 24,
  },
  {
    month: "Aug-23",
    defi: 48,
    gamefi: 15,
    chain: 26,
    infrastructure: 52,
    cefi: 22,
    social: 17,
    nft: 35,
    stablecoin: 13,
    currency: 15,
    meme: 6,
    service: 22,
  },
  {
    month: "Nov-23",
    defi: 55,
    gamefi: 18,
    chain: 30,
    infrastructure: 62,
    cefi: 26,
    social: 21,
    nft: 42,
    stablecoin: 16,
    currency: 18,
    meme: 8,
    service: 26,
  },
  {
    month: "Feb-24",
    defi: 62,
    gamefi: 22,
    chain: 35,
    infrastructure: 72,
    cefi: 30,
    social: 25,
    nft: 48,
    stablecoin: 19,
    currency: 22,
    meme: 10,
    service: 30,
  },
  {
    month: "May-24",
    defi: 75,
    gamefi: 28,
    chain: 42,
    infrastructure: 88,
    cefi: 38,
    social: 32,
    nft: 58,
    stablecoin: 24,
    currency: 28,
    meme: 14,
    service: 38,
  },
  {
    month: "Aug-24",
    defi: 68,
    gamefi: 25,
    chain: 38,
    infrastructure: 78,
    cefi: 34,
    social: 28,
    nft: 52,
    stablecoin: 22,
    currency: 25,
    meme: 12,
    service: 34,
  },
]

const topCategoriesData = [
  { category: "Infrastructure, Layer1", value: 95, count: 450 },
  { category: "Layer1 Blockchain", value: 88, count: 420 },
  { category: "Web Infrastructure Solutions", value: 82, count: 390 },
  { category: "Decentralized Social Networks", value: 78, count: 365 },
  { category: "Delta-neutral Stablecoin", value: 71, count: 340 },
  { category: "Data Monetization Platform", value: 68, count: 325 },
  { category: "Ethereum L2 using Bitcoin", value: 65, count: 310 },
  { category: "Web3 Game Studio", value: 62, count: 295 },
  { category: "Synthetic Dollar Protocol", value: 58, count: 280 },
  { category: "Verifiable Data Standards", value: 55, count: 265 },
]

const fundingStageData = [
  { name: "Seed", value: 29.11, count: 2998, color: "#3b82f6" },
  { name: "Strategic", value: 10.2, count: 1050, color: "#8b5cf6" },
  { name: "Series A", value: 9.59, count: 987, color: "#06b6d4" },
  { name: "Pre-Seed", value: 6.9, count: 710, color: "#10b981" },
  { name: "Series B", value: 2.97, count: 306, color: "#84cc16" },
  { name: "M&A", value: 2.88, count: 296, color: "#14b8a6" },
  { name: "Others", value: 38.36, count: 3950, color: "#64748b" },
]

const fundingSizeData = [
  { name: "< $1M", value: 676, amount: 0.4, color: "#84cc16" },
  { name: "$1-3M", value: 530, amount: 1.2, color: "#3b82f6" },
  { name: "$3-10M", value: 1014, amount: 6.8, color: "#10b981" },
  { name: "$10-20M", value: 888, amount: 13.2, color: "#eab308" },
  { name: "$20-50M", value: 676, amount: 22.8, color: "#f97316" },
  { name: "$50M+", value: 2780, amount: 123.0, color: "#8b5cf6" },
]

const topInvestorsData = [
  { name: "Coinbase Ventures", deals: 78, leadDeals: 45, color: "#3b82f6" },
  { name: "Animoca Brands", deals: 87, leadDeals: 52, color: "#8b5cf6" },
  { name: "Amber Group", deals: 35, leadDeals: 18, color: "#06b6d4" },
  { name: "YZi Labs", deals: 35, leadDeals: 20, color: "#10b981" },
  { name: "GSR", deals: 34, leadDeals: 16, color: "#84cc16" },
  { name: "Selini Capital", deals: 34, leadDeals: 19, color: "#14b8a6" },
  { name: "Pantera Capital", deals: 34, leadDeals: 21, color: "#f97316" },
  { name: "a16z CSX", deals: 33, leadDeals: 17, color: "#ec4899" },
]

const investmentLocationsData = [
  { name: "Undisclosed", value: 25.47, color: "#64748b" },
  { name: "United States", value: 14.11, color: "#84cc16" },
  { name: "Malta", value: 2.0, color: "#06b6d4" },
  { name: "Singapore", value: 1.45, color: "#10b981" },
  { name: "United Kingdom", value: 1.32, color: "#3b82f6" },
  { name: "Hong Kong", value: 0.95, color: "#8b5cf6" },
  { name: "Canada", value: 1.02, color: "#14b8a6" },
  { name: "Australia", value: 1.04, color: "#f97316" },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"crypto" | "us">("crypto")
  const [fundingView, setFundingView] = useState<"amount" | "count">("amount")
  const [categoryView, setcategoryView] = useState<"amount" | "count">("count")

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

        <div className="mb-10 rounded-2xl bg-secondary/30 p-5 border border-accent/20">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent shadow-glow-accent">
              <Coins className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm font-bold">Free Plan</p>
              <p className="text-xs text-muted-foreground font-medium">Early Access Member</p>
            </div>
          </div>
        </div>

        <nav className="space-y-2">
          <Link href="/">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 text-base font-bold bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow-accent"
            >
              <BarChart3 className="h-5 w-5" />
              Dashboard
            </Button>
          </Link>
          <Link href="/ai-chat">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 text-base font-semibold hover:bg-secondary/30 text-foreground"
            >
              <MessageSquare className="h-5 w-5" />
              AI Chat
            </Button>
          </Link>
          <Link href="/news-sentiment">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 text-base font-semibold hover:bg-secondary/30 text-foreground"
            >
              <TrendingUp className="h-5 w-5" />
              News Sentiment
            </Button>
          </Link>
          <Link href="/eth-tracker">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 text-base font-semibold hover:bg-secondary/30 text-foreground"
            >
              <Coins className="h-5 w-5" />
              ETH Tracker
            </Button>
          </Link>
          <Link href="/solana-tracker">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 text-base font-semibold hover:bg-secondary/30 text-foreground"
            >
              <Globe className="h-5 w-5" />
              Solana Tracker
            </Button>
          </Link>
          <Link href="/wallet-lookup">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 text-base font-semibold hover:bg-secondary/30 text-foreground"
            >
              <Wallet className="h-5 w-5" />
              Wallet Lookup
            </Button>
          </Link>
          <div className="pt-4 mt-4 border-t border-border">
            <Link href="/phase-2">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-12 text-base font-semibold hover:bg-secondary/30 text-foreground"
              >
                <Sparkles className="h-5 w-5" />
                Phase 2
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-12 text-base font-semibold hover:bg-secondary/30 text-foreground"
              >
                <Crown className="h-5 w-5" />
                Pricing
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-12 text-base font-semibold hover:bg-secondary/30 text-foreground"
              >
                <Users className="h-5 w-5" />
                About Us
              </Button>
            </Link>
          </div>
        </nav>

        <div className="absolute bottom-8 left-8 right-8">
          <Button className="w-full h-12 bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base shadow-glow-accent">
            <Zap className="h-5 w-5 mr-2" />
            Connect Phantom
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-72 p-12">
        {/* Header */}
        <div className="mb-12 flex items-start justify-between">
          <div className="max-w-3xl">
            <h2 className="mb-4 text-7xl font-black tracking-tighter leading-none text-balance">
              MARKET <span className="text-cyan drop-shadow-[0_0_30px_rgba(192,252,248,0.5)]">DASHBOARD</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed text-pretty font-medium">
              Real-time insights and analytics for informed trading decisions.
              <br />
              Track market movements and discover opportunities.
            </p>
          </div>
          <Button
            size="lg"
            className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90 h-14 px-8 text-base font-bold shadow-glow-accent"
          >
            <RefreshCw className="h-5 w-5" />
            REFRESH DATA
          </Button>
        </div>

        {/* Stats Grid - More Dynamic Asymmetric Layout */}
        <div className="mb-16 grid grid-cols-12 gap-6">
          {/* Large Featured Card - Market Cap */}
          <Card className="col-span-6 row-span-2 border border-accent/30 bg-gradient-to-br from-card via-card to-accent/5 p-8 shadow-[0_0_50px_-12px_rgba(216,105,142,0.3)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            <div className="relative">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <p className="mb-2 text-sm font-black uppercase tracking-widest text-muted-foreground">Market Cap</p>
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-7xl font-black tracking-tighter">$4T</h3>
                    <Badge variant="destructive" className="gap-1 px-3 py-1 text-sm font-bold">
                      <ArrowDownRight className="h-4 w-4" />
                      3.60%
                    </Badge>
                  </div>
                </div>
                <div className="rounded-2xl bg-accent/20 p-4 shadow-glow-accent">
                  <DollarSign className="h-8 w-8 text-accent" />
                </div>
              </div>
              <div className="h-32 mt-8">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={marketData}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={false}
                      strokeLinecap="round"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>

          {/* Cyan Featured Card - 24H Volume */}
          <Card className="col-span-6 border border-cyan/30 bg-gradient-to-br from-card to-cyan/5 p-8 shadow-[0_0_50px_-12px_rgba(192,252,248,0.3)] relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan/10 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="mb-2 text-sm font-black uppercase tracking-widest text-muted-foreground">24H Volume</p>
                  <h3 className="text-6xl font-black tracking-tighter">$134B</h3>
                </div>
                <div className="rounded-2xl bg-cyan/20 p-4">
                  <Activity className="h-7 w-7 text-cyan" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-base font-bold">
                <ArrowUpRight className="h-5 w-5 text-green-500" />
                <span className="text-green-500">+12.4%</span>
                <span className="text-muted-foreground font-medium">vs yesterday</span>
              </div>
            </div>
          </Card>

          {/* Total Coins */}
          <Card className="col-span-3 p-8 border-border hover:border-accent/50 transition-all bg-card">
            <div className="mb-6">
              <p className="mb-2 text-sm font-black uppercase tracking-widest text-muted-foreground">Total Coins</p>
              <h3 className="text-5xl font-black tracking-tighter">19,413</h3>
            </div>
            <div className="rounded-xl bg-muted/30 p-3 w-fit border border-accent/30">
              <Coins className="h-6 w-6" />
            </div>
          </Card>

          {/* BTC Dominance */}
          <Card className="col-span-3 p-8 border-border hover:cyan/50 transition-all bg-card">
            <div className="mb-6">
              <p className="mb-2 text-sm font-black uppercase tracking-widest text-muted-foreground">BTC Dominance</p>
              <h3 className="text-5xl font-black tracking-tighter">58.2%</h3>
            </div>
            <div className="h-3 w-full rounded-full bg-muted/30 overflow-hidden">
              <div className="h-full w-[58.2%] bg-cyan rounded-full shadow-[0_0_20px_-5px_rgba(192,252,248,0.6)]" />
            </div>
          </Card>

          <Card className="col-span-4 border border-destructive/30 bg-gradient-to-br from-card to-destructive/5 p-8 shadow-[0_0_40px_-12px_rgba(239,68,68,0.2)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/10 rounded-full blur-2xl" />
            <div className="relative">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="mb-2 text-sm font-black uppercase tracking-widest text-muted-foreground">
                    Market Sentiment
                  </p>
                  <h3 className="text-5xl font-black tracking-tighter text-destructive mb-3">BEARISH</h3>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <Frown className="h-5 w-5 text-destructive" />
                      <span className="text-sm font-bold text-muted-foreground">Fear: 68%</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl bg-destructive/20 p-4 border border-destructive/30">
                  <TrendingDown className="h-7 w-7 text-destructive" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-muted-foreground">Sentiment Score</span>
                  <span className="text-destructive">32/100</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted/30 overflow-hidden">
                  <div className="h-full w-[32%] bg-destructive rounded-full shadow-[0_0_15px_-3px_rgba(239,68,68,0.6)]" />
                </div>
              </div>
            </div>
          </Card>

          {/* Fear & Greed Index */}
          <Card className="col-span-4 p-8 bg-accent text-accent-foreground border border-accent shadow-glow-accent">
            <div className="mb-4">
              <p className="mb-2 text-sm font-black uppercase tracking-widest opacity-70">Fear & Greed Index</p>
              <h3 className="text-6xl font-black tracking-tighter">42</h3>
            </div>
            <p className="text-base font-bold opacity-90">NEUTRAL TERRITORY</p>
          </Card>

          {/* Mini Chart Card */}
          <Card className="col-span-4 p-8 border-border hover:border-accent/50 transition-all bg-card">
            <div className="mb-4">
              <p className="mb-2 text-sm font-black uppercase tracking-widest text-muted-foreground">Global Volume</p>
              <h3 className="text-4xl font-black tracking-tighter">$2.8T</h3>
            </div>
            <div className="h-16">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketData}>
                  <Line type="monotone" dataKey="volume" stroke="hsl(var(--cyan))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Fundraising Analytics Section */}
        <div className="mb-16">
          <div className="mb-8">
            <h3 className="text-5xl font-black tracking-tighter mb-3">
              FUNDRAISING <span className="text-cyan drop-shadow-[0_0_30px_rgba(192,252,248,0.5)]">ANALYTICS</span>
            </h3>
            <p className="text-lg text-muted-foreground font-medium">
              Track crypto venture capital trends and investment patterns
            </p>
          </div>

          <Card className="mb-6 border border-accent/30 bg-gradient-to-br from-card to-accent/5 p-8 shadow-[0_0_40px_-12px_rgba(216,105,142,0.2)]">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h4 className="text-2xl font-black tracking-tight mb-2">Crypto Fundraising Trend</h4>
                <p className="text-sm text-muted-foreground font-medium">
                  Total funds raised and number of funding rounds by month
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={fundingView === "amount" ? "default" : "outline"}
                  onClick={() => setFundingView("amount")}
                  className={fundingView === "amount" ? "bg-accent text-accent-foreground font-bold" : "font-bold"}
                >
                  Raised in USD
                </Button>
                <Button
                  size="sm"
                  variant={fundingView === "count" ? "default" : "outline"}
                  onClick={() => setFundingView("count")}
                  className={fundingView === "count" ? "bg-cyan text-cyan-foreground font-bold" : "font-bold"}
                >
                  Number of Rounds
                </Button>
              </div>
            </div>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={fundingTrendData}>
                  <defs>
                    <linearGradient id="fundingGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={fundingView === "amount" ? "#3b82f6" : "#10b981"}
                        stopOpacity={0.4}
                      />
                      <stop offset="95%" stopColor={fundingView === "amount" ? "#3b82f6" : "#10b981"} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={11}
                    fontWeight={600}
                    tickMargin={10}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} fontWeight={600} tickMargin={10} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                      fontWeight: 600,
                      padding: "12px",
                    }}
                    formatter={(value: number) =>
                      fundingView === "amount" ? `$${value.toFixed(2)}B` : `${value} rounds`
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey={fundingView === "amount" ? "amount" : "projects"}
                    stroke={fundingView === "amount" ? "#3b82f6" : "#10b981"}
                    strokeWidth={3}
                    fill="url(#fundingGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-12 gap-6 mb-6">
            {/* Top Funding Categories */}
            <Card className="col-span-7 border border-cyan/30 bg-gradient-to-br from-card to-cyan/5 p-8 shadow-[0_0_40px_-12px_rgba(192,252,248,0.2)]">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h4 className="text-2xl font-black tracking-tight mb-2">Top Funding Categories</h4>
                  <p className="text-sm text-muted-foreground font-medium">Leading sectors by investment</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={categoryView === "amount" ? "default" : "outline"}
                    onClick={() => setcategoryView("amount")}
                    className={
                      categoryView === "amount" ? "bg-cyan text-cyan-foreground font-bold text-xs" : "font-bold text-xs"
                    }
                  >
                    By Amount
                  </Button>
                  <Button
                    size="sm"
                    variant={categoryView === "count" ? "default" : "outline"}
                    onClick={() => setcategoryView("count")}
                    className={
                      categoryView === "count"
                        ? "bg-accent text-accent-foreground font-bold text-xs"
                        : "font-bold text-xs"
                    }
                  >
                    By Count
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                {topCategoriesData.slice(0, 6).map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold truncate pr-4">{item.category}</span>
                      <span className="text-sm font-black text-cyan whitespace-nowrap">
                        {categoryView === "amount" ? item.value : item.count}
                      </span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-muted/30 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan via-blue-400 to-blue-500 rounded-full shadow-[0_0_15px_-3px_rgba(192,252,248,0.6)]"
                        style={{
                          width: `${categoryView === "amount" ? (item.value / 100) * 100 : (item.count / 450) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Fundraising by Stage - Donut Chart */}
            <Card className="col-span-5 border border-accent/30 bg-card p-8">
              <div className="mb-6">
                <h4 className="text-2xl font-black tracking-tight mb-2">Fundraising by Stage</h4>
                <p className="text-sm text-muted-foreground font-medium">Distribution of funding rounds</p>
              </div>
              <div className="h-64 flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart>
                    <Pie
                      data={fundingStageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {fundingStageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        fontWeight: 600,
                      }}
                      formatter={(value: number) => `${value}%`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <p className="text-3xl font-black">10,347</p>
                    <p className="text-xs font-bold text-muted-foreground">Total</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {fundingStageData.slice(0, 6).map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-xs font-bold truncate">{item.name}</span>
                    <span className="text-xs font-black text-muted-foreground ml-auto">{item.value}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-12 gap-6 mb-6">
            {/* Monthly Fundraising by Category - Stacked Bar Chart */}
            <Card className="col-span-7 border border-accent/30 bg-gradient-to-br from-card to-accent/5 p-8 shadow-[0_0_40px_-12px_rgba(216,105,142,0.2)]">
              <div className="mb-6">
                <h4 className="text-2xl font-black tracking-tight mb-2">Monthly Fundraising by Category</h4>
                <p className="text-sm text-muted-foreground font-medium">5-year trend across all categories</p>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyFundraisingData}>
                    <XAxis
                      dataKey="month"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={10}
                      fontWeight={600}
                      tickMargin={8}
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} fontWeight={600} tickMargin={8} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        fontWeight: 600,
                      }}
                    />
                    <Area type="monotone" dataKey="infrastructure" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                    <Area type="monotone" dataKey="service" stackId="1" stroke="#06b6d4" fill="#06b6d4" />
                    <Area type="monotone" dataKey="cefi" stackId="1" stroke="#10b981" fill="#10b981" />
                    <Area type="monotone" dataKey="chain" stackId="1" stroke="#84cc16" fill="#84cc16" />
                    <Area type="monotone" dataKey="currency" stackId="1" stroke="#eab308" fill="#eab308" />
                    <Area type="monotone" dataKey="defi" stackId="1" stroke="#f97316" fill="#f97316" />
                    <Area type="monotone" dataKey="gamefi" stackId="1" stroke="#ec4899" fill="#ec4899" />
                    <Area type="monotone" dataKey="meme" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" />
                    <Area type="monotone" dataKey="nft" stackId="1" stroke="#14b8a6" fill="#14b8a6" />
                    <Area type="monotone" dataKey="social" stackId="1" stroke="#64748b" fill="#64748b" />
                    <Area type="monotone" dataKey="stablecoin" stackId="1" stroke="#475569" fill="#475569" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-6 gap-2">
                {[
                  { name: "Infrastructure", color: "#3b82f6" },
                  { name: "Service", color: "#06b6d4" },
                  { name: "CeFi", color: "#10b981" },
                  { name: "Chain", color: "#84cc16" },
                  { name: "DeFi", color: "#f97316" },
                  { name: "GameFi", color: "#ec4899" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-xs font-bold truncate">{item.name}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Fundraising Rounds by Size - Donut Chart */}
            <Card className="col-span-5 border border-cyan/30 bg-gradient-to-br from-card to-cyan/5 p-8 shadow-[0_0_40px_-12px_rgba(192,252,248,0.2)]">
              <div className="mb-6">
                <h4 className="text-2xl font-black tracking-tight mb-2">Fundraising Rounds by Size</h4>
                <p className="text-sm text-muted-foreground font-medium">All-time distribution</p>
              </div>
              <div className="h-64 flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart>
                    <Pie
                      data={fundingSizeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {fundingSizeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(--border))",
                        borderRadius: "8px",
                        fontWeight: 600,
                      }}
                      formatter={(value: number, name: string, props: any) =>
                        `${value} rounds ($${props.payload.amount}B)`
                      }
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <p className="text-3xl font-black">$167.27B</p>
                    <p className="text-xs font-bold text-muted-foreground">Total</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {fundingSizeData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-xs font-bold truncate">{item.name}</span>
                    <span className="text-xs font-black text-muted-foreground ml-auto">{item.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Top Investors */}
          <Card className="border border-accent/30 bg-gradient-to-br from-card to-accent/5 p-8 shadow-[0_0_40px_-12px_rgba(216,105,142,0.2)]">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h4 className="text-2xl font-black tracking-tight mb-2">Most Active Investors</h4>
                <p className="text-sm text-muted-foreground font-medium">
                  Top investment firms by deal count (2024-2025)
                </p>
              </div>
              <div className="rounded-xl bg-accent/20 p-3 border border-accent/30">
                <PieChart className="h-6 w-6 text-accent" />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-6">
              {topInvestorsData.map((investor, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-12 w-12 rounded-xl flex items-center justify-center font-black text-white text-xl flex-shrink-0"
                      style={{ backgroundColor: investor.color }}
                    >
                      {investor.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-muted-foreground truncate">{investor.name}</p>
                      <p className="text-2xl font-black tracking-tight">{investor.deals}</p>
                      <p className="text-xs font-medium text-muted-foreground">deals</p>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-muted-foreground">Lead</span>
                      <span className="font-bold">{investor.leadDeals}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted/30 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(investor.leadDeals / investor.deals) * 100}%`,
                          backgroundColor: investor.color,
                          boxShadow: `0 0 10px -2px ${investor.color}`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Market News Section */}
        <div>
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-5xl font-black tracking-tighter">
              MARKET <span className="text-accent drop-shadow-[0_0_30px_rgba(216,105,142,0.5)]">NEWS</span>
            </h3>
            <div className="flex gap-3">
              <Button
                variant={activeTab === "crypto" ? "default" : "outline"}
                onClick={() => setActiveTab("crypto")}
                className={
                  activeTab === "crypto"
                    ? "bg-accent text-accent-foreground hover:bg-accent/90 font-bold h-12 px-6 shadow-glow-accent"
                    : "font-bold h-12 px-6 border-2"
                }
              >
                Crypto News
              </Button>
              <Button
                variant={activeTab === "us" ? "default" : "outline"}
                onClick={() => setActiveTab("us")}
                className={
                  activeTab === "us"
                    ? "bg-cyan text-cyan-foreground hover:bg-cyan/90 font-bold h-12 px-6 shadow-glow-cyan"
                    : "font-bold h-12 px-6 border-2"
                }
              >
                US News
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {newsItems.map((item, index) => (
              <Card
                key={index}
                className="group cursor-pointer transition-all border-border hover:border-accent/50 hover:shadow-[0_8px_30px_-12px_rgba(216,105,142,0.3)] p-6 bg-card"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-accent/20 flex items-center justify-center font-black text-accent border border-accent/30">
                      {item.source.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{item.source}</p>
                      <p className="text-xs text-muted-foreground font-medium">{item.time}</p>
                    </div>
                  </div>
                  <Badge
                    variant={item.sentiment === "bullish" ? "default" : "secondary"}
                    className="text-xs font-bold uppercase"
                  >
                    {item.sentiment}
                  </Badge>
                </div>

                <h4 className="mb-3 text-lg font-black leading-tight group-hover:text-accent transition-colors">
                  {item.title}
                </h4>

                <p className="mb-4 text-sm text-muted-foreground line-clamp-2 leading-relaxed">{item.excerpt}</p>

                <div className="flex items-center gap-2 flex-wrap">
                  {item.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs font-bold">
                      {tag}
                    </Badge>
                  ))}
                  <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
