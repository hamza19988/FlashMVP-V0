/**
 * Owner: Person 1 | Backlog: BL-SDD-02
 * TODO(BL-SDD-02): badge row, green = enabled, grey = disabled, readable labels.
 */
export function IBMToolBindingsPanel({ bindings = {} }) {
  return (
    <p className="sdd-raw">
      {Object.entries(bindings)
        .map(([k, v]) => `${k}: ${v ? 'on' : 'off'}`)
        .join('  |  ')}
    </p>
  );
}
