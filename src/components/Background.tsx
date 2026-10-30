import { AbsoluteFill, useCurrentFrame } from "remotion";
import { VIDEO, color } from "../theme";

const GRID = 80;

// Alle Bewegungen haben die Loop-Länge als Periode, damit das letzte Bild nahtlos ins erste übergeht.
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const t = (frame % VIDEO.durationInFrames) / VIDEO.durationInFrames;
  const offset = t * GRID;
  const glowX = 70 + Math.sin(t * Math.PI * 2) * 8;
  const glowY = 40 + Math.cos(t * Math.PI * 2) * 8;

  return (
    <AbsoluteFill style={{ backgroundColor: color.navy, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(0,160,227,0.22) 0%, rgba(30,150,252,0.08) 30%, transparent 60%)`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${color.navyLine}55 1px, transparent 1px), linear-gradient(90deg, ${color.navyLine}55 1px, transparent 1px)`,
          backgroundSize: `${GRID}px ${GRID}px`,
          backgroundPosition: `${offset}px ${offset}px`,
          maskImage: "radial-gradient(ellipse at 60% 50%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 60% 50%, black 20%, transparent 75%)",
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, transparent 70%, ${color.navy} 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};
