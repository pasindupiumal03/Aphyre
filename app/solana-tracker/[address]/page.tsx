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
  Zap,
  Coins,
  Globe,
  MessageSquare,
  Wallet,
  Sparkles,
  Crown,
  UsersIcon,
} from "lucide-react"
import { ResponsiveContainer, Area, AreaChart, XAxis, YAxis, Tooltip, Bar, BarChart } from "recharts"

// Mock Solana token data
const priceHistoryData = [
  { time: "00:00", price: 0.00245 },
  { time: "04:00", price: 0.00238 },
  { time: "08:00", price: 0.00252 },
  { time: "12:00", price: 0.00268 },
  { time: "16:00", price: 0.00261 },
  { time: "20:00", price: 0.00275 },
  { time: "24:00", price: 0.00289 },
]

const holderDistributionData = [
  { range: "Top 10", percentage: 42, holders: 10 },
  { range: "Top 25", percentage: 58, holders: 25 },
  { range: "Top 50", percentage: 69, holders: 50 },
  { range: "Top 100", percentage: 78, holders: 100 },
  { range: "Top 250", percentage: 88, holders: 250 },
  { range: "Top 500", percentage: 94, holders: 500 },
]

const topHolders = [
  { address: "Raydium Pool", balance: "125,000,000", usdValue: "$361,250.00", percentage: 12.5 },
  { address: "7xKXtg...9kLmP2", balance: "98,500,000", usdValue: "$284,565.00", percentage: 9.85 },
  { address: "DYw8jC...3nRtQ5", balance: "76,200,000", usdValue: "$220,178.00", percentage: 7.62 },
  { address: "9vKpXL...8mWsT1", balance: "65,800,000", usdValue: "$190,042.00", percentage: 6.58 },
  { address: "4hNqPr...2vBnK9", balance: "52,300,000", usdValue: "$151,145.00", percentage: 5.23 },
  { address: "Jupiter Aggregator", balance: "48,900,000", usdValue: "$141,285.00", percentage: 4.89 },
]

const acquisitionData = [
  { method: "Swap", count: 45892, color: "#14f195" },
  { method: "Transfer", count: 128456, color: "#9945ff" },
  { method: "Airdrop", count: 8234, color: "#00d4ff" },
]

