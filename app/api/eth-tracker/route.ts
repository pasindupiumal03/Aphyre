import { NextResponse } from 'next/server';

const COINGECKO_URL = 'https://api.coingecko.com/api/v3/coins/ethereum';
const ETHERSCAN_API_KEY = 'JQC41WVP8KQFAE7HBZ57KEQ739WIG6JA27';
const ETHERSCAN_BASE = 'https://api.etherscan.io/api';
const MORALIS_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjM5YzY0OGUyLWI1ZmItNGFiNy05MmU4LWI5OTc3ZGY1MTU4ZiIsIm9yZ0lkIjoiNDc5OTMwIiwidXNlcklkIjoiNDkzNzQzIiwidHlwZUlkIjoiYTMxNmNmY2MtYWY3NS00YjhmLWFiZDMtZGJmNzljOWMyMDMxIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NjI0NDU2ODAsImV4cCI6NDkxODIwNTY4MH0.atUWnyA-taBwQpQNbAtNnb01dTZE8JN8Ju5k6BMd90A';
const MORALIS_BASE = 'https://deep-index.moralis.io/api/v2.2';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tokenAddress = searchParams.get('token');
  const action = searchParams.get('action');

  try {
    // Get base ETH data and gas prices
    const ethDataRes = await fetch(COINGECKO_URL);
    const ethDataJson = await ethDataRes.json();
    const ethMarket = ethDataJson.market_data;

    const gasRes = await fetch(`${ETHERSCAN_BASE}?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`);
    const gasData = await gasRes.json();

    let tokenData = null;
    let trendingTokens = null;

    // Get trending tokens
    if (action === 'trending' || !tokenAddress) {
      try {
        const trendingRes = await fetch(`${MORALIS_BASE}/tokens/trending?chain=eth&limit=25`, {
          headers: {
            'X-API-Key': MORALIS_API_KEY,
            'accept': 'application/json'
          }
        });
        trendingTokens = await trendingRes.json();
      } catch (trendingError) {
        console.error('Trending tokens error:', trendingError);
        trendingTokens = [];
      }
    }

    // Get specific token data
    if (tokenAddress) {
      try {
        const [tokenInfoRes, tokenPriceRes, tokenStatsRes] = await Promise.all([
          fetch(`${MORALIS_BASE}/erc20/metadata?chain=eth&addresses=${tokenAddress}`, {
            headers: {
              'X-API-Key': MORALIS_API_KEY,
              'accept': 'application/json'
            }
          }),
          fetch(`${MORALIS_BASE}/erc20/${tokenAddress}/price?chain=eth&include=percent_change`, {
            headers: {
              'X-API-Key': MORALIS_API_KEY,
              'accept': 'application/json'
            }
          }),
          fetch(`${MORALIS_BASE}/erc20/${tokenAddress}/stats?chain=eth`, {
            headers: {
              'X-API-Key': MORALIS_API_KEY,
              'accept': 'application/json'
            }
          })
        ]);

        const tokenInfoData = await tokenInfoRes.json();
        const tokenPriceData = await tokenPriceRes.json();
        const tokenStatsData = await tokenStatsRes.json();

        const tokenInfo = tokenInfoData[0];
        const tokenPrice = tokenPriceData;
        const tokenStats = tokenStatsData;

        tokenData = {
          ...tokenInfo,
          price: tokenPrice.usdPrice,
          priceChange24h: tokenPrice['24hrPercentChange'],
          marketCap: tokenStats.market_cap,
          holders: tokenStats.holders || 'N/A'
        };
      } catch (tokenError) {
        console.error('Token data error:', tokenError);
        tokenData = { error: 'Token not found or invalid address' };
      }
    }

    return NextResponse.json({
      price: ethMarket.current_price.usd,
      marketCap: ethMarket.market_cap.usd,
      volume: ethMarket.total_volume.usd,
      gas: gasData.result,
      tokenData,
      trendingTokens
    });
  } catch (error: any) {
    console.error('ETH Tracker API Error:', error?.message || error);
    return NextResponse.json({ error: 'Failed to fetch ETH data' }, { status: 500 });
  }
}