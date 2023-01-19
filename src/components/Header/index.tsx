'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useAsideContext } from '~/contexts/aside'
import { useCartContext } from '~/contexts/cart'

export const Header = () => {
  const { cart } = useCartContext()

  const { setIsVisible } = useAsideContext()

  const handleHandbagClick = () => {
    setIsVisible(true)
  }

  return (
    <header className="header">
      <div className="header-content">
        <Link href="/">
          <Image src="/logo-full.svg" alt="" width={130} height={52} />
        </Link>

        <button className="header-handbag" onClick={handleHandbagClick}>
          <Image src="/handbag.svg" alt="" width={24} height={24} />

          <span className="header-handbag-count">{cart.length}</span>
        </button>
      </div>
    </header>
  )
}
