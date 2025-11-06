import { useState, useEffect } from 'react'

interface HolderDistribution {
  range: string
  percentage: number
  holders: number
  actualHolders: number
}

interface AcquisitionBreakdown {
  method: string
  count: number
  color: string
}

interface TopHolder {
  address: string
  fullAddress: string
  balance: string
  usdValue: string
  percentage: string
}

interface RealMetrics {
  volume24h: number | null
  marketCap: number | null
  priceChange24h: number | null
  lastUpdated: string
}

interface TokenAnalytics {
  holderDistribution: HolderDistribution[] | null
  acquisitionBreakdown: AcquisitionBreakdown[] | null
  topHolders: TopHolder[] | null
  totalHolders: number
  totalTransfers: number
  isRealData?: boolean
  realMetrics?: RealMetrics
}

export const useTokenAnalytics = (address: string) => {
  const [analytics, setAnalytics] = useState<TokenAnalytics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!address) return

      try {
        setIsLoading(true)
        setError(null)
        
        const response = await fetch(`/api/token-analytics/eth?address=${address}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch token analytics')
        }
        
        const data = await response.json()
        
        if (data.error) {
          throw new Error(data.error)
        }
        
        setAnalytics(data)
      } catch (err) {
        console.error('Error fetching token analytics:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch token analytics')
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalytics()
  }, [address])

  return {
    analytics,
    isLoading,
    error
  }
}