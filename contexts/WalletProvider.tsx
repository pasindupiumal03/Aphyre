"use client"

import React, { ReactNode, useMemo, useEffect, useState } from 'react';
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [mounted, setMounted] = useState(false);
  
  // Use the custom RPC endpoint provided
  const endpoint = 'https://rpc-mainnet.solanatracker.io/?api_key=8b90bec5-e575-4212-9c39-4e2496f29a2f';
  
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
    ],
    []
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  // Always render the providers, but handle SSR gracefully
  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect={false}>
        {mounted ? children : <div suppressHydrationWarning>{children}</div>}
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
}