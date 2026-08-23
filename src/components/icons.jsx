export function TempleIcon(props) {
  return (
    <svg viewBox="0 0 50 50" fill="none" {...props}>
      <path
        d="M6 44h38M14 44V26h22v18M25 26V10M14 26 25 10 36 26"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="25" cy="6" r="2.4" fill="currentColor" />
    </svg>
  );
}

export function BeachIcon(props) {
  return (
    <svg viewBox="0 0 50 50" fill="none" {...props}>
      <path
        d="M4 40q10-6 21 0t21 0M4 46q10-5 21 0t21 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="36" cy="12" r="6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function BoatIcon(props) {
  return (
    <svg viewBox="0 0 50 50" fill="none" {...props}>
      <path
        d="M6 32h38l-6 12H12z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M25 32V8M25 8l12 8-12 4z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LakeIcon(props) {
  return (
    <svg viewBox="0 0 50 50" fill="none" {...props}>
      <ellipse cx="25" cy="30" rx="19" ry="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 19q4-8 13-8t13 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CraftIcon(props) {
  return (
    <svg viewBox="0 0 50 50" fill="none" {...props}>
      <rect x="10" y="20" width="30" height="21" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 20 25 6l15 14" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export const PLACE_ICONS = {
  temple: TempleIcon,
  beach: BeachIcon,
  boat: BoatIcon,
  lake: LakeIcon,
  craft: CraftIcon,
};

export function StayIcon(props) {
  return (
    <svg viewBox="0 0 50 50" fill="none" {...props}>
      <path
        d="M6 40V16l13-9 13 9v24M6 40h26M12 40V24h14v16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M32 24h8a4 4 0 0 1 4 4v12h-12" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function FoodIcon(props) {
  return (
    <svg viewBox="0 0 50 50" fill="none" {...props}>
      <path d="M12 6v16a4 4 0 0 0 8 0V6M16 6v14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M32 6c-4 3-4 9 0 13v25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16" cy="34" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function PalmIcon(props) {
  return (
    <svg viewBox="0 0 40 46" fill="none" {...props}>
      <path d="M20 46V22" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path
        d="M20 22C20 22 6 18 3 8M20 22C20 22 3 15 2 2M20 22C20 22 34 18 37 8M20 22C20 22 37 15 38 2M20 22C20 22 10 10 12 1M20 22C20 22 30 10 28 1"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BullockCartIcon(props) {
  return (
    <svg viewBox="0 0 64 48" fill="none" {...props}>
      <circle cx="16" cy="38" r="7" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="38" r="1.4" fill="currentColor" />
      <path d="M23 38h14V22H23z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M37 30h6l4 8h-10" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M47 38h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M47 38c6-1 10-6 12-13M59 25c1.5 0 3-1.4 3-3.4S60.5 18 59 18c-3 0-4 2-4 4M55 22c-1-3-4-4-7-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CompassRoseIcon(props) {
  return (
    <svg viewBox="0 0 60 60" fill="none" {...props}>
      <circle cx="30" cy="30" r="22" stroke="currentColor" strokeWidth="1" />
      <circle cx="30" cy="30" r="1.4" fill="currentColor" />
      <path
        d="M30 10v6M30 44v6M10 30h6M44 30h6"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path d="M30 14 36 30 30 46 24 30Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}
