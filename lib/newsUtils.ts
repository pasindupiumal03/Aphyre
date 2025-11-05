// News source configuration
interface NewsSource {
  name: string;
  category: "crypto" | "traditional";
  bias?: "neutral" | "bullish" | "bearish";
}

const NEWS_SOURCES: Record<string, NewsSource> = {
  "coindesk.com": { name: "CoinDesk", category: "crypto", bias: "neutral" },
  "cointelegraph.com": { name: "Cointelegraph", category: "crypto", bias: "bullish" },
  "theblock.co": { name: "The Block", category: "crypto", bias: "neutral" },
  "decrypt.co": { name: "Decrypt", category: "crypto", bias: "neutral" },
  "bitcoinmagazine.com": { name: "Bitcoin Magazine", category: "crypto", bias: "bullish" },
  "cnbc.com": { name: "CNBC", category: "traditional", bias: "neutral" },
  "wsj.com": { name: "Wall Street Journal", category: "traditional", bias: "neutral" },
  "bloomberg.com": { name: "Bloomberg", category: "traditional", bias: "neutral" },
  "finance.yahoo.com": { name: "Yahoo Finance", category: "traditional", bias: "neutral" },
  "marketwatch.com": { name: "MarketWatch", category: "traditional", bias: "neutral" },
};

// Cryptocurrency detection patterns
const CRYPTO_PATTERNS = {
  bitcoin: ["bitcoin", "btc", "₿"],
  ethereum: ["ethereum", "eth", "ether"],
  solana: ["solana", "sol"],
  binance: ["binance", "bnb", "bsc"],
  cardano: ["cardano", "ada"],
  polygon: ["polygon", "matic"],
  avalanche: ["avalanche", "avax"],
  chainlink: ["chainlink", "link"],
  polkadot: ["polkadot", "dot"],
  litecoin: ["litecoin", "ltc"],
  ripple: ["ripple", "xrp"],
  dogecoin: ["dogecoin", "doge"],
  shiba: ["shiba", "shib"],
  defi: ["defi", "decentralized finance", "yield farming", "liquidity mining"],
  nft: ["nft", "non-fungible", "opensea", "collectible"],
  stablecoin: ["usdt", "usdc", "dai", "stablecoin", "tether"],
};

// Sentiment analysis keywords
const SENTIMENT_KEYWORDS = {
  bullish: [
    "surge", "rally", "moon", "bullish", "pump", "gain", "rise", "increase", 
    "breakthrough", "adoption", "partnership", "launch", "upgrade", "integration",
    "positive", "optimistic", "growth", "expansion", "milestone", "success"
  ],
  bearish: [
    "crash", "dump", "bearish", "decline", "fall", "drop", "plunge", "collapse",
    "hack", "exploit", "scam", "regulation", "ban", "crackdown", "warning",
    "negative", "concern", "risk", "loss", "investigation", "lawsuit"
  ],
  neutral: [
    "analysis", "report", "update", "announcement", "launch", "release",
    "study", "research", "data", "metric", "statistics", "overview"
  ]
};

export function getNewsSourceInfo(domain: string): string {
  const source = NEWS_SOURCES[domain.toLowerCase()];
  return source ? source.name : domain;
}

export function detectCoin(text: string): string | null {
  const lowerText = text.toLowerCase();
  
  for (const [coin, patterns] of Object.entries(CRYPTO_PATTERNS)) {
    for (const pattern of patterns) {
      if (lowerText.includes(pattern.toLowerCase())) {
        return coin.toUpperCase();
      }
    }
  }
  
  return null;
}

export function naiveSentimentFrom(text: string): "bullish" | "bearish" | "neutral" {
  const lowerText = text.toLowerCase();
  
  let bullishScore = 0;
  let bearishScore = 0;
  
  // Count bullish keywords
  SENTIMENT_KEYWORDS.bullish.forEach(keyword => {
    const matches = (lowerText.match(new RegExp(keyword, 'g')) || []).length;
    bullishScore += matches;
  });
  
  // Count bearish keywords
  SENTIMENT_KEYWORDS.bearish.forEach(keyword => {
    const matches = (lowerText.match(new RegExp(keyword, 'g')) || []).length;
    bearishScore += matches;
  });
  
  // Determine sentiment based on scores
  if (bullishScore > bearishScore && bullishScore > 0) {
    return "bullish";
  } else if (bearishScore > bullishScore && bearishScore > 0) {
    return "bearish";
  }
  
  return "neutral";
}

export function calculateSentimentScore(text: string): number {
  const lowerText = text.toLowerCase();
  
  let score = 50; // neutral baseline
  
  // Positive sentiment adjustments
  SENTIMENT_KEYWORDS.bullish.forEach(keyword => {
    const matches = (lowerText.match(new RegExp(keyword, 'g')) || []).length;
    score += matches * 5; // +5 points per bullish keyword
  });
  
  // Negative sentiment adjustments
  SENTIMENT_KEYWORDS.bearish.forEach(keyword => {
    const matches = (lowerText.match(new RegExp(keyword, 'g')) || []).length;
    score -= matches * 5; // -5 points per bearish keyword
  });
  
  // Clamp score between 0 and 100
  return Math.max(0, Math.min(100, score));
}

export function getTimeAgo(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime();
  
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffMinutes < 60) {
    return `${diffMinutes} minutes ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hours ago`;
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return past.toLocaleDateString();
  }
}

export function extractKeywords(text: string): string[] {
  const lowerText = text.toLowerCase();
  const keywords: string[] = [];
  
  // Extract detected coins
  const coin = detectCoin(text);
  if (coin) {
    keywords.push(coin);
  }
  
  // Add category keywords
  if (lowerText.includes("defi") || lowerText.includes("decentralized")) {
    keywords.push("DeFi");
  }
  if (lowerText.includes("nft") || lowerText.includes("non-fungible")) {
    keywords.push("NFT");
  }
  if (lowerText.includes("regulation") || lowerText.includes("sec")) {
    keywords.push("Regulation");
  }
  if (lowerText.includes("market") || lowerText.includes("trading")) {
    keywords.push("Market");
  }
  if (lowerText.includes("technology") || lowerText.includes("blockchain")) {
    keywords.push("Technology");
  }
  
  return [...new Set(keywords)]; // Remove duplicates
}

// Types for the news API
export interface NewsItem {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  time: string;
  sentiment: "bullish" | "bearish" | "neutral";
  sentimentScore: number;
  coin: string | null;
  excerpt: string;
  engagement: number;
  fullContent: string;
  url: string;
  thumbnail: string | null;
  votes?: {
    up: number;
    down: number;
  };
}

export interface NewsAPIResponse {
  results: NewsItem[];
  total: number;
  page: number;
  pageSize: number;
  next: number | null;
}