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
  Loader2,
  AlertCircle,
} from "lucide-react"
import { useWalletLookup } from "@/hooks/use-wallet-lookup"
import { useToast } from "@/hooks/use-toast"

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

export default function WalletLookup() {
  const [searchQuery, setSearchQuery] = useState("")
  const [copied, setCopied] = useState(false)
  const { walletSummary, isLoading, error, searchWallet, clearResults } = useWalletLookup()
  const { toast } = useToast()

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      await searchWallet(searchQuery.trim())
    }
  }

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    toast({
      id: `copy-${Date.now()}`,
      title: "Address copied!",
      description: "Wallet address has been copied to clipboard.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const formatBalance = (balance: number): string => {
    if (balance >= 1000000) {
      return `${(balance / 1000000).toFixed(2)}M`
    } else if (balance >= 1000) {
      return `${(balance / 1000).toFixed(2)}K`
    } else if (balance >= 1) {
      return balance.toFixed(2)
    } else {
      return balance.toFixed(6)
    }
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
                onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSearch()}
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={isLoading || !searchQuery.trim()}
              className="h-14 px-8 bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base shadow-glow-accent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <Search className="h-5 w-5 mr-2" />
              )}
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </div>

          {error && (
            <div className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <p className="text-red-500 font-medium">{error}</p>
            </div>
          )}
        </Card>

        {walletSummary && (
          <>
            {/* Wallet Summary */}
            <Card className="mb-12 p-10 border-accent/30 bg-gradient-to-br from-card to-accent/5">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black tracking-tighter mb-3">Wallet Details</h3>
                  <div className="flex items-center gap-3 mb-6">
                    <code className="text-sm font-mono font-medium text-muted-foreground bg-secondary/30 px-3 py-2 rounded-lg">
                      {walletSummary.address}
                    </code>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCopyAddress(walletSummary.address)}
                      className="h-10 w-10 hover:bg-secondary/50 hover:border-accent/50 bg-transparent"
                    >
                      {copied ? <CheckCircle2 className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button
                  className="h-12 px-6 bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-glow-accent"
                  onClick={() => window.open(`https://solscan.io/account/${walletSummary.address}`, "_blank")}
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  View on Solscan
                </Button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-6">
                <Card className="p-6 bg-secondary/20 border-accent/20">
                  <p className="text-muted-foreground text-sm font-semibold mb-2">Total Tokens</p>
                  <p className="text-3xl font-black tracking-tighter text-accent">{walletSummary.tokenCount}</p>
                </Card>
                <Card className="p-6 bg-secondary/20 border-accent/20">
                  <p className="text-muted-foreground text-sm font-semibold mb-2">SOL Balance</p>
                  <p className="text-3xl font-black tracking-tighter text-accent">{walletSummary.solBalance} SOL</p>
                </Card>
                <Card className="p-6 bg-secondary/20 border-accent/20">
                  <p className="text-muted-foreground text-sm font-semibold mb-2">Token Holdings</p>
                  <p className="text-3xl font-black tracking-tighter text-accent">{walletSummary.tokens.length}</p>
                </Card>
              </div>
            </Card>

            {/* SOL Balance */}
            {walletSummary.solBalance > 0 && (
              <Card className="mb-6 p-6 bg-card border-border hover:border-accent/50 hover:shadow-[0_8px_30px_-12px_rgba(216,105,142,0.3)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">S</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-lg">Solana</p>
                      <p className="text-sm text-muted-foreground font-medium">SOL</p>
                    </div>
                  </div>

                  <div className="text-right flex-1">
                    <p className="font-bold text-lg">{formatBalance(walletSummary.solBalance)}</p>
                    <p className="text-sm text-muted-foreground font-medium">SOL</p>
                  </div>

                  <div className="flex items-center gap-2 ml-6">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 hover:bg-secondary/50 hover:border-accent/50 bg-transparent"
                      onClick={() => handleCopyAddress("So11111111111111111111111111111111111111112")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Token Holdings */}
            {walletSummary.tokens.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <Coins className="h-6 w-6 text-accent" />
                  <h3 className="text-2xl font-black tracking-tighter">Token Holdings ({walletSummary.tokens.length})</h3>
                </div>

                <div className="space-y-4">
                  {walletSummary.tokens.map((token, index) => (
                    <Card
                      key={index}
                      className="group transition-all border-border hover:border-accent/50 hover:shadow-[0_8px_30px_-12px_rgba(216,105,142,0.3)] p-6 bg-card"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center overflow-hidden">
                            {token.logoURI ? (
                              <img 
                                src={token.logoURI} 
                                alt={token.symbol}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.style.display = 'none'
                                  const sibling = target.nextElementSibling as HTMLElement
                                  if (sibling) sibling.style.display = 'flex'
                                }}
                              />
                            ) : null}
                            <div 
                              className={`w-full h-full flex items-center justify-center text-sm font-bold ${token.logoURI ? 'hidden' : 'flex'}`}
                            >
                              {token.symbol.charAt(0)}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-lg truncate">{token.name}</p>
                            <p className="text-sm text-muted-foreground font-medium">{token.symbol}</p>
                          </div>
                        </div>

                        <div className="text-right flex-1">
                          <p className="font-bold text-lg">{formatBalance(token.balance)}</p>
                          <p className="text-sm text-muted-foreground font-medium">{token.symbol}</p>
                        </div>

                        <div className="flex items-center gap-2 ml-6">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 hover:bg-secondary/50 hover:border-accent/50 bg-transparent"
                            onClick={() => handleCopyAddress(token.mint)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 hover:bg-secondary/50 hover:border-accent/50 bg-transparent"
                            onClick={() => window.open(`https://solscan.io/token/${token.mint}`, "_blank")}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {walletSummary.tokens.length === 0 && walletSummary.solBalance === 0 && (
              <Card className="p-12 text-center bg-secondary/20 border-accent/20">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No Tokens Found</h3>
                <p className="text-muted-foreground">This wallet doesn't contain any tokens or SOL.</p>
              </Card>
            )}
          </>
        )}

        {/* Sample Wallets - shows when no search performed */}
        {!walletSummary && !isLoading && (
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
                        onClick={() => handleCopyAddress(wallet.address)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        className="h-10 px-6 bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-glow-accent"
                        onClick={() => {
                          setSearchQuery(wallet.address)
                          searchWallet(wallet.address)
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
