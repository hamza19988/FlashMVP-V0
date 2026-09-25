export function Spinner({ size = 18, label }) {
  return (
    <span className="spinner" style={{ width: size, height: size }} role="status">
      {label && <span className="visually-hidden">{label}</span>}
    </span>
  );
}
