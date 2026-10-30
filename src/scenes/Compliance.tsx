import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { progress, rise, sceneOpacity } from "../anim";
import { CheckIcon, ShieldIcon } from "../components/Icons";
import { Highlight, SceneText } from "../components/SceneText";
import { color, font, gradCyan, radius } from "../theme";

const CHECKS = [
  { title: "Guardrails & Governance", sub: "Control Tower, Dev · Abnahme · Prod" },
  { title: "Policy Enforcement", sub: "Regeln im Cluster durchgesetzt" },
  { title: "Secret Management", sub: "AWS Secrets Manager & SSM" },
  { title: "Audit-Trail in Git", sub: "Jede Änderung nachvollziehbar" },
  { title: "DSGVO · BDSG", sub: "Geprüft mit DMoove GuardAudit" },
];

const FIRST_CHECK = 30;
const CHECK_STEP = 11;

export const Compliance: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const card = progress(frame, 6, 26);
  const passed = Math.round(
    interpolate(frame, [FIRST_CHECK, FIRST_CHECK + CHECK_STEP * (CHECKS.length - 1) + 8], [0, CHECKS.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity(frame, duration) }}>
      <SceneText
        eyebrow="03 · Compliance"
        title={
          <>
            Compliance
            <br />
            <Highlight>als Code.</Highlight>
          </>
        }
        sub="Guardrails, Policies und Audit-Trail von Anfang an. Revisionssicher und in Ihrem Besitz."
      />

      <div style={{ position: "absolute", right: 150, top: 0, bottom: 0, display: "flex", alignItems: "center" }}>
        <div
          style={{
            ...rise(card, 40),
            width: 740,
            borderRadius: radius.xl,
            background: color.navy800,
            border: `1.5px solid ${color.navyLine}`,
            boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
            padding: "34px 40px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 18 }}>
            <ShieldIcon size={96} draw={progress(frame, 10, 40)} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: 34, color: color.white }}>Compliance-Check</div>
              <div style={{ fontFamily: font.body, fontSize: 21, color: color.onDark2, marginTop: 4 }}>Landing Zone · Plattform · Workloads</div>
            </div>
            <div
              style={{
                fontFamily: font.mono,
                fontWeight: 700,
                fontSize: 30,
                color: passed === CHECKS.length ? color.success : color.white,
              }}
            >
              {passed}/{CHECKS.length}
            </div>
          </div>
          {CHECKS.map((check, i) => {
            const start = FIRST_CHECK + i * CHECK_STEP;
            const row = progress(frame, start - 10, start + 4);
            const tick = progress(frame, start, start + 10);
            return (
              <div
                key={check.title}
                style={{
                  ...rise(row, 14),
                  display: "flex",
                  alignItems: "center",
                  gap: 22,
                  padding: "16px 0",
                  borderTop: `1px solid ${color.navyLine}`,
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 999,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: tick > 0 ? gradCyan : "transparent",
                    border: `2px solid ${tick > 0 ? color.cyan : color.navyLine}`,
                  }}
                >
                  <CheckIcon size={24} draw={tick} />
                </div>
                <div>
                  <div style={{ fontFamily: font.body, fontWeight: 700, fontSize: 26, color: color.white }}>{check.title}</div>
                  <div style={{ fontFamily: font.body, fontSize: 20, color: color.onDark2, marginTop: 2 }}>{check.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
