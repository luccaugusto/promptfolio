# Mobile Home Screen Design

## Goal

Replace the current static mobile view (a name card with two social icons) with an interactive phone-home-screen experience that reuses terminal command content. The mobile version should share the desktop's nerdy/playful feel while being touch-friendly.

## Direction

Phone-native metaphor: a grid of app icons on a wallpaper, tap to open. Each "app" corresponds to a terminal command's output. Light phone-OS mimicry only — no status bar, no lockscreen, no app drawer, no notifications.

## App inventory

Eight apps, arranged in a 3×3 grid (one empty slot).

| name | label | kind | behavior |
|---|---|---|---|
| about | About | content | Shows rewritten-for-mobile About text that also incorporates the `status` message ("Currently building RoadwayAI"). |
| skillset | Skills | content | Reuses `Skillset.tsx` from the terminal. |
| resume | Resume | content | New `MobileResume.tsx` — embeds `${process.env.PUBLIC_URL}/resume.pdf` directly via `<embed>`. Avoids redux coupling from `Cat.tsx`. |
| email | Email | content | Plain `mailto:lucca@luccaaugusto.xyz` link (opens native mail app). |
| gallery | Gallery | content | Placeholder "Coming soon" view. |
| youpoop | YouPoop | content | Placeholder "Coming soon" view. |
| github | GitHub | redirect | `window.open(process.env.REACT_APP_GITHUB_URL, '_blank')` — mirrors `cd github` redirect on desktop. |
| linkedin | LinkedIn | redirect | `window.open(process.env.REACT_APP_LINKEDIN_URL, '_blank')` — mirrors `cd linkedin` redirect on desktop. |

Icon PNGs are shared with the desktop via `public/*-icon.png`. The desktop's `programs.ts` and the new mobile `apps.ts` are independent registries that reference the same asset files.

## Architecture

All new files live under `src/features/mobilePage/`. The existing `MobilePage.tsx` is rewritten (not extended). No changes outside this folder — `App.tsx`'s `window.innerWidth < 720` branch still renders `<MobilePage />`.

Component tree:

- `MobilePage.tsx` — top-level container. Holds `openApp: MobileApp | null` state in `useState`. Renders `MobileHome`, conditionally `MobileAppView`, and always `MobileHomeBar`.
- `MobileHome.tsx` — wallpaper background + 3×3 grid of `MobileAppIcon` children.
- `MobileAppIcon.tsx` — icon image + label. On tap: redirect apps call `window.open`; content apps call the parent's `onOpen(app)`.
- `MobileAppView.tsx` — fullscreen overlay (position: fixed, z-index above home) that renders the active app's `Component`.
- `MobileHomeBar.tsx` — fixed bottom bar with a centered pill. Always rendered. Only interactive when `openApp` is set.
- `apps.ts` — exports `MobileApp` type and the `apps` array.

### Types

```ts
type MobileApp = {
  name: string;
  label: string;
  icon: string;
  kind: 'content' | 'redirect';
  url?: string;          // required if kind === 'redirect'
  Component?: React.FC;  // required if kind === 'content'
};
```

## Interactions

**Home screen**
- Full-viewport wallpaper from `public/mobile-wallpaper.png` (user supplies). Falls back to solid Solarized background if missing.
- 3×3 CSS grid of app icons. Icons are rounded-square PNGs with labels below in the Solarized foreground color.
- Home bar fixed at bottom of the viewport (~30px), with a thin horizontal pill centered. On the home screen the bar is decorative.

**Opening an app**
- Redirect icons: `window.open(url, '_blank')`. No state change.
- Content icons: sets `openApp` → `MobileAppView` renders fullscreen over the home screen.
- Transition: 150ms opacity fade. No slide animation.

**Closing an app**
- Tap the home bar pill → clears `openApp`, returns to home screen.
- No browser-history/back-button integration.

**Inside an open app**
- Content scrolls vertically if it overflows.
- Content area has top padding (for breathing room) and bottom padding equal to the home bar height, so nothing is obscured.
- Home bar uses `position: fixed; bottom: 0` — it stays pinned to the viewport bottom even when content scrolls.
- No top chrome (no title bar, no in-app back arrow). The home bar is the only way back.

**Orientation**
- Designed for portrait. Landscape uses the same layout with no special handling.

## State

Local React state in `MobilePage.tsx` via `useState<MobileApp | null>`. No Redux; the mobile view has no persistence needs and no cross-component state sharing beyond the single `openApp` value.

## Styling

New styles in `MobilePage.module.css` using existing `var(--base*)` Solarized variables from the global palette. Sections: home background/grid, icon styling, fullscreen app overlay, home bar.

## Testing

No new tests. The existing `App.test.tsx` smoke test is sufficient; the mobile components are presentational and the logic is trivial (state toggle, `window.open`).

## Non-goals

- No status bar, lockscreen, notification shade, app drawer, or home-screen pagination.
- No swipe gestures (close is a tap on the home bar pill, not a swipe-up).
- No browser-history integration for open/close.
- No landscape-specific layout.
- No unit tests for the new components.

## Content notes

- **About**: rewritten for mobile. Drops desktop-only references like "type `cd github/promptfolio`". Merges the `status` message ("Currently building RoadwayAI") into the body.
- **Email**: plain `mailto:` link, no in-app form.
- **Resume**: new `MobileResume.tsx` component that embeds `${process.env.PUBLIC_URL}/resume.pdf` directly. Kept separate from `Cat.tsx` to avoid coupling mobile to redux/filesystem state.
