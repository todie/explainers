# /private — encrypted source notes

The markdown files under `content/` are encrypted at rest with [git-crypt](https://github.com/AGWA/git-crypt).
At runtime they're code-split JS chunks behind the `/private` route, which is
gated by Cloudflare Access at the edge.

## Why this exists

These are **working notes** — Linear exports, founder diligence drafts,
deal templates, financial models, clinical/research material — that I want to
keep version-controlled but not searchable. They're the source material for
future full React explainer pages, not finished products.

Eventually each `.md` here becomes its own routed explainer with custom
components and interactions, the same way `/memory-model` and `/reverie` work
today. The viewer at `/private` is intentionally minimal — it's a queue, not
a destination.

## If you got this far

You found the encrypted blobs, you read the workflow that decrypts them,
maybe you even tried to figure out how the key is wired into CI.

That's the kind of curiosity I want to talk to.

→ **chris@todie.io** — drop me a note. Tell me what you're building, what
made you poke at this repo, or just say hi.

## Adding a new doc (for future me)

1. Drop the `.md` in `content/` — it auto-encrypts on `git add` because of
   the rule in repo-root `.gitattributes`
2. Add an entry to `docs.js` with `id`, `title`, `category`, `date`, and
   `file: () => import('./content/NN-name.md?raw')`
3. Verify with `git diff --cached <file>` — should show `GITCRYPT...` binary
4. Commit, push, done

## Unlocking locally

```bash
git-crypt unlock     # uses your GPG key (already in .git-crypt/keys/default/0/)
```

## Decrypting in CI

The workflow does:

```bash
echo "$GIT_CRYPT_KEY" | base64 -d > /tmp/key
git-crypt unlock /tmp/key
shred -u /tmp/key
```

Where `GIT_CRYPT_KEY` is the base64-encoded output of `git-crypt export-key`,
stored as a GitHub Actions secret.
