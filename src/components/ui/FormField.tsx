import { forwardRef, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

/** Label wrapper shared by every field. */
export function FormField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-gray-400">
        {label}
      </label>
      {children}
    </div>
  );
}

const base = 'w-full py-2 text-sm rounded-lg outline-none border';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, icon: Icon, className = '', ...rest },
  ref,
) {
  const { t } = useTheme();
  return (
    <FormField label={label}>
      <div className="relative">
        {Icon && <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />}
        <input
          ref={ref}
          className={`${base} ${t.input} ${Icon ? 'pl-9 pr-3.5' : 'px-3.5'} ${className}`}
          {...rest}
        />
      </div>
    </FormField>
  );
});

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function Textarea({ label, className = '', ...rest }: TextareaProps) {
  const { t } = useTheme();
  return (
    <FormField label={label}>
      <textarea className={`${base} px-3.5 ${t.input} ${className}`} {...rest} />
    </FormField>
  );
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: readonly string[];
}

export function Select({ label, options, className = '', ...rest }: SelectProps) {
  const { t } = useTheme();
  return (
    <FormField label={label}>
      <select className={`${base} px-3.5 ${t.input} ${className}`} {...rest}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </FormField>
  );
}
