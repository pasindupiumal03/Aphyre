import { useState, useEffect } from 'react'

interface TrendingToken {
  token_address: string
  name: string
  symbol: string
  logo?: string
  price_usd?: number
  price_24h_percent_change?: number
  volume_24h_usd?: number
  market_cap_usd?: number
}

interface EthTrackerData {
  price: number
  marketCap: number
  volume: number
  gas: {
    SafeGasPrice: string
    ProposeGasPrice: string
    FastGasPrice: string
  }
  trendingTokens: TrendingToken[]
}

export const useEthTracker = () => {
  const [data, setData] = useState<EthTrackerData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTrendingTokens = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch('/api/eth-tracker?action=trending')
      
      if (!response.ok) {
        throw new Error('Failed to fetch trending tokens')
      }
      
      const result = await response.json()
      setData(result)
    } catch (err) {
      console.error('Error fetching trending tokens:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
    } finally {
      setIsLoading(false)
    }
  }

  const searchToken = async (tokenAddress: string) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch(`/api/eth-tracker?token=${tokenAddress}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch token data')
      }
      
      const result = await response.json()
      return result.tokenData
    } catch (err) {
      console.error('Error fetching token data:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch token data')
      return null
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTrendingTokens()
  }, [])

  return {
    data,
    isLoading,
    error,
    refetch: fetchTrendingTokens,
    searchToken
  }
}