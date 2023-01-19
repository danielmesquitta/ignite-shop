import { Carrousel } from '~/components/Carrousel'
import { fetchStripeApi } from '~/services/fetchStripeApi'
import { StripeProduct } from '~/types/StripeProduct'
import { StripeResponse } from '~/types/StripeResponse'

const HomePage = async () => {
  const { data: products = [], error } = await fetchStripeApi<
    StripeResponse<StripeProduct[]>
  >('/products?expand[]=data.default_price', {
    next: { revalidate: 60 * 60 * 24 }, // 24 hours
  })

  const carrouselProducts = products.map(
    ({ id, name, images, default_price: price }) => ({
      id,
      name,
      imageUrl: images[0],
      price: price.unit_amount!,
    }),
  )

  if (error) {
    return JSON.stringify(error?.message)
  }

  return (
    <div className="home">
      <Carrousel products={carrouselProducts} />
    </div>
  )
}

export default HomePage
