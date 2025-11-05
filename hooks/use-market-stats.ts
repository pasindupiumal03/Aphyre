"use client"

import { useCallback, useEffect, useState } from "react"

export type StatItem = {
  id: number
  label: string
  value: string
  change?: number
  icon?: string
  // numeric fields for UI usage
  numeric?: number | null
}

const fallbackStats: StatItem[] = [
  { id: 1, label: "Total Coins", value: "19,413", icon: "📊", numeric: 19413 },
  { id: 2, label: "Market Cap", value: "$4T", change: -3.6, icon: "💎", numeric: 4_000_000_000_000 },
  { id: 3, label: "24h Volume", value: "$134B", icon: "📈", numeric: 134_000_000_000 },
  { id: 4, label: "BTC Dominance", value: "58.2%", icon: "₿", numeric: 58.2 },
]

export function useMarketStats() {
  const [statsData, setStatsData] = useState<StatItem[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10000)

      const response = await fetch("https://api.coingecko.com/api/v3/global", {
        method: "GET",
        headers: { Accept: "application/json" },
        signal: controller.signal,
      })

      clearTimeout(timeout)

      if (!response.ok) {
        const errorText = await response.text().catch(() => "")
        throw new Error(errorText || `HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      const globalData = data?.data || data

      // Map values and keep both display strings and numeric values for UI
      const mappedStats: StatItem[] = [
        {
          id: 1,
          label: "Total Coins",
          value: globalData.active_cryptocurrencies
            ? globalData.active_cryptocurrencies.toLocaleString()
            : "N/A",
          numeric: globalData.active_cryptocurrencies ?? null,
          icon: "📊",
        },
        {
          id: 2,
          label: "Market Cap",
          value: globalData.total_market_cap?.usd
            ? `$${Math.round(globalData.total_market_cap.usd / 1e12)}T`
            : "N/A",
          change: typeof globalData.market_cap_change_percentage_24h_usd === "number"
            ? Number(globalData.market_cap_change_percentage_24h_usd)
            : undefined,
          numeric: typeof globalData.total_market_cap?.usd === "number"
            ? Number(globalData.total_market_cap.usd)
            : null,
          icon: "💎",
        },
        {
          id: 3,
          label: "24h Volume",
          value: globalData.total_volume?.usd
            ? `$${Math.round(globalData.total_volume.usd / 1e9)}B`
            : "N/A",
          numeric: typeof globalData.total_volume?.usd === "number"
            ? Number(globalData.total_volume.usd)
            : null,
          icon: "📈",
        },
        {
          id: 4,
          label: "BTC Dominance",
          value: typeof globalData.market_cap_percentage?.btc === "number"
            ? `${globalData.market_cap_percentage.btc.toFixed(1)}%`
            : "N/A",
          numeric: typeof globalData.market_cap_percentage?.btc === "number"
            ? Number(globalData.market_cap_percentage.btc)
            : null,
          icon: "₿",
        },
      ]

      setStatsData(mappedStats)
    } catch (err: any) {
      if (err?.name === "AbortError") {
        setError("Request timed out")
      } else {
        setError(err?.message || "Failed to fetch market stats")
      }
      console.error("useMarketStats error:", err)
      setStatsData(fallbackStats)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
    const interval = setInterval(fetchStats, 5 * 60 * 1000) // refresh every 5 minutes
    return () => clearInterval(interval)
  }, [fetchStats])

  return {
    statsData,
    isLoading,
    error,
    refreshStats: fetchStats,
  }
}
