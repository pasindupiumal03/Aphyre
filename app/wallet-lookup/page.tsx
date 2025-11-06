"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
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
  AlertTriangle,
  RefreshCcw,
  User,
} from "lucide-react"
import { useWalletData } from "@/hooks/use-wallet-data"
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
  const [currentWallet, setCurrentWallet] = useState<string | null>(null)
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  // Use the wallet data hook
  const { walletSummary, isLoading, error: apiError, refetch } = useWalletData(currentWallet || undefined)

  // Check for connected Phantom wallet
  useEffect(() => {
    const checkWallet = async () => {
      try {
        const { solana } = window as any
        if (solana && solana.isPhantom) {
          const response = await solana.connect({ onlyIfTrusted: true })
          if (response.publicKey) {
            setConnectedWallet(response.publicKey.toString())
          }
        }
      } catch (error) {
        console.log('No wallet connected')
      }
    }
    checkWallet()
  }, [])

  // Validate Solana address format
  const validateSolanaAddress = (addr: string): boolean => {
    const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/
    return base58Regex.test(addr)
  }

  // Handle wallet search
  const handleSearch = async (address?: string) => {
    const addressToSearch = address || searchQuery
    setError('')

    if (!addressToSearch.trim()) {
      setError('Please enter a wallet address')
      return
    }

    if (!validateSolanaAddress(addressToSearch.trim())) {
      setError('Invalid Solana wallet address format')
      return
    }

    setCurrentWallet(addressToSearch.trim())
  }

  // Handle connected wallet view
  const handleConnectedWallet = () => {
    if (connectedWallet) {
      handleSearch(connectedWallet)
      setSearchQuery(connectedWallet)
    }
  }

  // Connect to Phantom wallet
  const connectPhantom = async () => {
    try {
      const { solana } = window as any
      if (solana && solana.isPhantom) {
        const response = await solana.connect()
        if (response.publicKey) {
          setConnectedWallet(response.publicKey.toString())
          toast({
            id: `wallet-connected-${Date.now()}`,
            title: "Wallet Connected",
            description: "Successfully connected to Phantom wallet",
          })
        }
      } else {
        toast({
          id: `phantom-not-found-${Date.now()}`,
          title: "Phantom Not Found",
          description: "Please install Phantom wallet extension",
          variant: "destructive",
        })
      }
    } catch (err) {
      toast({
        id: `connection-failed-${Date.now()}`,
        title: "Connection Failed",
        description: "Failed to connect to Phantom wallet",
        variant: "destructive",
      })
    }
  }

  // Copy address to clipboard
  const handleCopyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({
        id: `address-copied-${Date.now()}`,
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      })
    } catch (err) {
      toast({
        id: `copy-failed-${Date.now()}`,
        title: "Copy Failed",
        description: "Failed to copy address to clipboard",
        variant: "destructive",
      })
    }
  }

  // Format address for display
  const formatAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-8)}`
  }

  // Format currency values
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
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
          <Button 
            onClick={connectPhantom}
            className="w-full h-12 bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base shadow-glow-accent"
          >
            <Zap className="h-5 w-5 mr-2" />
            {connectedWallet ? 'Connected' : 'Connect Phantom'}
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

        {/* Connected Wallet Section */}
        {connectedWallet && (
          <Card className="mb-12 p-8 border-accent/30 bg-gradient-to-br from-card to-accent/5 shadow-[0_0_40px_-12px_rgba(216,105,142,0.3)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-accent/20 p-4 border border-accent/30">
                  <User className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tighter mb-2">My Connected Wallet</h3>
                  <code className="text-sm font-mono font-medium text-muted-foreground bg-secondary/30 px-3 py-2 rounded-lg">
                    {formatAddress(connectedWallet)}
                  </code>
                </div>
              </div>
              <Button
                onClick={handleConnectedWallet}
                disabled={isLoading}
                className="h-12 px-6 bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-glow-accent"
              >
                <Search className="h-5 w-5 mr-2" />
                View My Wallet
              </Button>
            </div>
          </Card>
        )}

        {/* Search Section */}
        <Card className="mb-12 p-10 border-accent/30 bg-gradient-to-br from-card to-accent/5 shadow-[0_0_40px_-12px_rgba(216,105,142,0.3)]">
          <div className="flex items-center gap-4 mb-8">
            <div className="rounded-2xl bg-accent/20 p-4 border border-accent/30">
              <Search className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-3xl font-black tracking-tighter">Search Any Wallet</h3>
          </div>

          <div className="flex gap-4 mb-6">
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
              onClick={() => handleSearch()}
              disabled={isLoading}
              className="h-14 px-8 bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base shadow-glow-accent"
            >
              <Search className="h-5 w-5 mr-2" />
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </div>

          {/* Error Display */}
          {(error || apiError) && (
            <div className="mb-6 p-4 bg-destructive/20 border border-destructive/30 rounded-lg flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <span className="text-destructive font-medium">{error || apiError}</span>
            </div>
          )}

          {/* Sample Wallets */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Zap className="h-5 w-5 text-accent" />
              <h4 className="text-lg font-black tracking-tighter">Try these sample wallets:</h4>
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
                      <code className="text-sm font-mono font-medium text-muted-foreground">{formatAddress(wallet.address)}</code>
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
                          handleSearch(wallet.address)
                        }}
                        disabled={isLoading}
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
        </Card>

        {/* Loading State */}
        {isLoading && (
          <Card className="mb-12 p-12 text-center border-accent/30 bg-gradient-to-br from-card to-accent/5">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin w-8 h-8 border-4 border-accent/30 border-t-accent rounded-full"></div>
              <p className="text-muted-foreground font-medium">Analyzing wallet address...</p>
            </div>
          </Card>
        )}

        {/* Wallet Data */}
        {currentWallet && walletSummary && !isLoading && (
          <div className="space-y-8">
            {/* Wallet Summary */}
            <Card className="mb-12 p-10 border-accent/30 bg-gradient-to-br from-card to-accent/5">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black tracking-tighter mb-3">Wallet Details</h3>
                  <div className="flex items-center gap-3 mb-6">
                    <code className="text-sm font-mono font-medium text-muted-foreground bg-secondary/30 px-3 py-2 rounded-lg">
                      {currentWallet}
                    </code>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCopyAddress(currentWallet)}
                      className="h-10 w-10 hover:bg-secondary/50 hover:border-accent/50 bg-transparent"
                    >
                      {copied ? <CheckCircle2 className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={refetch}
                    disabled={isLoading}
                    className="h-12 px-6 hover:bg-secondary/50 hover:border-accent/50"
                  >
                    <RefreshCcw className="h-5 w-5 mr-2" />
                    Refresh
                  </Button>
                  <Button
                    className="h-12 px-6 bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-glow-accent"
                    onClick={() => window.open(`https://solscan.io/account/${currentWallet}`, "_blank")}
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    View on Solscan
                  </Button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-6">
                <Card className="p-6 bg-secondary/20 border-accent/20">
                  <p className="text-muted-foreground text-sm font-semibold mb-2">Total Value</p>
                  <p className="text-3xl font-black tracking-tighter text-accent">{formatCurrency(walletSummary.totalValue)}</p>
                </Card>
                <Card className="p-6 bg-secondary/20 border-accent/20">
                  <p className="text-muted-foreground text-sm font-semibold mb-2">Token Count</p>
                  <p className="text-3xl font-black tracking-tighter text-accent">{walletSummary.tokenCount}</p>
                </Card>
                <Card className="p-6 bg-secondary/20 border-accent/20">
                  <p className="text-muted-foreground text-sm font-semibold mb-2">SOL Balance</p>
                  <p className="text-3xl font-black tracking-tighter text-accent">{walletSummary.solBalance.toFixed(4)} SOL</p>
                </Card>
              </div>
            </Card>

            {/* Simple message about wallet analysis */}
            <Card className="p-12 text-center border-accent/30 bg-gradient-to-br from-card to-accent/5">
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 rounded-full bg-accent/20 border border-accent/30">
                  <CheckCircle2 className="w-12 h-12 text-accent" />
                </div>
                <h3 className="text-2xl font-black tracking-tighter">Wallet Analysis Complete</h3>
                <p className="text-muted-foreground font-medium">
                  This wallet contains {walletSummary.tokenCount} tokens with a total value of {formatCurrency(walletSummary.totalValue)}.
                  <br />
                  SOL Balance: {walletSummary.solBalance.toFixed(4)} SOL
                </p>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}