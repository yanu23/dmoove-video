import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Highlight } from "../components/SceneText";
import { Tag } from "../components/Tag";
import { color, font } from "../theme";

/**
 * Titelbild. Es ist Start- und Endbild des Loops:
 * "exit" hält das Bild und blendet es danach aus, "enter" baut es am Ende wieder auf.
 */
export const Intro: React.FC<{ mode: "exit" | "enter"; duration: number }> = ({ mode, duration }) => {
  const frame = useCurrentFrame();
  const p =
    mode === "exit"
      ? interpolate(frame, [duration - 30, duration], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
      : interpolate(frame, [0, duration - 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const shift = (1 - p) * (mode === "exit" ? -40 : 40);

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: p, transform: `translateY(${shift}px)` }}>
      <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 26, letterSpacing: 5, textTransform: "uppercase", color: color.cyan }}>
        AWS &amp; Kubernetes aus Berlin
      </div>
      <div
        style={{
          fontFamily: font.display,
          fontWeight: 800,
          fontSize: 112,
          lineHeight: 1.06,
          letterSpacing: -2,
          color: color.white,
          textAlign: "center",
          marginTop: 30,
        }}
      >
        AWS und Kubernetes,
        <br />
        <Highlight>sauber betrieben.</Highlight>
      </div>
      <div style={{ display: "flex", gap: 18, marginTop: 56 }}>
        <Tag>Kubernetes</Tag>
        <Tag>Souveränität</Tag>
        <Tag>Compliance</Tag>
      </div>
    </AbsoluteFill>
  );
};
