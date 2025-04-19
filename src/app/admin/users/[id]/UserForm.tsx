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

const UserForm = ({ user, permissions }: { user: UserWithPermission | null, permissions: PermissionDTO[] }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

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
                                        cb={GenericFormPassword}
                                    />
                                )}
                            />
                        }

                        {/* Permissions Section */}
                        <div className="mt-5">
                            <Label className="block mb-4 text-lg font-medium">User Permissions</Label>
                            <div className="flex flex-wrap gap-5">
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


                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="mt-5 justify-end">
                        <PrimaryButton
                            type="submit"
                            className="max-md:w-full md:w-4/12"
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : user ? "Modify" : "Add"}
                        </PrimaryButton>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}

export default UserForm