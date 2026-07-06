# SHOP.CO — eShop Frontend

Next.js 15 (App Router) storefront backed by the NestJS API in `eShop-backend-main`.

## Features

- Product catalog from the API: home sections (New Arrivals, Top Selling), category filter, search, on-sale filter
- Auth: sign up / sign in / logout (JWT httpOnly cookie via the backend), session-aware navbar
- Cart: add-to-cart with color/size variants, quantity controls, live badge, order summary
- Checkout: shipping address form → order placement (mock payment) → confirmation page
- Profile: edit name, order history
- Redux Toolkit for global state (auth, cart), light/dark theme

## Setup

1. Start the backend first (see `../eShop-backend-main/README.md`) — it serves `http://localhost:4000`.
2. Then:

```bash
npm install
cp .env.example .env.local   # NEXT_PUBLIC_API_URL, defaults to http://localhost:4000/api
npm run dev                  # http://localhost:3000
```

## Scripts

```bash
npm run dev     # dev server (Turbopack)
npm run build   # production build
npm start       # serve production build
npm test        # vitest unit tests
npm run lint    # eslint
```

## Structure

```
src/
├── app/                # routes: /, /products, /products/[id], /cart, /checkout,
│                       #         /orders/[id], /profile, /signin, /signup
├── components/         # Nav, footer, sections, product/cart/review cards, ui primitives
├── lib/                # api client, useApiFetch hook, shared constants
├── store/              # Redux store, auth + cart slices
└── types/              # shared API types
```

If port 3000 is taken, Next falls back to 3001+ — the backend's dev CORS accepts any localhost port. If the dev server ever serves a 500 after lots of file changes, clear the cache: `rm -rf .next && npm run dev`.
