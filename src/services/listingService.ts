import { request, USE_MOCK_LISTINGS } from '../lib/api';
import { formatDate, parseApiDate, parsePrice } from '../lib/format';
import type { Listing, ListingStatus, NewListing } from '../types';

/**
 * Go API (Render):
 *   GET    /listings
 *   POST   /listings       {title,description,price,city,status}
 *   DELETE /listings/:id
 *
 * Go returns status as a number. EDIT THIS MAP if your meanings differ.
 */
const STATUS_FROM_API: Record<number, ListingStatus> = {
  1: 'Active',
  2: 'Processing',
  3: 'Sold',
};
const STATUS_TO_API: Record<ListingStatus, number> = {
  Active: 1,
  Processing: 2,
  Sold: 3,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toListing = (r: any): Listing => ({
  id: r.id,
  title: r.title,
  city: r.city,
  price: parsePrice(r.price),
  description: r.description ?? '',
  posted: parseApiDate(r.created_at),
  status: typeof r.status === 'number' ? STATUS_FROM_API[r.status] ?? 'Active' : r.status ?? 'Active',
  imageUrl: r.image_url ?? r.imageUrl ?? '',
});

const realListings = {
  list: async () => ((await request<unknown[]>('/listings')) ?? []).map(toListing),
  create: async (input: NewListing) => {
    const created = await request<unknown>('/listings', {
      method: 'POST',
      body: JSON.stringify({
        title: input.title,
        city: input.city,
        description: input.description,
        price: input.price, // sent as a string, same as the API returns it
        status: STATUS_TO_API[input.status],
      }),
    });
    // If your POST returns the created row we use it, otherwise we build it locally.
    return created && typeof created === 'object' && 'id' in created
      ? toListing(created)
      : toListing({ ...input, id: Date.now(), status: STATUS_TO_API[input.status], created_at: '' });
  },
  remove: (id: Listing['id']) => request<void>(`/listings/${id}`, { method: 'DELETE' }),
};

// ---- Fake data (VITE_USE_MOCK_LISTINGS=true) ----
let mockDb: Listing[] = [
  { id: 1, title: 'Macbook Pro', city: 'Karachi', price: 450000, description: 'Its in very good condition.', posted: '31/7/2026', status: 'Processing', imageUrl: '' },
  { id: 2, title: 'Magic Mouse', city: 'Lahore', price: 15000, description: 'Brand new magic mouse.', posted: '30/7/2026', status: 'Active', imageUrl: '' },
];

const mockListings = {
  list: async () => [...mockDb],
  create: async (input: NewListing): Promise<Listing> => {
    const created: Listing = {
      id: Date.now(),
      title: input.title,
      city: input.city,
      price: parsePrice(input.price),
      description: input.description || 'No description provided.',
      posted: formatDate(),
      status: input.status,
      imageUrl: '',
    };
    mockDb = [created, ...mockDb];
    return created;
  },
  remove: async (id: Listing['id']) => {
    mockDb = mockDb.filter((l) => l.id !== id);
  },
};

export const listingService = USE_MOCK_LISTINGS ? mockListings : realListings;