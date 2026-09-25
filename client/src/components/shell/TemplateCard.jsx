/**
 * Owner: Person 1 | Backlog: BL-ARC-01
 * Spec: docs/backlogs/30-expandable-architecture/frontend/BL-ARC-01-starter-template-selector-ui.md
 * TODO(BL-ARC-01): icon, description, IBM binding badges, selected state.
 */
export function TemplateCard({ template, selected, onSelect }) {
  return (
    <button
      type="button"
      className={`template-card ${selected ? 'is-selected' : ''}`}
      aria-pressed={selected}
      onClick={() => onSelect(template.id)}
    >
      {template.icon} {template.name}
    </button>
  );
}
