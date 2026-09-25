/**
 * Owner: Person 1 | Backlog: BL-SDD-02
 * TODO(BL-SDD-02): read-only checklist + "{completed}/{total} tasks reviewed" progress bar.
 */
export function TaskBreakdownTab({ tasks = [] }) {
  return (
    <ol className="sdd-raw">
      {tasks.map((t) => (
        <li key={t.id}>{t.description}</li>
      ))}
    </ol>
  );
}
