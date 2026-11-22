---
name: media-use
description: Get or make any media for a HyperFrames video - music, sound effects, images, icons, logos, cutouts, colour grades and looks - with free catalog/local tools, and mix placed audio. Also for footage that looks dark, flat or dull, or should be stylized or hidden.
---

# Media in HyperFrames

Media lands as a local file in the project's `assets/` with a ledger record; renders never fetch. One verb finds or makes it:

```bash
npx hyperframes media-use resolve --type <type> --intent "<what you need>" --project <dir>
```

It prints one line, `resolved <id> → <path> (<type>, <metadata>)`. List reusable assets first with `--candidates` and judge the fit yourself; reuse, ingest (`--from`) and adopt are in `references/resolve.md`.

## Where it comes from

| Need | Free | Local or the person's own key (only when they ask) |
| --- | --- | --- |
| Music (`bgm`) | HeyGen catalog of 10k+ tracks (signed in) | Local MusicGen |
| Sound effects (`sfx`) | HeyGen (signed in); Openverse (credit CC BY); bundled | |
| Images, icons | HeyGen asset search, 75k+ (signed in) | Local FLUX (mflux), if installed |
| Logos (`logo`) | theSVG, GitHub avatar, favicon; never redrawn | |
| Cutouts | `npx hyperframes remove-background` | |
| Grades, LUTs, looks | `npx hyperframes media-treatment` | |

**Sign in.** Every time a request needs the HeyGen catalog, run `npx hyperframes auth status` first. Not signed in: tell the person in one line that sign-in is free and gives the music catalog and asset search on the Free plan, ask them to type an exclamation mark and `npx hyperframes auth login` in the prompt, and wait until they say it is done. Use local tools only when the person asks, not as a fallback.

## Looks on real footage

Feedback that footage is dark, flat or dull, should feel retro or printed, needs a face hidden, or needs a reveal is media intent. Inspect the real `<img>`/`<video>`, pick one intent, and follow `references/media-treatments.md`; persist with `npx hyperframes media-treatment`, never a CSS, SVG or `.cube` stand-in.

## Offer once, never add silently

Scan a piece you build or review once for concrete gaps (emoji standing in for icons, placeholder images, silent cuts, 10 s+ with no music, a colour cast) and offer the fixes in one ask. No signal, no suggestion; respect "leave it".

## Where to look

| Task | Read |
| --- | --- |
| Resolve, reuse, adopt, ingest, flags | `references/resolve.md` |
| Grading, LUTs, `grade-compare` | `references/grading.md` |
| Music, sound effects, captions | `references/audio.md` |
| Cut, reframe or transform media | `references/operations.md` |
| Treatments, realtime effects, overlays, reveals | `references/media-treatments.md` |
| Install, sign-in, credentials, `--provider`, `--local-only`, RAM ladders | `references/setup-providers.md` |
| Fades, gain, ducking, automation, effects, buses on placed tracks | `references/mixing.md` |
| Local commands: grade, cutout, loudness, beats | `references/local.md` |
| Remembered preferences | `references/memory.md` |
