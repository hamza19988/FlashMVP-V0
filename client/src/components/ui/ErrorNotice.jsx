export function ErrorNotice({ error, onRetry }) {
  if (!error) return null;
  return (
    <div className="error-notice" role="alert">
      <span>{error.message}</span>
      {onRetry && (
        <button type="button" className="link-btn" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
