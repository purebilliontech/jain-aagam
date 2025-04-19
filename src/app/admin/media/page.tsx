import React from 'react'
import MediaPage from './MediaPage'
import { authorizeUser } from '@/lib/auth';
import NoPermission from '@/components/common/NoPermission';

const Media = async () => {
    const user = await authorizeUser(["view:media"]);

    if (!user.success) {
        return (
            <NoPermission message={user.message} />
        );
    }

    return (
        <MediaPage />
    )
}

export default Media