import { color, font, radius } from "../theme";

export const Tag: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; accent?: boolean }> = ({
  children,
  style,
  accent,
}) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 20px",
      borderRadius: radius.pill,
      border: `1.5px solid ${accent ? color.cyan : color.navyLine}`,
      background: accent ? "rgba(0,160,227,0.14)" : "rgba(6,41,74,0.75)",
      color: color.white,
      fontFamily: font.body,
      fontWeight: 600,
      fontSize: 24,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {children}
  </div>
);
