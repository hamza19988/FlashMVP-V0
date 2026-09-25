/**
 * One badge component for every status string the API returns.
 * Add new statuses to TONES rather than styling badges locally.
 */
const TONES = {
  DRAFT: 'warning',
  CHANGES_REQUESTED: 'warning',
  APPROVED: 'success',
  LOCKED: 'info',
  PASSED: 'success',
  FAILED: 'danger',
  RUNNING: 'info',
  PENDING: 'neutral',
  SKIPPED: 'neutral',
  HEALTHY: 'success',
  STOPPED: 'neutral',
  EXITED: 'danger',
  CRASHED: 'danger',
  RESTARTING: 'warning',
  ACTIVE: 'success',
  STORED: 'success',
  DEPLOYED: 'success',
};

const LABELS = {
  CHANGES_REQUESTED: 'Changes requested',
  APPROVED: 'Approved & locked',
};

export function StatusBadge({ status, label }) {
  if (!status) return null;
  const tone = TONES[status] ?? 'neutral';
  const text = label ?? LABELS[status] ?? status.charAt(0) + status.slice(1).toLowerCase();
  return (
    <span className={`badge badge--${tone}`}>
      <span className="badge__dot" aria-hidden="true" />
      {text}
    </span>
  );
}
