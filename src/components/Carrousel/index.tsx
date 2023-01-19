'use client'

import Image from 'next/image'

import 'keen-slider/keen-slider.min.css'

import { useKeenSlider } from 'keen-slider/react'
import Link from 'next/link'
import { currencyFormatter } from '~/utils/formatter'

interface CarrouselProps {
  products: Array<{
    id: string
    imageUrl: string
    name: string
    price: number
  }>
}

export const Carrousel = ({ products = [] }: CarrouselProps) => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 2.25,
      spacing: 48,
    },
  })

  return (
    <div ref={sliderRef} className="carrousel keen-slider">
      {products.map(({ id, imageUrl, name, price }) => (
        <Link key={id} href={`/products/${id}`}>
          <div className="carrousel-item keen-slider__slide">
            <Image src={imageUrl} alt="" width={520} height={480} />

            <footer className="carrousel-item-footer">
              <strong>{name}</strong>
              <span>{currencyFormatter.format(price / 100)}</span>
            </footer>
          </div>
        </Link>
      ))}
    </div>
  )
}
