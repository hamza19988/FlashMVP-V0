/** Owner: Person 1 */
import { Link } from 'react-router-dom';
import { EmptyState } from '@/components/ui';

export default function NotFoundPage() {
  return (
    <EmptyState title="This page does not exist">
      <Link to="/">Go back to the start page</Link>
    </EmptyState>
  );
}
