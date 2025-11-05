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
  Copy,
  ExternalLink,
  CheckCircle2,
} from "lucide-react"

const sampleWallets = [
  {
    label: "Popular Trader",
    address: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
    badgeColor: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
  },
  {
    label: "DEX Trader",
    address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    badgeColor: "bg-green-500/20 text-green-500 border-green-500/30",
  },
  {
    label: "Token Holder",
    address: "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1",
    badgeColor: "bg-blue-500/20 text-blue-500 border-blue-500/30",
  },
]

const mockWalletDetails = {
  address: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
  totalValue: "$45,234.50",
  tokenCount: 12,
  solBalance: 125.5,
  tokens: [
    {
      icon: "🪙",
      name: "Solana",
      symbol: "SOL",
      balance: 125.5,
      value: "$18,825.00",
    },
    {
      icon: "🔮",
      name: "Marinade Staked SOL",
      symbol: "mSOL",
      balance: 85.3,
      value: "$12,796.50",
    },
    {
      icon: "📊",
      name: "Raydium",
      symbol: "RAY",
      balance: 2500,
      value: "$5,625.00",
    },
    {
      icon: "🚀",
      name: "Orca",
      symbol: "ORCA",
      balance: 180,
      value: "$3,240.00",
    },
    {
      icon: "🎪",
      name: "Magic Eden",
      symbol: "MAGIC",
      balance: 450,
      value: "$2,250.00",
    },
    {
      icon: "🏺",
      name: "Atlas",
      symbol: "ATLAS",
      balance: 5000,
      value: "$2,500.00",
    },
  ],
}

export default function WalletLookup() {
  const [searchQuery, setSearchQuery] = useState("")
  const [walletDetails, setWalletDetails] = useState<typeof mockWalletDetails | null>(null)
  const [copied, setCopied] = useState(false)

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setWalletDetails(mockWalletDetails)
    }
  }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletDetails?.address || "")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
              className="w-full justify-start gap-3 h-12 text-base font-semibold hover:bg-secondary/30 text-foreground"
            >
              <Globe className="h-5 w-5" />
              Solana Tracker
            </Button>
          </Link>
          <Link href="/wallet-lookup">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow-accent"
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
            WALLET <span className="text-accent drop-shadow-[0_0_30px_rgba(216,105,142,0.5)]">LOOKUP</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed text-pretty font-medium">
            Search and analyze any Solana wallet address.
            <br />
            View token holdings, balances, and portfolio insights with real-time data.
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-12 p-10 border-accent/30 bg-gradient-to-br from-card to-accent/5 shadow-[0_0_40px_-12px_rgba(216,105,142,0.3)]">
          <div className="flex items-center gap-4 mb-8">
            <div className="rounded-2xl bg-accent/20 p-4 border border-accent/30">
              <Search className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-3xl font-black tracking-tighter">Search Any Wallet</h3>
          </div>

          <div className="flex gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="Enter Solana wallet address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 text-base font-medium bg-secondary/50 border-border"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button
              onClick={handleSearch}
              className="h-14 px-8 bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base shadow-glow-accent"
            >
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>
        </Card>

        {walletDetails && (
          <>
            {/* Wallet Summary */}
            <Card className="mb-12 p-10 border-accent/30 bg-gradient-to-br from-card to-accent/5">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black tracking-tighter mb-3">Wallet Details</h3>
                  <div className="flex items-center gap-3 mb-6">
                    <code className="text-sm font-mono font-medium text-muted-foreground bg-secondary/30 px-3 py-2 rounded-lg">
                      {walletDetails.address}
                    </code>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleCopyAddress}
                      className="h-10 w-10 hover:bg-secondary/50 hover:border-accent/50 bg-transparent"
                    >
                      {copied ? <CheckCircle2 className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button
                  className="h-12 px-6 bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-glow-accent"
                  onClick={() => window.open(`https://solscan.io/account/${walletDetails.address}`, "_blank")}
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  View on Solscan
                </Button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-6">
                <Card className="p-6 bg-secondary/20 border-accent/20">
                  <p className="text-muted-foreground text-sm font-semibold mb-2">Total Value</p>
                  <p className="text-3xl font-black tracking-tighter text-accent">{walletDetails.totalValue}</p>
                </Card>
                <Card className="p-6 bg-secondary/20 border-accent/20">
                  <p className="text-muted-foreground text-sm font-semibold mb-2">Token Count</p>
                  <p className="text-3xl font-black tracking-tighter text-accent">{walletDetails.tokenCount}</p>
                </Card>
                <Card className="p-6 bg-secondary/20 border-accent/20">
                  <p className="text-muted-foreground text-sm font-semibold mb-2">SOL Balance</p>
                  <p className="text-3xl font-black tracking-tighter text-accent">{walletDetails.solBalance} SOL</p>
                </Card>
              </div>
            </Card>

            {/* Token Holdings */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Coins className="h-6 w-6 text-accent" />
                <h3 className="text-2xl font-black tracking-tighter">Token Holdings</h3>
              </div>

              <div className="space-y-4">
                {walletDetails.tokens.map((token, index) => (
                  <Card
                    key={index}
                    className="group transition-all border-border hover:border-accent/50 hover:shadow-[0_8px_30px_-12px_rgba(216,105,142,0.3)] p-6 bg-card"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="text-3xl">{token.icon}</div>
                        <div className="flex-1">
                          <p className="font-bold text-lg">{token.name}</p>
                          <p className="text-sm text-muted-foreground font-medium">{token.symbol}</p>
                        </div>
                      </div>

                      <div className="text-right flex-1">
                        <p className="font-bold text-lg">{token.balance.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground font-medium">{token.value}</p>
                      </div>

                      <div className="flex items-center gap-2 ml-6">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-10 w-10 hover:bg-secondary/50 hover:border-accent/50 bg-transparent"
                          onClick={() => {
                            navigator.clipboard.writeText(token.symbol)
                          }}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Sample Wallets - shows when no search performed */}
        {!walletDetails && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Zap className="h-6 w-6 text-accent" />
              <h3 className="text-2xl font-black tracking-tighter">Try these sample wallets:</h3>
            </div>

            <div className="space-y-4">
              {sampleWallets.map((wallet, index) => (
                <Card
                  key={index}
                  className="group cursor-pointer transition-all border-border hover:border-accent/50 hover:shadow-[0_8px_30px_-12px_rgba(216,105,142,0.3)] p-6 bg-card"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <Badge className={`font-bold px-4 py-2 ${wallet.badgeColor}`}>{wallet.label}</Badge>
                      <code className="text-sm font-mono font-medium text-muted-foreground">{wallet.address}</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 hover:bg-secondary/50 hover:border-accent/50 bg-transparent"
                        onClick={() => navigator.clipboard.writeText(wallet.address)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        className="h-10 px-6 bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-glow-accent"
                        onClick={() => {
                          setSearchQuery(wallet.address)
                          setWalletDetails(mockWalletDetails)
                        }}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
