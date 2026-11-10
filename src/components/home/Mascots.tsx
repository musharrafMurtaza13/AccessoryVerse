export function PandaWaving() {
  return (
    <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-2xl animate-bounce-slow">
      <ellipse cx="40" cy="110" rx="18" ry="30" fill="#18181b" transform="rotate(30 40 110)" />
      <ellipse cx="75" cy="215" rx="22" ry="14" fill="#18181b" />
      <ellipse cx="135" cy="215" rx="22" ry="14" fill="#18181b" />
      <ellipse cx="105" cy="165" rx="50" ry="50" fill="#18181b" />
      <ellipse cx="105" cy="165" rx="36" ry="38" fill="#ffffff" />
      <circle cx="45" cy="65" r="18" fill="#18181b" />
      <circle cx="155" cy="65" r="18" fill="#18181b" />
      <circle cx="105" cy="95" r="48" fill="#ffffff" stroke="#18181b" strokeWidth="4" />
      <ellipse cx="85" cy="90" rx="14" ry="18" fill="#18181b" transform="rotate(-15 85 90)" />
      <ellipse cx="125" cy="90" rx="14" ry="18" fill="#18181b" transform="rotate(15 125 90)" />
      <circle cx="87" cy="88" r="4" fill="#ffffff" />
      <circle cx="123" cy="88" r="4" fill="#ffffff" />
      <ellipse cx="105" cy="105" rx="7" ry="5" fill="#18181b" />
      <path d="M 98 114 Q 105 122 112 114" stroke="#18181b" strokeWidth="3" fill="none" strokeLinecap="round" />
      <g transform="translate(10, 80)">
        <rect x="0" y="0" width="34" height="60" rx="6" fill="#1f2937" stroke="#9ca3af" strokeWidth="2" />
        <rect x="3" y="4" width="28" height="52" rx="3" fill="#ffffff" />
        <path d="M 10 24 H 24 L 21 36 H 13 Z" fill="#eab308" />
        <circle cx="14" cy="40" r="2.5" fill="#000" />
        <circle cx="20" cy="40" r="2.5" fill="#000" />
      </g>
    </svg>
  );
}

export function PandaPeeking() {
  return (
    <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-2xl">
      <ellipse cx="145" cy="215" rx="22" ry="14" fill="#18181b" />
      <ellipse cx="95" cy="165" rx="55" ry="50" fill="#18181b" />
      <ellipse cx="95" cy="165" rx="38" ry="38" fill="#ffffff" />
      <circle cx="155" cy="75" r="16" fill="#18181b" />
      <circle cx="115" cy="95" r="42" fill="#ffffff" stroke="#18181b" strokeWidth="4" />
      <ellipse cx="130" cy="90" rx="12" ry="16" fill="#18181b" transform="rotate(15 130 90)" />
      <circle cx="128" cy="88" r="3.5" fill="#ffffff" />
      <ellipse cx="115" cy="105" rx="6" ry="4" fill="#18181b" />
    </svg>
  );
}
