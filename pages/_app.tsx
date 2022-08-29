import PageLayout from '@shared/components/PageLayout';
import 'antd/dist/antd.css';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  )
}

export default MyApp
