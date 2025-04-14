import UsersDataTable from './UsersDataTable'

export const metadata = {
  title: 'User Management',
  description: 'Manage users of the application',
}

export default function UsersPage() {
  return (
    <div className="container mx-auto p-6">
      <UsersDataTable />
    </div>
  )
}