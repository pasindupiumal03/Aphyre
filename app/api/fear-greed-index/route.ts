import { NextResponse } from "next/server";

// Fear & Greed Index API from Alternative.me
const FEAR_GREED_API_URL = "https://api.alternative.me/fng/";

interface FearGreedResponse {
  name: string;
  data: Array<{
    value: string;
    value_classification: string;
    timestamp: string;
    time_until_update: string;
  }>;
  metadata: {
    error: string | null;
  };
}

function getFearGreedLabel(value: number): string {
  if (value >= 75) return "EXTREME GREED";
  if (value >= 55) return "GREED";
  if (value >= 45) return "NEUTRAL";
  if (value >= 25) return "FEAR";
  return "EXTREME FEAR";
}

function getFearGreedColor(value: number): string {
  if (value >= 75) return "#ef4444"; // red
  if (value >= 55) return "#f97316"; // orange
  if (value >= 45) return "#eab308"; // yellow
  if (value >= 25) return "#84cc16"; // lime
  return "#22c55e"; // green
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get("limit") || "1"; // Get latest by default
  
  try {
    const response = await fetch(`${FEAR_GREED_API_URL}?limit=${limit}&format=json&date_format=world`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Aphyre-Trading-App/1.0',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Fear & Greed Index: ${response.status} ${response.statusText}`);
    }

    const data: FearGreedResponse = await response.json();
    
    if (data.metadata?.error) {
      throw new Error(data.metadata.error);
    }

    if (!data.data || data.data.length === 0) {
      throw new Error("No Fear & Greed Index data available");
    }

    // Process the data
    const processedData = data.data.map(item => {
      const value = parseInt(item.value);
      const timestamp = parseInt(item.timestamp);
      
      // Ensure timestamp is valid
      const date = timestamp && timestamp > 0 ? new Date(timestamp * 1000) : new Date();
      
      return {
        value,
        label: getFearGreedLabel(value),
        classification: item.value_classification,
        color: getFearGreedColor(value),
        timestamp: item.timestamp,
        timeUntilUpdate: item.time_until_update,
        date: date.toISOString(),
        lastUpdated: date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
      };
    });

    return NextResponse.json({
      success: true,
      data: limit === "1" ? processedData[0] : processedData,
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error("Fear & Greed Index API Error:", error);
    
    // Fallback data in case of API failure
    const fallbackValue = 42;
    const fallbackDate = new Date();
    return NextResponse.json({
      success: false,
      error: error.message,
      data: {
        value: fallbackValue,
        label: getFearGreedLabel(fallbackValue),
        classification: "Fear",
        color: getFearGreedColor(fallbackValue),
        timestamp: Math.floor(Date.now() / 1000).toString(),
        timeUntilUpdate: "0",
        date: fallbackDate.toISOString(),
        lastUpdated: fallbackDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        isFallback: true,
      },
      timestamp: new Date().toISOString(),
    }, { status: 200 }); // Return 200 with fallback data instead of error
  }
}