import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

// News item interface matching API response
export interface NewsItem {
  id: string;
  title: string;
  source: {
    name: string;
    logo: string;
    domain: string;
  } | string;
  publishedAt: string;
  time: string;
  sentiment: "positive" | "negative" | "neutral";
  sentimentScore: number;
  coin: string;
  excerpt: string;
  engagement: number;
  fullContent: string;
  url: string;
  votes?: {
    up: number;
    down: number;
  };
  thumbnail?: string | null;
}

// API response interface
export interface NewsAPIResponse {
  news: any[];  // Changed from 'results' to 'news'
  total: number;
  page: number;
  totalPages: number;
}

export type Sentiment = "all" | "bullish" | "bearish" | "neutral";
export type Category = "crypto" | "us";

// Custom hook for news sentiment functionality
export function useNewsSentiment() {
  const searchParams = useSearchParams();
  
  // Initialize category from URL params if available
  const initialCategory = (searchParams.get('category') as Category) || "crypto";
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSentiment, setSelectedSentiment] = useState<Sentiment>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<Category>(initialCategory);
  const [quickFilter, setQuickFilter] = useState<string>("");

  const itemsPerPage = 20;

  // Time ago formatter
  const getTimeAgo = (publishedAt: string) => {
    try {
      const now = new Date();
      const publishedDate = new Date(publishedAt);
      if (isNaN(publishedDate.getTime())) return "Unknown time";
      
      const diffMs = now.getTime() - publishedDate.getTime();
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

  // Fetch news from API
  const fetchNews = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams({
        category,
        page: "1",
        pageSize: "200", // Get more results for client-side filtering
      });

      // Combine search query with quick filter chips
      const combinedQ = [searchQuery, quickFilter].filter(Boolean).join(",");
      if (combinedQ) params.set("q", combinedQ);

      const response = await fetch(`/api/rss-news?${params.toString()}`, {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP ${response.status}`);
      }

      const data: NewsAPIResponse = await response.json();

      // Map the API response to our NewsItem format
      const mapped: NewsItem[] = (data.news || []).map((item: any) => ({
        id: item.id,
        title: item.title,
        source: typeof item.source === 'string' ? { 
          name: item.source, 
          logo: getSourceLogo(item.source),
          domain: item.source.toLowerCase()
        } : item.source,
        publishedAt: item.publishedAt,
        time: getTimeAgo(item.publishedAt),
        sentiment: mapSentiment(item.sentiment),
        sentimentScore: item.sentimentScore || 0,
        coin: item.coin || "",
        excerpt: item.excerpt || "",
        engagement: item.engagement || 0,
        fullContent: item.fullContent || item.excerpt || "",
        url: item.url,
        votes: item.votes,
        thumbnail: item.thumbnail || null,
      }));

      setNewsData(mapped);
      setCurrentPage(1);
      setTotalPages(Math.max(1, Math.ceil(mapped.length / itemsPerPage)));
    } catch (e: any) {
      setError(e?.message || "Failed to fetch news");
      setNewsData([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, [category, searchQuery, quickFilter]);

  // Filter news based on sentiment and search
  const filteredNews = useMemo(() => {
    return newsData.filter((item) => {
      const text = `${item.title} ${item.excerpt}`.toLowerCase();
      const q = searchQuery.toLowerCase();
      const byQuery = !q || text.includes(q);
      
      // Map sentiment filter to match our API response
      let bySentiment = true;
      if (selectedSentiment !== "all") {
        const mappedSentiment = selectedSentiment === "bullish" ? "positive" : 
                              selectedSentiment === "bearish" ? "negative" : "neutral";
        bySentiment = item.sentiment === mappedSentiment;
      }
      
      return byQuery && bySentiment;
    });
  }, [newsData, searchQuery, selectedSentiment]);

  // Paginated news
  const paginatedNews = useMemo(() => {
    const actualTotalPages = Math.max(1, Math.ceil(filteredNews.length / itemsPerPage));
    setTotalPages(actualTotalPages);
    
    return filteredNews.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredNews, currentPage, itemsPerPage]);

  // Navigation functions
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((p) => p + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((p) => p - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Get sentiment statistics
  const sentimentStats = useMemo(() => {
    const positive = filteredNews.filter(n => n.sentiment === "positive").length;
    const negative = filteredNews.filter(n => n.sentiment === "negative").length;
    const neutral = filteredNews.filter(n => n.sentiment === "neutral").length;
    const total = filteredNews.length;

    return { positive, negative, neutral, total };
  }, [filteredNews]);

  // Quick filter chips
  const QUICK_CHIPS: Record<Category, string[]> = {
    crypto: ["BTC", "ETH", "SOL"],
    us: ["FED", "TESLA", "NVIDIA"],
  };

  // Fetch news when dependencies change
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Update category when URL params change
  useEffect(() => {
    const urlCategory = searchParams.get('category') as Category;
    if (urlCategory && (urlCategory === "crypto" || urlCategory === "us")) {
      setCategory(urlCategory);
    }
  }, [searchParams]);

  return {
    // State
    searchQuery,
    setSearchQuery,
    selectedSentiment,
    setSelectedSentiment,
    currentPage,
    setCurrentPage,
    selectedNews,
    setSelectedNews,
    category,
    setCategory,
    quickFilter,
    setQuickFilter,
    
    // Data
    newsData,
    filteredNews,
    paginatedNews,
    sentimentStats,
    
    // Status
    isLoading,
    error,
    totalPages,
    
    // Actions
    handleNextPage,
    handlePrevPage,
    fetchNews,
    
    // Constants
    QUICK_CHIPS,
    itemsPerPage,
  };
}

// Helper functions
function mapSentiment(sentiment: string): "positive" | "negative" | "neutral" {
  switch (sentiment?.toLowerCase()) {
    case "bullish":
    case "positive":
      return "positive";
    case "bearish":
    case "negative":
      return "negative";
    default:
      return "neutral";
  }
}

function getSourceLogo(sourceName: string): string {
  // Domain mapping for better logo fetching
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

  const sourceLower = sourceName.toLowerCase().replace(/\s+/g, "").replace(/[^a-z]/g, "");
  const mapped = domainMap[sourceLower];
  const domain = mapped?.domain || `${sourceLower}.com`;
  const safeDomain = domain || "news";
  const name = mapped?.name || sourceName;
  const logo = `https://www.google.com/s2/favicons?domain=${safeDomain}&sz=64`;

  return logo;
}

// Get coin icon data helper
export function getCoinIconData(coin: string) {
  const baseClass = "w-5 h-5 rounded-full p-0.5";
  switch ((coin || "").toUpperCase()) {
    case "BTC":
    case "BITCOIN":
      return {
        symbol: "₿",
        className: `${baseClass} bg-amber-500/20 text-amber-500`
      };
    case "ETH":
    case "ETHEREUM":
      return {
        symbol: "Ξ",
        className: `${baseClass} bg-blue-500/20 text-blue-500`
      };
    case "SOL":
    case "SOLANA":
      return {
        symbol: "◎",
        className: `${baseClass} bg-green-500/20 text-green-500`
      };
    default:
      return null;
  }
}

