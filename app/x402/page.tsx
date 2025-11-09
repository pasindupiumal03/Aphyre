"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useRouter } from "next/navigation"
import {
  Shield,
  Zap,
  Globe,
  Coins,
  BarChart3,
  MessageSquare,
  TrendingUp,
  Wallet,
  Users,
  Crown,
  Sparkles,
  Send,
  Activity,
  ArrowRight,
  Code2,
  Layers,
  Bot,
  DollarSign,
} from "lucide-react"
import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"

export default function X402Page() {
  const { connected, publicKey } = useWallet()
  const { setVisible } = useWalletModal()
  const router = useRouter()

  // Check wallet connection on page load
  useEffect(() => {
    if (!connected) {
      // Redirect to home page if wallet not connected
      router.push('/')
    }
  }, [connected, router])

  // Show wallet connection prompt if not connected
  if (!connected) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 ml-0 lg:ml-72 p-6 lg:p-12">
          <div className="flex items-center justify-center h-full">
            <Card className="p-12 text-center border border-accent/30 bg-gradient-to-br from-card to-accent/5 shadow-[0_0_50px_-12px_rgba(216,105,142,0.3)]">
              <div className="h-20 w-20 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-6 border border-accent/30">
                <Wallet className="h-10 w-10 text-accent" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Wallet Required</h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                You need to connect your Phantom wallet to access X402 features. Please connect your wallet to continue.
              </p>
              <Button 
                onClick={() => setVisible(true)}
                className="h-12 px-8 bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-glow-accent"
              >
                <Zap className="h-5 w-5 mr-2" />
                Connect Phantom Wallet
              </Button>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi! I'm 147.402 Agent, your coding assistant powered by Aphyre.

I can help you with:
- Programming (any language)
- Code debugging
- API integrations  
- Blockchain development
- HTTP 402 payments on Solana and BSC
- And much more!

Ask me anything!`,
    },
  ])
  const [input, setInput] = useState("")

  const [activities, setActivities] = useState([
    { agent: "RiskManager_AI", amount: 0.0005, service: "portfolio analytics", time: "just now", isNew: true },
    { agent: "Agent_7x4k2", amount: 0.0001, service: "BTC whale signal", time: "2s ago", isNew: false },
    { agent: "MarketMaker_AI", amount: 0.00005, service: "orderbook snapshot", time: "5s ago", isNew: false },
    { agent: "ArbitrageBot_v2", amount: 0.0001, service: "ETH whale alert", time: "8s ago", isNew: false },
  ])

  const [stats, setStats] = useState({
    apiCalls: 1248267,
    whaleSignals: 4882,
    activeAgents: 141,
    earnedUSDC: 4.19,
  })

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // Update stats
      setStats((prev) => ({
        apiCalls: prev.apiCalls + Math.floor(Math.random() * 10),
        whaleSignals: prev.whaleSignals + (Math.random() > 0.7 ? 1 : 0),
        activeAgents: prev.activeAgents + (Math.random() > 0.5 ? 1 : -1),
        earnedUSDC: prev.earnedUSDC + Math.random() * 0.01,
      }))

      // Add new activity
      const agents = ["TradingBot_AI", "SentimentAnalyzer", "PriceOracle_v3", "LiquidityBot", "MEVGuard_AI"]
      const services = [
        "price feed",
        "sentiment analysis",
        "liquidity check",
        "MEV protection",
        "token analysis",
        "whale alert",
      ]
      const newActivity = {
        agent: agents[Math.floor(Math.random() * agents.length)],
        amount: Math.random() * 0.001,
        service: services[Math.floor(Math.random() * services.length)],
        time: "just now",
        isNew: true,
      }

      setActivities((prev) => {
        const updated = prev.map((a) => ({ ...a, isNew: false }))
        return [newActivity, ...updated.slice(0, 7)]
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleSend = () => {
    if (!input.trim()) return

    setMessages([...messages, { role: "user", content: input }])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm processing your request. This is a demo response. In production, I would provide detailed technical assistance based on your query.",
        },
      ])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-72">
        <div className="grid grid-cols-2 h-screen">
          {/* Left Side - x402 Info */}
          <div className="p-12 overflow-y-auto bg-gradient-to-br from-background via-background to-cyan/5">
            {/* Header */}
            <div className="mb-12">
              <Badge className="mb-6 bg-cyan/20 text-cyan border-cyan/30 px-6 py-2 text-sm font-bold">
                147.402 PROTOCOL
              </Badge>
              <h1 className="text-7xl font-black tracking-tighter mb-6 leading-none text-balance">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-blue-400 to-cyan">
                  x402
                </span>
                <br />
                Payment Layer
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed text-pretty font-medium max-w-2xl">
                The intelligent API that transforms blockchain data into actionable insights for AI agents. Pay per use
                with HTTP 402 protocol.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-12">
              <Card className="p-6 bg-gradient-to-br from-cyan/10 to-cyan/5 border-cyan/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-cyan" />
                    <p className="text-sm font-bold text-cyan">24H</p>
                  </div>
                </div>
                <p className="text-4xl font-black mb-1">{stats.apiCalls.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground font-medium">API calls today</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-green-500" />
                    <p className="text-sm font-bold text-green-500">LIVE</p>
                  </div>
                </div>
                <p className="text-4xl font-black mb-1">{stats.whaleSignals.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground font-medium">Whale signals detected</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-accent" />
                    <p className="text-sm font-bold text-accent">ACTIVE</p>
                  </div>
                </div>
                <p className="text-4xl font-black mb-1">{stats.activeAgents}</p>
                <p className="text-sm text-muted-foreground font-medium">Autonomous agents connected</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-cyan/10 to-cyan/5 border-cyan/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-cyan" />
                    <p className="text-sm font-bold text-cyan">USDC</p>
                  </div>
                </div>
                <p className="text-4xl font-black mb-1">${stats.earnedUSDC.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground font-medium">Earned via x402 (24h)</p>
              </Card>
            </div>

            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="h-6 w-6 text-cyan" />
                <h3 className="text-3xl font-black">Real-Time Activity Feed</h3>
              </div>
              <Card className="p-6 bg-gradient-to-br from-card to-cyan/5 border-cyan/30">
                <div className="space-y-3">
                  {activities.map((activity, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                        activity.isNew ? "bg-cyan/10 border-cyan/30 animate-pulse" : "bg-card/50 border-border/50"
                      }`}
                    >
                      <div className="h-10 w-10 rounded-lg bg-cyan/20 flex items-center justify-center border border-cyan/30 flex-shrink-0">
                        <Bot className="h-5 w-5 text-cyan" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">
                          {activity.agent} <span className="text-muted-foreground font-normal">paid</span>{" "}
                          <span className="text-cyan">${activity.amount.toFixed(4)}</span>{" "}
                          <span className="text-muted-foreground font-normal">for</span> {activity.service}
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                      {activity.isNew && (
                        <Badge className="bg-cyan/20 text-cyan border-cyan/30 text-xs font-bold">NEW</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-12">
              <Card className="p-6 bg-card/50 backdrop-blur border-cyan/30">
                <p className="text-sm font-bold text-muted-foreground mb-2">Networks</p>
                <p className="text-4xl font-black text-cyan">90+</p>
              </Card>
              <Card className="p-6 bg-card/50 backdrop-blur border-accent/30">
                <p className="text-sm font-bold text-muted-foreground mb-2">Tokens</p>
                <p className="text-4xl font-black text-accent">32M+</p>
              </Card>
              <Card className="p-6 bg-card/50 backdrop-blur border-border">
                <p className="text-sm font-bold text-muted-foreground mb-2">Cost/Request</p>
                <p className="text-4xl font-black">$0.0004</p>
              </Card>
            </div>

            {/* Features */}
            <div className="space-y-6 mb-12">
              <h3 className="text-3xl font-black mb-6">Core Capabilities</h3>

              <Card className="p-6 bg-gradient-to-br from-cyan/10 to-cyan/5 border-cyan/30">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-cyan/20 flex items-center justify-center border border-cyan/30 flex-shrink-0">
                    <Activity className="h-6 w-6 text-cyan" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black mb-2">Multi-Chain HTTP 402</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Same HTTP 402 protocol works across Solana (USDC/SOL) and BSC (USD1/BNB). Unified payment system
                      with different blockchain backends.
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Badge variant="outline" className="text-xs font-bold">
                        Solana
                      </Badge>
                      <Badge variant="outline" className="text-xs font-bold">
                        BSC
                      </Badge>
                      <Badge variant="outline" className="text-xs font-bold">
                        Multi-Chain
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center border border-accent/30 flex-shrink-0">
                    <Zap className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black mb-2">Lightning Fast</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Sub-second payment verification on Solana (~400ms), under 3s on BSC. Real-time WebSocket updates
                      for instant confirmation.
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Badge variant="outline" className="text-xs font-bold">
                        {"<400ms"}
                      </Badge>
                      <Badge variant="outline" className="text-xs font-bold">
                        WebSocket
                      </Badge>
                      <Badge variant="outline" className="text-xs font-bold">
                        Real-time
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur border-border">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center border border-border flex-shrink-0">
                    <Code2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black mb-2">Developer Friendly</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Simple REST API, SDK support, comprehensive documentation. Works with standard HTTP clients and
                      147.402 protocol libraries.
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Badge variant="outline" className="text-xs font-bold">
                        REST API
                      </Badge>
                      <Badge variant="outline" className="text-xs font-bold">
                        SDK
                      </Badge>
                      <Badge variant="outline" className="text-xs font-bold">
                        Docs
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-cyan/10 to-cyan/5 border-cyan/30">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-cyan/20 flex items-center justify-center border border-cyan/30 flex-shrink-0">
                    <Layers className="h-6 w-6 text-cyan" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black mb-2">Cross-Chain Payments</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Pay on one chain, use funds on another. Powered by Wormhole, LayerZero, and Stargate bridges.
                      Automatic routing optimization.
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Badge variant="outline" className="text-xs font-bold">
                        Wormhole
                      </Badge>
                      <Badge variant="outline" className="text-xs font-bold">
                        LayerZero
                      </Badge>
                      <Badge variant="outline" className="text-xs font-bold">
                        Bridge
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* How it Works */}
            <div className="mb-12">
              <h3 className="text-3xl font-black mb-6">How It Works</h3>
              <div className="space-y-4">
                {[
                  {
                    step: "1",
                    title: "API responds with HTTP 402",
                    desc: "Server returns payment-required status with instructions",
                  },
                  {
                    step: "2",
                    title: "Client sends payment",
                    desc: "Transaction on Solana or BSC with payment memo",
                  },
                  {
                    step: "3",
                    title: "Payment verified",
                    desc: "On-chain verification or custom observer confirms",
                  },
                  {
                    step: "4",
                    title: "API grants access",
                    desc: "Client retries request with payment proof headers",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-cyan text-cyan-foreground flex items-center justify-center font-black text-lg flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-lg font-black mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    {index < 3 && <ArrowRight className="h-5 w-5 text-muted-foreground mt-2" />}
                  </div>
                ))}
              </div>
            </div>

            {/* API Endpoints */}
            <div>
              <h3 className="text-3xl font-black mb-6">API Endpoints</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { method: "GET", endpoint: "/health", desc: "Service status" },
                  { method: "POST", endpoint: "/payment/request", desc: "Create payment" },
                  { method: "POST", endpoint: "/payment/verify", desc: "Verify transaction" },
                  { method: "GET", endpoint: "/payment/:id", desc: "Payment status" },
                  { method: "GET", endpoint: "/metrics", desc: "Service metrics" },
                  { method: "WS", endpoint: "/ws", desc: "Real-time updates" },
                ].map((item, index) => (
                  <Card
                    key={index}
                    className="p-4 bg-card/50 backdrop-blur border-border hover:border-cyan/50 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className="bg-cyan/20 text-cyan border-cyan/30 font-bold text-xs">{item.method}</Badge>
                      <code className="text-sm font-bold">{item.endpoint}</code>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - AI Chat */}
          <div className="flex flex-col h-screen border-l border-border bg-card/30 backdrop-blur">
            {/* Chat Header */}
            <div className="p-8 border-b border-border bg-gradient-to-r from-accent/10 to-cyan/10">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-accent to-cyan flex items-center justify-center shadow-glow-accent">
                  <MessageSquare className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black">147.402 Agent</h2>
                  <p className="text-sm text-muted-foreground font-medium">Your AI coding assistant</p>
                </div>
                <div className="ml-auto">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-bold text-green-500">Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {messages.map((message, index) => (
                <div key={index} className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  {message.role === "assistant" && (
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-accent to-cyan flex items-center justify-center flex-shrink-0 shadow-glow-accent">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <Card
                    className={`max-w-2xl p-4 ${
                      message.role === "user"
                        ? "bg-accent text-accent-foreground border-accent"
                        : "bg-card border-border"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">{message.content}</p>
                  </Card>
                  {message.role === "user" && (
                    <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-8 border-t border-border bg-card/50 backdrop-blur">
              <div className="flex gap-4">
                <Input
                  placeholder="Ask about HTTP 402, blockchain integration, or any coding question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 h-14 px-6 text-base border-2 focus:border-accent"
                />
                <Button
                  onClick={handleSend}
                  size="lg"
                  className="h-14 px-8 bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-glow-accent"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center font-medium">
                Powered by Aphyre AI • Ask me about HTTP 402 payments, blockchain development, and more
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}