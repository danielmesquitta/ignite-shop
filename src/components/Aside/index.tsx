'use client'

import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import { useAsideContext } from '~/contexts/aside'
import { useCartContext } from '~/contexts/cart'
import { CheckoutRequestBody } from '~/pages/api/checkout'
import { currencyFormatter } from '~/utils/formatter'
import { Card } from './Card'

export const Aside = () => {
  const { cart, totalPrice, emptyCart } = useCartContext()

  const { isVisible, setIsVisible } = useAsideContext()

  const [isLoading, setIsLoading] = useState(false)

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleCheckout = async () => {
    setIsLoading(true)

    try {
      const { data } = await axios.post('/api/checkout', {
        products: cart.map(({ priceId }) => ({ priceId })),
        cancelUrl: window.location.href,
      } as CheckoutRequestBody)

      emptyCart()

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
          {cart.map(({ id, imageUrl, name, price }) => (
            <Card key={id} {...{ id, imageUrl, name, price }} />
          ))}
        </div>

        <footer className="aside-footer">
          <small>
            <span>Quantidade</span>
            <span>{`${cart.length} ${
              cart.length === 1 ? 'item' : 'itens'
            }`}</span>
          </small>

          <p>
            <span>Valor total</span>
            <span>{currencyFormatter.format(totalPrice / 100)}</span>
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
