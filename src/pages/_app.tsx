import type { AppProps } from 'next/app';
import { trpc } from '@/app/utils/trpc';
import RootLayout from '@/app/layout'; 
import { AppType } from 'next/app'
import "../app/globals.css";

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  return (
      <Component {...pageProps} />
  );
}

export default trpc.withTRPC(MyApp);