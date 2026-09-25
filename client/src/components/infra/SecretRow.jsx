/**
 * Owner: Person 1 | Backlog: BL-INF-02 (UI)
 * TODO(BL-INF-02): table row layout, scope badge, confirm-before-delete.
 */
export function SecretRow({ secret, onDelete }) {
  return (
    <li className="secret-row">
      <code>{secret.key}</code>
      <span>{secret.scope}</span>
      <code>{secret.masked_value}</code>
      <button type="button" className="icon-btn" onClick={() => onDelete(secret.key)}>
        🗑 Delete
      </button>
    </li>
  );
}
