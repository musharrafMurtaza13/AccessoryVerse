import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  /** Optional icon/logo shown before the title */
  leading?: ReactNode;
  heavyBackdrop?: boolean;
}

export function Modal({ open, onClose, title, children, leading, heavyBackdrop = false }: ModalProps) {
  const { t } = useTheme();

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn ${
        heavyBackdrop ? 'bg-black/70 backdrop-blur-md' : 'bg-black/60 backdrop-blur-sm'
      }`}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`w-full max-w-md rounded-2xl p-6 shadow-2xl border ${t.modal}`}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center space-x-2">
            {leading}
            <h2 className="text-xl font-bold">{title}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className={`p-1.5 rounded-full hover:bg-gray-500/10 ${t.modalClose}`}
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}