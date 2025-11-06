import { useState, useEffect } from 'react'

interface SolanaTrendingToken {
  name: string
  symbol: string
  price: number
  logoURI: string
  change24h: number
  address: string
}

interface SolanaData {
  price: {
    usd: number
    market_cap: number
    volume_24h: number
  }
  epoch: any
  tpsSamples: any[]
  blocks: any[]
  trendingTokens: SolanaTrendingToken[]
  trendingTokensError?: string
}

export const useSolanaTracker = () => {
  const [data, setData] = useState<SolanaData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSolanaData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch('/api/solana-tracker')
      
      if (!response.ok) {
        throw new Error('Failed to fetch Solana data')
      }
      
      const solanaData = await response.json()
      
      // Ensure we have trending tokens data
      if (!solanaData.trendingTokens) {
        solanaData.trendingTokens = []
      }
      
      setData(solanaData)
    } catch (err) {
      console.error('Error fetching Solana data:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch Solana data')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSolanaData()
  }, [])

  const refetch = () => {
    fetchSolanaData()
  }

  return {
    data,
    isLoading,
    error,
    refetch
  }
}