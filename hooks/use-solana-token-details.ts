import { useState, useEffect } from 'react'

export interface SolanaTokenDetails {
  token?: {
    name: string
    symbol: string
    mint: string
    uri?: string
    decimals: number
    image?: string
    description?: string
    extensions?: {
      twitter?: string
      telegram?: string
    }
    tags?: string[]
    creator?: {
      name: string
      site: string
    }
    hasFileMetaData?: boolean
  }
  pools?: Array<{
    liquidity?: {
      quote: number
      usd: number
    }
    price?: {
      quote: number
      usd: number
    }
    tokenSupply?: number
    lpBurn?: number
    tokenAddress?: string
    marketCap?: {
      quote: number
      usd: number
    }
    market?: string
    quoteToken?: string
    decimals?: number
    security?: {
      freezeAuthority?: string
      mintAuthority?: string
    }
    lastUpdated?: number
    createdAt?: number
    poolId?: string
  }>
  events?: {
    '1m'?: { priceChangePercentage: number }
    '5m'?: { priceChangePercentage: number }
    '15m'?: { priceChangePercentage: number }
    '30m'?: { priceChangePercentage: number }
    '1h'?: { priceChangePercentage: number }
    '24h'?: { priceChangePercentage: number }
  }
  risk?: {
    rugged: boolean
    risks: Array<{
      name: string
      description: string
      level: string
      score: number
    }>
    score: number
  }
  buys?: number
  sells?: number
  txns?: number
  holders?: number
  // Legacy structure for compatibility
  address?: string
  name?: string
  symbol?: string
  decimals?: number
  supply?: string
  price?: number
  marketCap?: number
  volume24h?: number
  change24h?: number
  logoURI?: string
  description?: string
  website?: string
  twitter?: string
  telegram?: string
  verified?: boolean
  createdAt?: string
  riskAnalysis?: {
    rugPullRisk: number
    tokenHealth: number
    communityTrust: number
    liquidityScore: number
    overallScore: number
  }
  priceHistory?: Array<{
    time: string
    price: number
  }>
  holderDistribution?: Array<{
    range: string
    percentage: number
    holders: number
  }>
  topHolders?: Array<{
    address: string
    balance: string
    usdValue: string
    percentage: number
  }>
  acquisitionBreakdown?: Array<{
    method: string
    count: number
    color: string
  }>
}

export function useSolanaTokenDetails(address: string) {
  const [data, setData] = useState<SolanaTokenDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!address) return

    const fetchTokenDetails = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`/api/token-details/sol?address=${encodeURIComponent(address)}`)
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
        }

        const tokenData = await response.json()
        setData(tokenData)
      } catch (err) {
        console.error('Error fetching Solana token details:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch token details')
        setData(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTokenDetails()
  }, [address])

  const refetch = () => {
    if (address) {
      setIsLoading(true)
      setError(null)
      // Re-trigger the effect
      const fetchTokenDetails = async () => {
        try {
          const response = await fetch(`/api/token-details/sol?address=${encodeURIComponent(address)}`)
          
          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
          }

          const tokenData = await response.json()
          setData(tokenData)
        } catch (err) {
          console.error('Error fetching Solana token details:', err)
          setError(err instanceof Error ? err.message : 'Failed to fetch token details')
          setData(null)
        } finally {
          setIsLoading(false)
        }
      }
      fetchTokenDetails()
    }
  }

  return { data, isLoading, error, refetch }
}