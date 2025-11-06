"use client"

import Link from "next/link"
import { use } from "react"
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
  Loader2,
  AlertCircle,
} from "lucide-react"
import { ResponsiveContainer, Bar, BarChart, XAxis, YAxis, Tooltip } from "recharts"
import { useTokenDetails } from "@/hooks/use-token-details"

export default function TokenDetailPage({ params }: { params: Promise<{ address: string }> }) {
  const { address } = use(params)
  const { tokenData, isLoading, error } = useTokenDetails(address)

  // Debug log to see what data we're receiving
  console.log('Frontend tokenData:', {
    holderDistribution: tokenData?.holderDistribution,
    topHolders: tokenData?.topHolders,
    acquisitionBreakdown: tokenData?.acquisitionBreakdown,
    fullTokenData: tokenData
  });

  // Function to copy token address to clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here if you have a toast system
      console.log('Address copied to clipboard:', text)
    } catch (err) {
      console.error('Failed to copy address:', err)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
  }

  // Function to open Etherscan in new tab
  const openEtherscan = (tokenAddress: string) => {
    window.open(`https://etherscan.io/address/${tokenAddress}`, '_blank')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-accent mx-auto mb-4" />
          <p className="text-lg font-bold text-muted-foreground">Loading token details...</p>
        </div>
      </div>
    )
  }

  if (error || !tokenData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 border-destructive/30 bg-destructive/5 max-w-md">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-bold text-destructive mb-2">Error Loading Token</h2>
            <p className="text-muted-foreground mb-4">{error || 'Failed to load token details'}</p>
            <Link href="/eth-tracker">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to ETH Tracker
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    )
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
                <div className="h-16 w-16 rounded-2xl bg-linear-to-br from-accent to-cyan flex items-center justify-center text-3xl">
                  {tokenData.logo ? (
                    <img 
                      src={tokenData.logo} 
                      alt={tokenData.name || 'Token'} 
                      className="w-12 h-12 rounded-xl"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none'
                        const parent = (e.target as HTMLImageElement).parentElement
                        if (parent) {
                          parent.innerHTML = tokenData.symbol?.charAt(0) || '?'
                        }
                      }}
                    />
                  ) : (
                    <span className="text-xl font-bold text-white">
                      {tokenData.symbol?.charAt(0) || '?'}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-5xl font-black tracking-tighter">{tokenData.name || 'Unknown Token'}</h2>
                  <Badge variant="secondary" className="mt-2 font-bold text-base">
                    {tokenData.symbol || 'N/A'}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => copyToClipboard(address)}
                >
                  <Copy className="h-4 w-4" />
                  Copy Address
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => openEtherscan(address)}
                >
                  <ExternalLink className="h-4 w-4" />
                  View on Etherscan
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
          <Card className="col-span-4 border border-accent/30 bg-linear-to-br from-card via-card to-accent/5 p-8 shadow-[0_0_50px_-12px_rgba(216,105,142,0.3)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
            <div className="relative">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="mb-2 text-sm font-black uppercase tracking-widest text-muted-foreground">
                    Current Price
                  </p>
                  <h3 className="text-5xl font-black tracking-tighter">
                    ${tokenData.price ? tokenData.price.toFixed(6) : 'N/A'}
                  </h3>
                  <div className="flex items-center gap-2 mt-3">
                    <Badge 
                      variant={tokenData.change24h && tokenData.change24h > 0 ? "default" : "destructive"} 
                      className="gap-1 px-3 py-1 text-sm font-bold"
                    >
                      {tokenData.change24h && tokenData.change24h > 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      {tokenData.change24h ? `${tokenData.change24h > 0 ? '+' : ''}${tokenData.change24h.toFixed(2)}%` : 'N/A'}
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
          <Card className="col-span-4 border border-cyan/30 bg-linear-to-br from-card to-cyan/5 p-8 shadow-[0_0_50px_-12px_rgba(192,252,248,0.3)]">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="mb-2 text-sm font-black uppercase tracking-widest text-muted-foreground">Market Cap</p>
                <h3 className="text-5xl font-black tracking-tighter">
                  {tokenData.marketCap ? `$${(tokenData.marketCap / 1e6).toFixed(1)}M` : 'N/A'}
                </h3>
                <p className="text-sm font-medium text-muted-foreground mt-2">Live data</p>
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
                <h3 className="text-5xl font-black tracking-tighter">
                  {tokenData.volume24h ? `$${(tokenData.volume24h / 1e6).toFixed(1)}M` : 'N/A'}
                </h3>
                <div className="flex items-center gap-2 mt-2 text-sm font-bold">
                  <Activity className="h-4 w-4 text-accent" />
                  <span className="text-accent">Live</span>
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
              <h3 className="text-5xl font-black tracking-tighter">
                {tokenData.holders ? tokenData.holders.toLocaleString() : 'N/A'}
              </h3>
            </div>
            <div className="rounded-xl bg-cyan/20 p-3 w-fit border border-cyan/30">
              <Users className="h-6 w-6 text-cyan" />
            </div>
          </Card>

          {/* 24h Change */}
          <Card className="col-span-3 p-8 border-border hover:border-accent/50 transition-all bg-card">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                {typeof tokenData.change24h === 'number' && tokenData.change24h > 0 ? (
                  <TrendingUp className="h-8 w-8 text-green-400" />
                ) : (
                  <TrendingDown className="h-8 w-8 text-red-400" />
                )}
                <span className="mb-2 text-sm font-black uppercase tracking-widest text-muted-foreground" style={{fontFamily:'Poppins,sans-serif'}}>24h Change</span>
              </div>
              <p className={`text-5xl font-black tracking-tighter ${
                typeof tokenData.change24h === 'number' && tokenData.change24h > 0
                  ? 'text-green-400'
                  : 'text-red-400'
              }`} style={{fontFamily:'Poppins,sans-serif'}}>
                {typeof tokenData.change24h === 'number'
                  ? `${tokenData.change24h > 0 ? '+' : ''}${tokenData.change24h.toFixed(2)}%`
                  : 'N/A'}
              </p>
            </div>
          </Card>

          {/* AI Risk Analysis */}
          <Card className="col-span-6 border border-accent/30 bg-gradient-to-br from-card to-accent/5 p-8 shadow-[0_0_40px_-12px_rgba(216,105,142,0.2)]">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h4 className="text-2xl font-black tracking-tight mb-2">AI Risk Analysis</h4>
                <p className="text-sm text-muted-foreground font-medium">Real-time security assessment</p>
              </div>
              <Badge className={`px-4 py-2 text-lg font-black ${
                tokenData.riskAnalysis?.overallScore 
                  ? tokenData.riskAnalysis.overallScore >= 70 
                    ? 'bg-green-500/20 text-green-500 border-green-500/30'
                    : tokenData.riskAnalysis.overallScore >= 40
                    ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30'
                    : 'bg-red-500/20 text-red-500 border-red-500/30'
                  : 'bg-gray-500/20 text-gray-500 border-gray-500/30'
              }`}>
                {tokenData.riskAnalysis?.overallScore || 'N/A'}/100
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">Rug Pull Risk</span>
                  <span className={`text-sm font-black ${
                    tokenData.riskAnalysis?.rugPullRisk 
                      ? tokenData.riskAnalysis.rugPullRisk <= 30 
                        ? 'text-green-500'
                        : tokenData.riskAnalysis.rugPullRisk <= 60
                        ? 'text-yellow-500'
                        : 'text-red-500'
                      : 'text-gray-500'
                  }`}>
                    {tokenData.riskAnalysis?.rugPullRisk || 'N/A'}%
                  </span>
                </div>
                <div className="h-3 w-full rounded-full bg-muted/30 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      tokenData.riskAnalysis?.rugPullRisk 
                        ? tokenData.riskAnalysis.rugPullRisk <= 30 
                          ? 'bg-green-500 shadow-[0_0_15px_-3px_rgba(34,197,94,0.6)]'
                          : tokenData.riskAnalysis.rugPullRisk <= 60
                          ? 'bg-yellow-500 shadow-[0_0_15px_-3px_rgba(234,179,8,0.6)]'
                          : 'bg-red-500 shadow-[0_0_15px_-3px_rgba(239,68,68,0.6)]'
                        : 'bg-gray-500'
                    }`}
                    style={{ width: `${tokenData.riskAnalysis?.rugPullRisk || 0}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">Token Health</span>
                  <span className={`text-sm font-black ${
                    tokenData.riskAnalysis?.tokenHealth 
                      ? tokenData.riskAnalysis.tokenHealth >= 70 
                        ? 'text-green-500'
                        : tokenData.riskAnalysis.tokenHealth >= 40
                        ? 'text-yellow-500'
                        : 'text-red-500'
                      : 'text-gray-500'
                  }`}>
                    {tokenData.riskAnalysis?.tokenHealth || 'N/A'}%
                  </span>
                </div>
                <div className="h-3 w-full rounded-full bg-muted/30 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      tokenData.riskAnalysis?.tokenHealth 
                        ? tokenData.riskAnalysis.tokenHealth >= 70 
                          ? 'bg-green-500 shadow-[0_0_15px_-3px_rgba(34,197,94,0.6)]'
                          : tokenData.riskAnalysis.tokenHealth >= 40
                          ? 'bg-yellow-500 shadow-[0_0_15px_-3px_rgba(234,179,8,0.6)]'
                          : 'bg-red-500 shadow-[0_0_15px_-3px_rgba(239,68,68,0.6)]'
                        : 'bg-gray-500'
                    }`}
                    style={{ width: `${tokenData.riskAnalysis?.tokenHealth || 0}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">Community Trust</span>
                  <span className={`text-sm font-black ${
                    tokenData.riskAnalysis?.communityTrust 
                      ? tokenData.riskAnalysis.communityTrust >= 70 
                        ? 'text-green-500'
                        : tokenData.riskAnalysis.communityTrust >= 40
                        ? 'text-yellow-500'
                        : 'text-red-500'
                      : 'text-gray-500'
                  }`}>
                    {tokenData.riskAnalysis?.communityTrust || 'N/A'}%
                  </span>
                </div>
                <div className="h-3 w-full rounded-full bg-muted/30 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      tokenData.riskAnalysis?.communityTrust 
                        ? tokenData.riskAnalysis.communityTrust >= 70 
                          ? 'bg-green-500 shadow-[0_0_15px_-3px_rgba(34,197,94,0.6)]'
                          : tokenData.riskAnalysis.communityTrust >= 40
                          ? 'bg-yellow-500 shadow-[0_0_15px_-3px_rgba(234,179,8,0.6)]'
                          : 'bg-red-500 shadow-[0_0_15px_-3px_rgba(239,68,68,0.6)]'
                        : 'bg-gray-500'
                    }`}
                    style={{ width: `${tokenData.riskAnalysis?.communityTrust || 0}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">Liquidity Score</span>
                  <span className={`text-sm font-black ${
                    tokenData.riskAnalysis?.liquidityScore 
                      ? tokenData.riskAnalysis.liquidityScore >= 70 
                        ? 'text-green-500'
                        : tokenData.riskAnalysis.liquidityScore >= 40
                        ? 'text-yellow-500'
                        : 'text-red-500'
                      : 'text-gray-500'
                  }`}>
                    {tokenData.riskAnalysis?.liquidityScore || 'N/A'}%
                  </span>
                </div>
                <div className="h-3 w-full rounded-full bg-muted/30 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      tokenData.riskAnalysis?.liquidityScore 
                        ? tokenData.riskAnalysis.liquidityScore >= 70 
                          ? 'bg-green-500 shadow-[0_0_15px_-3px_rgba(34,197,94,0.6)]'
                          : tokenData.riskAnalysis.liquidityScore >= 40
                          ? 'bg-yellow-500 shadow-[0_0_15px_-3px_rgba(234,179,8,0.6)]'
                          : 'bg-red-500 shadow-[0_0_15px_-3px_rgba(239,68,68,0.6)]'
                        : 'bg-gray-500'
                    }`}
                    style={{ width: `${tokenData.riskAnalysis?.liquidityScore || 0}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Price Chart */}
        <Card className="mb-12 border border-accent/30 bg-gradient-to-br from-card to-accent/5 p-8 shadow-[0_0_40px_-12px_rgba(216,105,142,0.2)]">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h4 className="text-2xl font-black tracking-tight mb-2">Live Price Chart</h4>
              <p className="text-sm text-muted-foreground font-medium">Real-time trading data from DexScreener</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => window.open(`https://dexscreener.com/ethereum/${address}`, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
              View on DexScreener
            </Button>
          </div>
          <div className="h-[600px] w-full rounded-xl overflow-hidden border border-border/50">
            <iframe
              src={`https://dexscreener.com/ethereum/${address}?embed=1&theme=dark&trades=0&info=0`}
              width="100%"
              height="100%"
              style={{ border: 'none' }}
              title={`${tokenData.symbol || 'Token'} Price Chart`}
              allowFullScreen
            />
          </div>
        </Card>

        {/* Token Distribution Analytics */}
        <div className="grid grid-cols-12 gap-6 mb-12">
          {/* Holder Distribution */}
          <Card className="col-span-7 border border-cyan/30 bg-gradient-to-br from-card to-cyan/5 p-8 shadow-[0_0_40px_-12px_rgba(192,252,248,0.2)]">
            <div className="mb-6">
              <h4 className="text-2xl font-black tracking-tight mb-2">Token Distribution Analytics</h4>
              <p className="text-sm text-muted-foreground font-medium">Real holder concentration analysis</p>
            </div>
            {tokenData.holderDistribution && tokenData.holderDistribution.length > 0 ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={tokenData.holderDistribution}>
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
            ) : (
              <div className="h-80 flex items-center justify-center">
                <div className="text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No distribution data available</p>
                </div>
              </div>
            )}
          </Card>

          {/* Acquisition Breakdown */}
          <Card className="col-span-5 border border-accent/30 bg-card p-8">
            <div className="mb-6">
              <h4 className="text-2xl font-black tracking-tight mb-2">Acquisition Breakdown</h4>
              <p className="text-sm text-muted-foreground font-medium">Real transaction analysis</p>
            </div>
            {tokenData.acquisitionBreakdown && tokenData.acquisitionBreakdown.length > 0 ? (
              <div className="space-y-6">
                {tokenData.acquisitionBreakdown.map((item, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="h-10 w-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${item.color}20`, border: `2px solid ${item.color}` }}
                        >
                          <div className="h-4 w-4 rounded-full" style={{ backgroundColor: item.color }} />
                        </div>
                        <div>
                          <span className="text-lg font-bold">{item.method}</span>
                          <p className="text-xs text-muted-foreground">{item.percentage}% of transactions</p>
                        </div>
                      </div>
                      <span className="text-2xl font-black">{item.count.toLocaleString()}</span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-muted/30 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: item.color,
                          boxShadow: `0 0 15px -3px ${item.color}`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-48">
                <div className="text-center">
                  <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No transaction data available</p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Top Token Holders */}
        <Card className="border border-accent/30 bg-card p-8">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h4 className="text-2xl font-black tracking-tight mb-2">Top Token Holders</h4>
              <p className="text-sm text-muted-foreground font-medium">Real-time largest token holders</p>
            </div>
            <div className="rounded-xl bg-accent/20 p-3 border border-accent/30">
              <Users className="h-6 w-6 text-accent" />
            </div>
          </div>
          {tokenData.topHolders && tokenData.topHolders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-sm font-black uppercase tracking-widest text-muted-foreground">
                      Rank
                    </th>
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
                  {tokenData.topHolders.map((holder, index) => (
                    <tr key={index} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-4">
                        <div className="h-8 w-8 rounded-lg bg-accent/20 flex items-center justify-center font-black text-accent border border-accent/30">
                          {holder.rank}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-accent/20 flex items-center justify-center font-black text-accent border border-accent/30">
                            {holder.address.charAt(2)?.toUpperCase() || '?'}
                          </div>
                          <div>
                            <code className="text-sm font-mono font-bold">{holder.address}</code>
                            <button
                              onClick={() => copyToClipboard(holder.address)}
                              className="ml-2 text-xs text-muted-foreground hover:text-accent transition-colors"
                            >
                              <Copy className="h-3 w-3 inline" />
                            </button>
                          </div>
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
                              className="h-full bg-accent rounded-full shadow-[0_0_10px_-2px_rgba(216,105,142,0.6)] transition-all duration-500"
                              style={{ 
                                width: `${Math.min(100, (holder.percentage / Math.max(...tokenData.topHolders.map(h => h.percentage))) * 100)}%` 
                              }}
                            />
                          </div>
                          <span className="text-sm font-black w-16">{holder.percentage.toFixed(2)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex items-center justify-center h-48">
              <div className="text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No holder data available</p>
              </div>
            </div>
          )}
        </Card>
      </main>
    </div>
  )
}
