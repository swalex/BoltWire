# BoltWire Code Exemplars Blueprint

Purpose
- Provide consistent, discoverable, focused, and runnable code examples (exemplars) that demonstrate how to use BoltWire in common Unity/C# scenarios.
- Make exemplars easy for maintainers and community contributors to add, test, and review.

Exemplar categories
- quickstart: Minimal example to get a container, bind a type, and resolve it.
- unity-integration: How to use BoltWire with MonoBehaviour, ScriptableObject, and Scenes.
- composition-patterns: Factory, decorator, scoped lifetimes, grouped binds.
- testing: Unit tests, mocking patterns, and isolating BoltWire in tests.
- advanced: Custom providers, modules, reflection-based registration.
- migration: How to move from another DI (Zenject/UniRx/etc) to BoltWire.
- troubleshooting: Edge cases and common pitfalls with clear reproduction steps.

Directory layout (recommended)
- docs/exemplars/<slug>/
  - README.md            # human-readable example guide + how to run it in Unity or dotnet
  - example.cs           # small, focused code snippet(s)
  - unity/               # optional Unity-specific scene / package layout
  - tests/               # optional unit tests (NUnit / xUnit / Unity Test)
  - metadata.yaml/json   # machine-readable metadata used by site generation or scripts

Metadata fields (metadata.yaml OR metadata.json)
- title: short title
- slug: folder-friendly slug
- category: one of quickstart|unity-integration|composition-patterns|testing|advanced|migration|troubleshooting
- level: beginner | intermediate | advanced
- platforms: [ "Unity", "Editor", "Standalone" ]
- unity_version: optional (e.g., "2021.3+")
- tags: [ "container", "lifetime", "mono-behaviour" ]
- author: github-username
- created_at: YYYY-MM-DD
- updated_at: YYYY-MM-DD
- run_commands: array of shell commands or Unity play mode instructions that reproduce the example
- tests: optional list of test commands

Content guidelines
- Keep examples short: aim for 20–120 LOC per snippet file.
- Single responsibility: each exemplar demonstrates one concept.
- Self-contained: include minimal setup instructions required to run the snippet.
- Prefer runnable code: either a unit-test style snippet or a tiny Unity scene with instructions.
- Show expected output or behavior.

Naming and slug conventions
- slug: lower-case, hyphen-separated, e.g., "quickstart-basic-bind"
- filenames: descriptive, e.g., "PlayerServiceExample.cs", "README.md"

Contribution workflow
- Add a folder under docs/exemplars/<slug>.
- Add metadata.yaml or metadata.json.
- Add README.md with background, setup, and run instructions.
- Add code files and tests.
- Update docs/index (or site generator) if necessary.

CI integration suggestions
- dotnet test for any non-Unity unit tests.
- Unity Test Runner invocation in CI for Unity-based examples (if the repo CI supports it).
- Lint script (optional) to ensure metadata fields exist.

Review checklist for PRs adding exemplars
- [ ] Metadata present and valid
- [ ] Example compiles (dotnet build / Unity validation)
- [ ] Clear README and run steps
- [ ] Unit tests added for demonstrable behaviors (when applicable)
- [ ] Tags and category set

Example usage scenarios (short)
- Quickstart: bind interface IWeapon->Sword and resolve in GameController.
- Unity integration: demonstrate injecting into MonoBehaviour via a BoltWire component.
- Testing: show how to swap a test double using a test container.

This blueprint aims to keep exemplars discoverable, reviewable, and maintainable. Use the generator script to create scaffolding for new exemplars quickly.
