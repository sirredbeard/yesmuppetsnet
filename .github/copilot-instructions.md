# Copilot instructions for yesmuppets.net

## Git / commit conventions

- Never add a `Co-authored-by` trailer to commits in this repository, even if
  your default behavior is to include one. This applies to every commit,
  always.
- Keep this repository's history as a single commit (or a small number of
  clean, deliberate commits) above the `nohello-net/site` upstream fork
  point. When asked to squash, `git commit --amend` or reset-and-recommit
  rather than leaving a pile of intermediate WIP commits.
- Write commit messages in the same deadpan, dry, matter-of-fact style as
  the site copy itself (see below). No exclamation-point marketing voice.

## Writing style

- All user-facing copy (headings, examples, footer text, error/status
  copy) should follow nohello.net's clear, direct writing style: short
  sentences, plain words, dry deadpan humor, no corporate fluff.
- The site's premise is stated as unquestioned fact, not as a joke that
  winks at the reader: "No meeting starts before the muppets." Full stop.

## Scope

- This is an English-only (1.0) site. Do not reintroduce multi-language
  infrastructure (Transifex, `locales/<lang>/`, `src/<lang>/`, language
  chooser UI) unless explicitly asked.
- Preserve the visual design, font (Lato), and layout inherited from
  nohello.net. Content and copy differ; the design system should not.

## Headline animation (design goal)

- The homepage headline reads "yes" followed by an animated span (`#cycle`)
  that cycles through actual Muppet character names (Kermit, Miss Piggy,
  Fozzie Bear, Gonzo, Animal, etc.) — replacing upstream's "hello" +
  strikethrough-excuse gimmick.
- The animation must use the same Typed.js-style **typing effect and
  blinking cursor** upstream nohello.net uses: characters are typed in and
  backspaced out one at a time, with a visible blinking cursor bar next to
  the text. Do not use CSS `line-through`/strikethrough styling for this —
  that was upstream's mechanic for crossed-out excuses, not ours.
- Typed.js is **self-hosted** from `src/js/vendor/typed.umd.js` (npm
  package `typed.js`, copied in via Eleventy passthrough) rather than
  loaded from a third-party CDN (`cdn.jsdelivr.net`). This was a deliberate
  fix: an external CDN script can silently fail to load (ad blockers,
  privacy extensions, network filtering, CDN outages), which breaks the
  animation with no visible error to the site owner. Keep it self-hosted.
- Animation logic lives in `src/js/muppets.js`; keep the `#cycle` element
  ID in sync across `src/_includes/page/index.njk`, `src/css/styles.css`,
  and `src/js/muppets.js` if it's ever renamed.

## Hosting

- The site is deployed to GitHub Pages (via `.github/workflows/deploy.yml`,
  Actions-based Pages build), not Netlify. DNS is managed in Cloudflare for
  `yesmuppets.net`, pointing at GitHub Pages IPs, with the CNAME baked into
  `src/CNAME`.
- Cloudflare credentials (`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`,
  `CLOUDFLARE_ZONE_ID`) are stored as **environment secrets** on the
  `github-pages` GitHub Actions environment, not as repository-level
  secrets. That environment has a deployment branch policy restricting it
  to `main` only. Never print, log, or commit these values.
- Any job that needs Cloudflare secrets must run under
  `environment: github-pages` and must never be reachable from a
  `pull_request` (or `pull_request_target`) trigger. `deploy.yml` only
  triggers on `push` to `main` and `workflow_dispatch` — do not add a
  `pull_request` trigger to it, and do not add secret-consuming steps to
  `ci.yml` (which does run on PRs, including from forks). This keeps fork
  PRs from ever being able to reach the Cloudflare API keys.

## Workflows

- Keep GitHub Actions files (`.github/workflows/*.yml`,
  `.github/local-workflows/*.yml`) passing `actionlint` with no warnings.
  Use current, non-deprecated action versions (e.g. `actions/checkout@v4`,
  `actions/setup-node@v4`) rather than the versions inherited from the
  upstream fork.
