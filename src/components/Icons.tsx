import { color } from "../theme";

export const CheckIcon: React.FC<{ size?: number; stroke?: string; draw?: number }> = ({ size = 22, stroke = color.white, draw = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M5 12.5l4.5 4.5L19 7.5"
      stroke={stroke}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - draw}
    />
  </svg>
);

export const GitIcon: React.FC<{ size?: number }> = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color.white} strokeWidth={2} strokeLinecap="round">
    <circle cx="6" cy="6" r="2.5" />
    <circle cx="6" cy="18" r="2.5" />
    <circle cx="18" cy="9" r="2.5" />
    <path d="M6 8.5v7M18 11.5c0 3-3 4-9.5 5" />
  </svg>
);

export const ShieldIcon: React.FC<{ size?: number; draw?: number }> = ({ size = 200, draw = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={color.cyan} />
        <stop offset="100%" stopColor={color.blue} />
      </linearGradient>
    </defs>
    <path
      d="M50 6 L86 20 V48 C86 70 70 86 50 94 C30 86 14 70 14 48 V20 Z"
      fill="url(#shieldGrad)"
      fillOpacity={0.16 * draw}
      stroke="url(#shieldGrad)"
      strokeWidth={4}
      strokeLinejoin="round"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - draw}
    />
    <path
      d="M33 50 L45 62 L68 38"
      stroke={color.white}
      strokeWidth={7}
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - Math.max(0, draw * 2 - 1)}
    />
  </svg>
);
