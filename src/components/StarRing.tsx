import { color } from "../theme";

const Star: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6z" fill={color.cyan} />
  </svg>
);

/** Zwölf Sterne im Kreis, als Anspielung auf Europa in den Markenfarben. */
export const StarRing: React.FC<{ radius: number; appear: number; rotation: number; size?: number }> = ({
  radius,
  appear,
  rotation,
  size = 34,
}) => (
  <div style={{ position: "absolute", left: "50%", top: "50%", width: 0, height: 0, transform: `rotate(${rotation}deg)` }}>
    {Array.from({ length: 12 }, (_, i) => {
      const p = Math.max(0, Math.min(1, appear * 12 - i));
      const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
      return (
        <div
          key={i}
          style={{
            position: "absolute",
            left: Math.cos(angle) * radius - size / 2,
            top: Math.sin(angle) * radius - size / 2,
            opacity: p,
            transform: `scale(${0.4 + 0.6 * p}) rotate(${-rotation}deg)`,
          }}
        >
          <Star size={size} />
        </div>
      );
    })}
  </div>
);
