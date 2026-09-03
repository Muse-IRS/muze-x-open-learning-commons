# Open Learning — Content Aggregation Model

Status: `PUBLIC / EXPLORATORY`

## Purpose

Open Learning Commons is not limited to Muze-X modules. It may index public educational resources from external platforms so a learner can begin exploring a subject even when the Muze-X domain graph is still small.

```text
PUBLIC RESOURCE
→ PROVENANCE
→ METADATA
→ CONCEPT / TOPIC RELATION
→ LEARNING FIELD
→ ORIGINAL SOURCE
```

The platform does not need to reproduce a source in order to make it discoverable.

## Priority order

```text
REUSE
>
RELATE
>
SYNTHESIZE
>
GENERATE
```

If an adequate public resource already exists, Open Learning should prefer indexing and relating it before creating redundant content.

## Source boundary

```text
INDEXED_RESOURCE
!=
ENDORSED_CLAIM

SOURCE_EXISTENCE
!=
PEDAGOGICAL_VALIDITY

PUBLICLY_ACCESSIBLE
!=
FREE_TO_COPY
```

The starter catalog stores only the metadata necessary for discovery and provenance. Linked content remains hosted by its original publisher and subject to that publisher's rights, licenses and access conditions.

## Starter field

Version `0.1` combines:

- existing public Muze-X domain modules;
- a small manually verified public learning catalog;
- concept and topic search;
- source type and language filters;
- direct links to original sources.

The first external entries are deliberately heterogeneous: open courseware, course catalogs, scholarly reference works and self-learning resources. Their inclusion tests the aggregation model; it is not a ranking of the best educational platforms.

## Future adapters

Potential adapters may include public video platforms, podcasts, open-course catalogs, scholarly repositories and public documentation.

Adapters must preserve:

```text
SOURCE
!=
INTERPRETATION
!=
AI_SYNTHESIS
```

They must not require a user profile merely to expose public material. API credentials, where a platform requires them for public discovery, belong to deployment secrets and never to the public repository.

## Learner autonomy

The learning field may propose related resources, but the user remains the decision-maker.

```text
PLATFORM_PROPOSES
USER_DECIDES
```

No engagement optimization, forced autoplay, covert persuasion or behavioural-profile inference is required by this model.
