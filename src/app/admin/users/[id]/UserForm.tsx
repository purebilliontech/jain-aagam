"use client"

import { CreateUserSchema, UpdateUserSchema, type UserDTO, type CreateUser, type UpdateUser } from '@/schema/user';
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form'
import { Form, FormField } from '@/components/ui/form';
import { GenericFormField, GenericFormInput, GenericFormPassword, GenericSelectClosure } from '@/components/generic';

const UserForm = ({ user }: { user: UserDTO | null }) => {

    type FormType<T> = T extends null ? CreateUser : UpdateUser;

    const form = useForm<FormType<typeof user>>({
        resolver: zodResolver(user ? UpdateUserSchema : CreateUserSchema),
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
            role: user?.role || '',
        }
    });

    const onSubmit = (data: FormType<typeof user>) => {
        console.log(data);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

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
                    </Button>
                </form>
            </Form>

        </div>
    )
}

export default UserForm