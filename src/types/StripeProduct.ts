import type Stripe from 'stripe'

export interface StripeProduct extends Stripe.Product {
  default_price: Stripe.Price
}
