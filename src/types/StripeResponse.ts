export interface StripeResponse<T> {
  data: T
  error?: {
    message: string
    type: string
  }
}
