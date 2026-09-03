# Concept Graph Model

The graph is a navigational structure, not a proof graph.

```text
CONCEPT_A
   ↓ relation(status, provenance)
CONCEPT_B
```

Every relation should be typed and status-bounded.

Initial relation types:

- `introduces`
- `explains`
- `relates_to`
- `contrasts_with`
- `depends_on`
- `applies_to`
- `opens_domain`
- `learn_from`

Initial epistemic statuses:

`OBS`, `REL`, `HYP`, `UNKNOWN`, `REFUTED`, `N.A.`

A relation may be useful for navigation while remaining `REL` or `HYP`. Visualization must not silently upgrade its epistemic status.
