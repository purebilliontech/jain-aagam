"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { refreshSession } from "./action";

export default function RefreshPage() {
    const router = useRouter();


    const refreshCurrentSesison = async () => {
        await refreshSession();
        window.location.href = '/admin';
    }

    useEffect(() => {
        // Refresh the session
        refreshCurrentSesison();
    }, [router]);

    return (
        <div className="flex min-h-screen items-center justify-center relative">
            <div className="text-center">
                <h1 className="text-2xl font-semibold">Refreshing</h1>
                <p className="mt-2 text-muted-foreground">Rfreshing your session...</p>
            </div>
        </div>
    );
}