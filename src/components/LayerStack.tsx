import { color, font, radius } from "../theme";
import { rise } from "../anim";

type Layer = { level: number; title: string; sub: string };

export const LAYERS: Layer[] = [
  { level: 3, title: "Ihre Anwendungen", sub: "Teams deployen per Git." },
  { level: 2, title: "Kubernetes-Plattform", sub: "Amazon EKS · FluxCD · Cilium · Karpenter" },
  { level: 1, title: "AWS Landing Zone", sub: "Control Tower · Guardrails · Dev, Abnahme, Prod" },
];

type Props = {
  /** Einblend-Fortschritt je Ebene, von unten (Ebene 1) nach oben (Ebene 3). */
  build: [number, number, number];
  /** Anzahl sichtbarer Nodes in Ebene 2 (gebrochene Werte animieren den nächsten Node). */
  nodes?: number;
  /** 0–1: Puls auf Ebene 3 nach einem Deployment. */
  pulse?: number;
  scale?: number;
  layers?: Layer[];
};

const MAX_NODES = 5;

const NodeBox: React.FC<{ p: number; index: number }> = ({ p, index }) => (
  <div
    style={{
      width: 92,
      height: 50,
      borderRadius: radius.sm,
      border: `1.5px solid ${color.cyan}`,
      background: "rgba(0,160,227,0.10)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      opacity: p,
      transform: `scale(${0.6 + 0.4 * p})`,
    }}
  >
    {[0, 1, 2].map((pod) => (
      <div
        key={pod}
        style={{
          width: 14,
          height: 14,
          borderRadius: 4,
          background: (index + pod) % 4 === 0 ? color.blue : color.cyan,
        }}
      />
    ))}
  </div>
);

export const LayerStack: React.FC<Props> = ({ build, nodes = 0, pulse = 0, scale = 1, layers = LAYERS }) => {
  // build ist von unten nach oben indiziert, LAYERS von oben nach unten
  const layerProgress = (i: number) => build[layers.length - 1 - i];

  return (
    <div style={{ width: 760, display: "flex", flexDirection: "column", gap: 22, transform: `scale(${scale})` }}>
      {layers.map((layer, i) => {
        const p = layerProgress(i);
        const isPlatform = layer.level === 2;
        const isApps = layer.level === 3;
        return (
          <div
            key={layer.level}
            style={{
              ...rise(p, -40),
              position: "relative",
              borderRadius: radius.lg,
              padding: "26px 32px",
              background: isPlatform ? "linear-gradient(135deg, rgba(0,160,227,0.20), rgba(30,150,252,0.08))" : color.navy800,
              border: `1.5px solid ${isPlatform ? color.cyan : color.navyLine}`,
              boxShadow: isApps && pulse > 0
                ? `0 0 ${40 * pulse}px rgba(0,160,227,${0.55 * pulse}), 0 12px 32px rgba(0,0,0,0.3)`
                : "0 12px 32px rgba(0,0,0,0.3)",
              marginLeft: i * 24,
              marginRight: (2 - i) * 24,
            }}
          >
            <div style={{ fontFamily: font.body, fontSize: 18, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: isPlatform ? color.cyan : color.onDark2 }}>
              Ebene {layer.level}
            </div>
            <div style={{ fontFamily: font.display, fontSize: 36, fontWeight: 700, color: color.white, marginTop: 6 }}>{layer.title}</div>
            <div style={{ fontFamily: font.body, fontSize: 22, color: color.onDark2, marginTop: 6 }}>{layer.sub}</div>
            {isPlatform && nodes > 0 ? (
              <div style={{ display: "flex", gap: 14, marginTop: 20 }}>
                {Array.from({ length: MAX_NODES }, (_, n) => (
                  <NodeBox key={n} index={n} p={Math.max(0, Math.min(1, nodes - n))} />
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
