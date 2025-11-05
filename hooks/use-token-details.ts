import { useState, useEffect } from 'react'

interface TokenDetails {
  name: string | null
  symbol: string | null
  logo: string | null
  address: string
  price: number | null
  change24h: number | null
  marketCap: number | null
  volume24h: number | null
  holders: number | null
  liquidity: number | null
  riskAnalysis: {
    rugPullRisk: number
    tokenHealth: number
    communityTrust: number
    liquidityScore: number
    overallScore: number
  } | null
}

export const useTokenDetails = (address: string) => {
  const [tokenData, setTokenData] = useState<TokenDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTokenDetails = async () => {
      if (!address) return

      try {
        setIsLoading(true)
        setError(null)
        
        const response = await fetch(`/api/token-details/eth?address=${address}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch token details')
        }
        
        const data = await response.json()
        
        if (data.error) {
          throw new Error(data.error)
        }
        
        setTokenData(data)
      } catch (err) {
        console.error('Error fetching token details:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch token details')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTokenDetails()
  }, [address])

  const refetch = () => {
    if (address) {
      const fetchTokenDetails = async () => {
        try {
          setIsLoading(true)
          setError(null)
          
          const response = await fetch(`/api/token-details/eth?address=${address}`)
          
          if (!response.ok) {
            throw new Error('Failed to fetch token details')
          }
          
          const data = await response.json()
          
          if (data.error) {
            throw new Error(data.error)
          }
          
          setTokenData(data)
        } catch (err) {
          console.error('Error fetching token details:', err)
          setError(err instanceof Error ? err.message : 'Failed to fetch token details')
        } finally {
          setIsLoading(false)
        }
      }

      fetchTokenDetails()
    }
  }

  return {
    tokenData,
    isLoading,
    error,
    refetch
  }
}