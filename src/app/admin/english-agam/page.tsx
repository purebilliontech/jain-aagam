import { authorizeUser } from '@/lib/auth';
import NoPermission from '@/components/common/NoPermission';
import EnglishAagam from './EnglishAgam';

export const metadata = {
  title: 'English Agam Book Contacts',
  description: 'Manage English Agam Book Contacts',
}

export default async function EnglishAagamPage() {
  const user = await authorizeUser(["view:english-agam"]);

  if (!user.success) {
    return (
      <NoPermission message={user.message} />
    );
  }

  return (
    <div className="container mx-auto p-6">
      <EnglishAagam />
    </div>
  )
}