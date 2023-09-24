import { AuthProvider } from '@/Context/AuthProvider'
import { VendorProvider } from '@/Context/VendorProvider'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <VendorProvider>
        <Component {...pageProps} />
      </VendorProvider>
    </AuthProvider>
  )
}
