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

  const product = checkoutSession.line_items.data[0].price!
    .product as StripeProduct

  return (
    <div className="success">
      <h1>Compra efetuada!</h1>

      <div className="success-image">
        <Image src={product.images[0]} alt="" width={400} height={250} />
      </div>

      <p>
        Uhuul <strong>{checkoutSession.customer_details!.name}</strong>, sua{' '}
        <strong>{product.name}</strong> já está a caminho da sua casa.
      </p>

      <Link href="/">Voltar ao catálogo</Link>
    </div>
  )
}

export default SuccessPage
