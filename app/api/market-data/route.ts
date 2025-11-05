import { NextResponse } from "next/server";

// Mock market data
const MOCK_MARKET_DATA = {
  overview: {
    totalMarketCap: 4000000000000, // $4T
    totalVolume24h: 134000000000, // $134B
    btcDominance: 58.2,
    totalCoins: 19413,
    fearGreedIndex: 42,
    marketSentiment: "bearish",
    sentimentScore: 32,
    lastUpdated: new Date().toISOString()
  },
  chartData: {
    marketCap: [
      { time: "00:00", value: 42000, volume: 1200 },
      { time: "04:00", value: 41500, volume: 1400 },
      { time: "08:00", value: 43200, volume: 1800 },
      { time: "12:00", value: 42800, volume: 1600 },
      { time: "16:00", value: 44100, volume: 2100 },
      { time: "20:00", value: 43800, volume: 1900 },
      { time: "24:00", value: 44500, volume: 2300 }
    ],
    fundingTrend: [
      { month: "Nov-22", amount: 1.38, projects: 90 },
      { month: "Jan-23", amount: 1.37, projects: 85 },
      { month: "Mar-23", amount: 0.76, projects: 70 },
      { month: "May-23", amount: 1.68, projects: 95 },
      { month: "Jul-23", amount: 0.49, projects: 60 },
      { month: "Sep-23", amount: 1.03, projects: 80 },
      { month: "Nov-23", amount: 1.68, projects: 100 },
      { month: "Jan-24", amount: 1.26, projects: 85 },
      { month: "Mar-24", amount: 3.79, projects: 140 },
      { month: "May-24", amount: 5.79, projects: 180 },
      { month: "Jul-24", amount: 4.81, projects: 160 },
      { month: "Sep-24", amount: 5.11, projects: 170 },
      { month: "Nov-24", amount: 3.13, projects: 130 },
      { month: "Jan-25", amount: 1.24, projects: 90 },
      { month: "Mar-25", amount: 2.29, projects: 110 },
      { month: "May-25", amount: 4.06, projects: 150 }
    ]
  },
  analytics: {
    topCategories: [
      { category: "Infrastructure, Layer1", value: 95, count: 450 },
      { category: "Layer1 Blockchain", value: 88, count: 420 },
      { category: "Web Infrastructure Solutions", value: 82, count: 390 },
      { category: "Decentralized Social Networks", value: 78, count: 365 },
      { category: "Delta-neutral Stablecoin", value: 71, count: 340 },
      { category: "Data Monetization Platform", value: 68, count: 325 },
      { category: "Ethereum L2 using Bitcoin", value: 65, count: 310 },
      { category: "Web3 Game Studio", value: 62, count: 295 },
      { category: "Synthetic Dollar Protocol", value: 58, count: 280 },
      { category: "Verifiable Data Standards", value: 55, count: 265 }
    ],
    fundingStages: [
      { name: "Seed", value: 29.11, count: 2998, color: "#3b82f6" },
      { name: "Strategic", value: 10.2, count: 1050, color: "#8b5cf6" },
      { name: "Series A", value: 9.59, count: 987, color: "#06b6d4" },
      { name: "Pre-Seed", value: 6.9, count: 710, color: "#10b981" },
      { name: "Series B", value: 2.97, count: 306, color: "#84cc16" },
      { name: "M&A", value: 2.88, count: 296, color: "#14b8a6" },
      { name: "Others", value: 38.36, count: 3950, color: "#64748b" }
    ],
    topInvestors: [
      { name: "Coinbase Ventures", deals: 78, leadDeals: 45, color: "#3b82f6" },
      { name: "Animoca Brands", deals: 87, leadDeals: 52, color: "#8b5cf6" },
      { name: "Amber Group", deals: 35, leadDeals: 18, color: "#06b6d4" },
      { name: "YZi Labs", deals: 35, leadDeals: 20, color: "#10b981" },
      { name: "GSR", deals: 34, leadDeals: 16, color: "#84cc16" },
      { name: "Selini Capital", deals: 34, leadDeals: 19, color: "#14b8a6" },
      { name: "Pantera Capital", deals: 34, leadDeals: 21, color: "#f97316" },
      { name: "a16z CSX", deals: 33, leadDeals: 17, color: "#ec4899" }
    ]
  }
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const section = searchParams.get("section") || "all";
  
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    switch (section) {
      case "overview":
        return NextResponse.json({
          data: MOCK_MARKET_DATA.overview,
          timestamp: new Date().toISOString()
        });
        
      case "charts":
        return NextResponse.json({
          data: MOCK_MARKET_DATA.chartData,
          timestamp: new Date().toISOString()
        });
        
      case "analytics":
        return NextResponse.json({
          data: MOCK_MARKET_DATA.analytics,
          timestamp: new Date().toISOString()
        });
        
      case "all":
      default:
        return NextResponse.json({
          data: MOCK_MARKET_DATA,
          timestamp: new Date().toISOString()
        });
    }
    
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch market data" },
      { status: 500 }
    );
  }
}