# Kuviyam Publications storefront

React 19 and Vite storefront for the Paachcharam Tamil books collection. Pages are lazy-loaded through React Router; the Express API is in `../../Publication_backend/kuviyam-backend`.

## Local development

1. Copy `.env.example` to `.env`. The `VITE_DEV_*` defaults point to the local API at `http://localhost:5000/api` and local site origin at `http://localhost:5173`.
2. Install dependencies with `npm ci`.
3. Start the Vite server with `npm run dev`.
4. Use the backend instructions to configure the API and database.

The Razorpay public key is returned by the authenticated backend checkout route. Keep the Razorpay secret only in the backend environment.

Gallery and product image uploads are sent to the backend and stored in Cloudinary when its credentials are configured there. Gallery videos use an authenticated backend-created Mux direct upload; the browser transfers video chunks to Mux and only gallery metadata and playback IDs are stored in PostgreSQL. Keep Cloudinary and Mux credentials out of frontend environment variables.

## Deployment environments

Set `VITE_API_URL` to the deployed API origin ending in `/api` and `VITE_SITE_URL` to the public frontend origin in the hosting provider's build environment before running `npm run build`. Vite embeds these values in the generated static files, so changing them requires a new build and deployment. Local-only `VITE_DEV_API_URL` and `VITE_DEV_SITE_URL` settings do not affect production builds. If `VITE_API_URL` is omitted in production, the current Kuviyam API remains the compatibility default. Development pages set `noindex` metadata automatically.

## Build and lint

- `npm run build` creates the static production bundle in `dist/`.
- `npm run lint` runs ESLint.

Vercel rewrites client-side routes to `index.html`. Update the site URL in `.env` and `index.html` if the canonical production domain changes.
