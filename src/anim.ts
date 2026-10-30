import { Easing, interpolate } from "remotion";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** 0→1 zwischen start und end, mit Ease-out. */
export const progress = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], { ...clamp, easing: Easing.bezier(0.22, 1, 0.36, 1) });

/** Ein-/Ausblenden einer Szene über ihre lokale Dauer. */
export const sceneOpacity = (frame: number, duration: number, fadeIn = 15, fadeOut = 15) =>
  interpolate(frame, [0, fadeIn, duration - fadeOut, duration], [fadeIn ? 0 : 1, 1, 1, fadeOut ? 0 : 1], clamp);

/** Standard-Einflug: Opazität + Versatz nach oben. */
export const rise = (p: number, distance = 30) => ({
  opacity: p,
  transform: `translateY(${(1 - p) * distance}px)`,
});
