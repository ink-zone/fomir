import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Fomir } from 'fomir'

import { FomirUnstyled } from 'fomir-unstyled'

Fomir.use(FomirUnstyled)

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
