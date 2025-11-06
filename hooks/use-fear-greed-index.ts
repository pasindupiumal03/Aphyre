import { useState, useEffect, useCallback } from 'react';

interface FearGreedData {
  value: number;
  label: string;
  classification: string;
  color: string;
  timestamp: string;
  timeUntilUpdate: string;
  date: string;
  lastUpdated?: string;
  isFallback?: boolean;
}

interface UseFearGreedIndexReturn {
  fearGreedData: FearGreedData | null;
  isLoading: boolean;
  error: string | null;
  refreshFearGreed: () => void;
}

export function useFearGreedIndex(): UseFearGreedIndexReturn {
  const [fearGreedData, setFearGreedData] = useState<FearGreedData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFearGreedIndex = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/fear-greed-index', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setFearGreedData(result.data);
      } else {
        // Use fallback data if API fails but still returns data
        if (result.data) {
          setFearGreedData(result.data);
          setError(result.error || 'Using fallback data');
        } else {
          throw new Error(result.error || 'Failed to fetch Fear & Greed Index');
        }
      }
    } catch (err: any) {
      console.error('Fear & Greed Index fetch error:', err);
      setError(err.message || 'Failed to fetch Fear & Greed Index');
      
      // Set fallback data on complete failure
      setFearGreedData({
        value: 42,
        label: 'NEUTRAL',
        classification: 'Fear',
        color: '#eab308',
        timestamp: Math.floor(Date.now() / 1000).toString(),
        timeUntilUpdate: '0',
        date: new Date().toISOString(),
        lastUpdated: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        isFallback: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshFearGreed = useCallback(() => {
    fetchFearGreedIndex();
  }, [fetchFearGreedIndex]);

  useEffect(() => {
    fetchFearGreedIndex();
  }, [fetchFearGreedIndex]);

  return {
    fearGreedData,
    isLoading,
    error,
    refreshFearGreed,
  };
}