/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  images: {
    domains: ['files.stripe.com'],
  },

  experimental: {
    appDir: true,
  },
}
