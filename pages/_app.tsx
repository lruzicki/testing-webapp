import '../styles/globals.less'
import { IntlProvider, } from 'react-intl'
import { useRouter } from 'next/router'
import React from 'react'
import Head from 'next/head'
import * as translations from '../translations'
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  const { locale } = router

  const messages = { ...translations.en, ...translations[locale as keyof typeof translations] }

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0' />
      </Head>
      <IntlProvider locale={locale as keyof typeof translations} defaultLocale='en' messages={messages}>
        <Component {...pageProps} />
      </IntlProvider>
    </>
  )
}

export default App
