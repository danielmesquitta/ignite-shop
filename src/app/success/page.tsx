import Image from 'next/image'
import Link from 'next/link'
import { fetchStripeApi } from '~/services/fetchStripeApi'
import { StripeCheckoutSession } from '~/types/StripeCheckoutSession'
import { StripeProduct } from '~/types/StripeProduct'

interface SuccessPageProps {
  searchParams: {
    sessionId: string
  }
}

const SuccessPage = async ({ searchParams }: SuccessPageProps) => {
  const checkoutSession: StripeCheckoutSession = await fetchStripeApi(
    `/checkout/sessions/${searchParams.sessionId}?expand[]=line_items&expand[]=line_items.data.price.product`,
    { cache: 'no-store' },
  )

  const products = checkoutSession.line_items.data.map(
    (item) => item.price!.product as StripeProduct,
  )

  return (
    <div className="success">
      <h1>Compra efetuada!</h1>

      <div className="success-images">
        {products.map((product) => (
          <div key={product.id} className="success-image">
            <Image src={product.images[0]} alt="" width={400} height={250} />
          </div>
        ))}
      </div>

      <p>
        Uhuul <strong>{checkoutSession.customer_details!.name}</strong>, sua
        compra de
        {` ${
          products.length === 1 ? (
            <strong>{products[0].name}</strong>
          ) : (
            `${products.length} camisetas`
          )
        } `}
        já está a caminho da sua casa.
      </p>

      <Link href="/">Voltar ao catálogo</Link>
    </div>
  )
}

export default SuccessPage
