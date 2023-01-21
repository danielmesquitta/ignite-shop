import { NextApiRequest, NextApiResponse } from 'next'
import { stripeSdk } from '~/services/stripeSdk'

export interface CheckoutRequestBody {
  products: Array<{
    priceId: string
  }>
  cancelUrl?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' })

  const { products, cancelUrl } = req.body as CheckoutRequestBody

  const checkoutSession = await stripeSdk.checkout.sessions.create({
    cancel_url: cancelUrl || process.env.NEXT_URL,
    success_url: `${process.env.NEXT_URL}/success?sessionId={CHECKOUT_SESSION_ID}`,
    mode: 'payment',
    line_items: products.map(({ priceId }) => ({
      price: priceId,
      quantity: 1,
    })),
  })

  return res.status(201).json({ url: checkoutSession.url })
}
