'use client'

import Image from 'next/image'
import { currencyFormatter } from '~/utils/formatter'

interface CardProps {
  imageUrl: string
  name: string
  price: number
}

export const Card = ({ imageUrl, name, price }: CardProps) => {
  const handleRemoveClick = () => {}

  return (
    <div className="aside-card">
      <div className="aside-card-image">
        <Image src={imageUrl} alt="" width={96} height={96} />
      </div>

      <div className="aside-card-content">
        <span>{name}</span>

        <strong>{currencyFormatter.format(price / 100)}</strong>

        <button type="button" onClick={handleRemoveClick}>
          Remover
        </button>
      </div>
    </div>
  )
}
