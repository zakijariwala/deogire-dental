# Reviews Compliance Log

Every review displayed on any clinic page MUST have a row here **before** it
renders (CLAUDE.md rule 2). Reviews are volatile, dated snapshots — never
recalled from model memory.

A review may only render when:
1. `compliance.json` for the clinic's block has `testimonials: true` (explicitly), AND
2. its row below has `compliance_checked: yes`, AND
3. the clinic has consented to displaying reviews (intake form Q17).

| clinic slug | review excerpt (first ~10 words) | author | source URL | pulled on | consent (Q17) | compliance_checked | approved by |
|---|---|---|---|---|---|---|---|

_No entries yet._
