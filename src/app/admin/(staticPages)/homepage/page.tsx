import React from 'react'
import { getHomepageContent } from './actions';
import { notFound } from 'next/navigation';
import { HomePageForm } from './HomePageForm';
import { authorizeUser } from '@/lib/auth';
import NoPermission from '@/components/common/NoPermission';

const Page = async () => {

    const user = await authorizeUser(["modify:homepage"]);

    if (!user.success) {
        return (
            <NoPermission message={user.message} />
        );
    }

    const homepageContent = await getHomepageContent();

    if (!homepageContent.success || !homepageContent.data) {
        return notFound();
    }

    return (
        <HomePageForm homepageContent={homepageContent.data} />
    )
}

export default Page