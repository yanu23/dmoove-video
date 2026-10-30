import { AbsoluteFill, Sequence } from "remotion";
import { Background } from "./components/Background";
import { Compliance } from "./scenes/Compliance";
import { Intro } from "./scenes/Intro";
import { Kubernetes } from "./scenes/Kubernetes";
import { Outro } from "./scenes/Outro";
import { Sovereignty } from "./scenes/Sovereignty";
import { VIDEO } from "./theme";

// Szenen überlappen leicht für weiche Überblendungen; Texte zweier Szenen sind nie gleichzeitig voll sichtbar.
// Das Intro steht am Anfang und baut sich am Ende wieder auf, damit der Loop nahtlos ist.
const SCENES = {
  intro: { from: 0, duration: 90 },
  kubernetes: { from: 85, duration: 165 },
  sovereignty: { from: 235, duration: 135 },
  compliance: { from: 355, duration: 108 },
  outro: { from: 448, duration: 80 },
  introReturn: { from: 522, duration: VIDEO.durationInFrames - 522 },
};

export const HeroLoop: React.FC = () => (
  <AbsoluteFill>
    <Background />
    <Sequence from={SCENES.intro.from} durationInFrames={SCENES.intro.duration}>
      <Intro mode="exit" duration={SCENES.intro.duration} />
    </Sequence>
    <Sequence from={SCENES.kubernetes.from} durationInFrames={SCENES.kubernetes.duration}>
      <Kubernetes duration={SCENES.kubernetes.duration} />
    </Sequence>
    <Sequence from={SCENES.sovereignty.from} durationInFrames={SCENES.sovereignty.duration}>
      <Sovereignty duration={SCENES.sovereignty.duration} />
    </Sequence>
    <Sequence from={SCENES.compliance.from} durationInFrames={SCENES.compliance.duration}>
      <Compliance duration={SCENES.compliance.duration} />
    </Sequence>
    <Sequence from={SCENES.outro.from} durationInFrames={SCENES.outro.duration}>
      <Outro duration={SCENES.outro.duration} />
    </Sequence>
    <Sequence from={SCENES.introReturn.from} durationInFrames={SCENES.introReturn.duration}>
      <Intro mode="enter" duration={SCENES.introReturn.duration} />
    </Sequence>
  </AbsoluteFill>
);
