import { authorizeUser } from '@/lib/auth';
import PlaylistsDataTable from './PlaylistsDataTable';
import NoPermission from '@/components/common/NoPermission';

export default async function PlaylistsPage() {


  const user = await authorizeUser(["view:playlist"]);

  if (!user.success) {
    return (
      <NoPermission message={user.message} />
    );
  }

  return (
    <div className="container mx-auto py-6">
      <PlaylistsDataTable />
    </div>
  );
}