export default function SolanaTokenDetailPage({ params }: { params: { address: string } }) {
  const { address } = params

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
              className="w-full justify-start gap-3 h-12 text-base font-semibold hover:bg-secondary/30 text-foreground"
            >
              <Coins className="h-5 w-5" />
              ETH Tracker
            </Button>
          </Link>
          <Link href="/solana-tracker">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 text-base font-bold bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow-accent"
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
        <Link href="/solana-tracker">
          <Button variant="outline" className="mb-8 gap-2 font-bold bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Back to Solana Tracker
          </Button>
        </Link>

        {/* Token Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#14f195] via-[#9945ff] to-[#00d4ff] flex items-center justify-center text-3xl">
                  🐕
                </div>
                <div>
                  <h2 className="text-5xl font-black tracking-tighter">BONK</h2>
                  <Badge variant="secondary" className="mt-2 font-bold text-base">
                    BONK
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Badge className="bg-green-500/20 text-green-500 border-green-500/30 px-4 py-2 text-sm font-bold">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Verified
              </Badge>
              <Badge className="bg-[#9945ff]/20 text-[#9945ff] border-[#9945ff]/30 px-4 py-2 text-sm font-bold">
                SPL Token
              </Badge>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-12 gap-6 mb-12">
          {/* Current Price - Large Featured */}
          <Card className="col-span-4 border border-[#14f195]/30 bg-gradient-to-br from-card via-card to-[#14f195]/5 p-8 shadow-[0_0_50px_-12px_rgba(20,241,149,0.3)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#14f195]/10 rounded-full blur-3xl" />
            <div className="relative">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="mb-2 text-sm font-black uppercase tracking-widest text-muted-foreground">
                    Current Price
                  </p>
                  <h3 className="text-5xl font-black tracking-tighter">$0.00289</h3>
                  <div className="flex items-center gap-2 mt-3">
                    <Badge variant="default" className="gap-1 px-3 py-1 text-sm font-bold bg-green-500">
                      <TrendingUp className="h-4 w-4" />
                      +18.03%
                    </Badge>
                    <span className="text-xs font-medium text-muted-foreground">24h</span>
                  </div>
                </div>
                <div className="rounded-2xl bg-[#14f195]/20 p-4 shadow-[0_0_20px_-5px_rgba(20,241,149,0.4)]">
                  <DollarSign className="h-7 w-7 text-[#14f195]" />
                </div>
              </div>
            </div>
          </Card>

          {/* Market Cap */}
          <Card className="col-span-4 border border-[#9945ff]/30 bg-gradient-to-br from-card to-[#9945ff]/5 p-8 shadow-[0_0_50px_-12px_rgba(153,69,255,0.3)]">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="mb-2 text-sm font-black uppercase tracking-widest text-muted-foreground">Market Cap</p>
                <h3 className="text-5xl font-black tracking-tighter">$2.89B</h3>
                <p className="text-sm font-medium text-muted-foreground mt-2">Rank #48</p>
              </div>
              <div className="rounded-2xl bg-[#9945ff]/20 p-4">
                <BarChart3 className="h-7 w-7 text-[#9945ff]" />
              </div>
            </div>
          </Card>

          {/* 24h Volume */}
          <Card className="col-span-4 p-8 border-border hover:border-[#14f195]/50 transition-all bg-card">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="mb-2 text-sm font-black uppercase tracking-widest text-muted-foreground">Volume (24h)</p>
                <h3 className="text-5xl font-black tracking-tighter">$456M</h3>
                <div className="flex items-center gap-2 mt-2 text-sm font-bold">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-green-500">+32.1%</span>
                </div>
              </div>
              <div className="rounded-xl bg-muted/30 p-3 border border-[#14f195]/30">
                <Activity className="h-6 w-6" />
              </div>
            </div>
          </Card>

          {/* Holder Count */}
          <Card className="col-span-3 p-8 border-border hover:border-[#9945ff]/50 transition-all bg-card">
            <div className="mb-4">
              <p className="mb-2 text-sm font-black uppercase tracking-widest text-muted-foreground">Total Holders</p>
              <h3 className="text-5xl font-black tracking-tighter">182,582</h3>
            </div>
            <div className="rounded-xl bg-[#9945ff]/20 p-3 w-fit border border-[#9945ff]/30">
              <Users className="h-6 w-6 text-[#9945ff]" />
            </div>
          </Card>

          {/* 24h Change */}
          <Card className="col-span-3 p-8 border-border hover:border-[#14f195]/50 transition-all bg-card">
            <div className="mb-4">
              <p className="mb-2 text-sm font-black uppercase tracking-widest text-muted-foreground">24h Change</p>
              <h3 className="text-5xl font-black tracking-tighter text-green-500">+1,245</h3>
              <p className="text-sm font-medium text-muted-foreground mt-1">holders (+0.68%)</p>
            </div>
          </Card>

          {/* AI Risk Analysis */}
          <Card className="col-span-6 border border-[#14f195]/30 bg-gradient-to-br from-card to-[#14f195]/5 p-8 shadow-[0_0_40px_-12px_rgba(20,241,149,0.2)]">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h4 className="text-2xl font-black tracking-tight mb-2">AI Risk Analysis</h4>
                <p className="text-sm text-muted-foreground font-medium">Automated security assessment</p>
              </div>
              <Badge className="bg-green-500/20 text-green-500 border-green-500/30 px-4 py-2 text-lg font-black">
                78/100
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">Rug Pull Risk</span>
                  <span className="text-sm font-black text-green-500">22%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-muted/30 overflow-hidden">
                  <div className="h-full w-[22%] bg-green-500 rounded-full shadow-[0_0_15px_-3px_rgba(34,197,94,0.6)]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">Token Health</span>
                  <span className="text-sm font-black text-green-500">92%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-muted/30 overflow-hidden">
                  <div className="h-full w-[92%] bg-green-500 rounded-full shadow-[0_0_15px_-3px_rgba(34,197,94,0.6)]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">Community Trust</span>
                  <span className="text-sm font-black text-green-500">85%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-muted/30 overflow-hidden">
                  <div className="h-full w-[85%] bg-green-500 rounded-full shadow-[0_0_15px_-3px_rgba(34,197,94,0.6)]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">Liquidity Score</span>
                  <span className="text-sm font-black text-yellow-500">68%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-muted/30 overflow-hidden">
                  <div className="h-full w-[68%] bg-yellow-500 rounded-full shadow-[0_0_15px_-3px_rgba(234,179,8,0.6)]" />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Price Chart */}
        <Card className="mb-12 border border-[#9945ff]/30 bg-gradient-to-br from-card to-[#9945ff]/5 p-8 shadow-[0_0_40px_-12px_rgba(153,69,255,0.2)]">
          <div className="mb-6">
            <h4 className="text-2xl font-black tracking-tight mb-2">Price History (24h)</h4>
            <p className="text-sm text-muted-foreground font-medium">Real-time price movements</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceHistoryData}>
                <defs>
                  <linearGradient id="solPriceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14f195" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#14f195" stopOpacity={0} />
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
                  formatter={(value: number) => `$${value.toFixed(5)}`}
                />
                <Area type="monotone" dataKey="price" stroke="#14f195" strokeWidth={3} fill="url(#solPriceGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Token Distribution Analytics */}
        <div className="grid grid-cols-12 gap-6 mb-12">
          {/* Holder Distribution */}
          <Card className="col-span-7 border border-[#9945ff]/30 bg-gradient-to-br from-card to-[#9945ff]/5 p-8 shadow-[0_0_40px_-12px_rgba(153,69,255,0.2)]">
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
                  <Bar dataKey="percentage" fill="url(#solBarGradient)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="solBarGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#9945ff" />
                      <stop offset="100%" stopColor="#14f195" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Acquisition Breakdown */}
          <Card className="col-span-5 border border-[#14f195]/30 bg-card p-8">
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
                        width: `${(item.count / 182582) * 100}%`,
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
        <Card className="border border-[#14f195]/30 bg-card p-8">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h4 className="text-2xl font-black tracking-tight mb-2">Top Token Holders</h4>
              <p className="text-sm text-muted-foreground font-medium">Largest token holders on Solana</p>
            </div>
            <div className="rounded-xl bg-[#14f195]/20 p-3 border border-[#14f195]/30">
              <Users className="h-6 w-6 text-[#14f195]" />
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
                        <div className="h-10 w-10 rounded-xl bg-[#9945ff]/20 flex items-center justify-center font-black text-[#9945ff] border border-[#9945ff]/30">
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
                            className="h-full bg-[#14f195] rounded-full shadow-[0_0_10px_-2px_rgba(20,241,149,0.6)]"
                            style={{ width: `${(holder.percentage / 12.5) * 100}%` }}
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
