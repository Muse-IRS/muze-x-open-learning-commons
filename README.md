# Muze-X Open Learning Commons

**Status:** `EXPLORATORY / PUBLIC / OPEN SOURCE`

Muze-X Open Learning Commons is a public, open-source human/AI collaborative learning commons for connecting educational resources, concepts, domains and exploratory modules into a traceable knowledge mesh.

The project starts from a simple idea:

> **Do not produce more content than necessary. Find, relate and make intelligible what already exists; synthesize or generate only when a useful pedagogical gap remains.**

```text
REUSE
  >
RELATE
  >
SYNTHESIZE
  >
GENERATE
```

## Current public surfaces

```text
OPEN LEARNING
→ aggregate public learning resources
→ search / provenance / concepts / domains

SWARM FIELD LAB
→ dedicated reactive visual-field experimentation
→ attract / disperse / vortex / relax
→ visual speed control
```

The main learning interface keeps the full-screen swarm as Muze-X visual language, but its technical controls live on the dedicated `/swarm/` route so visual experimentation does not compete with the learning task.

## Learning field

The public learning field combines existing Muze-X modules with a small versioned catalog of external public educational resources.

```text
PUBLIC RESOURCE
→ PROVENANCE
→ METADATA
→ LEARNING FIELD
→ ORIGINAL SOURCE
```

The starter external catalog currently demonstrates several resource types: course catalogs, open courseware, scholarly reference works and self-learning resources.

```text
INDEXED_RESOURCE != ENDORSED_CLAIM
PUBLICLY_ACCESSIBLE != FREE_TO_COPY
```

Open Learning stores discovery metadata and links back to the original publisher. It does not silently reproduce third-party educational content.

See `docs/CONTENT_AGGREGATION_MODEL.md`.

## Core loop

```text
LEARN
  ↕
EXPLORE
  ↕
CONTRIBUTE
```

Open Learning Commons is designed to exchange context with the public multi-domain **Muze-X Lab Collaborative Platform**:

```text
MUZE-X OPEN LEARNING COMMONS
            ↕
MUZE-X LAB COLLABORATIVE PLATFORM
```

Learning may lead to a domain exploration. A domain exploration may reveal a new concept to learn. A learner may eventually decide to propose or develop a new public module. Contribution is possible, never required.

## Research posture

This repository is research and exploratory conceptual development. It does not claim scientific proof for its visual metaphors, conceptual relations or experimental interface dynamics.

```text
RESEARCH != PROOF
MODEL != REALITY
RELATION != CAUSATION
CONVERGENCE != PROOF
```

The project follows a strict epistemic rule:

> **Never produce more certainty than the available information contains.**

## Learner autonomy

```text
PLATFORM_PROPOSES
USER_DECIDES
```

The platform must not optimize for dependency, compulsive engagement, hidden persuasion or maximum screen time. It should support understanding, source diversity, provenance, relation-building and user-selected learning goals.

```text
LEARNING_SUPPORT != BEHAVIORAL_INFLUENCE
POSSIBILITY_TO_CONTRIBUTE != PRESSURE_TO_CONTRIBUTE
```

## Public-source principle

A public educational resource remains attributable to its original source and creator.

```text
SOURCE
!=
INTERPRETATION
!=
AI_SYNTHESIS
```

The project prefers linking, embedding where permitted, metadata, provenance and relational indexing over copying or re-hosting source content.

## Visual field

The public interface includes an experimental reactive particle field inspired by attractor, dispersion, vortex and relaxation dynamics. It is a **visual language**, not a scientific model of cognition.

The field reacts to explicit pointer/touch input only and is architecturally separated from the learning engine:

```text
USER_INPUT
   ├──> VISUAL_FEEDBACK
   │
   └──> EXPLICIT_UI_ACTION
              ↓
        LEARNING_ENGINE
```

Never:

```text
VISUAL_BEHAVIOR
→ hidden inference
→ imposed content
```

The dedicated `Swarm Field Lab` exposes the visual controls. The main learning surface keeps only the ambient field and the explicit bottom navigation anchor.

## Canonical persistence

GitHub `main` is the public persistent authority for the current project state. Humans and AI systems may collaborate through issues, pull requests and versioned files. No single conversation or model is the canonical memory of the project.

The repository should remain understandable and continuable even if its current collaborators, tools or models change.

## Public architecture

```text
PUBLIC EDUCATIONAL SOURCES
        ↓
SOURCE REGISTRY / CATALOG
        ↓
PROVENANCE
        ↓
CONCEPTS + RELATIONS
        ↓
KNOWLEDGE MESH
        ↓
USER-CHOSEN LEARNING PATH
        ↓
ORIGINAL SOURCE / DOMAIN MODULE
```

The current deployment intentionally requires no user account, no YouTube account, no OAuth token and no committed API secret.

## Privacy and public boundary

This public repository must not contain:

- personal case data;
- credentials or secrets;
- private prompts or private research artefacts;
- identifiable legal or administrative files;
- hidden behavioural profiles;
- copied copyrighted media without a clear right to publish.

Synthetic fixtures and public-source metadata are preferred for development.

## Collaboration credit

Conceptual development: **Muze-X × ChatGPT (OpenAI)**, within a broader open human/AI collaborative process.

This credit documents a creative and conceptual contribution. It does not by itself determine legal authorship, ownership or rights-holder status.

## License

Apache License 2.0. See `LICENSE` and `NOTICE`.
