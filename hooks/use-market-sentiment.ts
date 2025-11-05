"use client"

import { useState, useEffect } from "react"

export type SentimentData = {
  score: number // 0-100
  label: "BULLISH" | "BEARISH" | "NEUTRAL"
  fearIndex: number // 0-100 (higher = more fear)
  confidence: number // 0-100 (how confident we are in this reading)
  newsCount: number
  lastUpdated: Date
  breakdown: {
    positive: number
    negative: number 
    neutral: number
  }
}

export type NewsItem = {
  id: string
  title: string
  excerpt: string
  sentiment: "positive" | "negative" | "neutral"
  score: number // -1 to 1
  source: string | { name: string; domain?: string }
  time: string
  category: "crypto" | "us"
  coin?: string
}

export function useMarketSentiment() {
  const [sentimentData, setSentimentData] = useState<SentimentData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Advanced sentiment analysis keywords
  const sentimentKeywords = {
    // Strong positive indicators
    strongPositive: [
      "surge", "soar", "rally", "bullish", "breakthrough", "skyrocket", "boom", 
      "explosive", "massive gain", "all-time high", "record high", "breakout",
      "institutional adoption", "major partnership", "approved", "green light",
      "positive outlook", "optimistic", "buying opportunity", "strong fundamentals"
    ],
    
    // Moderate positive indicators  
    positive: [
      "rise", "gain", "increase", "growth", "up", "higher", "advance", "climb",
      "recovery", "rebound", "uptick", "improvement", "strengthen", "outperform",
      "positive", "good news", "development", "progress", "expansion", "upgrade"
    ],
    
    // Strong negative indicators
    strongNegative: [
      "crash", "plummet", "collapse", "bearish", "dump", "sell-off", "panic",
      "bloodbath", "massive drop", "all-time low", "capitulation", "fear",
      "regulatory crackdown", "ban", "rejected", "concerns", "warning", "risk",
      "bubble", "overvalued", "correction", "downturn", "recession signals"
    ],
    
    // Moderate negative indicators
    negative: [
      "fall", "drop", "decline", "down", "lower", "decrease", "slide", "dip",
      "retreat", "pullback", "weakness", "concerns", "uncertainty", "volatility",
      "negative", "challenges", "struggles", "pressure", "losses", "underperform"
    ],
    
    // Market fear indicators
    fearIndicators: [
      "uncertainty", "volatility", "risk", "concerns", "worries", "panic",
      "sell-off", "liquidation", "margin calls", "deleveraging", "flight to safety",
      "market stress", "contagion", "systemic risk", "credit crunch"
    ],
    
    // Crypto-specific terms
    cryptoPositive: [
      "adoption", "integration", "mainstream", "institutional", "etf approved",
      "halving", "staking rewards", "defi growth", "web3", "blockchain technology",
      "smart contracts", "nft boom", "metaverse", "layer 2", "scaling solution"
    ],
    
    cryptoNegative: [
      "hack", "exploit", "rug pull", "scam", "regulatory scrutiny", "energy concerns",
      "mining ban", "exchange closure", "depegging", "liquidation cascade",
      "smart contract vulnerability", "51% attack", "double spending"
    ]
  }

  // Calculate sentiment score from news content
  const calculateSentimentScore = (news: NewsItem[]): SentimentData => {
    if (news.length === 0) {
      return {
        score: 50,
        label: "NEUTRAL",
        fearIndex: 50,
        confidence: 0,
        newsCount: 0,
        lastUpdated: new Date(),
        breakdown: { positive: 0, negative: 0, neutral: 0 }
      }
    }

    let totalScore = 0
    let fearScore = 0
    let positiveCount = 0
    let negativeCount = 0
    let neutralCount = 0
    
    news.forEach(item => {
      const text = `${item.title} ${item.excerpt}`.toLowerCase()
      let itemScore = 0
      let itemFear = 0
      
      // Check for strong sentiment indicators (weighted more heavily)
      sentimentKeywords.strongPositive.forEach(keyword => {
        if (text.includes(keyword)) itemScore += 0.8
      })
      
      sentimentKeywords.strongNegative.forEach(keyword => {
        if (text.includes(keyword)) itemScore -= 0.8
      })
      
      // Check for moderate sentiment indicators
      sentimentKeywords.positive.forEach(keyword => {
        if (text.includes(keyword)) itemScore += 0.3
      })
      
      sentimentKeywords.negative.forEach(keyword => {
        if (text.includes(keyword)) itemScore -= 0.3
      })
      
      // Check for crypto-specific indicators
      if (item.category === "crypto") {
        sentimentKeywords.cryptoPositive.forEach(keyword => {
          if (text.includes(keyword)) itemScore += 0.4
        })
        
        sentimentKeywords.cryptoNegative.forEach(keyword => {
          if (text.includes(keyword)) itemScore -= 0.4
        })
      }
      
      // Calculate fear based on fear indicators
      sentimentKeywords.fearIndicators.forEach(keyword => {
        if (text.includes(keyword)) itemFear += 0.5
      })
      
      // Clamp item score between -2 and 2
      itemScore = Math.max(-2, Math.min(2, itemScore))
      itemFear = Math.max(0, Math.min(2, itemFear))
      
      totalScore += itemScore
      fearScore += itemFear
      
      // Count sentiment categories
      if (itemScore > 0.2) positiveCount++
      else if (itemScore < -0.2) negativeCount++
      else neutralCount++
    })

    // Calculate normalized scores
    const averageScore = totalScore / news.length
    const averageFear = fearScore / news.length
    
    // Convert to 0-100 scale
    // Score: -2 to 2 -> 0 to 100
    const normalizedScore = Math.round(((averageScore + 2) / 4) * 100)
    
    // Fear: 0 to 2 -> 0 to 100 (but inverted - high fear = low score)
    const fearIndex = Math.round((averageFear / 2) * 100)
    
    // Determine label based on score
    let label: "BULLISH" | "BEARISH" | "NEUTRAL"
    if (normalizedScore >= 65) label = "BULLISH"
    else if (normalizedScore <= 35) label = "BEARISH"
    else label = "NEUTRAL"
    
    // Calculate confidence based on news volume and sentiment distribution
    const sentimentVariance = Math.abs(positiveCount - negativeCount) / news.length
    const volumeConfidence = Math.min(news.length / 20, 1) // More news = higher confidence (up to 20 articles)
    const confidence = Math.round((sentimentVariance * 0.6 + volumeConfidence * 0.4) * 100)

    return {
      score: normalizedScore,
      label,
      fearIndex,
      confidence: Math.max(confidence, 20), // Minimum 20% confidence
      newsCount: news.length,
      lastUpdated: new Date(),
      breakdown: {
        positive: positiveCount,
        negative: negativeCount,
        neutral: neutralCount
      }
    }
  }

  const fetchSentimentData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error("Request timeout")), 15000)
      );
      
      // Fetch both crypto and US news with timeout
      const fetchPromise = Promise.all([
        fetch("/api/rss-news?category=crypto&limit=15"),
        fetch("/api/rss-news?category=us&limit=15")
      ]);
      
      const [cryptoResponse, usResponse] = await Promise.race([
        fetchPromise,
        timeoutPromise
      ]);
      
      if (!cryptoResponse.ok || !usResponse.ok) {
        throw new Error("Failed to fetch news data")
      }
      
      const [cryptoData, usData] = await Promise.all([
        cryptoResponse.json(),
        usResponse.json()
      ])
      
      // Check if data structure is correct
      if (!cryptoData.news || !usData.news) {
        console.warn("API response missing news field:", { cryptoData, usData });
        throw new Error("Invalid API response format")
      }
      
      // Combine news from both sources
      const allNews: NewsItem[] = [
        ...cryptoData.news.map((item: any) => ({
          ...item,
          category: "crypto" as const
        })),
        ...usData.news.map((item: any) => ({
          ...item,
          category: "us" as const
        }))
      ]
      
      // Calculate sentiment
      const sentiment = calculateSentimentScore(allNews)
      setSentimentData(sentiment)
      
    } catch (err) {
      console.error("Error fetching sentiment data:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch sentiment data")
      
      // Set a fallback neutral sentiment if there's an error
      setSentimentData({
        score: 50,
        label: "NEUTRAL",
        fearIndex: 50,
        confidence: 0,
        newsCount: 0,
        lastUpdated: new Date(),
        breakdown: { positive: 0, negative: 0, neutral: 0 }
      })
    } finally {
      setIsLoading(false)
    }
  }

  const refreshSentiment = () => {
    fetchSentimentData()
  }

  // Initial fetch
  useEffect(() => {
    // Add a small delay to avoid conflicts with other API calls on page load
    const timer = setTimeout(() => {
      fetchSentimentData()
    }, 1000)
    
    // Auto-refresh every 15 minutes
    const interval = setInterval(fetchSentimentData, 15 * 60 * 1000)
    
    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  return {
    sentimentData,
    isLoading,
    error,
    refreshSentiment,
  }
}