# Source and Provenance Model

A resource object represents a reference to educational material. It does not transfer ownership of that material to this project.

```text
SOURCE
!=
INTERPRETATION
!=
AI_SYNTHESIS
```

Minimum public provenance:

```text
resource_id
source_type
canonical_url
creator_or_publisher
published_at | UNKNOWN
retrieved_or_registered_at
license_or_usage_note | UNKNOWN
concept_links
qualification_status
```

A publicly accessible resource is not automatically free to reproduce, transcribe, transform or re-host. Adapters should prefer metadata, linking and permitted embedding.
