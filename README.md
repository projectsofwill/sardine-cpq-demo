# Sardine CPQ — hosted demo

This is a hosted, runnable copy of the **Sardine CPQ** tool (a consumption-pricing CPQ built for the Sardine RevOps take-home). It is a static mirror of the tool for sharing a live link. The working project lives in a separate private repo.

**Live:** https://projectsofwill.github.io/sardine-cpq-demo/

- `index.html` — the built tool. Open it or visit the link above.
- `config.js` — pricing model, approval policy, product catalog, and the AI gateway endpoint.

The pricing engine runs entirely in the browser with no key. The AI Extract step (notes to grid) calls a small server-side gateway, so no API key is needed to use it.
