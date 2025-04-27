"use client";

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
    const router = useRouter();

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Button onClick={() => router.push('/admin')}>Go to Home</Button>
        </div>
    )
}

export default NotFoundPage