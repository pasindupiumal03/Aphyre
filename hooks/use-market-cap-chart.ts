import { useState, useEffect } from 'react';

interface MarketCapDataPoint {
  date: string;
  timestamp: number;
  marketCap: number;
  change: number;
}

interface MarketCapStats {
  current: number;
  dailyChange: number;
  monthlyChange: number;
  high30d: number;
  low30d: number;
  totalVolume24h: number;
  btcDominance: number;
  ethDominance: number;
}

interface MarketCapChartData {
  success: boolean;
  data: MarketCapDataPoint[];
  stats: MarketCapStats;
  lastUpdated: string;
  isFallback?: boolean;
  error?: string;
}

export function useMarketCapChart() {
  const [chartData, setChartData] = useState<MarketCapChartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMarketCapChart = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/market-cap-chart');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setChartData(data);
    } catch (err) {
      console.error('Error fetching market cap chart:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch market cap chart');
      
      // Set fallback data on error
      setChartData({
        success: false,
        data: [],
        stats: {
          current: 3500,
          dailyChange: -0.8,
          monthlyChange: 5.2,
          high30d: 3800,
          low30d: 3200,
          totalVolume24h: 45,
          btcDominance: 58.2,
          ethDominance: 12.4
        },
        lastUpdated: new Date().toISOString(),
        isFallback: true,
        error: 'Failed to load chart data'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshChart = () => {
    fetchMarketCapChart();
  };

  useEffect(() => {
    fetchMarketCapChart();
  }, []);

  return {
    chartData,
    isLoading,
    error,
    refreshChart
  };
}