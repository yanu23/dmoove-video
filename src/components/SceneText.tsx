import { useCurrentFrame } from "remotion";
import { progress, rise } from "../anim";
import { color, font, gradCyan } from "../theme";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  sub: string;
  children?: React.ReactNode;
  delay?: number;
};

/** Linke Textspalte einer Szene: Eyebrow, Headline, Unterzeile, optional Tags/Badges. */
export const SceneText: React.FC<Props> = ({ eyebrow, title, sub, children, delay = 0 }) => {
  const frame = useCurrentFrame() - delay;
  return (
    <div style={{ position: "absolute", left: 140, top: 0, bottom: 0, width: 830, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div
        style={{
          ...rise(progress(frame, 0, 18)),
          fontFamily: font.body,
          fontWeight: 700,
          fontSize: 24,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: color.cyan,
          marginBottom: 24,
        }}
      >
        {eyebrow}
      </div>
      <div
        style={{
          ...rise(progress(frame, 4, 26), 40),
          fontFamily: font.display,
          fontWeight: 800,
          fontSize: 74,
          lineHeight: 1.08,
          color: color.white,
          letterSpacing: -1,
        }}
      >
        {title}
      </div>
      <div
        style={{
          ...rise(progress(frame, 10, 32)),
          fontFamily: font.body,
          fontSize: 30,
          lineHeight: 1.45,
          color: color.onDark2,
          marginTop: 28,
          maxWidth: 680,
        }}
      >
        {sub}
      </div>
      {children ? <div style={{ marginTop: 40 }}>{children}</div> : null}
    </div>
  );
};

export const Highlight: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ background: gradCyan, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
    {children}
  </span>
);
