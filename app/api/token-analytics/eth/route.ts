import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: "Token address is required" }, { status: 400 });
  }

  try {
    // === Only use real data sources ===
    
    // Get token info from Ethplorer (has real holder count)
    const ethplorerUrl = `${process.env.ETHPLORER_API_URL}/getTokenInfo/${address}?apiKey=${process.env.ETHPLORER_API_KEY}`;
    const ethplorerRes = await fetch(ethplorerUrl);
    const ethplorerData = ethplorerRes.ok ? await ethplorerRes.json() : null;

    // Get basic token info from CoinGecko (real market data)
    const cgUrl = `${process.env.COINGECKO_API_URL}/coins/ethereum/contract/${address}`;
    const cgRes = await fetch(cgUrl);
    const cgData = cgRes.ok ? await cgRes.json() : null;

    // Try to get real top holders from Ethplorer (limited but real data)
    const holdersUrl = `${process.env.ETHPLORER_API_URL}/getTopTokenHolders/${address}?apiKey=${process.env.ETHPLORER_API_KEY}&limit=10`;
    const holdersRes = await fetch(holdersUrl);
    const holdersData = holdersRes.ok ? await holdersRes.json() : null;

    // Only return real data or null
    const getRealHolderDistribution = (holdersData: any, ethplorerData: any) => {
      // If we don't have real holder data, return empty
      if (!holdersData?.holders || !ethplorerData?.totalSupply) {
        return [];
      }

      const totalSupply = parseFloat(ethplorerData.totalSupply);
      const holders = holdersData.holders;
      
      if (holders.length === 0) return [];

      // Calculate real distribution from actual holder data
      const ranges = [
        { range: "Top 10", count: Math.min(10, holders.length) },
        { range: "Top 25", count: Math.min(25, holders.length) },
        { range: "Top 50", count: Math.min(50, holders.length) },
        { range: "Top 100", count: Math.min(100, holders.length) }
      ];

      return ranges.map(({ range, count }) => {
        if (count > holders.length) return null;

        const relevantHolders = holders.slice(0, count);
        const totalBalance = relevantHolders.reduce((sum: number, holder: any) => {
          const balance = parseFloat(holder.balance) / Math.pow(10, ethplorerData.decimals || 18);
          return sum + balance;
        }, 0);

        const percentage = totalSupply > 0 ? (totalBalance / (totalSupply / Math.pow(10, ethplorerData.decimals || 18))) * 100 : 0;

        return {
          range,
          percentage: Math.round(percentage * 100) / 100,
          holders: count,
          actualHolders: relevantHolders.length
        };
      }).filter(Boolean);
    };

    // Only return real acquisition data if we have transaction history
    const getRealAcquisitionData = () => {
      // Since free APIs don't provide transaction classification,
      // return empty array instead of mock data
      return [];
    };

    // Format real top holders data
    const getRealTopHolders = (holdersData: any, ethplorerData: any) => {
      if (!holdersData?.holders || !ethplorerData) {
        return [];
      }

      const totalSupply = parseFloat(ethplorerData.totalSupply);
      const decimals = ethplorerData.decimals || 18;

      return holdersData.holders.slice(0, 6).map((holder: any, index: number) => {
        const balance = parseFloat(holder.balance) / Math.pow(10, decimals);
        const percentage = totalSupply > 0 ? (balance / (totalSupply / Math.pow(10, decimals))) * 100 : 0;
        
        // Format address for display
        const address = holder.address;
        const displayAddress = address.length > 10 
          ? `${address.slice(0, 8)}...${address.slice(-6)}`
          : address;

        return {
          address: displayAddress,
          fullAddress: address,
          balance: balance.toLocaleString(undefined, { maximumFractionDigits: 2 }),
          usdValue: "N/A", // Real USD calculation would need current price
          percentage: percentage.toFixed(2)
        };
      });
    };

    const analytics = {
      holderDistribution: getRealHolderDistribution(holdersData, ethplorerData),
      acquisitionBreakdown: getRealAcquisitionData(),
      topHolders: getRealTopHolders(holdersData, ethplorerData),
      totalHolders: ethplorerData?.holdersCount || 0,
      totalTransfers: 0, // Not available with free APIs
      isRealData: true // Flag to indicate this is real data only
    };

    return NextResponse.json(analytics);

  } catch (error) {
    console.error("Error fetching token analytics:", error);
    return NextResponse.json({ error: "Failed to fetch token analytics" }, { status: 500 });
  }
}