interface CarIconProps {
  color: string;
  className?: string;
}

function CarIcon({ color, className = '' }: CarIconProps) {
  return (
    <svg
      className={className}
      width="60"
      height="28"
      viewBox="0 0 120 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 35 L10 35 Q5 35 5 30 L5 28 Q5 25 8 25 L25 25 L35 15 Q38 12 42 12 L78 12 Q82 12 85 15 L95 25 L112 25 Q115 25 115 28 L115 30 Q115 35 110 35 L100 35"
        fill={color}
        stroke={color}
        strokeWidth="1"
      />

      <path
        d="M38 24 L46 14 Q48 12 50 14 L72 14 Q74 14 72 14 L82 24"
        fill="rgba(0, 240, 255, 0.25)"
        stroke="rgba(0, 240, 255, 0.4)"
        strokeWidth="0.5"
      />

      <circle cx="30" cy="35" r="8" fill="#1a1a2e" stroke="#555" strokeWidth="2" />
      <circle cx="30" cy="35" r="4" fill="#333" stroke="#777" strokeWidth="1" />

      <circle cx="90" cy="35" r="8" fill="#1a1a2e" stroke="#555" strokeWidth="2" />
      <circle cx="90" cy="35" r="4" fill="#333" stroke="#777" strokeWidth="1" />

      <rect x="110" y="24" width="6" height="4" rx="1" fill="#ffe600" opacity="0.9" />

      <rect x="5" y="26" width="4" height="3" rx="1" fill="#ff2d2d" opacity="0.8" />

      <line x1="40" y1="18" x2="80" y2="18" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
    </svg>
  );
}

export default CarIcon;
