import React from 'react'
import { getBhagwanMahavirContent } from './actions';
import { notFound } from 'next/navigation';
import { BhagwanMahavirPageContentForm } from './BhagwanMahavirPageForm';
import { authorizeUser } from '@/lib/auth';
import NoPermission from '@/components/common/NoPermission';

const Page = async () => {

    const user = await authorizeUser(["modify:bhagwan-mahavir-page"]);

    if (!user.success) {
        return (
            <NoPermission message={user.message} />
        );
    }

    const bhagwanMahavirContent = await getBhagwanMahavirContent();

    if (!bhagwanMahavirContent.success || !bhagwanMahavirContent.data) {
        return notFound();
    }

    return (
        <BhagwanMahavirPageContentForm bhagwanMahavirContent={bhagwanMahavirContent.data} />
    )
}

export default Page