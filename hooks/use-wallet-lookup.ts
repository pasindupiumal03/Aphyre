import { useState, useCallback } from 'react'

export interface WalletBalance {
  mint: string
  amount: number
  decimals: number
  token?: {
    name?: string
    symbol?: string
    image?: string
  }
  logoURI?: string
  symbol?: string
  name?: string
}

export interface WalletData {
  balances: {
    tokens: WalletBalance[]
    nativeBalance: number
  }
  transactions: any[]
}

export interface ProcessedToken {
  mint: string
  name: string
  symbol: string
  balance: number
  logoURI: string
  rawBalance: number
  decimals: number
}

export interface WalletSummary {
  address: string
  totalValue: string
  tokenCount: number
  solBalance: number
  tokens: ProcessedToken[]
}

export function useWalletLookup() {
  const [data, setData] = useState<WalletData | null>(null)
  const [walletSummary, setWalletSummary] = useState<WalletSummary | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const processTokenData = (balances: WalletData['balances'], address: string): WalletSummary => {
    const solBalance = balances.nativeBalance / 1e9 // Convert lamports to SOL
    const tokens: ProcessedToken[] = []

    if (balances.tokens) {
      balances.tokens.forEach((token) => {
        const balance = token.amount / Math.pow(10, token.decimals)
        
        // Skip tokens with zero balance
        if (balance > 0) {
          tokens.push({
            mint: token.mint,
            name: token.token?.name || token.name || 'Unknown Token',
            symbol: token.token?.symbol || token.symbol || 'UNKNOWN',
            balance: balance,
            logoURI: token.token?.image || token.logoURI || '',
            rawBalance: token.amount,
            decimals: token.decimals
          })
        }
      })
    }

    // Sort tokens by balance (descending)
    tokens.sort((a, b) => b.balance - a.balance)

    return {
      address,
      totalValue: `$${(solBalance * 150).toFixed(2)}`, // Rough SOL price estimate
      tokenCount: tokens.length + (solBalance > 0 ? 1 : 0), // Include SOL if balance > 0
      solBalance: Number(solBalance.toFixed(4)),
      tokens: tokens.slice(0, 20) // Limit to top 20 tokens
    }
  }

  const searchWallet = useCallback(async (address: string) => {
    if (!address.trim()) {
      setError('Please enter a wallet address')
      return
    }

    setIsLoading(true)
    setError(null)
    setData(null)
    setWalletSummary(null)

    try {
      const response = await fetch(`/api/wallet-lookup?address=${encodeURIComponent(address)}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const walletData: WalletData = await response.json()
      setData(walletData)
      
      // Process the data into a more UI-friendly format
      const summary = processTokenData(walletData.balances, address)
      setWalletSummary(summary)
      
    } catch (err) {
      console.error('Error fetching wallet data:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch wallet data')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearResults = useCallback(() => {
    setData(null)
    setWalletSummary(null)
    setError(null)
  }, [])

  return {
    data,
    walletSummary,
    isLoading,
    error,
    searchWallet,
    clearResults
  }
}