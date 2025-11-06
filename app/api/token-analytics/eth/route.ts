import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: "Token address is required" }, { status: 400 });
  }

  try {
    // === Only use real data from available APIs ===
    
    // Get basic token info from CoinGecko
    const cgUrl = `${process.env.COINGECKO_API_URL}/coins/ethereum/contract/${address}`;
    const cgRes = await fetch(cgUrl);
    const cgData = cgRes.ok ? await cgRes.json() : null;

    // Get token info from Ethplorer (real holder count)
    const ethplorerUrl = `${process.env.ETHPLORER_API_URL}/getTokenInfo/${address}?apiKey=${process.env.ETHPLORER_API_KEY}`;
    const ethplorerRes = await fetch(ethplorerUrl);
    const ethplorerData = ethplorerRes.ok ? await ethplorerRes.json() : null;

    // Try to get real transaction data from Etherscan (limited but real)
    const etherscanKey = process.env.ETHERSCAN_API_KEY;
    let realTransfers = [];
    
    try {
      const transfersUrl = `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${address}&page=1&offset=100&sort=desc&apikey=${etherscanKey}`;
      const transfersRes = await fetch(transfersUrl);
      const transfersData = await transfersRes.json();
      
      if (transfersData.status === "1" && transfersData.result) {
        realTransfers = transfersData.result;
      }
    } catch (e) {
      console.log("Could not fetch real transfer data");
    }

    // Only return data we can actually verify as real
    const analytics = {
      // Only show holder distribution if we have real holder count
      holderDistribution: ethplorerData?.holdersCount ? [{
        range: "Total Holders",
        percentage: 100,
        holders: ethplorerData.holdersCount,
        actualHolders: ethplorerData.holdersCount
      }] : null,
      
      // Only show acquisition if we have real transfer data
      acquisitionBreakdown: realTransfers.length > 0 ? (() => {
        // Analyze real transfers only
        const dexContracts = [
          '0x7a250d5630b4cf539739df2c5dacb4c659f2488d', // Uniswap V2 Router
          '0xe592427a0aece92de3edee1f18e0157c05861564', // Uniswap V3 Router
          '0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f', // SushiSwap Router
          '0x1111111254fb6c44bac0bed2854e76f90643097d', // 1inch Router
        ];

        const acquisitionTypes = { swap: 0, transfer: 0, airdrop: 0 };

        realTransfers.forEach(tx => {
          const fromAddress = tx.from?.toLowerCase();
          const toAddress = tx.to?.toLowerCase();
          
          if (dexContracts.some(dex => fromAddress?.includes(dex.toLowerCase()) || toAddress?.includes(dex.toLowerCase()))) {
            acquisitionTypes.swap++;
          } else if (fromAddress === address.toLowerCase() || fromAddress === '0x0000000000000000000000000000000000000000') {
            acquisitionTypes.airdrop++;
          } else {
            acquisitionTypes.transfer++;
          }
        });

        return [
          { method: "Swap", count: acquisitionTypes.swap, color: "#8b5cf6" },
          { method: "Transfer", count: acquisitionTypes.transfer, color: "#3b82f6" },
          { method: "Airdrop", count: acquisitionTypes.airdrop, color: "#10b981" }
        ];
      })() : null,
      
      // No top holders data available with free APIs - set to null
      topHolders: null,
      
      // Real data we can provide
      totalHolders: ethplorerData?.holdersCount || 0,
      totalTransfers: realTransfers.length,
      isRealData: true,
      
      // Additional real metrics we can show
      realMetrics: {
        volume24h: cgData?.market_data?.total_volume?.usd || null,
        marketCap: cgData?.market_data?.market_cap?.usd || null,
        priceChange24h: cgData?.market_data?.price_change_percentage_24h || null,
        lastUpdated: new Date().toISOString()
      }
    };

    return NextResponse.json(analytics);

  } catch (error) {
    console.error("Error fetching token analytics:", error);
    return NextResponse.json({ error: "Failed to fetch token analytics" }, { status: 500 });
  }
}