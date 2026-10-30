import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { progress, rise, sceneOpacity } from "../anim";
import { LayerStack } from "../components/LayerStack";
import { Highlight, SceneText } from "../components/SceneText";
import { StarRing } from "../components/StarRing";
import { Tag } from "../components/Tag";
import { color, font, gradCyan } from "../theme";

const TOGGLE_W = 640;

export const Sovereignty: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();

  const build: [number, number, number] = [progress(frame, 0, 18), progress(frame, 6, 24), progress(frame, 12, 30)];
  const ring = progress(frame, 10, 80);
  const rotation = interpolate(frame, [0, duration], [-12, 12]);
  const toggleIn = progress(frame, 18, 34);
  const switched = progress(frame, 90, 106);
  const regionSwap = frame >= 98;

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity(frame, duration) }}>
      <SceneText
        eyebrow="02 · Souveränität"
        title={
          <>
            Souverän,
            <br />
            <Highlight>wo nötig.</Highlight>
          </>
        }
        sub="Dieselbe Plattform, derselbe Code: in der Region oder in der AWS European Sovereign Cloud."
      >
        <Tag accent style={rise(progress(frame, 30, 46), 20)}>
          Launch Partner · AWS European Sovereign Cloud
        </Tag>
      </SceneText>

      <div style={{ position: "absolute", left: 1000, width: 800, top: 0, bottom: 0 }}>
        <StarRing radius={420} appear={ring} rotation={rotation} />
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 26 }}>
          <div
            style={{
              ...rise(toggleIn, 16),
              position: "relative",
              width: TOGGLE_W,
              height: 60,
              borderRadius: 999,
              background: color.navy800,
              border: `1.5px solid ${color.navyLine}`,
              display: "flex",
              fontFamily: font.body,
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 5,
                bottom: 5,
                left: 5 + switched * (TOGGLE_W / 2 - 5),
                width: TOGGLE_W / 2 - 5,
                borderRadius: 999,
                background: gradCyan,
              }}
            />
            {["eu-central-1", "European Sovereign Cloud"].map((label, i) => (
              <div
                key={label}
                style={{
                  position: "relative",
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: (i === 1) === switched > 0.5 ? color.white : color.onDark2,
                }}
              >
                {label}
              </div>
            ))}
          </div>

          <div style={{ height: 470, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <LayerStack build={build} scale={0.74} />
          </div>

          <div
            style={{
              ...rise(toggleIn, 16),
              fontFamily: font.mono,
              fontSize: 24,
              color: color.onDark2,
              padding: "10px 22px",
              borderRadius: 10,
              background: "rgba(6,41,74,0.85)",
              border: `1.5px solid ${color.navyLine}`,
            }}
          >
            region: <span style={{ color: regionSwap ? color.cyan : color.white }}>{regionSwap ? "eusc-de-east-1" : "eu-central-1"}</span>
          </div>
        </AbsoluteFill>
      </div>
    </AbsoluteFill>
  );
};
