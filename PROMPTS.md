# Generated Asset Prompts

Image prompts for assets generated via the Pollinations API and committed as static `.webp`
files. We don't hotlink the API at runtime (needs a token, adds latency) — instead we
pre-generate once and commit the output.

A consistent style suffix keeps the set cohesive:
`warm sepia vintage editorial illustration, charcoal (#1B1B19) and cream (#E2D9C8) palette, paper-grain texture`

---

## ayushman · spotlight

Output dir: `public/assets/ayushman/spotlight/` · 600×400

| File | Prompt |
|------|--------|
| `maintainer-advisory.webp` | GitHub open-source maintainer at a glowing terminal orchestrating a contributor pipeline, octocat and merge-arrow motifs |
| `speaking-github.webp` | a developer giving a conference talk on stage, large screen reading "OPEN SOURCE", audience silhouettes |
| `owasp-jisu.webp` | cybersecurity community emblem, shield and padlock motifs over a university campus, OWASP-inspired |
| `kolkata-hacktoberfest.webp` | a packed Hacktoberfest meetup hall, ~300 developers with laptops, October autumn banners |
| `elixpo-search.webp` | an AI semantic search engine, glowing neural nodes linking web documents, cloud-deployed, dark teal and amber accents |

---

## Generation script

Requires a Pollinations token (`POLLINATIONS_TOKEN`) and `cwebp` (`sudo apt install webp`).

```bash
#!/usr/bin/env bash
set -euo pipefail

STYLE="warm sepia vintage editorial illustration, charcoal and cream palette, paper grain texture"
OUT="public/assets/ayushman/spotlight"
mkdir -p "$OUT"

gen() {
  local file="$1" prompt="$2"
  local full="$prompt, $STYLE"
  local enc; enc=$(python3 -c "import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1]))" "$full")
  echo "→ $file.webp"
  curl -fsSL -H "Authorization: Bearer $POLLINATIONS_TOKEN" \
    "https://image.pollinations.ai/prompt/$enc?width=600&height=400&nologo=true&model=flux&seed=42" \
    -o "/tmp/$file.png"
  cwebp -q 82 "/tmp/$file.png" -o "$OUT/$file.webp"
}

gen "maintainer-advisory"   "GitHub open-source maintainer at a glowing terminal orchestrating a contributor pipeline, octocat and merge-arrow motifs"
gen "speaking-github"       "a developer giving a conference talk on stage, large screen reading OPEN SOURCE, audience silhouettes"
gen "owasp-jisu"            "cybersecurity community emblem, shield and padlock motifs over a university campus, OWASP inspired"
gen "kolkata-hacktoberfest" "a packed Hacktoberfest meetup hall, around 300 developers with laptops, October autumn banners"
gen "elixpo-search"         "an AI semantic search engine, glowing neural nodes linking web documents, cloud deployed, dark teal and amber accents"

echo "Done. Assets in $OUT"
```

Save as `scripts/gen-assets.sh`, then:

```bash
export POLLINATIONS_TOKEN=your_token_here
bash scripts/gen-assets.sh
```

The filenames here match the `image` paths in `content/ayushman/spotlight.json`. To add a new
spotlight item: add the entry there with its `image` path, document the prompt in this table,
add a `gen` line, and re-run.
