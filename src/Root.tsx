import "./fonts";
import { Composition, Still } from "remotion";
import { HeroLoop } from "./HeroLoop";
import { VIDEO } from "./theme";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="HeroLoop" component={HeroLoop} {...VIDEO} />
    {/* Poster = Startbild des Loops, damit der Übergang Poster → Video nicht springt */}
    <Still id="HeroPoster" component={HeroLoop} width={VIDEO.width} height={VIDEO.height} />
  </>
);
