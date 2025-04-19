import { authorizeUser } from '@/lib/auth';
import UsersDataTable from './UsersDataTable'
import NoPermission from '@/components/common/NoPermission';

export const metadata = {
  title: 'User Management',
  description: 'Manage users of the application',
}

export default async function UsersPage() {
  const user = await authorizeUser(["view:user"]);

  if (!user.success) {
    return (
      <NoPermission message={user.message} />
    );
  }

  return (
    <div className="container mx-auto p-6">
      <UsersDataTable />
    </div>
  )
}