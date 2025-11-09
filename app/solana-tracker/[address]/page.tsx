"use client"

import Link from "next/link"
import { use } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
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
  Loader2,
  AlertCircle,
} from "lucide-react"
import { ResponsiveContainer, Area, AreaChart, XAxis, YAxis, Tooltip, Bar, BarChart, PieChart, Pie, Cell } from "recharts"
import { useSolanaTokenDetails } from "@/hooks/use-solana-token-details"
import { Sidebar } from "@/components/sidebar"
import { formatCurrency, formatNumber } from "@/lib/utils"

export default function SolanaTokenDetailPage({ params }: { params: Promise<{ address: string }> }) {
  const resolvedParams = use(params)
  const { address } = resolvedParams
  const { data: tokenData, isLoading, error, refetch } = useSolanaTokenDetails(address)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You might want to add a toast notification here
      alert("Address copied to clipboard!")
    } catch (err) {
      console.error("Failed to copy:", err)
      alert("Failed to copy address")
    }
  }

  const openSolscan = () => {
    const tokenAddress = tokenData?.token?.mint || address
    window.open(`https://solscan.io/token/${tokenAddress}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      {/* Main Content */}
      <main className="ml-0 lg:ml-72 p-6 lg:p-12">
        {/* Back Button */}
        <Link href="/solana-tracker">
          <Button variant="outline" className="mb-8 gap-2 font-bold bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Back to Solana Tracker
          </Button>
        </Link>

        {/* Token Header */}
        <div className="mb-12">
          {isLoading ? (
            <div className="animate-pulse">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="h-16 w-16 rounded-2xl bg-secondary/50"></div>
                  <div>
                    <div className="h-12 w-48 bg-secondary/50 rounded mb-2"></div>
                    <div className="h-6 w-24 bg-secondary/50 rounded"></div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-8 w-24 bg-secondary/50 rounded"></div>
                  <div className="h-8 w-24 bg-secondary/50 rounded"></div>
                </div>
              </div>
            </div>
          ) : error ? (
            <Card className="p-8 border-destructive/30 bg-destructive/5">
              <div className="text-center">
                <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-destructive mb-2">Error Loading Token</h3>
                <p className="text-destructive mb-4">{error}</p>
                <div className="flex gap-4 justify-center">
                  <Button variant="outline" onClick={() => window.history.back()}>
                    Go Back
                  </Button>
                  <Button onClick={refetch}>Try Again</Button>
                </div>
              </div>
            </Card>
          ) : tokenData ? (
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#14f195] via-[#9945ff] to-[#00d4ff] flex items-center justify-center text-3xl">
                    {tokenData.token?.image ? (
                      <img 
                        src={tokenData.token.image} 
                        alt={tokenData.token.name} 
                        className="w-12 h-12 rounded-xl"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none'
                          const parent = (e.target as HTMLImageElement).parentElement
                          if (parent) {
                            parent.innerHTML = tokenData.token?.symbol?.slice(0, 2) || "??"
                          }
                        }}
                      />
                    ) : (
                      <span className="text-2xl font-bold text-white">
                        {tokenData.token?.symbol?.slice(0, 2) || "??"}
                      </span>
                    )}
                  </div>
                  <div>
                    <h2 className="text-5xl font-black tracking-tighter">{tokenData.token?.name || 'Unknown Token'}</h2>
                    <Badge variant="secondary" className="mt-2 font-bold text-base">
                      {tokenData.token?.symbol || 'N/A'}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-4 mt-4">
                  <Button
                    onClick={() => copyToClipboard(tokenData.token?.mint || address)}
                    variant="outline"
                    className="gap-2 font-bold"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Address
                  </Button>
                  <Button
                    onClick={openSolscan}
                    variant="outline"
                    className="gap-2 font-bold"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View on Solscan
                  </Button>
                </div>
              </div>
              <div className="flex gap-3">
                <Badge className="bg-[#9945ff]/20 text-[#9945ff] border-[#9945ff]/30 px-4 py-2 text-sm font-bold">
                  SPL Token
                </Badge>
              </div>
            </div>
          ) : null}
        </div>

        {/* Key Metrics Grid */}
        {isLoading ? (
          <div className="grid grid-cols-12 gap-6 mb-12">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="col-span-4 p-8 animate-pulse">
                <div className="h-6 w-32 bg-secondary/50 rounded mb-4"></div>
                <div className="h-12 w-48 bg-secondary/50 rounded mb-2"></div>
                <div className="h-4 w-24 bg-secondary/50 rounded"></div>
              </Card>
            ))}
          </div>
        ) : error ? null : tokenData ? (
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
                    <h3 className="text-5xl font-black tracking-tighter">
                      ${tokenData.pools?.[0]?.price?.usd ? Number(tokenData.pools[0].price.usd).toFixed(8) : '0.000000'}
                    </h3>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge variant="default" className={`gap-1 px-3 py-1 text-sm font-bold ${
                        tokenData.events?.['24h']?.priceChangePercentage && tokenData.events['24h'].priceChangePercentage > 0 
                          ? 'bg-green-500' 
                          : 'bg-red-500'
                      }`}>
                        {tokenData.events?.['24h']?.priceChangePercentage && tokenData.events['24h'].priceChangePercentage > 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        {tokenData.events?.['24h']?.priceChangePercentage 
                          ? `${tokenData.events['24h'].priceChangePercentage > 0 ? '+' : ''}${tokenData.events['24h'].priceChangePercentage.toFixed(2)}%`
                          : 'N/A'
                        }
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
                  <h3 className="text-5xl font-black tracking-tighter">
                    {tokenData.pools?.[0]?.marketCap?.usd ? 
                      `$${(tokenData.pools[0].marketCap.usd / 1000000).toFixed(2)}M` : 'N/A'}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground mt-2">
                    Supply: {tokenData.pools?.[0]?.tokenSupply ? formatNumber(tokenData.pools[0].tokenSupply) : 'N/A'}
                  </p>
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
                  <h3 className="text-5xl font-black tracking-tighter">
                    {tokenData.pools?.[0]?.liquidity?.usd ? 
                      `$${(tokenData.pools[0].liquidity.usd / 1000000).toFixed(2)}M` : 'N/A'}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-sm font-bold">
                    <Activity className="h-4 w-4 text-cyan-500" />
                    <span className="text-cyan-500">Trading Active</span>
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
                <h3 className="text-5xl font-black tracking-tighter">
                  {tokenData.holders ? Math.round(tokenData.holders).toLocaleString() : 'N/A'}
                </h3>
              </div>
              <div className="rounded-xl bg-[#9945ff]/20 p-3 w-fit border border-[#9945ff]/30">
                <Users className="h-6 w-6 text-[#9945ff]" />
              </div>
            </Card>

            {/* 24h Change */}
          <Card className="col-span-3 p-8 border-border hover:border-accent/50 transition-all bg-card">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                {tokenData.events?.['24h']?.priceChangePercentage && tokenData.events['24h'].priceChangePercentage > 0 ? (
                  <TrendingUp className="h-8 w-8 text-green-400" />
                ) : (
                  <TrendingDown className="h-8 w-8 text-red-400" />
                )}
                <span className="mb-2 text-sm font-black uppercase tracking-widest text-muted-foreground" style={{fontFamily:'Poppins,sans-serif'}}>24h Change</span>
              </div>
              <p className={`text-5xl font-black tracking-tighter ${
                tokenData.events?.['24h']?.priceChangePercentage 
                  ? Math.abs(tokenData.events['24h'].priceChangePercentage) < 0.01
                    ? 'text-yellow-500'
                    : tokenData.events['24h'].priceChangePercentage > 0
                    ? 'text-green-400'
                    : 'text-red-400'
                  : 'text-gray-400'
              }`} style={{fontFamily:'Poppins,sans-serif'}}>
                {tokenData.events?.['24h']?.priceChangePercentage !== undefined 
                  ? `${tokenData.events['24h'].priceChangePercentage > 0 ? '+' : ''}${tokenData.events['24h'].priceChangePercentage.toFixed(2)}%`
                  : 'N/A'
                }
              </p>
            </div>
          </Card>

            {/* AI Risk Analysis */}
            <Card className="col-span-6 border border-[#14f195]/30 bg-gradient-to-br from-card to-[#14f195]/5 p-8 shadow-[0_0_40px_-12px_rgba(20,241,149,0.2)]">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h4 className="text-2xl font-black tracking-tight mb-2">AI Risk Analysis</h4>
                  <p className="text-sm text-muted-foreground font-medium">Automated security assessment</p>
                </div>
                <Badge className={`px-4 py-2 text-lg font-black ${
                  tokenData.riskAnalysis.overallScore >= 80 ? 'bg-green-500/20 text-green-500 border-green-500/30' :
                  tokenData.riskAnalysis.overallScore >= 60 ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' :
                  'bg-red-500/20 text-red-500 border-red-500/30'
                }`}>
                  {tokenData.riskAnalysis.overallScore}/100
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">Rug Pull Risk</span>
                    <span className={`text-sm font-black ${
                      tokenData.riskAnalysis.rugPullRisk <= 30 ? 'text-green-500' :
                      tokenData.riskAnalysis.rugPullRisk <= 60 ? 'text-yellow-500' : 'text-red-500'
                    }`}>
                      {tokenData.riskAnalysis.rugPullRisk}%
                    </span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-muted/30 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        tokenData.riskAnalysis.rugPullRisk <= 30 ? 'bg-green-500 shadow-[0_0_15px_-3px_rgba(34,197,94,0.6)]' :
                        tokenData.riskAnalysis.rugPullRisk <= 60 ? 'bg-yellow-500 shadow-[0_0_15px_-3px_rgba(234,179,8,0.6)]' :
                        'bg-red-500 shadow-[0_0_15px_-3px_rgba(239,68,68,0.6)]'
                      }`}
                      style={{ width: `${tokenData.riskAnalysis.rugPullRisk}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">Token Health</span>
                    <span className={`text-sm font-black ${
                      tokenData.riskAnalysis.tokenHealth >= 80 ? 'text-green-500' :
                      tokenData.riskAnalysis.tokenHealth >= 60 ? 'text-yellow-500' : 'text-red-500'
                    }`}>
                      {tokenData.riskAnalysis.tokenHealth}%
                    </span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-muted/30 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        tokenData.riskAnalysis.tokenHealth >= 80 ? 'bg-green-500 shadow-[0_0_15px_-3px_rgba(34,197,94,0.6)]' :
                        tokenData.riskAnalysis.tokenHealth >= 60 ? 'bg-yellow-500 shadow-[0_0_15px_-3px_rgba(234,179,8,0.6)]' :
                        'bg-red-500 shadow-[0_0_15px_-3px_rgba(239,68,68,0.6)]'
                      }`}
                      style={{ width: `${tokenData.riskAnalysis.tokenHealth}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">Community Trust</span>
                    <span className={`text-sm font-black ${
                      tokenData.riskAnalysis.communityTrust >= 80 ? 'text-green-500' :
                      tokenData.riskAnalysis.communityTrust >= 60 ? 'text-yellow-500' : 'text-red-500'
                    }`}>
                      {tokenData.riskAnalysis.communityTrust}%
                    </span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-muted/30 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        tokenData.riskAnalysis.communityTrust >= 80 ? 'bg-green-500 shadow-[0_0_15px_-3px_rgba(34,197,94,0.6)]' :
                        tokenData.riskAnalysis.communityTrust >= 60 ? 'bg-yellow-500 shadow-[0_0_15px_-3px_rgba(234,179,8,0.6)]' :
                        'bg-red-500 shadow-[0_0_15px_-3px_rgba(239,68,68,0.6)]'
                      }`}
                      style={{ width: `${tokenData.riskAnalysis.communityTrust}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">Liquidity Score</span>
                    <span className={`text-sm font-black ${
                      tokenData.riskAnalysis.liquidityScore >= 80 ? 'text-green-500' :
                      tokenData.riskAnalysis.liquidityScore >= 60 ? 'text-yellow-500' : 'text-red-500'
                    }`}>
                      {tokenData.riskAnalysis.liquidityScore}%
                    </span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-muted/30 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        tokenData.riskAnalysis.liquidityScore >= 80 ? 'bg-green-500 shadow-[0_0_15px_-3px_rgba(34,197,94,0.6)]' :
                        tokenData.riskAnalysis.liquidityScore >= 60 ? 'bg-yellow-500 shadow-[0_0_15px_-3px_rgba(234,179,8,0.6)]' :
                        'bg-red-500 shadow-[0_0_15px_-3px_rgba(239,68,68,0.6)]'
                      }`}
                      style={{ width: `${tokenData.riskAnalysis.liquidityScore}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ) : null}

        {/* Price Chart */}
        {isLoading ? (
          <Card className="mb-12 p-8 animate-pulse">
            <div className="h-6 w-48 bg-secondary/50 rounded mb-4"></div>
            <div className="h-80 bg-secondary/50 rounded"></div>
          </Card>
        ) : error ? null : tokenData ? (
          <Card className="mb-12 border border-[#9945ff]/30 bg-gradient-to-br from-card to-[#9945ff]/5 p-8 shadow-[0_0_40px_-12px_rgba(153,69,255,0.2)]">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h4 className="text-2xl font-black tracking-tight mb-2">Live Price Chart</h4>
                <p className="text-sm text-muted-foreground font-medium">Real-time trading data from DexScreener</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={() => window.open(`https://dexscreener.com/solana/${tokenData.token?.mint || address}`, '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
                View on DexScreener
              </Button>
            </div>
            <div className="h-[600px] w-full rounded-xl overflow-hidden border border-border/50">
              <iframe
                src={`https://dexscreener.com/solana/${tokenData.token?.mint || address}?embed=1&theme=dark&trades=0&info=0`}
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                title={`${tokenData.token?.symbol || 'Token'} Price Chart`}
                allowFullScreen
              />
            </div>
          </Card>
        ) : null}        {/* Token Distribution Analytics */}
        {isLoading ? (
          <div className="grid grid-cols-12 gap-6 mb-12">
            <Card className="col-span-7 p-8 animate-pulse">
              <div className="h-6 w-48 bg-secondary/50 rounded mb-4"></div>
              <div className="h-80 bg-secondary/50 rounded"></div>
            </Card>
            <Card className="col-span-5 p-8 animate-pulse">
              <div className="h-6 w-32 bg-secondary/50 rounded mb-4"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-12 bg-secondary/50 rounded"></div>
                ))}
              </div>
            </Card>
          </div>
        ) : error ? null : tokenData ? (
          <div className="grid grid-cols-12 gap-6 mb-12">
            {/* Holder Distribution */}
            <Card className="col-span-7 border border-[#9945ff]/30 bg-gradient-to-br from-card to-[#9945ff]/5 p-8 shadow-[0_0_40px_-12px_rgba(153,69,255,0.2)]">
              <div className="mb-6">
                <h4 className="text-2xl font-black tracking-tight mb-2">Token Distribution Analytics</h4>
                <p className="text-sm text-muted-foreground font-medium">Holder concentration analysis</p>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={tokenData.holderDistribution || []}>
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
                {(tokenData.acquisitionBreakdown || []).map((item, index) => (
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
                          width: `${(item.count / (tokenData.holders || 1000)) * 100}%`,
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
        ) : null}

        {/* Top Token Holders */}
        {isLoading ? (
          <Card className="p-8 animate-pulse">
            <div className="h-6 w-48 bg-secondary/50 rounded mb-6"></div>
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-16 bg-secondary/50 rounded"></div>
              ))}
            </div>
          </Card>
        ) : error ? null : tokenData ? (
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
                  {(tokenData.topHolders || []).map((holder, index) => (
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
                              style={{ width: `${Math.min(100, (holder.percentage / (tokenData.topHolders[0]?.percentage || 15)) * 100)}%` }}
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
        ) : null}
      </main>
    </div>
  )
}
