# Audio engine — music, SFX, captions

For a full audio pass (background music + sound effects in one shot), use the shared engine at `audio/scripts/audio.mjs`. It takes a neutral `audio_request.json` and writes `audio_meta.json` plus assets under `.media/audio/{bgm,sfx}`:

```bash
node <SKILL_DIR>/audio/scripts/audio.mjs --request ./audio_request.json --out ./audio_meta.json
```

- **Request** `{ lines?: [{ id, audio?, words?, sfx?: [names] }], bgm: { mode?, query?, prompt? } }`: `bgm.mode` = `retrieve | generate | none` (omit for auto). `--only bgm,sfx` runs a subset and merges into an existing `--out`.
- **Your own recording**: a line with `audio` (a path inside the project folder; copy a recording from elsewhere into the project first) is used as the voice: `{ id, audio: "take.m4a", words?: [{ text, start, end }] }`. It is converted to `assets/voice/<id>.wav`, `speed` stretches it with the pitch kept and scales `words` the same. Its `audio_meta.json` voice has `source: "recording"` and no provider or HeyGen sign-in is needed.
- **Output** `audio_meta.json` (id-keyed): `sfx[]`, `bgm`, `total_duration_s`.
- **HeyGen free-usage path**: HeyGen CLI auth unlocks music retrieval; SFX come from Openverse with no account (`audio/references/sfx.md`). Local/provider-specific generators are explicit alternatives where installed; run `npx hyperframes media-use resolve --doctor` before assuming retrieval will work.
- If BGM took the generate path (`bgm_pending: true`), run `audio/scripts/wait-bgm.mjs` before final render.

Background removal and captions use the `hyperframes` CLI (`remove-background`), see the per-topic guides in `audio/references/` (`bgm.md`, `sfx.md`, `remove-background.md`, `captions/`).
