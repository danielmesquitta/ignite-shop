'use client'

import Image from 'next/image'
import { useAsideContext } from '~/contexts/aside'
import { useCartContext } from '~/contexts/cart'
import { Product } from '~/types/Product'
import { currencyFormatter } from '~/utils/formatter'

export const ProductCard = ({
  id,
  imageUrl,
  name,
  price,
  description,
  priceId,
}: Product) => {
  const { addProduct } = useCartContext()
  const { setIsVisible } = useAsideContext()

  const handleAddToCart = () => {
    addProduct({
      id,
      imageUrl,
      name,
      price,
      description,
      priceId,
    })

    setIsVisible(true)
  }

  return (
    <div className="product-card">
      <div className="product-image">
        <Image src={imageUrl} alt="" width={520} height={480} />
      </div>

      <div className="product-info">
        <h1>{name}</h1>

        <span>{currencyFormatter.format(price / 100)}</span>

        <p>{description}</p>

        <button type="button" onClick={handleAddToCart}>
          Colocar na sacola
        </button>
      </div>
    </div>
  )
}
