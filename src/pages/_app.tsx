import type { AppProps } from 'next/app';
import { trpc } from '@/app/utils/trpc';
import RootLayout from '@/app/layout'; 

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default trpc.withTRPC(MyApp);