/**
 * Placeholder rendered by components that are not built yet. It shows who owns the
 * feature, where the spec lives, and the live data the component will receive, so the
 * contract is visible from day one. Delete the <FeatureStub> once the real UI lands.
 */
export function FeatureStub({ backlog, title, owner, specPath, data, children }) {
  return (
    <div className="stub">
      <div className="stub__head">
        <code className="stub__id">{backlog}</code>
        <strong>{title}</strong>
        <span className="stub__owner">{owner}</span>
      </div>
      {specPath && (
        <p className="stub__spec">
          Spec: <code>{specPath}</code>
        </p>
      )}
      {children}
      {data !== undefined && (
        <details className="stub__data">
          <summary>Data this component receives</summary>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </details>
      )}
    </div>
  );
}
