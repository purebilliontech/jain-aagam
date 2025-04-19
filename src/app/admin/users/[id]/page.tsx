import React from 'react'
import UserForm from './UserForm'
import { getAllPermissions, getUserById } from './actions'
import { notFound } from 'next/navigation';
import { authorizeUser } from '@/lib/auth';
import NoPermission from '@/components/common/NoPermission';

const UserEditPage = async ({ params }: { params: Promise<{ id: string }> }) => {

    const user = await authorizeUser(["view:user"]);

    if (!user.success) {
        return (
            <NoPermission message={user.message} />
        );
    }

    const { id } = await params;
    const userRes = await getUserById(id);
    const permissions = await getAllPermissions();

    if (!userRes.success) {
        return notFound();
    }

    return (
        <UserForm user={userRes.data} permissions={permissions.data} />
    )
}

export default UserEditPage;