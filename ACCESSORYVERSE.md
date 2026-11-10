# AccessoryVerse

AccessoryVerse is a modern marketplace-style web app for selling and browsing accessories, gadgets, and curated digital products. The project is built with React, TypeScript, Vite, and Tailwind CSS, and is designed to work with either mock local data or a Go backend API.

## Overview

This app includes:

- A landing page with hero content and social proof
- Product/listing browsing with filters
- A listing creation modal for adding new items
- Authentication flow with sign in and sign up
- Theme switching support
- A clean dashboard-style layout for marketplace operations

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide icons
- Neon (for optional database/client integration)

## Main Features

### Home page
- Hero section and branded presentation
- Trust indicators and social proof
- Quick access to marketplace content

### Listings
- Filter listings by category, status, or other attributes
- Display listing cards and table views
- Add new listings through a modal form
- Delete existing listings when needed

### Authentication
- Sign in and sign up flows using modal UI
- Context-based auth state management
- Token-based user handling

### Theme support
- Light and dark mode via app-level theme context
- Adaptive styling across components

## Project Structure

```text
src/
  components/
    auth/
    home/
    layout/
    listings/
    ui/
  context/
  hooks/
  lib/
  pages/
  services/
  types/
```

## Run Locally

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

## Environment Configuration

The app supports mock mode and backend mode via environment variables.

```bash
VITE_USE_MOCK=true
VITE_API_URL=http://localhost:8080
```

### Behavior
- `VITE_USE_MOCK=true` uses in-browser fake data and does not require a backend.
- `VITE_USE_MOCK=false` connects to a Go backend API.

## Backend Integration

The backend API is expected to be integrated through:

- `src/services/authService.ts`
- `src/services/listingService.ts`

These service files define the API routes for:

- signup
- signin
- current user fetch
- listing fetch
- create listing
- delete listing

## Notes

- All API calls are centralized in a small number of service files for easier backend integration.
- The app is ready for custom expansion into a full marketplace or e-commerce platform.
- The frontend is structured for clean separation between UI, state, services, and page logic.

## Suggested Next Steps

- Connect the app to a real database-backed backend
- Add product images and rich listing details
- Implement search, sorting, and pagination
- Add user profile and order management pages
- Improve validation and error handling for forms
