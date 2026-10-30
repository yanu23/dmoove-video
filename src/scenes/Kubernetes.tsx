import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { progress, rise, sceneOpacity } from "../anim";
import { GitIcon, CheckIcon } from "../components/Icons";
import { LayerStack } from "../components/LayerStack";
import { Highlight, SceneText } from "../components/SceneText";
import { Tag } from "../components/Tag";
import { color, font } from "../theme";

const TOOLS = ["Amazon EKS", "FluxCD", "Cilium", "Karpenter"];

export const Kubernetes: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();

  const build: [number, number, number] = [progress(frame, 8, 30), progress(frame, 20, 42), progress(frame, 32, 54)];
  // zwei Nodes beim Aufbau, Karpenter skaliert nach dem Deployment auf vier
  const nodes = interpolate(frame, [40, 56, 150, 174], [0, 2, 2, 4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // git push fliegt von oben in Ebene 3
  const commitIn = progress(frame, 90, 104);
  const commitDrop = progress(frame, 104, 120);
  const commitOpacity = commitIn * (1 - progress(frame, 118, 126));
  const pulse = interpolate(frame, [118, 128, 155], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const synced = progress(frame, 122, 136);
  const scaled = progress(frame, 155, 169);

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity(frame, duration) }}>
      <SceneText
        eyebrow="01 · Kubernetes"
        title={
          <>
            Produktionsreifes
            <br />
            <Highlight>Kubernetes</Highlight> auf AWS.
          </>
        }
        sub="Amazon EKS mit GitOps, Security und Observability. Betriebsbereit in Tagen, nicht Monaten."
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
          {TOOLS.map((tool, i) => (
            <Tag key={tool} style={rise(progress(frame, 26 + i * 6, 42 + i * 6), 20)}>
              {tool}
            </Tag>
          ))}
        </div>
      </SceneText>

      <div style={{ position: "absolute", right: 130, top: 0, bottom: 0, display: "flex", alignItems: "center" }}>
        <div style={{ position: "relative" }}>
          <LayerStack build={build} nodes={nodes} pulse={pulse} />

          <div
            style={{
              position: "absolute",
              right: 70,
              top: -110 + commitDrop * 120,
              opacity: commitOpacity,
              transform: `scale(${0.85 + 0.15 * commitIn})`,
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 20px",
              borderRadius: 999,
              background: color.orange,
              color: color.white,
              fontFamily: font.mono,
              fontSize: 22,
              fontWeight: 700,
              boxShadow: "0 8px 24px rgba(242,107,67,0.35)",
            }}
          >
            <GitIcon size={24} /> git push · main
          </div>

          <div style={{ position: "absolute", right: 70, top: -64, display: "flex", gap: 12 }}>
            <Tag accent style={{ ...rise(synced, 16), fontSize: 20 }}>
              <CheckIcon size={20} stroke={color.cyan} draw={synced} /> FluxCD synchronisiert
            </Tag>
          </div>
          <div style={{ position: "absolute", left: 24, bottom: -64 }}>
            <Tag accent style={{ ...rise(scaled, 16), fontSize: 20 }}>
              Karpenter: +2 Nodes
            </Tag>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
