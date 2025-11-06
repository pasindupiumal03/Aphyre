import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: "Token address is required" }, { status: 400 });
  }

  // Basic Solana address validation
  const solanaAddressRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
  if (!solanaAddressRegex.test(address)) {
    return NextResponse.json({ error: "Invalid Solana token address format" }, { status: 400 });
  }

  // Check if API key is available
  const apiKey = process.env.SOLANA_TRACKER_API_KEY || process.env.NEXT_PUBLIC_SOLANA_TRACKER_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ 
      error: "Solana Tracker API key is required. Please add SOLANA_TRACKER_API_KEY to your .env.local file. Get your API key from https://solanatracker.io" 
    }, { status: 400 });
  }

  try {
    // Fetch from Solana Tracker API
    const solanaTrackerUrl = `https://data.solanatracker.io/tokens/${address}`;
    
    console.log('Fetching from:', solanaTrackerUrl);
    
    const response = await fetch(solanaTrackerUrl, {
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Solana Tracker API error:', response.status, response.statusText, errorText);
      
      if (response.status === 401) {
        return NextResponse.json({ 
          error: "Invalid API key. Please check your SOLANA_TRACKER_API_KEY in .env.local" 
        }, { status: 401 });
      }
      
      if (response.status === 404) {
        return NextResponse.json({ 
          error: "Token not found. Please check the token address." 
        }, { status: 404 });
      }
      
      return NextResponse.json({ 
        error: `Solana Tracker API error: ${response.status} ${response.statusText}` 
      }, { status: response.status });
    }

    const rawData = await response.json();
    console.log('Solana Tracker response received successfully');

    // Validate if we got valid token data
    if (!rawData.token) {
      return NextResponse.json({ 
        error: "Token not found or invalid address" 
      }, { status: 404 });
    }

    // Return the raw data structure with additional analytics
    const token = rawData.token;

    // Generate mock analytics data based on real token data
    const generateRiskAnalysis = (tokenData) => {
      const baseScore = Math.random() * 30 + 60; // 60-90 base score
      
      // Adjust based on actual data
      let rugPullRisk = Math.max(10, Math.min(40, 50 - (tokenData.marketCap / 1000000) * 5));
      let tokenHealth = Math.min(95, baseScore + (tokenData.holders || 1000) / 100);
      let communityTrust = Math.min(90, baseScore + (tokenData.volume24h || 100000) / 10000);
      let liquidityScore = Math.min(85, baseScore + (tokenData.liquidity || 50000) / 1000);
      
      return {
        rugPullRisk: Math.round(rugPullRisk),
        tokenHealth: Math.round(tokenHealth),
        communityTrust: Math.round(communityTrust),
        liquidityScore: Math.round(liquidityScore),
        overallScore: Math.round((tokenHealth + communityTrust + liquidityScore + (100 - rugPullRisk)) / 4)
      };
    };

    // Generate mock price history (24h)
    const generatePriceHistory = (currentPrice) => {
      const history = [];
      const basePrice = currentPrice || 0.001;
      
      for (let i = 0; i < 24; i++) {
        const variation = (Math.random() - 0.5) * 0.1; // ±10% variation
        const price = basePrice * (1 + variation * (i / 24));
        history.push({
          time: String(i).padStart(2, '0') + ':00',
          price: Math.max(0, price)
        });
      }
      
      return history;
    };

    // Generate mock holder distribution
    const generateHolderDistribution = (totalHolders) => {
      const holders = totalHolders || 1000;
      return [
        { range: "Top 10", percentage: 42, holders: 10 },
        { range: "Top 25", percentage: 58, holders: 25 },
        { range: "Top 50", percentage: 69, holders: 50 },
        { range: "Top 100", percentage: 78, holders: 100 },
        { range: "Top 250", percentage: 88, holders: 250 },
        { range: "Top 500", percentage: 94, holders: 500 },
      ];
    };

    // Generate mock top holders
    const generateTopHolders = (tokenData) => {
      const holders = [];
      const supply = parseFloat(tokenData.supply) || 1000000000;
      const price = tokenData.price || 0.001;
      
      const holderTypes = [
        "Raydium Pool", "Jupiter Aggregator", "Orca Pool", "Meteora Pool"
      ];
      
      for (let i = 0; i < 6; i++) {
        const percentage = Math.max(1, 15 - i * 2 + Math.random() * 2);
        const balance = (supply * percentage / 100);
        const usdValue = balance * price;
        
        holders.push({
          address: i < holderTypes.length ? holderTypes[i] : `${Math.random().toString(36).substring(2, 8)}...${Math.random().toString(36).substring(2, 8)}`,
          balance: balance.toLocaleString(),
          usdValue: `$${usdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          percentage: parseFloat(percentage.toFixed(2))
        });
      }
      
      return holders;
    };

    // Generate mock acquisition breakdown
    const generateAcquisitionBreakdown = (totalHolders) => {
      const total = totalHolders || 1000;
      
      return [
        { method: "Swap", count: Math.floor(total * 0.25), color: "#14f195" },
        { method: "Transfer", count: Math.floor(total * 0.70), color: "#9945ff" },
        { method: "Airdrop", count: Math.floor(total * 0.05), color: "#00d4ff" },
      ];
    };

    // Return raw API structure with additional analytics
    const responseData = {
      ...rawData, // Keep original structure (token, pools, events, etc.)
      // Add legacy compatibility and analytics
      riskAnalysis: generateRiskAnalysis(token),
      priceHistory: generatePriceHistory(rawData.pools?.[0]?.price?.usd || token.price),
      holderDistribution: generateHolderDistribution(token.holders),
      topHolders: generateTopHolders(token),
      acquisitionBreakdown: generateAcquisitionBreakdown(token.holders)
    };

    return NextResponse.json(responseData);
    
  } catch (error) {
    console.error("Error fetching Solana token data:", error);
    return NextResponse.json({ 
      error: "Failed to fetch token data: " + error.message 
    }, { status: 500 });
  }
}