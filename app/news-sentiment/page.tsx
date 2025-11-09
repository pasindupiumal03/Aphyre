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
import { 
  useNewsSentiment, 
  getCoinIconData,
  type Sentiment,
  type Category,
  type NewsItem
} from "@/hooks/use-news-sentiment"
import { Sidebar } from "@/components/sidebar"

export default function NewsSentiment() {
  const {
    searchQuery,
    setSearchQuery,
    selectedSentiment,
    setSelectedSentiment,
    selectedNews,
    setSelectedNews,
    category,
    setCategory,
    quickFilter,
    setQuickFilter,
    paginatedNews,
    sentimentStats,
    isLoading,
    error,
    currentPage,
    totalPages,
    handleNextPage,
    handlePrevPage,
    QUICK_CHIPS,
  } = useNewsSentiment();

  // Map our categories to filter display names
  const getFilterDisplay = (filter: string) => {
    switch (filter) {
      case "crypto": return "Crypto News";
      case "us": return "US Markets";
      default: return filter.toUpperCase();
    }
  };

  // Get sentiment badge variant
  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return { variant: "default" as const, text: "Positive", className: "bg-cyan text-cyan-foreground" };
      case "negative":
        return { variant: "destructive" as const, text: "Negative", className: "bg-destructive text-destructive-foreground" };
      default:
        return { variant: "secondary" as const, text: "Neutral", className: "bg-secondary text-secondary-foreground" };
    }
  };

  // Format time function
  const getTimeDisplay = (publishedAt: string) => {
    try {
      const now = new Date();
      const published = new Date(publishedAt);
      const diffMs = now.getTime() - published.getTime();
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      
      if (diffMinutes < 60) return `${diffMinutes}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      return `${diffDays}d ago`;
    } catch {
      return "Unknown time";
    }
  };

  // Get source logo URL using Google's favicon service
  const getSourceLogo = (source: string | { name: string; logo?: string; domain?: string }) => {
    const domainMap: Record<string, { name: string; domain: string }> = {
      "cointelegraph": { name: "Cointelegraph", domain: "cointelegraph.com" },
      "coindesk": { name: "CoinDesk", domain: "coindesk.com" },
      "theblock": { name: "The Block", domain: "theblock.co" },
      "decrypt": { name: "Decrypt", domain: "decrypt.co" },
      "bitcoinmagazine": { name: "Bitcoin Magazine", domain: "bitcoinmagazine.com" },
      "cnbc": { name: "CNBC", domain: "cnbc.com" },
      "wsj": { name: "Wall Street Journal", domain: "wsj.com" },
      "bloomberg": { name: "Bloomberg", domain: "bloomberg.com" },
      "yahoo": { name: "Yahoo Finance", domain: "finance.yahoo.com" },
      "marketwatch": { name: "MarketWatch", domain: "marketwatch.com" },
      "reuters": { name: "Reuters", domain: "reuters.com" },
      "ft": { name: "Financial Times", domain: "ft.com" },
      "techcrunch": { name: "TechCrunch", domain: "techcrunch.com" },
      "venturebeat": { name: "VentureBeat", domain: "venturebeat.com" },
      "forbes": { name: "Forbes", domain: "forbes.com" },
      "beincrypto": { name: "BeInCrypto", domain: "beincrypto.com" },
      "cryptoslate": { name: "CryptoSlate", domain: "cryptoslate.com" },
      "utoday": { name: "U.Today", domain: "u.today" },
      "newsbtc": { name: "NewsBTC", domain: "newsbtc.com" },
    };

    if (typeof source === "string") {
      const sourceLower = source.toLowerCase().replace(/\s+/g, "").replace(/[^a-z]/g, "");
      const mapped = domainMap[sourceLower];
      const domain = mapped?.domain || `${sourceLower}.com`;
      const safeDomain = domain || "news";
      return `https://www.google.com/s2/favicons?domain=${safeDomain}&sz=64`;
    } else {
      const sourceLower = source.name.toLowerCase().replace(/\s+/g, "").replace(/[^a-z]/g, "");
      const mapped = domainMap[sourceLower];
      const domain = source.domain || mapped?.domain || `${sourceLower}.com`;
      const safeDomain = domain || "news";
      return source.logo || `https://www.google.com/s2/favicons?domain=${safeDomain}&sz=64`;
    }
  };

  // Get coin emoji for display
  const getCoinEmoji = (coin: string) => {
    switch ((coin || "").toUpperCase()) {
      case "BTC":
      case "BITCOIN":
        return "₿";
      case "ETH":
      case "ETHEREUM":
        return "Ξ";
      case "SOL":
      case "SOLANA":
        return "◎";
      default:
        return "📰";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      {/* Main Content */}
      <main className="ml-0 lg:ml-72 p-6 lg:p-12">
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
              <Input 
                placeholder="Search crypto news or..." 
                className="h-10 pl-10 w-64 bg-secondary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="h-10 font-bold bg-transparent">
              {selectedSentiment === "all" ? "All Sentiments" : 
               selectedSentiment === "bullish" ? "Bullish" :
               selectedSentiment === "bearish" ? "Bearish" : "Neutral"}
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8 flex gap-3">
          {[
            { key: "crypto", label: "Crypto News" },
            { key: "us", label: "US Markets" },
            ...QUICK_CHIPS[category].map(chip => ({ key: chip, label: chip }))
          ].map((filter) => (
            <Button
              key={filter.key}
              variant={
                (category === filter.key) || (quickFilter === filter.key) ? "default" : "outline"
              }
              onClick={() => {
                if (filter.key === "crypto" || filter.key === "us") {
                  setCategory(filter.key as Category);
                  setQuickFilter("");
                } else {
                  setQuickFilter(quickFilter === filter.key ? "" : filter.key);
                }
              }}
              className={
                (category === filter.key) || (quickFilter === filter.key)
                  ? "bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-glow-accent"
                  : "font-bold border-2"
              }
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            <span className="ml-3 text-muted-foreground">Loading news...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card className="bg-destructive/10 border-destructive/20 p-6 mb-8">
            <p className="text-destructive">Error loading news: {error}</p>
          </Card>
        )}

        {/* Sentiment Stats */}
        {!isLoading && !error && (
          <div className="mb-12 grid gap-6 md:grid-cols-3">
            <Card className="p-8 border-cyan/30 bg-linear-to-br from-card to-cyan/5 shadow-[0_0_40px_-12px_rgba(192,252,248,0.3)]">
              <div className="flex items-center justify-between mb-4">
                <ThumbsUp className="h-12 w-12 text-cyan" />
                <div className="text-right">
                  <p className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-1">
                    Positive Sentiment
                  </p>
                  <h3 className="text-5xl font-black tracking-tighter">{sentimentStats.positive}</h3>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-destructive/30 bg-linear-to-br from-card to-destructive/5 shadow-[0_0_40px_-12px_rgba(239,68,68,0.2)]">
              <div className="flex items-center justify-between mb-4">
                <ThumbsDown className="h-12 w-12 text-destructive" />
                <div className="text-right">
                  <p className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-1">
                    Negative Sentiment
                  </p>
                  <h3 className="text-5xl font-black tracking-tighter">{sentimentStats.negative}</h3>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-accent/30 bg-linear-to-br from-card to-accent/5 shadow-[0_0_40px_-12px_rgba(216,105,142,0.3)]">
              <div className="flex items-center justify-between mb-4">
                <FileText className="h-12 w-12 text-accent" />
                <div className="text-right">
                  <p className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-1">
                    Total Articles
                  </p>
                  <h3 className="text-5xl font-black tracking-tighter">{sentimentStats.total}</h3>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Latest News */}
        {!isLoading && !error && (
          <div>
            <h3 className="text-4xl font-black tracking-tighter mb-8">
              LATEST <span className="text-cyan drop-shadow-[0_0_30px_rgba(192,252,248,0.5)]">
                {category === "crypto" ? "CRYPTO" : "US"} NEWS
              </span>
            </h3>

            <div className="space-y-4 mb-8">
              {paginatedNews.map((article, index) => {
                const sentimentBadge = getSentimentBadge(article.sentiment);
                return (
                  <Card
                    key={article.id}
                    className={`group cursor-pointer transition-all border-border hover:border-accent/50 hover:shadow-[0_8px_30px_-12px_rgba(216,105,142,0.3)] p-6 bg-card ${
                      selectedNews?.id === article.id ? "border-accent/50 shadow-[0_8px_30px_-12px_rgba(216,105,142,0.3)]" : ""
                    }`}
                    onClick={() => setSelectedNews(selectedNews?.id === article.id ? null : article)}
                  >
                    <div className="flex items-start gap-6">
                      <div className="flex items-center gap-4 flex-1">
                        {/* Source logo */}
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg overflow-hidden bg-secondary/30 border border-accent/20 shrink-0">
                          <img
                            src={getSourceLogo(article.source)}
                            alt={`${typeof article.source === 'string' ? article.source : article.source.name} logo`}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              // Fallback to a default icon if logo fails to load
                              const target = e.target as HTMLImageElement;
                              const sourceName = typeof article.source === 'string' ? article.source : article.source.name;
                              target.src = `data:image/svg+xml,${encodeURIComponent(
                                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#D8698E"><rect width="24" height="24" rx="4" fill="#D8698E"/><text x="12" y="16" text-anchor="middle" fill="white" font-family="sans-serif" font-size="10" font-weight="bold">${sourceName.charAt(0).toUpperCase()}</text></svg>`
                              )}`;
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <p className="text-sm font-bold">
                              {typeof article.source === 'string' ? article.source : article.source.name}
                            </p>
                            <span className="text-xs text-muted-foreground font-medium">
                              {getTimeDisplay(article.publishedAt)}
                            </span>
                            {article.coin && (
                              <>
                                <span className="text-xs text-muted-foreground">•</span>
                                <span className="text-xs font-bold text-accent">{article.coin}</span>
                              </>
                            )}
                          </div>
                          <h4 className="text-lg font-black leading-tight mb-2 group-hover:text-accent transition-colors">
                            {article.title}
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{article.excerpt}</p>
                          
                          {/* Expanded content */}
                          {selectedNews?.id === article.id && (
                            <div className="mt-4 pt-4 border-t border-border">
                              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                {article.fullContent}
                              </p>
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(article.url, "_blank");
                                }}
                                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
                              >
                                Read Full Article
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Right side - Sentiment badge and coin icon */}
                  
                      {/* Thumbnail */}
                      {article.thumbnail ? (
                        <img 
                          src={article.thumbnail} 
                          alt=""
                          className="h-24 w-24 rounded-lg object-cover border border-accent/30"
                        />
                      ) : (
                        <div className="h-24 w-24 rounded-lg bg-linear-to-br from-accent/20 to-cyan/20 border border-accent/30" />
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* No Results */}
            {paginatedNews.length === 0 && (
              <Card className="bg-card border-border p-8 text-center">
                <p className="text-muted-foreground">No articles found matching your criteria.</p>
              </Card>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-10 w-10 bg-transparent"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <span className="text-sm font-bold text-muted-foreground px-4">
                  Page {currentPage} of {totalPages}
                </span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-10 w-10 bg-transparent"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
