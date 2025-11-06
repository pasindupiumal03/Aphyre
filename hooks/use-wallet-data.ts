"use client"

import { useState, useEffect, useCallback } from "react"

export interface WalletSummary {
  totalValue: number;
  tokenCount: number;
  solBalance: number;
  totalSol: number;
}

export interface UseWalletDataReturn {
  walletSummary: WalletSummary | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useWalletData(walletAddress?: string): UseWalletDataReturn {
  const [walletSummary, setWalletSummary] = useState<WalletSummary | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchWalletData = useCallback(async () => {
    if (!walletAddress) {
      setWalletSummary(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/solana-wallet?address=${encodeURIComponent(walletAddress)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `Request failed: ${response.status}`);
      }

      const data = await response.json();
      
      // Set simplified wallet summary
      setWalletSummary({
        totalValue: data.totalValue || 0,
        tokenCount: data.tokenCount || 0,
        solBalance: data.solBalance || 0,
        totalSol: data.totalSol || 0
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching wallet data:', err);
      
      // Reset data on error
      setWalletSummary(null);
    } finally {
      setIsLoading(false);
    }
  }, [walletAddress]);

  const refetch = useCallback(() => {
    fetchWalletData();
  }, [fetchWalletData]);

  useEffect(() => {
    fetchWalletData();
  }, [fetchWalletData]);

  return {
    walletSummary,
    isLoading,
    error,
    refetch
  }
}