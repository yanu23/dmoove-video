import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { progress, rise } from "../anim";
import { color, font } from "../theme";

const CLAIMS = ["Souverän.", "Compliant.", "Kubernetes."];

export const Outro: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, duration - 20, duration - 4], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <Img src={staticFile("logo-light.svg")} style={{ width: 620, ...rise(progress(frame, 0, 18), 20) }} />
      <div style={{ display: "flex", gap: 34, marginTop: 60 }}>
        {CLAIMS.map((claim, i) => (
          <div
            key={claim}
            style={{
              ...rise(progress(frame, 6 + i * 5, 20 + i * 5), 24),
              fontFamily: font.display,
              fontWeight: 800,
              fontSize: 76,
              color: i === 2 ? color.cyan : color.white,
              letterSpacing: -1,
            }}
          >
            {claim}
          </div>
        ))}
      </div>
      <div
        style={{
          ...rise(progress(frame, 20, 34), 16),
          fontFamily: font.body,
          fontSize: 26,
          color: color.onDark2,
          marginTop: 40,
        }}
      >
        AWS Partner · ESC Launch Partner · AWS Authorized Instructor
      </div>
    </AbsoluteFill>
  );
};
