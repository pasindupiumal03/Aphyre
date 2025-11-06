import { useState, useEffect } from 'react'

export interface SolanaTokenDetails {
  token?: {
    address: string
    name: string
    symbol: string
    decimals: number
    supply: string
    logoURI?: string
    description?: string
    website?: string
    twitter?: string
    telegram?: string
    verified: boolean
    holders: number
    createdAt: string
    image?: string
    price?: number
    marketCap?: number
    volume24h?: number
  }
  pools?: Array<{
    price?: {
      usd: number
    }
    liquidity?: number
    volume24h?: number
  }>
  events?: {
    '24h'?: {
      priceChangePercentage: number
    }
  }
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
  holders?: number
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