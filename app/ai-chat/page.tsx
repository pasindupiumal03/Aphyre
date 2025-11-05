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
  Send,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
} from "lucide-react"

const suggestedQuestions = [
  "What is the current price of Bitcoin?",
  "Show me the top gainers in the last 24 hours",
  "What are the latest market trends?",
  "What are the top cryptocurrencies by market cap?",
]

export default function AIChat() {
  const [message, setMessage] = useState("")

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
              className="w-full justify-start gap-3 h-12 text-base font-bold bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow-accent"
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
      <main className="ml-72 p-12 flex flex-col h-screen">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h2 className="mb-2 text-6xl font-black tracking-tighter leading-none">
              AI <span className="text-accent drop-shadow-[0_0_30px_rgba(216,105,142,0.5)]">TRADING</span>
            </h2>
            <p className="text-lg text-muted-foreground font-medium">
              Advanced AI assistant for crypto analysis and trading insights.
            </p>
          </div>
          <Badge className="bg-green-500/20 text-green-500 border-green-500/30 font-bold px-4 py-2">
            <div className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse" />
            AI Online
          </Badge>
        </div>

        {/* Chat Area */}
        <div className="flex-1 mb-8 overflow-y-auto">
          {/* AI Welcome Message */}
          <Card className="mb-6 p-6 border-accent/30 bg-gradient-to-br from-card to-accent/5 shadow-[0_0_40px_-12px_rgba(216,105,142,0.3)]">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent shadow-glow-accent flex-shrink-0">
                <Sparkles className="h-6 w-6 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <h4 className="text-sm font-black uppercase tracking-widest text-accent">APHYRE AI</h4>
                  <span className="text-xs text-muted-foreground font-medium">14:57</span>
                </div>
                <div className="space-y-3 text-sm leading-relaxed">
                  <p className="font-medium">
                    Welcome to Aphyre AI! 🚀
                    <br />
                    I'm your advanced crypto trading assistant. I can analyze tokens on both Solana and Ethereum
                    networks. Here's what I can do:
                  </p>
                  <ul className="space-y-2 font-medium">
                    <li>
                      <strong className="text-foreground">• Token Analysis:</strong> Send me any token address, name, or
                      symbol
                    </li>
                    <li>
                      <strong className="text-foreground">• Market Insights:</strong> Get real-time price data and
                      market trends
                    </li>
                    <li>
                      <strong className="text-foreground">• Risk Assessment:</strong> Understand potential risks and
                      opportunities
                    </li>
                    <li>
                      <strong className="text-foreground">• Trading Advice:</strong> Get personalized trading strategies
                    </li>
                  </ul>
                  <p className="font-medium">
                    Try sending me a token address like <code className="text-accent font-bold">PUMP</code> or{" "}
                    <code className="text-accent font-bold">0x...</code> to get started!
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-secondary/50">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-secondary/50">
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-secondary/50">
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Suggested Questions */}
          <div className="mb-6">
            <h3 className="text-2xl font-black tracking-tighter mb-4">Suggested Questions</h3>
            <div className="grid gap-3 md:grid-cols-2">
              {suggestedQuestions.map((question, index) => (
                <Card
                  key={index}
                  className="group cursor-pointer transition-all border-border hover:border-accent/50 hover:shadow-[0_8px_30px_-12px_rgba(216,105,142,0.3)] p-4 bg-card"
                >
                  <p className="text-sm font-bold group-hover:text-accent transition-colors flex items-start gap-2">
                    <span className="text-accent">•</span>
                    {question}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-border pt-6">
          <div className="flex gap-4">
            <Input
              placeholder="Ask about crypto analysis, market trends, or token insights..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="h-14 text-base font-medium bg-secondary/50 border-border"
            />
            <Button className="h-14 px-8 bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base shadow-glow-accent">
              <Send className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3 font-medium flex items-center gap-2">
            <Badge variant="secondary" className="font-bold text-xs">
              Connected
            </Badge>
            Aphyre AI may produce inaccurate information. Always verify important information. v2.1.0
          </p>
        </div>
      </main>
    </div>
  )
}
