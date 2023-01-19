import type Stripe from 'stripe'

export type StripeCheckoutSession = Stripe.Checkout.Session & {
  line_items: Stripe.ApiList<Stripe.LineItem> & {
    price: Stripe.Price & {
      product: Stripe.Product
    }
  }
}
