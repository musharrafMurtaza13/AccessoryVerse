export function PandaLogo({ size = 40 }: { size?: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-slate-200 flex items-center justify-center p-1 shadow-md"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="30" cy="25" r="14" fill="#000" />
        <circle cx="70" cy="25" r="14" fill="#000" />
        <circle cx="50" cy="55" r="35" fill="#fff" stroke="#000" strokeWidth="3" />
        <circle cx="38" cy="48" r="9" fill="#000" />
        <circle cx="62" cy="48" r="9" fill="#000" />
        <circle cx="36" cy="46" r="3" fill="#fff" />
        <circle cx="64" cy="46" r="3" fill="#fff" />
        <ellipse cx="50" cy="60" rx="6" ry="4" fill="#000" />
      </svg>
    </div>
  );
}

export function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <div onClick={onClick} className="flex items-center space-x-3 cursor-pointer select-none group">
      <div className="group-hover:scale-105 transition-transform">
        <PandaLogo />
      </div>
      <span className="font-serif italic text-2xl font-semibold tracking-tight">Coder's Shop</span>
    </div>
  );
}