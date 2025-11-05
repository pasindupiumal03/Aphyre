"use client"

import Link from "next/link"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  TrendingUp,
  BarChart3,
  Coins,
  Globe,
  MessageSquare,
  Wallet,
  Zap,
  Search,
  ThumbsUp,
  ThumbsDown,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const newsArticles = [
  {
    source: "Cointelegraph",
    time: "4m ago",
    title: "Zerohash lands MICA license amid $2B Mastercard acquisition rumors",
    excerpt:
      "The license positions Zerohash as one of the first MICA-approved stablecoin infrastructure firms, strengthening its appeal to institutions.",
    sentiment: "Neutral",
    image: "📰",
  },
  {
    source: "Cointelegraph",
    time: "26m ago",
    title: "Trump defends CZ pardon, says he 'doesn't know' Binance co-founder",
    excerpt:
      "Trump again denied ties to Binance co-founder CZ amid reports that the exchange helped facilitate a $2 billion stablecoin deal linked to his World Liberty Financial platform.",
    sentiment: "Positive",
    image: "📰",
  },
  {
    source: "CoinDesk",
    time: "30m ago",
    title: "Miners, Robinhood Earnings and Interest-Rate Decisions: Crypto Week Ahead",
    excerpt: "Your look at what's coming in the week starting Nov. 3.",
    sentiment: "Neutral",
    image: "📰",
  },
  {
    source: "Cointelegraph",
    time: "35m ago",
    title: "Balancer hit by suspected $70M exploit as staked Ether tokens sent to new wallet",
    excerpt:
      "The affected funds include 6,850 osETH, 6,590 WETH, and 4,260 wsETH, blockchain data analyzed by CoinDesk showed.",
    sentiment: "Neutral",
    image: "📰",
  },
]

export default function NewsSentiment() {
  const [activeFilter, setActiveFilter] = useState("crypto")

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
              className="w-full justify-start gap-3 h-12 text-base font-bold bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow-accent"
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
        <div className="mb-12 flex items-start justify-between">
          <div>
            <h2 className="mb-4 text-7xl font-black tracking-tighter leading-none text-balance">
              NEWS <span className="text-accent drop-shadow-[0_0_30px_rgba(216,105,142,0.5)]">SENTIMENT</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed text-pretty font-medium">
              Track market sentiment across crypto & US market news sources.
              <br />
              Real-time analysis for informed trading decisions.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search crypto news or..." className="h-10 pl-10 w-64 bg-secondary/50" />
            </div>
            <Button variant="outline" className="h-10 font-bold bg-transparent">
              All Sentiments
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8 flex gap-3">
          {["Crypto News", "US Markets", "BTC", "ETH", "SOL"].map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter.toLowerCase().replace(" ", "-") ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.toLowerCase().replace(" ", "-"))}
              className={
                activeFilter === filter.toLowerCase().replace(" ", "-")
                  ? "bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-glow-accent"
                  : "font-bold border-2"
              }
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Sentiment Stats */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <Card className="p-8 border-cyan/30 bg-gradient-to-br from-card to-cyan/5 shadow-[0_0_40px_-12px_rgba(192,252,248,0.3)]">
            <div className="flex items-center justify-between mb-4">
              <ThumbsUp className="h-12 w-12 text-cyan" />
              <div className="text-right">
                <p className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-1">
                  Positive Sentiment
                </p>
                <h3 className="text-5xl font-black tracking-tighter">27</h3>
              </div>
            </div>
          </Card>

          <Card className="p-8 border-destructive/30 bg-gradient-to-br from-card to-destructive/5 shadow-[0_0_40px_-12px_rgba(239,68,68,0.2)]">
            <div className="flex items-center justify-between mb-4">
              <ThumbsDown className="h-12 w-12 text-destructive" />
              <div className="text-right">
                <p className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-1">
                  Negative Sentiment
                </p>
                <h3 className="text-5xl font-black tracking-tighter">8</h3>
              </div>
            </div>
          </Card>

          <Card className="p-8 border-accent/30 bg-gradient-to-br from-card to-accent/5 shadow-[0_0_40px_-12px_rgba(216,105,142,0.3)]">
            <div className="flex items-center justify-between mb-4">
              <FileText className="h-12 w-12 text-accent" />
              <div className="text-right">
                <p className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-1">
                  Total Articles
                </p>
                <h3 className="text-5xl font-black tracking-tighter">100</h3>
              </div>
            </div>
          </Card>
        </div>

        {/* Latest News */}
        <div>
          <h3 className="text-4xl font-black tracking-tighter mb-8">
            LATEST <span className="text-cyan drop-shadow-[0_0_30px_rgba(192,252,248,0.5)]">CRYPTO NEWS</span>
          </h3>

          <div className="space-y-4 mb-8">
            {newsArticles.map((article, index) => (
              <Card
                key={index}
                className="group cursor-pointer transition-all border-border hover:border-accent/50 hover:shadow-[0_8px_30px_-12px_rgba(216,105,142,0.3)] p-6 bg-card"
              >
                <div className="flex items-start gap-6">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center text-2xl border border-accent/30">
                      {article.image}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="text-sm font-bold">{article.source}</p>
                        <span className="text-xs text-muted-foreground font-medium">{article.time}</span>
                      </div>
                      <h4 className="text-lg font-black leading-tight mb-2 group-hover:text-accent transition-colors">
                        {article.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{article.excerpt}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="font-bold">
                    {article.sentiment}
                  </Badge>
                  <div className="h-24 w-24 rounded-lg bg-gradient-to-br from-accent/20 to-cyan/20 border border-accent/30" />
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2">
            <Button variant="outline" size="icon" className="h-10 w-10 bg-transparent">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="text-sm font-bold text-muted-foreground px-4">Page 1 of 5</span>
            <Button variant="outline" size="icon" className="h-10 w-10 bg-transparent">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
