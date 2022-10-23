import PageLayout from '@shared/components/PageLayout';
import 'antd/dist/antd.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import GoogleAnalytics from '@shared/components/GoogleAnalytics';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  return (
    <SessionProvider session={session}>
      <PageLayout>
        <GoogleAnalytics />
        <Component {...pageProps} />
      </PageLayout>
    </SessionProvider>
  )
}

export default MyApp
