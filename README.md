# DMoove Hero-Video

18-Sekunden-Loop ohne Ton für den Hero auf [dmoove.com](https://dmoove.com). Es zeigt die drei Schwerpunkte **Kubernetes**, **Souveränität** und **Compliance**. Gebaut ist es mit [Remotion](https://www.remotion.dev) (React → Video). Farben, Schriften und Logo kommen aus dem Theme `dmoove-2026`.

## Fertige Dateien (`out/`)

| Datei | Zweck |
|---|---|
| `dmoove-hero.webm` | VP9, 1920×1080, 30 fps (~1,3 MB). Wird bevorzugt geladen. |
| `dmoove-hero.mp4` | H.264, 1920×1080, 30 fps, faststart (~1,7 MB). Fallback, z. B. für Safari. |
| `dmoove-hero-poster.jpg` | Startbild des Loops: Poster und Fallback bei reduzierter Bewegung |

## Storyboard

| Zeit | Szene |
|---|---|
| 0–3 s | Titel „AWS und Kubernetes, sauber betrieben.“ |
| 3–8 s | **01 · Kubernetes**: Ebenen-Stack (Landing Zone → EKS-Plattform → Anwendungen), `git push` → FluxCD-Sync → Karpenter skaliert |
| 8–12 s | **02 · Souveränität**: Umschalten von eu-central-1 auf die European Sovereign Cloud. Der Stack bleibt identisch, Launch-Partner-Badge |
| 12–15 s | **03 · Compliance**: Compliance-Check mit Guardrails, Policies, Secrets, Audit-Trail und DSGVO/BDSG (GuardAudit) |
| 15–18 s | Logo + „Souverän. Compliant. Kubernetes.“, danach zurück zum Titel (nahtloser Loop) |

## Einbinden (HubSpot)

Die drei Dateien aus `out/` in den HubSpot File Manager hochladen und die URLs einsetzen:

```html
<video class="dm-hero-video" autoplay muted loop playsinline preload="metadata"
       poster="dmoove-hero-poster.jpg" aria-label="DMoove: Kubernetes, Souveränität und Compliance auf AWS">
  <source src="dmoove-hero.webm" type="video/webm">
  <source src="dmoove-hero.mp4" type="video/mp4">
</video>
<style>
  .dm-hero-video { width: 100%; height: auto; display: block; border-radius: 16px; }
  @media (prefers-reduced-motion: reduce) { .dm-hero-video { display: none; } }
</style>
```

Bei `prefers-reduced-motion` sollte stattdessen `dmoove-hero-poster.jpg` als `<img>` angezeigt werden.

## Bearbeiten und neu rendern

```bash
npm install
npm run studio      # Live-Vorschau im Browser
npm run render      # schreibt out/dmoove-hero.{mp4,webm} und das Poster
```

Wenn Remotion keinen eigenen Browser laden kann, gibst du ein lokales Chromium an:

```bash
BROWSER=/pfad/zu/chrome-headless-shell npm run render
```

- Texte stehen direkt in den Szenen unter `src/scenes/`.
- Das Timing der Szenen steht in `src/HeroLoop.tsx` (`SCENES`), bei 30 fps.
- Die Brand-Farben stehen in `src/theme.ts`.
- Fonts (Inter, Montserrat) und Logo liegen in `public/`.

Lizenz-Hinweis: Remotion ist für Firmen mit bis zu 3 Mitarbeitenden kostenlos. Größere Firmen brauchen eine [Company License](https://www.remotion.dev/license).
