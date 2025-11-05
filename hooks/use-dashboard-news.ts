import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface DashboardNewsItem {
  id: string;
  title: string;
  source: string | { name: string; logo?: string; domain?: string };
  publishedAt: string;
  time: string;
  sentiment: "positive" | "negative" | "neutral";
  excerpt: string;
  coin: string;
  url: string;
  category: "crypto" | "us";
}

export function useDashboardNews() {
  const [cryptoNews, setCryptoNews] = useState<DashboardNewsItem[]>([]);
  const [usNews, setUsNews] = useState<DashboardNewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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

  // Map sentiment to badge display
  const getSentimentDisplay = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return { text: "Bullish", variant: "default" as const };
      case "negative":
        return { text: "Bearish", variant: "destructive" as const };
      default:
        return { text: "Neutral", variant: "secondary" as const };
    }
  };

  // Fetch news for a specific category
  const fetchNews = async (category: "crypto" | "us") => {
    try {
      const params = new URLSearchParams({
        category,
        page: "1",
        pageSize: "3", // Only get latest 3 news for dashboard
      });

      const response = await fetch(`/api/rss-news?${params.toString()}`, {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      // Map the API response to our DashboardNewsItem format
      const mapped: DashboardNewsItem[] = (data.news || []).map((item: any) => ({
        id: item.id,
        title: item.title,
        source: item.source,
        publishedAt: item.publishedAt,
        time: getTimeAgo(item.publishedAt),
        sentiment: item.sentiment || "neutral",
        excerpt: item.excerpt || "",
        coin: item.coin || "",
        url: item.url,
        category,
      }));

      return mapped;
    } catch (e: any) {
      console.error(`Error fetching ${category} news:`, e);
      return [];
    }
  };

  // Fetch both crypto and US news
  const fetchAllNews = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [crypto, us] = await Promise.all([
        fetchNews("crypto"),
        fetchNews("us")
      ]);

      setCryptoNews(crypto);
      setUsNews(us);
    } catch (e: any) {
      setError(e?.message || "Failed to fetch news");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle news card click - navigate to news sentiment page
  const handleNewsClick = (newsItem: DashboardNewsItem) => {
    // Navigate to news sentiment page with the category filter
    router.push(`/news-sentiment?category=${newsItem.category}`);
  };

  // Fetch news on component mount
  useEffect(() => {
    fetchAllNews();
  }, []);

  return {
    cryptoNews,
    usNews,
    isLoading,
    error,
    getSentimentDisplay,
    handleNewsClick,
    refreshNews: fetchAllNews,
  };
}

export default useDashboardNews;