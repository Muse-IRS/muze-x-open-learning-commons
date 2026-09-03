# Reactive Visual Field

Status: `EXPLORATORY VISUAL LANGUAGE`

The full-screen particle field is inspired by swarm motion and the interaction modes `ATTRACT`, `DISPERSE`, `VORTEX` and `RELAX`.

It is not presented as a scientific model of cognition, consciousness or learning.

```text
POINTER / TOUCH
→ EXPLICIT FIELD RESPONSE
```

The learning engine remains separate:

```text
VISUAL_FIELD != LEARNING_ENGINE
```

## Surface separation

The field itself remains part of the Open Learning visual identity across the learning page. Its technical controls do not.

```text
OPEN LEARNING
→ learning / aggregation / concepts / sources
→ full-screen swarm remains as ambient interface language

SWARM FIELD LAB
→ dedicated visual experimentation surface
→ ATTRACT / DISPERSE / VORTEX / RELAX
→ visual speed controls
```

The public route `/swarm/` is the dedicated control surface. This prevents visual experimentation controls from competing with the learning task while keeping the same underlying field implementation.

The field may respond to pointer position, touch, viewport size, orientation, explicit visual mode selection and an explicit user-selected visual speed. It must not infer hidden interests or choose learning content from those movements.

## Bottom anchor

On the Open Learning page, the same full-screen particles may converge toward the explicit Muze-X bridge anchor when that anchor enters the viewport.

```text
ANCHOR_VISIBLE
→ LOCAL_SWARM_GATHERING

ANCHOR_HIDDEN
→ BASE_FIELD_DYNAMICS
```

This is a visual navigation metaphor only.

## Calibration

The public bootstrap was first calibrated through direct iPad use. The current visual calibration therefore treats device feedback as interface observation, not as scientific validation of the field model.

For the standard motion profile:

- particle density is increased to `150 %` of the first public bootstrap while keeping the two swarms equally populated;
- particle radius and motion trails are thicker to strengthen depth perception;
- iPad receives a faster default visual travel factor (`1.4×`);
- in the dedicated Swarm Field Lab, the user may explicitly choose `0.75×`, `1×`, `1.4×`, `1.8×` or `2.2×` during the current page session;
- the speed setting affects only visual particle travel and does not alter learning-resource selection.

`prefers-reduced-motion` remains an explicit exception: density and speed are reduced rather than forced to the standard calibration.

Accessibility requirement: respect `prefers-reduced-motion` and adapt particle count to viewport/performance.
