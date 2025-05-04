"use client"

import { CreateUserSchema, UpdateUserSchema, type UserWithPermission, type CreateUser, type UpdateUser } from '@/schema/user';
import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { GenericFormField, GenericFormInput, GenericFormPassword, PrimaryButton } from '@/components/generic';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { createUser, getAllPermissions, updateUserById } from './actions';
import { useRouter } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';
import type { PermissionDTO } from '@/schema/permissions';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/auth-context';

const UserForm = ({ user, permissions }: { user: UserWithPermission | null, permissions: PermissionDTO[] }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const { hasPermissions } = useAuth();

    type FormType<T> = T extends null ? CreateUser : UpdateUser;

    const form = useForm<FormType<typeof user>>({
        resolver: zodResolver(user ? UpdateUserSchema : CreateUserSchema),
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
            password: '',
            permissions: user?.permissions.map(p => p.permissionName) || [],
        }
    });

    const onSubmit = async (data: FormType<typeof user>) => {
        setIsLoading(true);

        try {
            if (user) {
                const updatedUser = await updateUserById(user.id, data);
                if (updatedUser.success) {
                    toast.success("User Updated Successfully");
                } else {
                    toast.error("Failed to Update User");
                }
            } else {
                const newUser = await createUser(data as CreateUser);
                if (newUser.success) {
                    toast.success("User Created Successfully");
                    router.replace(`/admin/users`);
                } else {
                    toast.error("Failed to Create User");
                }
            }
        } catch (error) {
            toast.error(user ? "Failed to Update User" : "Failed to Create User");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Toggle permission handler
    const togglePermission = (permissionName: string, checked: boolean) => {
        const currentPermissions = form.getValues("permissions") || [];

        let updatedPermissions;
        if (checked) {
            // Add permission if it doesn't exist
            if (!currentPermissions.includes(permissionName)) {
                updatedPermissions = [...currentPermissions, permissionName];
            } else {
                updatedPermissions = currentPermissions;
            }
        } else {
            // Remove permission
            updatedPermissions = currentPermissions.filter(p => p !== permissionName);
        }

        form.setValue("permissions", updatedPermissions);
    };


    // 1. Group permissions by resource
    const grouped = React.useMemo(() => {
        return permissions.reduce<Record<string, PermissionDTO[]>>((acc, perm) => {
            const [, resource] = perm.name.split(':');
            if (!acc[resource]) acc[resource] = [];
            acc[resource].push(perm);
            return acc;
        }, {});
    }, [permissions]);

    // 2. Helpers to bulk-select
    const selectAll = () =>
        form.setValue('permissions', permissions.map(p => p.name));
    const clearAll = () =>
        form.setValue('permissions', []);
    const selectByAction = (action: 'modify' | 'view') =>
        form.setValue(
            'permissions',
            permissions.filter(p => p.name.startsWith(`${action}:`)).map(p => p.name)
        );

    // 3. Group toggle
    const toggleGroup = (resource: string, checked: boolean) => {
        const groupNames = grouped[resource].map(p => p.name);
        const current = form.getValues('permissions') || [];
        let updated: string[];
        if (checked) {
            updated = Array.from(new Set([...current, ...groupNames]));
        } else {
            updated = current.filter(name => !groupNames.includes(name));
        }
        form.setValue('permissions', updated);
    };
    const groupChecked = (resource: string) => {
        const current = form.getValues('permissions') || [];
        return grouped[resource].every(p => current.includes(p.name));
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card className="container max-w-3xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-center">
                            {user ? "Modify User" : "Add User"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="mt-5 flex flex-col gap-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <GenericFormField
                                    formLabel="Name"
                                    disabled={!hasPermissions(["modify:user"])}
                                    field={field}
                                    cb={GenericFormInput}
                                />
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <GenericFormField
                                    formLabel="Email"
                                    field={field}
                                    disabled={!hasPermissions(["modify:user"])}
                                    cb={GenericFormInput}
                                />
                            )}
                        />

                        {
                            !user &&
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <GenericFormField
                                        formLabel="Password"
                                        field={field}
                                        disabled={!hasPermissions(["modify:user"])}
                                        cb={GenericFormPassword}
                                    />
                                )}
                            />
                        }

                        {/* Permissions Section */}
                        <div className="mt-5">
                            <Label className="block mb-4 text-lg font-medium">User Permissions</Label>

                            <div className="flex flex-wrap gap-2 mb-4">
                                <PrimaryButton type='button' size="sm" onClick={selectAll}>Select All</PrimaryButton>
                                <PrimaryButton type='button' size="sm" onClick={() => selectByAction('modify')}>Modify All</PrimaryButton>
                                <PrimaryButton type='button' size="sm" onClick={() => selectByAction('view')}>View All</PrimaryButton>
                                <PrimaryButton type='button' size="sm" onClick={clearAll}>Clear All</PrimaryButton>
                            </div>


                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {form.watch("permissions") && Object.entries(grouped).map(([resource, perms]) => (
                                    <div key={resource} className="border rounded p-4">
                                        {/* Group header */}
                                        <div className="flex items-center mb-3">
                                            <Checkbox
                                                id={`group-${resource}`}
                                                checked={groupChecked(resource)}
                                                disabled={!hasPermissions(['modify:user'])}
                                                onCheckedChange={chk => toggleGroup(resource, chk as boolean)}
                                            />
                                            <FormLabel htmlFor={`group-${resource}`} className="ml-2 font-semibold">
                                                {resource.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                                            </FormLabel>
                                        </div>

                                        {/* Vertical list of individual permissions */}
                                        <div className="flex flex-col gap-2 ml-6">
                                            {perms.map(permission => {
                                                const isChecked = (form.getValues('permissions') || []).includes(permission.name);
                                                return (
                                                    <FormItem key={permission.name} className="flex items-center">
                                                        <Checkbox
                                                            id={`permission-${permission.name}`}
                                                            checked={isChecked}
                                                            disabled={!hasPermissions(['modify:user'])}
                                                            onCheckedChange={chk => togglePermission(permission.name, chk as boolean)}
                                                        />
                                                        <FormLabel htmlFor={`permission-${permission.name}`} className="ml-2">
                                                            {permission.name}
                                                        </FormLabel>
                                                    </FormItem>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>



                        {/* <div className="flex flex-wrap gap-5">
                            {permissions.map((permission) => {
                                const currentPermissions = form.getValues("permissions") || [];
                                const isChecked = currentPermissions.includes(permission.name);

                                return (
                                    <React.Fragment key={permission.name}>
                                        {form.watch("permissions") &&
                                            <FormItem className="flex items-center">
                                                <Checkbox
                                                    id={`permission-${permission.name}`}
                                                    checked={isChecked}
                                                    disabled={!hasPermissions(["modify:user"])}
                                                    onCheckedChange={(checked) =>
                                                        togglePermission(permission.name, checked as boolean)
                                                    }
                                                />
                                                <FormLabel
                                                    htmlFor={`permission-${permission.name}`}
                                                    className="cursor-pointer font-normal"
                                                >
                                                    {permission.name}
                                                </FormLabel>
                                            </FormItem>
                                        }
                                    </React.Fragment>
                                );
                            })}


                        </div> */}
                        {/* </div> */}
                    </CardContent>


                    <CardFooter className="mt-5 justify-end">
                        {hasPermissions(["modify:user"]) &&
                            <PrimaryButton
                                type="submit"
                                className="max-md:w-full md:w-4/12"
                                disabled={isLoading}
                            >
                                {isLoading ? "Processing..." : user ? "Modify" : "Add"}
                            </PrimaryButton>
                        }
                    </CardFooter>
                </Card>
            </form>
        </Form >
    )
}

export default UserForm;

