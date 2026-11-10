# Coder's Shop

React + TypeScript + Vite + Tailwind.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Mock mode vs. Go backend

`.env` controls this:

```
VITE_USE_MOCK=true            # fake in-browser data, no backend needed
VITE_API_URL=http://localhost:8080
```

Set `VITE_USE_MOCK=false` to call your Go API. All backend calls live in two files only:

- `src/services/authService.ts`    -> /api/auth/signup, /api/auth/signin, /api/auth/me
- `src/services/listingService.ts` -> GET/POST /api/listings, DELETE /api/listings/:id

Change the paths / JSON field names there to match your Go routes.
Your Go server must allow CORS from http://localhost:5173.

## Structure

```
src/
  components/
    ui/        Button, Modal, Input/Textarea/Select, Badge, Alert (generic)
    layout/    Header, Logo
    auth/      AuthModal (sign in + sign up)
    listings/  ListingsTable, ListingFilters, ListingFormModal, ListingThumb
    home/      Mascots, SocialProof
  context/     ThemeContext (dark/light), AuthContext (user + token)
  hooks/       useListings
  services/    authService, listingService  (Go API or mock)
  pages/       HomePage, ListingsPage, PlaceholderPage
  lib/         api.ts (fetch wrapper), format.ts
  types/       shared TypeScript types
```
