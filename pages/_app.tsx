import PageLayout from '@shared/components/PageLayout';
import 'antd/dist/antd.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Script from 'next/script';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  return (
    <SessionProvider session={session}>
      <PageLayout>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4J6933SVTY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-4J6933SVTY');
          `}
        </Script>
        <Component {...pageProps} />
      </PageLayout>
    </SessionProvider>
  )
}

export default MyApp
