'use client'

import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import { useAsideContext } from '~/contexts/aside'
import { Card } from './Card'

export const Aside = () => {
  const { isVisible, setIsVisible } = useAsideContext()

  const [isLoading, setIsLoading] = useState(false)

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleCheckout = async () => {
    setIsLoading(true)

    try {
      const { data } = await axios.post('/api/checkout', {
        priceId: '2021-08-01',
        cancelUrl: window.location.href,
      })

      window.location.href = data.url
    } catch {
      setIsLoading(false)
    }
  }

  return (
    <div className={`aside ${isVisible ? 'aside--visible' : ''}`}>
      <div
        role="presentation"
        className="aside-shadow"
        onClick={handleClose}
      ></div>

      <aside className="aside-container">
        <button type="button" className="aside-close" onClick={handleClose}>
          <Image src="/close.svg" alt="" width={24} height={24} />
        </button>

        <header className="aside-header">
          <strong>Sacola de compras</strong>
        </header>

        <div className="aside-content">
          <Card imageUrl="" name="Camiseta" price={120} />

          <Card imageUrl="" name="Camiseta" price={30} />
        </div>

        <footer className="aside-footer">
          <small>
            <span>Quantidade</span>
            <span>3 itens</span>
          </small>

          <p>
            <span>Valor total</span>
            <span>R$ 270,00</span>
          </p>

          <button
            type="submit"
            className="aside-footer-action"
            onClick={handleCheckout}
            disabled={isLoading}
          >
            Finalizar compra
          </button>
        </footer>
      </aside>
    </div>
  )
}
