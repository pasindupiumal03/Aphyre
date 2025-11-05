"use client"

import Link from "next/link"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { TrendingUp, BarChart3, Coins, Globe, MessageSquare, Wallet, Zap, Search } from "lucide-react"

const trendingTokens = [
  {
    name: "Coinbase Wrapped BTC",
    symbol: "CBBTC",
    price: "$107568.000844",
    change: "-0.03%",
    volume: "$26,387,514",
    icon: "🪙",
    color: "blue",
  },
  {
    name: "Aave Token",
    symbol: "AAVE",
    price: "$212.785136",
    change: "-0.05%",
    volume: "$10,735,471",
    icon: "👻",
    color: "purple",
  },
  {
    name: "ChainLink Token",
    symbol: "LINK",
    price: "$15.150938",
    change: "-0.08%",
    volume: "$8,384,119",
    icon: "🔗",
    color: "blue",
  },
  {
    name: "SPX6900",
    symbol: "SPX",
    price: "$0.775628",
    change: "-0.15%",
    volume: "$2,434,864",
    icon: "🎯",
    color: "yellow",
  },
]

export default function ETHTracker() {
  const [searchQuery, setSearchQuery] = useState("")

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
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-12 text-base font-semibold hover:bg-secondary/30 text-foreground"
          >
            <Globe className="h-5 w-5" />
            Solana Eco
          </Button>
          <Link href="/wallet-lookup">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 text-base font-semibold hover:bg-secondary/30 text-foreground"
            >
              <Wallet className="h-5 w-5" />
              Wallet Lookup
            </Button>
          </Link>
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
        <div className="mb-12">
          <h2 className="mb-4 text-7xl font-black tracking-tighter leading-none text-balance">
            ETHEREUM <span className="text-accent drop-shadow-[0_0_30px_rgba(216,105,142,0.5)]">TRACKER</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed text-pretty font-medium">
            Real-time Ethereum token analytics and market insights.
            <br />
            Track any ERC-20 token with comprehensive data.
          </p>
        </div>

        {/* Token Search */}
        <Card className="mb-12 p-8 border-accent/30 bg-gradient-to-br from-card to-accent/5 shadow-[0_0_40px_-12px_rgba(216,105,142,0.3)]">
          <h3 className="text-3xl font-black tracking-tighter mb-6">TOKEN SEARCH</h3>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Enter Ethereum token address (0x...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 pl-12 text-base font-medium bg-secondary/50 border-border"
              />
            </div>
            <Button className="h-14 px-8 bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base shadow-glow-accent">
              Search
            </Button>
          </div>
        </Card>

        {/* Trending Tokens */}
        <div>
          <h3 className="text-4xl font-black tracking-tighter mb-8">
            TRENDING ETH TOKENS <span className="text-cyan drop-shadow-[0_0_30px_rgba(192,252,248,0.5)]">(24H)</span>
          </h3>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {trendingTokens.map((token, index) => (
              <Link key={index} href={`/eth-tracker/${token.symbol.toLowerCase()}`}>
                <Card className="group cursor-pointer transition-all border-border hover:border-accent/50 hover:shadow-[0_8px_30px_-12px_rgba(216,105,142,0.3)] p-6 bg-card">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 h-20 w-20 rounded-full bg-gradient-to-br from-accent/20 to-cyan/20 flex items-center justify-center text-4xl border-2 border-accent/30">
                      {token.icon}
                    </div>
                    <h4 className="text-lg font-black mb-1 group-hover:text-accent transition-colors">{token.name}</h4>
                    <Badge variant="secondary" className="mb-4 font-bold">
                      {token.symbol}
                    </Badge>
                    <p className="text-2xl font-black text-accent mb-2">{token.price}</p>
                    <p className="text-sm font-bold text-destructive mb-3">{token.change}</p>
                    <p className="text-xs text-muted-foreground font-medium">Volume: {token.volume}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
