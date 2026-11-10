import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

type Variant = 'primary' | 'secondary' | 'ghost' | 'icon';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** Adds the black circle + arrow badge used on the pill buttons. */
  arrow?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
}

const sizes: Record<Size, string> = {
  sm: 'text-xs sm:text-sm px-4 py-2',
  md: 'text-sm px-5 py-2.5',
  lg: 'text-sm px-6 py-3',
};

export function Button({
  variant = 'primary',
  size = 'md',
  arrow = false,
  fullWidth = false,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const { t } = useTheme();

  const styles: Record<Variant, string> = {
    primary: 'bg-white text-black font-semibold rounded-full hover:bg-gray-100 shadow-sm',
    secondary: `${t.secondaryButton} font-medium rounded-full`,
    ghost: `${t.ghostButton} font-medium rounded-lg`,
    icon: `${t.iconButton} p-2.5 rounded-full`,
  };

  const sizeClass = variant === 'icon' ? '' : sizes[size];

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${styles[variant]} ${sizeClass} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {children}
      {arrow && (
        <span className={`bg-black rounded-full text-white ${size === 'lg' ? 'p-1.5' : 'p-1'}`}>
          <ArrowUpRight size={size === 'lg' ? 14 : 12} />
        </span>
      )}
    </button>
  );
}
