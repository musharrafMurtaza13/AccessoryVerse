import { useCallback, useEffect, useState } from 'react';
import { listingService } from '../services/listingService';
import type { Listing, NewListing } from '../types';

export function useListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    listingService
      .list()
      .then(setListings)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const addListing = useCallback(async (input: NewListing) => {
    const created = await listingService.create(input);
    setListings((prev) => [created, ...prev]);
  }, []);

  const removeListing = useCallback(async (id: Listing['id']) => {
    await listingService.remove(id);
    setListings((prev) => prev.filter((l) => l.id !== id));
  }, []);

  return { listings, loading, error, addListing, removeListing };
}
