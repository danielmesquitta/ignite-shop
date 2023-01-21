import { GetStaticPaths } from 'next'
import { fetchStripeApi } from '~/services/fetchStripeApi'
import { StripeProduct } from '~/types/StripeProduct'
import { StripeResponse } from '~/types/StripeResponse'
import { ProductCard } from './ProductCard'

interface ProductPageProps {
  params: {
    id: string
  }
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const product = await fetchStripeApi<StripeProduct>(
    `/products/${params.id}?expand[]=default_price`,
  )

  return (
    <div className="product">
      <ProductCard
        id={product.id}
        name={product.name}
        description={product.description!}
        imageUrl={product.images[0]}
        price={product.default_price.unit_amount!}
        priceId={product.default_price.id}
      />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: products } = await fetchStripeApi<
    StripeResponse<StripeProduct[]>
  >('/products')

  return {
    paths: products.map(({ id }) => ({ params: { id } })),
    fallback: true,
  }
}

export default ProductPage
