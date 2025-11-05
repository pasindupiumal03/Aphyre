"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  BarChart3,
  CheckCircle2,
  Copy,
  ExternalLink,
  Coins,
  MessageSquare,
  Globe,
  Wallet,
  Zap,
  TrendingDown,
  Sparkles,
  Crown,
  UsersIcon,
} from "lucide-react"
import { ResponsiveContainer, Area, AreaChart, XAxis, YAxis, Tooltip, Bar, BarChart } from "recharts"

const priceHistoryData = [
  { time: "00:00", price: 0.72 },
  { time: "04:00", price: 0.71 },
  { time: "08:00", price: 0.73 },
  { time: "12:00", price: 0.75 },
  { time: "16:00", price: 0.74 },
  { time: "20:00", price: 0.76 },
  { time: "24:00", price: 0.775628 },
]

const holderDistributionData = [
  { range: "Top 10", percentage: 38, holders: 10 },
  { range: "Top 25", percentage: 53, holders: 25 },
  { range: "Top 50", percentage: 64, holders: 50 },
  { range: "Top 100", percentage: 72, holders: 100 },
  { range: "Top 250", percentage: 84, holders: 250 },
  { range: "Top 500", percentage: 91, holders: 500 },
]

const topHolders = [
  { address: "Binance 8", balance: "69,000,000,000,000", usdValue: "$839,012,712.424", percentage: 16.4 },
  { address: "0x73af3b...54d935", balance: "16,656,419,987,900.578", usdValue: "$202,535,479.903", percentage: 3.96 },
  { address: "0x611f7b...dfb09d", balance: "14,057,560,895,267.36", usdValue: "$170,934,381.113", percentage: 3.34 },
  { address: "0x3f9a83...5699b8", balance: "12,291,725,480,921.756", usdValue: "$149,462,520.813", percentage: 2.92 },
  { address: "0xc93e48...0413b4", balance: "12,000,000,000,100", usdValue: "$145,915,254.336", percentage: 2.85 },
  { address: "Binance 28", balance: "10,513,613,563,978.818", usdValue: "$127,841,383.097", percentage: 2.5 },
]

const acquisitionData = [
  { method: "Swap", count: 123736, color: "#8b5cf6" },
  { method: "Transfer", count: 294107, color: "#3b82f6" },
  { method: "Airdrop", count: 16401, color: "#10b981" },
]

