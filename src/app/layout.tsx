import '~/styles/index.scss'

import { ReactNode } from 'react'
import { Aside } from '~/components/Aside'
import { Header } from '~/components/Header'
import { AsideContextProvider } from '~/contexts/aside'
import { CartContextProvider } from '~/contexts/cart'

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html>
      <head>
        <title>Ignite Shop</title>

        <meta content="width=device-width, initial-scale=1" name="viewport" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link rel="icon" href="/logo.svg" />

        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        <div className="root-layout">
          <AsideContextProvider>
            <CartContextProvider>
              <Header />

              <Aside />

              {children}
            </CartContextProvider>
          </AsideContextProvider>
        </div>
      </body>
    </html>
  )
}
