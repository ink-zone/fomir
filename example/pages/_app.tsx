import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Fomir } from 'fomir'

import { FomirSimpleUI } from 'fomir-simple-ui'

Fomir.use(FomirSimpleUI)

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