export default function TokenDetailPage({ params }: { params: { address: string } }) {
  const { address } = params

  const isSPX = address === "0xE0f63A424a4439cBE457D80E4f4b51aD25b2c56C"
  const tokenName = isSPX ? "SPX6900" : "Token"
  const tokenSymbol = isSPX ? "SPX" : "TOKEN"
  const tokenLogo = isSPX ? "🎯" : "🪙"

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
              className="w-full justify-start gap-3 h-12 text-base font-semibold hover:bg-secondary/30 text-foreground"
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
              className="w-full justify-start gap-3 h-12 text-base font-bold bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow-accent"
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
                <UsersIcon className="h-5 w-5" />
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
        {/* Back Button */}
        <Link href="/eth-tracker">
          <Button variant="outline" className="mb-8 gap-2 font-bold bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Back to ETH Tracker
          </Button>
        </Link>

        {/* Token Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-accent to-cyan flex items-center justify-center text-3xl">
                  {tokenLogo}
                </div>
                <div>
                  <h2 className="text-5xl font-black tracking-tighter">{tokenName}</h2>
                  <Badge variant="secondary" className="mt-2 font-bold text-base">
                    {tokenSymbol}
                  </Badge>
                </div>
              </div>

              {/* Enhanced Token Info Display */}
              <div className="grid grid-cols-4 gap-4 mt-8 mb-6">
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground font-bold uppercase mb-1">Current Price</p>
                  <p className="text-xl font-black text-accent">${isSPX ? "0.776" : "0.0000142"}</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground font-bold uppercase mb-1">24h Change</p>
                  <p className="text-xl font-black text-green-500">{isSPX ? "-0.15%" : "-2.35%"}</p>
                </div>
                <div className="bg-cyan/10 border border-cyan/20 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground font-bold uppercase mb-1">Market Cap</p>
                  <p className="text-xl font-black text-cyan">${isSPX ? "775.6M" : "5.98B"}</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground font-bold uppercase mb-1">24h Volume</p>
                  <p className="text-xl font-black text-purple-500">${isSPX ? "2.43M" : "1.24B"}</p>
                </div>
              </div>

              {/* Additional Info Row */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground font-bold uppercase mb-1">Total Holders</p>
                  <p className="text-lg font-black text-blue-500">434,244</p>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground font-bold uppercase mb-1">Holder Change (24h)</p>
                  <p className="text-lg font-black text-orange-500">+421</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <code className="text-sm font-mono text-muted-foreground bg-muted/30 px-3 py-1 rounded-lg">
                  {address}
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={() => navigator.clipboard.writeText(address)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0" asChild>
                  <a href={`https://etherscan.io/address/${address}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
            <div className="flex gap-3">
              <Badge className="bg-green-500/20 text-green-500 border-green-500/30 px-4 py-2 text-sm font-bold">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Verified
              </Badge>
              <Badge className="bg-accent/20 text-accent border-accent/30 px-4 py-2 text-sm font-bold">ERC-20</Badge>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-12 gap-6 mb-12">
          {/* Current Price - Large Featured */}
          <Card className="col-span-4 border border-accent/30 bg-gradient-to-br from-card via-card to-accent/5 p-8 shadow-[0_0_50px_-12px_rgba(216,105,142,0.3)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
            <div className="relative">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="mb-2 text-sm font-black uppercase tracking-widest text-muted-foreground">
                    Current Price
                  </p>
                  <h3 className="text-5xl font-black tracking-tighter">${isSPX ? "0.775628" : "0.0000142"}</h3>
                  <div className="flex items-center gap-2 mt-3">
                    <Badge variant="destructive" className="gap-1 px-3 py-1 text-sm font-bold">
                      <TrendingDown className="h-4 w-4" />
                      {isSPX ? "-0.15%" : "-2.35%"}
                    </Badge>
                    <span className="text-xs font-medium text-muted-foreground">24h</span>
                  </div>
                </div>
                <div className="rounded-2xl bg-accent/20 p-4 shadow-glow-accent">
                  <DollarSign className="h-7 w-7 text-accent" />
                </div>
              </div>
            </div>
          </Card>

          {/* Market Cap */}
          <Card className="col-span-4 border border-cyan/30 bg-gradient-to-br from-card to-cyan/5 p-8 shadow-[0_0_50px_-12px_rgba(192,252,248,0.3)]">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="mb-2 text-sm font-black uppercase tracking-widest text-muted-foreground">Market Cap</p>
                <h3 className="text-5xl font-black tracking-tighter">${isSPX ? "775.6M" : "5.98B"}</h3>
                <p className="text-sm font-medium text-muted-foreground mt-2">Rank #{isSPX ? "156" : "24"}</p>
              </div>
              <div className="rounded-2xl bg-cyan/20 p-4">
                <BarChart3 className="h-7 w-7 text-cyan" />
              </div>
            </div>
          </Card>

          {/* 24h Volume */}
          <Card className="col-span-4 p-8 border-border hover:border-accent/50 transition-all bg-card">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="mb-2 text-sm font-black uppercase tracking-widest text-muted-foreground">Volume (24h)</p>
                <h3 className="text-5xl font-black tracking-tighter">${isSPX ? "2.43M" : "1.24B"}</h3>
                <div className="flex items-center gap-2 mt-2 text-sm font-bold">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-green-500">+{isSPX ? "8.2" : "24.8"}%</span>
                </div>
              </div>
              <div className="rounded-xl bg-muted/30 p-3 border border-accent/30">
                <Activity className="h-6 w-6" />
              </div>
            </div>
          </Card>

          {/* Holder Count */}
          <Card className="col-span-3 p-8 border-border hover:border-cyan/50 transition-all bg-card">
            <div className="mb-4">
              <p className="mb-2 text-sm font-black uppercase tracking-widest text-muted-foreground">Total Holders</p>
              <h3 className="text-5xl font-black tracking-tighter">434,244</h3>
            </div>
            <div className="rounded-xl bg-cyan/20 p-3 w-fit border border-cyan/30">
              <Users className="h-6 w-6 text-cyan" />
            </div>
          </Card>

          {/* 24h Change */}
          <Card className="col-span-3 p-8 border-border hover:border-accent/50 transition-all bg-card">
            <div className="mb-4">
              <p className="mb-2 text-sm font-black uppercase tracking-widest text-muted-foreground">24h Change</p>
              <h3 className="text-5xl font-black tracking-tighter text-green-500">+421</h3>
              <p className="text-sm font-medium text-muted-foreground mt-1">holders (+0.097%)</p>
            </div>
          </Card>

          {/* AI Risk Analysis */}
          <Card className="col-span-6 border border-accent/30 bg-gradient-to-br from-card to-accent/5 p-8 shadow-[0_0_40px_-12px_rgba(216,105,142,0.2)]">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h4 className="text-2xl font-black tracking-tight mb-2">AI Risk Analysis</h4>
                <p className="text-sm text-muted-foreground font-medium">Automated security assessment</p>
              </div>
              <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30 px-4 py-2 text-lg font-black">
                63/100
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">Rug Pull Risk</span>
                  <span className="text-sm font-black text-yellow-500">39%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-muted/30 overflow-hidden">
                  <div className="h-full w-[39%] bg-yellow-500 rounded-full shadow-[0_0_15px_-3px_rgba(234,179,8,0.6)]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">Token Health</span>
                  <span className="text-sm font-black text-green-500">81%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-muted/30 overflow-hidden">
                  <div className="h-full w-[81%] bg-green-500 rounded-full shadow-[0_0_15px_-3px_rgba(34,197,94,0.6)]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">Community Trust</span>
                  <span className="text-sm font-black text-yellow-500">55%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-muted/30 overflow-hidden">
                  <div className="h-full w-[55%] bg-yellow-500 rounded-full shadow-[0_0_15px_-3px_rgba(234,179,8,0.6)]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">Liquidity Score</span>
                  <span className="text-sm font-black text-red-500">35%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-muted/30 overflow-hidden">
                  <div className="h-full w-[35%] bg-red-500 rounded-full shadow-[0_0_15px_-3px_rgba(239,68,68,0.6)]" />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Price Chart */}
        <Card className="mb-12 border border-accent/30 bg-gradient-to-br from-card to-accent/5 p-8 shadow-[0_0_40px_-12px_rgba(216,105,142,0.2)]">
          <div className="mb-6">
            <h4 className="text-2xl font-black tracking-tight mb-2">Price History (24h)</h4>
            <p className="text-sm text-muted-foreground font-medium">Real-time price movements</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceHistoryData}>
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} fontWeight={600} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} fontWeight={600} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    fontWeight: 600,
                  }}
                  formatter={(value: number) => `$${value.toFixed(6)}`}
                />
                <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={3} fill="url(#priceGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Token Distribution Analytics */}
        <div className="grid grid-cols-12 gap-6 mb-12">
          {/* Holder Distribution */}
          <Card className="col-span-7 border border-cyan/30 bg-gradient-to-br from-card to-cyan/5 p-8 shadow-[0_0_40px_-12px_rgba(192,252,248,0.2)]">
            <div className="mb-6">
              <h4 className="text-2xl font-black tracking-tight mb-2">Token Distribution Analytics</h4>
              <p className="text-sm text-muted-foreground font-medium">Holder concentration analysis</p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={holderDistributionData}>
                  <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" fontSize={12} fontWeight={600} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} fontWeight={600} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                      fontWeight: 600,
                    }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Bar dataKey="percentage" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Acquisition Breakdown */}
          <Card className="col-span-5 border border-accent/30 bg-card p-8">
            <div className="mb-6">
              <h4 className="text-2xl font-black tracking-tight mb-2">Acquisition Breakdown</h4>
              <p className="text-sm text-muted-foreground font-medium">How holders acquired tokens</p>
            </div>
            <div className="space-y-6">
              {acquisitionData.map((item, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${item.color}20`, border: `2px solid ${item.color}` }}
                      >
                        <div className="h-4 w-4 rounded-full" style={{ backgroundColor: item.color }} />
                      </div>
                      <span className="text-lg font-bold">{item.method}</span>
                    </div>
                    <span className="text-2xl font-black">{item.count.toLocaleString()}</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-muted/30 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(item.count / 434244) * 100}%`,
                        backgroundColor: item.color,
                        boxShadow: `0 0 15px -3px ${item.color}`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Top Token Holders */}
        <Card className="border border-accent/30 bg-card p-8">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h4 className="text-2xl font-black tracking-tight mb-2">Top Token Holders</h4>
              <p className="text-sm text-muted-foreground font-medium">Largest token holders by balance</p>
            </div>
            <div className="rounded-xl bg-accent/20 p-3 border border-accent/30">
              <Users className="h-6 w-6 text-accent" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-sm font-black uppercase tracking-widest text-muted-foreground">
                    Address
                  </th>
                  <th className="text-right py-4 px-4 text-sm font-black uppercase tracking-widest text-muted-foreground">
                    Balance
                  </th>
                  <th className="text-right py-4 px-4 text-sm font-black uppercase tracking-widest text-muted-foreground">
                    USD Value
                  </th>
                  <th className="text-right py-4 px-4 text-sm font-black uppercase tracking-widest text-muted-foreground">
                    % of Supply
                  </th>
                </tr>
              </thead>
              <tbody>
                {topHolders.map((holder, index) => (
                  <tr key={index} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-accent/20 flex items-center justify-center font-black text-accent border border-accent/30">
                          {holder.address.charAt(0)}
                        </div>
                        <code className="text-sm font-mono font-bold">{holder.address}</code>
                      </div>
                    </td>
                    <td className="text-right py-4 px-4 font-mono text-sm font-bold">{holder.balance}</td>
                    <td className="text-right py-4 px-4 font-mono text-sm font-bold text-green-500">
                      {holder.usdValue}
                    </td>
                    <td className="text-right py-4 px-4">
                      <div className="flex items-center justify-end gap-3">
                        <div className="w-24 h-2 rounded-full bg-muted/30 overflow-hidden">
                          <div
                            className="h-full bg-accent rounded-full shadow-[0_0_10px_-2px_rgba(216,105,142,0.6)]"
                            style={{ width: `${(holder.percentage / 16.4) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-black w-16">{holder.percentage}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  )
}
