/**
 * Owner: Person 1 | Backlog: BL-SDD-02
 * Spec: docs/backlogs/10-specs-driven-development/frontend/BL-SDD-02-three-part-artifact-review-interface.md
 * TODO(BL-SDD-02): Markdown renderer for user stories (react-markdown).
 */
export function RequirementsTab({ markdown }) {
  return <pre className="sdd-raw">{markdown}</pre>;
}
