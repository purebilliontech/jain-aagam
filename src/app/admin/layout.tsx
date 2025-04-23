import { AppSidebar } from '@/components/app-sidebar'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/context/auth-context'
import { getCurrentUser } from '@/lib/auth'
import React from 'react'

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {

    const user = await getCurrentUser();

    return (
        <AuthProvider>
            <SidebarProvider>
                <Toaster />
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <div className="flex-1"></div>
                        <h1 className="text-lg mr-5 font-semibold">Welcome, {user?.name}</h1>
                    </header>
                    <div className="p-5">
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider >
        </AuthProvider>
    )
}

export default AdminLayout;