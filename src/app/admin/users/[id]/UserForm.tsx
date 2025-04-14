"use client"

import { CreateUserSchema, UpdateUserSchema, type UserDTO, type CreateUser, type UpdateUser } from '@/schema/user';
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form'
import { Form, FormField } from '@/components/ui/form';
import { GenericFormField, GenericFormInput, GenericFormPassword, GenericSelectClosure, PrimaryButton } from '@/components/generic';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { createUser, updateUserById } from './actions';
import { useRouter } from 'next/navigation';

const UserForm = ({ user }: { user: UserDTO | null }) => {
    const router = useRouter();

    type FormType<T> = T extends null ? CreateUser : UpdateUser;

    const form = useForm<FormType<typeof user>>({
        resolver: zodResolver(user ? UpdateUserSchema : CreateUserSchema),
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
            role: user?.role || '',
            password: '',
        }
    });

    const onSubmit = async (data: FormType<typeof user>) => {
        console.log(data);

        try {
            if (user) {
                const updatedUser = await updateUserById(user.id, data);
                if (updatedUser) {
                    toast.success("User Updated Successfully");
                } else {
                    toast.error("Failed to Update User");
                }
            } else {
                const newUser = await createUser(data as CreateUser);
                if (newUser) {
                    toast.success("User Created Successfully");
                    router.replace(`/admin/users/${newUser.id}`);
                } else {
                    toast.error("Failed to Create User");
                }
            }
        } catch (error) {
            toast.error("Failed to Create User")
            console.error(error);
        }


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

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <GenericFormField
                                    formLabel="Role"
                                    field={field}
                                    cb={GenericSelectClosure({
                                        options: [
                                            { value: "user", display: "User" },
                                            { value: "admin", display: "Admin" },
                                        ],
                                    })}
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
                        {/* 

                    <Button onClick={() => {
                        console.log(form.formState.errors)
                        if (!showOTP) {
                            const phone = form.getValues("phone");
                            const phoneRegex = /^[0-9]{10}$/; // Assuming a 10-digit phone number format
                            if (!phoneRegex.test(phone)) {
                                form.setError("phone", {
                                    type: "manual",
                                    message: "Invalid phone number format",
                                });
                                return;
                            }
                            handleRequestOTP(form.getValues("phone"));
                        }
                    }} type="submit" className="w-full" disabled={isLoading}>
                        {isLoading
                            ? "Processing..."
                            : showOTP
                                ? "Login"
                                : "Request OTP"}
                    </Button> */}

                    </CardContent>
                    <CardFooter className="mt-5 justify-end">
                        <PrimaryButton
                            type="submit"
                            className="max-md:w-full md:w-4/12"
                        >
                            {user ? (
                                "Modify"
                            ) : (
                                "Add"
                            )}
                        </PrimaryButton>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}

export default UserForm