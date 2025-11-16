# Code Exemplars - BoltWire

This folder contains a blueprint and a tiny generator to scaffold code exemplars for BoltWire.

Quick start
1. Edit tools/code-exemplars/exemplars-manifest.json and add entries for each exemplar you want to scaffold.
2. From the repository root:
   - node tools/code-exemplars/generate-exemplars.js tools/code-exemplars/exemplars-manifest.json
3. Inspect the created folders under docs/exemplars/<slug> and fill in README.md, example.cs, and tests.

Why this exists
- To make consistent, reviewable examples for contributors and documentation generators.
- To speed up adding new exemplars without manual folder setup.

Notes
- The scaffolder is intentionally simple. You can extend it to:
  - validate metadata fields,
  - detect Unity project structure,
  - add CI checks, or
  - generate website-friendly metadata for docs sites.
