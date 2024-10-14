import React, { useMemo } from 'react';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import {
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SwapForm } from './components/SwapForm';
import { JUPITER_CONFIG } from './utils/constants';

const App: React.FC = () => {
  const endpoint = useMemo(() => clusterApiUrl(JUPITER_CONFIG.cluster), []);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
              <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                <Card>
                  <CardHeader>
                    <CardTitle>Solana Token Swap</CardTitle>
                    <CardDescription>Swap your Solana tokens easily and efficiently</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <WalletMultiButton className="!bg-blue-500 hover:!bg-blue-600" />
                    </div>
                    <SwapForm />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;

