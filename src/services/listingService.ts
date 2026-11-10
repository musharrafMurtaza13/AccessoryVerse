import { request, USE_MOCK } from '../lib/api';
import { formatDate } from '../lib/format';
import type { Listing, NewListing } from '../types';

/**
 * Expected Go endpoints (change the paths here if yours differ):
 *   GET    /api/listings
 *   POST   /api/listings      {title,city,price,description,status}
 *   DELETE /api/listings/:id
 *
 * toListing() maps your Go JSON (snake_case) into the shape the UI uses.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toListing = (r: any): Listing => ({
  id: r.id,
  title: r.title,
  city: r.city,
  price: Number(r.price),
  description: r.description ?? '',
  posted: r.created_at ? formatDate(r.created_at) : r.posted ?? '',
  status: r.status ?? 'Active',
  imageUrl: r.image_url ?? r.imageUrl ?? '',
});

const realListings = {
  list: async () => (await request<unknown[]>('/api/listings')).map(toListing),
  create: async (input: NewListing) =>
    toListing(
      await request('/api/listings', {
        method: 'POST',
        body: JSON.stringify({ ...input, price: parseFloat(input.price) }),
      }),
    ),
  remove: (id: Listing['id']) => request<void>(`/api/listings/${id}`, { method: 'DELETE' }),
};

// ---- Mock (runs without backend) ----
let mockDb: Listing[] = [
  {
    id: 1,
    title: 'Macbook Pro',
    city: 'Mumbai',
    price: 50000,
    description: 'Its in very good condition.',
    posted: '31/7/2026',
    status: 'Processing',
    imageUrl: '',
  },
  {
    id: 2,
    title: 'Magic Mouse',
    city: 'Delhi',
    price: 5000,
    description: 'Brand new magic mouse unus',
    posted: '30/7/2026',
    status: 'Active',
    imageUrl:
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=150&auto=format&fit=crop&q=80',
  },
];

const mockListings = {
  list: async () => [...mockDb],
  create: async (input: NewListing): Promise<Listing> => {
    const created: Listing = {
      id: Date.now(),
      title: input.title,
      city: input.city,
      price: parseFloat(input.price),
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

export const listingService = USE_MOCK ? mockListings : realListings;
