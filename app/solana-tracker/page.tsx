"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
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
  Sparkles,
  Crown,
  Users,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { useSolanaTracker } from "@/hooks/use-solana-tracker"
import { Sidebar } from "@/components/sidebar"

export default function SolanaTracker() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const [navigatingTokenAddress, setNavigatingTokenAddress] = useState<string | null>(null)
  const { data, isLoading, error } = useSolanaTracker()
  const router = useRouter()

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    // Basic Solana address validation (44 characters, base58)
    const solanaAddressRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/
    
    if (!solanaAddressRegex.test(searchQuery.trim())) {
      alert("Please enter a valid Solana token address")
      return
    }

    setIsSearching(true)
    
    try {
      // Navigate to the token details page
      router.push(`/solana-tracker/${searchQuery.trim()}`)
    } catch (error) {
      console.error("Navigation error:", error)
      alert("Error navigating to token details")
    } finally {
      setIsSearching(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleTokenClick = async (tokenAddress: string) => {
    if (!tokenAddress || isNavigating) return
    
    try {
      setIsNavigating(true)
      setNavigatingTokenAddress(tokenAddress)
      
      // Add a minimum loading time to prevent too many rapid requests
      await new Promise(resolve => setTimeout(resolve, 800))
      
      router.push(`/solana-tracker/${tokenAddress}`)
    } catch (error) {
      console.error("Navigation error:", error)
    } finally {
      // Keep loading state for a bit longer for smooth transition
      setTimeout(() => {
        setIsNavigating(false)
        setNavigatingTokenAddress(null)
      }, 200)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      {/* Main Content */}
      <main className="ml-0 lg:ml-72 p-6 lg:p-12">
        {/* Header */}
        <div className="mb-12">
          <h2 className="mb-4 text-7xl font-black tracking-tighter leading-none text-balance">
            SOLANA <span className="text-cyan drop-shadow-[0_0_30px_rgba(192,252,248,0.5)]">TRACKER</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed text-pretty font-medium">
            Real-time Solana token analytics and ecosystem insights.
            <br />
            Track any SPL token with comprehensive data and metrics.
          </p>
        </div>

        {/* Token Search */}
        <Card className="mb-12 p-8 border-cyan/30 bg-gradient-to-br from-card to-cyan/5 shadow-[0_0_40px_-12px_rgba(192,252,248,0.3)]">
          <h3 className="text-3xl font-black tracking-tighter mb-6">TOKEN SEARCH</h3>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Enter Solana token address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="h-14 pl-12 text-base font-medium bg-secondary/50 border-border"
                disabled={isSearching}
              />
            </div>
            <Button 
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="h-14 px-8 bg-cyan text-cyan-foreground hover:bg-cyan/90 font-bold text-base shadow-[0_0_30px_-10px_rgba(192,252,248,0.5)]"
            >
              {isSearching ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                "Search"
              )}
            </Button>
          </div>
        </Card>

        {/* Trending Tokens */}
        <div>
          <h3 className="text-4xl font-black tracking-tighter mb-8">
            TRENDING SOLANA TOKENS{" "}
            <span className="text-accent drop-shadow-[0_0_30px_rgba(216,105,142,0.5)]">(24H)</span>
          </h3>

          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[...Array(20)].map((_, index) => (
                <Card key={index} className="p-6 bg-card">
                  <div className="flex flex-col items-center text-center animate-pulse">
                    <div className="mb-4 h-20 w-20 rounded-full bg-secondary/50"></div>
                    <div className="h-4 w-32 bg-secondary/50 rounded mb-2"></div>
                    <div className="h-3 w-16 bg-secondary/50 rounded mb-4"></div>
                    <div className="h-6 w-24 bg-secondary/50 rounded mb-2"></div>
                    <div className="h-3 w-12 bg-secondary/50 rounded mb-3"></div>
                    <div className="h-3 w-20 bg-secondary/50 rounded"></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : error ? (
            <Card className="p-8 border-destructive/30 bg-destructive/5">
              <div className="text-center">
                <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                <p className="text-destructive font-medium">Error loading trending tokens: {error}</p>
                <Button 
                  variant="outline" 
                  className="mt-4" 
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </div>
            </Card>
          ) : data?.trendingTokens && data.trendingTokens.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {data.trendingTokens.slice(0, 20).map((token, index) => {
                const isTokenNavigating = navigatingTokenAddress === token.address
                
                return (
                  <Card 
                    key={token.address || index} 
                    className={`p-6 bg-card border-border hover:border-accent/50 hover:shadow-[0_8px_30px_-12px_rgba(216,105,142,0.3)] transition-all duration-300 cursor-pointer group ${
                      isTokenNavigating ? 'opacity-75 pointer-events-none' : ''
                    }`}
                    onClick={() => handleTokenClick(token.address)}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 h-20 w-20 rounded-full bg-linear-to-br from-accent/20 to-cyan/20 flex items-center justify-center text-4xl border-2 border-accent/30 group-hover:border-accent/50 transition-colors relative">
                        {isTokenNavigating ? (
                          <Loader2 className="h-8 w-8 text-cyan animate-spin" />
                        ) : token.logoURI ? (
                          <img 
                            src={token.logoURI} 
                            alt={token.name} 
                            className="w-12 h-12 rounded-full"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none'
                              const parent = (e.target as HTMLImageElement).parentElement
                              if (parent) {
                                parent.innerHTML = token.symbol?.charAt(0) || '?'
                              }
                            }}
                          />
                        ) : (
                          <span className="text-xl font-bold text-cyan group-hover:text-accent transition-colors">
                            {token.symbol?.charAt(0) || '?'}
                          </span>
                        )}
                      </div>
                      <h4 className="text-lg font-black mb-1 group-hover:text-cyan transition-colors line-clamp-2 h-14 flex items-center">
                        {isTokenNavigating ? 'Loading...' : (token.name || 'Unknown Token')}
                      </h4>
                      <Badge variant="secondary" className="mb-4 font-bold group-hover:bg-accent/20 transition-colors">
                        {token.symbol || 'N/A'}
                      </Badge>
                      <p className="text-2xl font-black text-cyan mb-2 group-hover:text-accent transition-colors">
                        ${token.price ? token.price.toFixed(6) : 'N/A'}
                      </p>
                      <p className={`text-sm font-bold mb-3 ${
                        token.change24h && token.change24h > 0 
                          ? 'text-green-500' 
                          : 'text-destructive'
                      }`}>
                        {token.change24h 
                          ? `${token.change24h > 0 ? '+' : ''}${token.change24h.toFixed(2)}%`
                          : 'N/A'
                        }
                      </p>
                      <p className="text-xs text-muted-foreground font-medium group-hover:text-cyan/70 transition-colors">
                        {isTokenNavigating ? 'Opening details...' : `Rank: #${index + 1} • Click for details`}
                      </p>
                    </div>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card className="p-8 border-muted">
              <div className="text-center">
                <Coins className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-medium">No trending tokens available at the moment.</p>
                {data?.trendingTokensError && (
                  <p className="text-sm text-destructive mt-2">API Error: {data.trendingTokensError}</p>
                )}
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
