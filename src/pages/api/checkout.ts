import { NextApiRequest, NextApiResponse } from 'next'
import { stripeSdk } from '~/services/stripeSdk'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' })

  const { priceId, cancelUrl } = req.body

  const checkoutSession = await stripeSdk.checkout.sessions.create({
    cancel_url: cancelUrl || process.env.NEXT_URL,
    success_url: `${process.env.NEXT_URL}/success?sessionId={CHECKOUT_SESSION_ID}`,
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
  })

  return res.status(201).json({ url: checkoutSession.url })
}
