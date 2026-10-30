import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

loadFont({
  family: "Inter",
  url: staticFile("fonts/inter-latin-wght-normal.woff2"),
  weight: "100 900",
});

loadFont({
  family: "Montserrat",
  url: staticFile("fonts/montserrat-latin-wght-normal.woff2"),
  weight: "100 900",
});
