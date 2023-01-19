import type { RequestInit } from 'next/dist/server/web/spec-extension/request'

export const fetchStripeApi = async <T>(path: string, init?: RequestInit) => {
  if (path[0] !== '/') {
    path = `/${path}`
  }

  const res = await fetch(`https://api.stripe.com/v1${path}`, {
    ...init,

    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,

      ...init?.headers,
    },
  })

  return res.json() as Promise<T>
}
