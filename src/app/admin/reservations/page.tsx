import { authorizeUser } from '@/lib/auth';
import NoPermission from '@/components/common/NoPermission';
import Reservations from './Reservations';

export const metadata = {
  title: 'Reservations',
  description: 'Manage Reservations',
}

export default async function ReservationsPage() {
  const user = await authorizeUser(["view:reservations"]);

  if (!user.success) {
    return (
      <NoPermission message={user.message} />
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Reservations />
    </div>
  )
}