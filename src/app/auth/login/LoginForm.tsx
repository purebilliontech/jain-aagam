"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, Login } from "@/schema/auth"
import { Form, FormField } from "@/components/ui/form"
import { GenericFormField, GenericFormInput } from "@/components/generic";
import Link from "next/link";
import { toast } from "sonner";
import { login } from "./action";

export function LoginForm() {
    const form = useForm<Login>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: Login) => {
        try {

            const loginRes = await login(data);

            if (loginRes.success) {
                toast.success("Login successful");
                window.location.href = '/admin';
            } else {
                if (typeof loginRes.data === "object") {
                    toast.error(loginRes.data.message as string);
                    return;
                } else {
                    toast.error("Failed to login");
                    return;
                }
            }
        } catch {
            toast.error("Failed to login");
        }
    };

    return (
        <div className={cn("flex flex-col max-w-lg mx-auto mt-20 gap-6")}>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-6">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <GenericFormField
                                            formLabel="Email"
                                            field={field}
                                            cb={GenericFormInput}
                                            inputEle={
                                                <Input type="email" placeholder="Enter your email" />
                                            }
                                        />
                                    )}
                                />
                                <div className="grid gap-2">

                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <GenericFormField
                                                formLabel={
                                                    <div className="flex w-full justify-between items-center">
                                                        <Label htmlFor="password">Password</Label>
                                                        <Link
                                                            href="/auth/forgot"
                                                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                                        >
                                                            Forgot your password?
                                                        </Link>
                                                    </div>
                                                }
                                                field={field}
                                                cb={GenericFormInput}
                                                inputEle={
                                                    <Input type="password" placeholder="Enter your password" />
                                                }
                                            />
                                        )}
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div >
    )
}
