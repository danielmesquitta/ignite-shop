import Stripe from 'stripe'

export const stripeSdk = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})
