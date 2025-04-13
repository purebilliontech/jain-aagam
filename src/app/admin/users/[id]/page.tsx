import React from 'react'
import UserForm from './UserForm'
import { getUserById } from './actions'

const UserEditPage = async ({ params }: { params: { id: string } }) => {
    const user = await getUserById(params.id)

    return (
        <UserForm user={user} />
    )
}

export default UserEditPage;