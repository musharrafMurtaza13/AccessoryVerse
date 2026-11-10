import { useState, type FormEvent } from 'react';
import { Modal } from '../ui/Modal';
import { Input, Select, Textarea } from '../ui/FormField';
import { Button } from '../ui/Button';
import { Alert } from '../ui/Alert';
import type { ListingStatus, NewListing } from '../../types';

const STATUSES: readonly ListingStatus[] = ['Active', 'Processing', 'Sold'];
const emptyForm: NewListing = { title: '', city: '', price: '', description: '', status: 'Active' };

interface ListingFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (listing: NewListing) => Promise<void>;
}

export function ListingFormModal({ open, onClose, onSubmit }: ListingFormModalProps) {
  const [form, setForm] = useState<NewListing>(emptyForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const update = (patch: Partial<NewListing>) => setForm((f) => ({ ...f, ...patch }));

  const close = () => {
    setForm(emptyForm);
    setError('');
    onClose();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.city || !form.price) return;

    setSubmitting(true);
    setError('');
    try {
      await onSubmit(form);
      close();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not post listing.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={close} title="Add New Listing">
      <Alert message={error} />
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Title" required placeholder="e.g. MacBook Pro" value={form.title} onChange={(e) => update({ title: e.target.value })} />

        <div className="grid grid-cols-2 gap-3">
          <Input label="City" required placeholder="e.g. Mumbai" value={form.city} onChange={(e) => update({ city: e.target.value })} />
          <Input label="Price (Rs)" type="number" required placeholder="50000" value={form.price} onChange={(e) => update({ price: e.target.value })} />
        </div>

        <Textarea
          label="Description"
          rows={3}
          placeholder="Details about condition, accessories, etc."
          value={form.description}
          onChange={(e) => update({ description: e.target.value })}
        />

        <Select
          label="Status"
          options={STATUSES}
          value={form.status}
          onChange={(e) => update({ status: e.target.value as ListingStatus })}
        />

        <div className="flex justify-end space-x-3 pt-3">
          <Button type="button" variant="ghost" onClick={close}>
            Cancel
          </Button>
          <Button type="submit" disabled={submitting} className="!rounded-lg">
            {submitting ? 'Posting…' : 'Post Listing'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}