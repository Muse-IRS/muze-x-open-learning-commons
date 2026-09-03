# Muze-X Lab Bridge

Open Learning Commons and Muze-X Lab form a bidirectional public knowledge path.

```text
OPEN LEARNING COMMONS
        ↕
MUZE-X LAB
```

## Learning to exploration

A learner may discover that a concept has a Muze-X domain module and choose to open it.

## Exploration to learning

A Muze-X module may expose a concept that deserves background learning and link back to the corresponding Open Learning concept or search.

## Portal attractor

Open Learning Commons carries the immersive reference implementation of the Muze-X portal attractor: the full-screen reactive swarm remains visible through the complete page and the circular navigation portal is positioned near the bottom, immediately before the footer.

The portal is a navigation language, not a cognitive or epistemic instrument.

```text
PORTAL_ATTRACTOR
=
FULL_VIEWPORT_SWARM_FIELD
+
BOTTOM_NAVIGATION_ANCHOR
+
EXPLICIT_USER_ACTION
```

When the circular anchor enters the viewport, the same two swarms that remain active across the complete page converge locally toward the anchor. When the anchor leaves the viewport, the particles return to their normal full-screen dynamics.

```text
ANCHOR_VISIBLE
-> LOCAL_SWARM_GATHERING

ANCHOR_HIDDEN
-> BASE_FIELD_DYNAMICS
```

The anchor does not create a second swarm and does not replace the persistent background field.

The current visual implementation uses Canvas 2D with two cyan/violet particle populations. Apparent depth is produced through size, glow, motion and a latent depth parameter; no conventional 3D scene is claimed.

```text
PERCEIVED_DEPTH != GEOMETRIC_3D
VISUAL_METAPHOR != SCIENTIFIC_PROOF
INTERACTION_EFFECT != COGNITIVE_MEASUREMENT
```

Pointer, touch and scroll visibility may modify the visual field only. They must not be used to infer hidden interests, select learning content, change pedagogical ranking or create a behavioural profile.

## Bottom anchor presentation

The anchor diameter is responsive and calibrated around its interior text rather than the document grid. The current tablet/desktop target is approximately `292 CSS px`, with a smaller mobile target.

Directly below the circle, the public interface exposes the implementation status in plain language:

- current technique;
- rendered perceptual effect;
- exploratory epistemic qualification.

This information sits outside the footer so the visual behaviour and its technical qualification are read together.

## Context contract candidate

Links may carry only non-sensitive public context parameters, for example:

```text
?concept=information-provenance
?domain=rgpd
```

No personal profile is required for this bridge.

## Deployment invariant

The Open Learning public interface must preserve:

```text
FULL_VIEWPORT_SWARM
+
BOTTOM_ANCHOR
+
INTERFACE_TECHNIQUE_NOTE
```

CI verifies the anchor element, its canonical public destination, the visual-field implementation and the conceptual-interface qualification so future interface work cannot silently detach the commons from the Muze-X knowledge mesh.
