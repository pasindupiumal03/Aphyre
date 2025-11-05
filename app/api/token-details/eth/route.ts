import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: "Token address is required" }, { status: 400 });
  }

  try {
    // === CoinGecko (Name, Symbol, Price, Market Cap, Logo) ===
    const cgUrl = `${process.env.COINGECKO_API_URL}/coins/ethereum/contract/${address}`;
    const cgRes = await fetch(cgUrl);
    const cgData = cgRes.ok ? await cgRes.json() : null;

    // === Ethplorer (Holders, Supply) ===
    const ethUrl = `${process.env.ETHPLORER_API_URL}/getTokenInfo/${address}?apiKey=${process.env.ETHPLORER_API_KEY}`;
    const ethRes = await fetch(ethUrl);
    const ethData = ethRes.ok ? await ethRes.json() : null;

    // === Dexscreener (Extra trading info: volume, liquidity, price) ===
    const dexUrl = `${process.env.DEXSCREENER_API_URL}/tokens/${address}`;
    const dexRes = await fetch(dexUrl);
    const dexData = dexRes.ok ? await dexRes.json() : null;

    // Calculate Risk Analysis Metrics
    const calculateRiskMetrics = (cgData, ethData, dexData) => {
      // Rug Pull Risk (based on liquidity, holder distribution, contract verification)
      let rugPullRisk = 50; // Base risk
      
      // Lower risk if high liquidity
      const liquidity = dexData?.pairs?.[0]?.liquidity?.usd || 0;
      if (liquidity > 1000000) rugPullRisk -= 20;
      else if (liquidity > 100000) rugPullRisk -= 10;
      else if (liquidity < 10000) rugPullRisk += 20;
      
      // Lower risk if many holders
      const holders = ethData?.holdersCount || 0;
      if (holders > 10000) rugPullRisk -= 15;
      else if (holders > 1000) rugPullRisk -= 5;
      else if (holders < 100) rugPullRisk += 15;
      
      // Market cap consideration
      const marketCap = cgData?.market_data?.market_cap?.usd || 0;
      if (marketCap > 100000000) rugPullRisk -= 10;
      else if (marketCap < 1000000) rugPullRisk += 10;

      // Token Health (based on volume, price stability, market presence)
      let tokenHealth = 50;
      
      // Higher health if good volume
      const volume24h = cgData?.market_data?.total_volume?.usd || dexData?.pairs?.[0]?.volume?.h24 || 0;
      if (volume24h > 1000000) tokenHealth += 20;
      else if (volume24h > 100000) tokenHealth += 10;
      else if (volume24h < 10000) tokenHealth -= 15;
      
      // Price stability (less volatility = better health)
      const priceChange = Math.abs(cgData?.market_data?.price_change_percentage_24h || 0);
      if (priceChange < 5) tokenHealth += 15;
      else if (priceChange < 15) tokenHealth += 5;
      else if (priceChange > 50) tokenHealth -= 20;
      
      // Market presence
      if (cgData?.name && cgData?.market_data) tokenHealth += 10;

      // Community Trust (based on holder count, social presence, verification)
      let communityTrust = 50;
      
      // More holders = more trust
      if (holders > 50000) communityTrust += 25;
      else if (holders > 10000) communityTrust += 15;
      else if (holders > 1000) communityTrust += 5;
      else if (holders < 50) communityTrust -= 20;
      
      // Verified on major platforms
      if (cgData?.name && cgData?.symbol) communityTrust += 10;
      if (ethData?.name) communityTrust += 5;

      // Liquidity Score (based on available liquidity and DEX pairs)
      let liquidityScore = 30;
      
      if (liquidity > 5000000) liquidityScore += 40;
      else if (liquidity > 1000000) liquidityScore += 30;
      else if (liquidity > 500000) liquidityScore += 20;
      else if (liquidity > 100000) liquidityScore += 10;
      else if (liquidity < 10000) liquidityScore -= 10;
      
      // Multiple DEX pairs increase liquidity score
      const pairCount = dexData?.pairs?.length || 0;
      if (pairCount > 5) liquidityScore += 10;
      else if (pairCount > 2) liquidityScore += 5;

      // Ensure scores are within 0-100 range
      rugPullRisk = Math.max(0, Math.min(100, rugPullRisk));
      tokenHealth = Math.max(0, Math.min(100, tokenHealth));
      communityTrust = Math.max(0, Math.min(100, communityTrust));
      liquidityScore = Math.max(0, Math.min(100, liquidityScore));

      // Overall risk score (weighted average, inverted for rugPullRisk)
      const overallScore = Math.round(
        (((100 - rugPullRisk) * 0.3) + (tokenHealth * 0.3) + (communityTrust * 0.2) + (liquidityScore * 0.2))
      );

      return {
        rugPullRisk: Math.round(rugPullRisk),
        tokenHealth: Math.round(tokenHealth),
        communityTrust: Math.round(communityTrust),
        liquidityScore: Math.round(liquidityScore),
        overallScore: Math.max(0, Math.min(100, overallScore))
      };
    };

    const riskMetrics = calculateRiskMetrics(cgData, ethData, dexData);

    const tokenData = {
        name: cgData?.name || ethData?.name || null,
        symbol: cgData?.symbol || ethData?.symbol || null,
        logo: cgData?.image?.large || cgData?.image?.small || null,
        address,
        price:
            cgData?.market_data?.current_price?.usd ||
            dexData?.pairs?.[0]?.priceUsd ||
            null,
        change24h:
            cgData?.market_data?.price_change_percentage_24h ??
            dexData?.pairs?.[0]?.priceChange?.h24 ??
            null,
        marketCap: cgData?.market_data?.market_cap?.usd || null,
        volume24h:
            cgData?.market_data?.total_volume?.usd ||
            dexData?.pairs?.[0]?.volume?.h24 ||
            null,
        holders: ethData?.holdersCount || null,
        riskAnalysis: riskMetrics,
        liquidity: dexData?.pairs?.[0]?.liquidity?.usd || null,
    };

    return NextResponse.json(tokenData);
  } catch (error) {
    console.error("Error fetching token data:", error);
    return NextResponse.json({ error: "Failed to fetch token data" }, { status: 500 });
  }
}
