import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address');
  const SOLANA_TRACKER_API = process.env.SOLANA_TRACKER_API_KEY;

  if (!address) {
    return NextResponse.json({ error: 'Missing wallet address' }, { status: 400 });
  }

  try {
    // Use SolanaTracker wallet endpoint with authentication
    const response = await fetch(`https://data.solanatracker.io/wallet/${address}`, {
      headers: {
        'x-api-key': SOLANA_TRACKER_API || ''
      }
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('SolanaTracker API key is required. Please configure SOLANA_TRACKER_API_KEY in your environment variables.');
      }
      throw new Error(`SolanaTracker API error: ${response.status}`);
    }

    const data = await response.json();

    // Calculate simplified metrics
    const totalValue = data.total || 0;
    const tokenCount = data.tokens ? data.tokens.length : 0;
    
    // Find SOL balance from tokens array
    const solToken = data.tokens?.find((token: any) => 
      token.token?.symbol === 'SOL' || 
      token.token?.name === 'Native Solana' ||
      token.token?.mint === 'So11111111111111111111111111111111111111112'
    );
    const solBalance = solToken?.balance || 0;

    // Return simplified wallet data
    return NextResponse.json({
      totalValue,
      tokenCount,
      solBalance,
      totalSol: data.totalSol || 0
    });

  } catch (error) {
    console.error('Wallet lookup error:', error);
    return NextResponse.json({ 
      error: error?.toString() || 'Failed to fetch wallet data' 
    }, { status: 500 });
  }
}
