"use client"

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormField } from "@/components/ui/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import {
    GenericFormField,
    GenericFormImageInput,
    GenericFormInput,
} from "@/components/generic/GenericFormComponents";
import { BhagwanMahavirPageFormSchema, type BhagwanMahavirPageDTO, type BhagwanMahavirPageForm } from "@/schema/staticPage";
import { updateBhagwanMahavirContent } from "./actions";
import { toast } from "sonner";
import { PrimaryButton } from "@/components/generic";

export const BhagwanMahavirPageContentForm = ({ bhagwanMahavirContent }: { bhagwanMahavirContent: BhagwanMahavirPageDTO }) => {
    const [loading, setLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(BhagwanMahavirPageFormSchema),
        defaultValues: {
            CoverImage: bhagwanMahavirContent.CoverImage || undefined,
        },
    });

    const onFormSubmit = async (values: BhagwanMahavirPageForm) => {
        setLoading(true);
        try {
            const resData = await updateBhagwanMahavirContent(values);
            if (resData.success) {
                toast.success("Bhagwan Mahavir page content updated successfully");
            } else {
                toast.error("Failed to update Bhagwan Mahavir page content");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update Bhagwan Mahavir page content");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((data) =>
                            onFormSubmit(data as BhagwanMahavirPageForm),
                        )}
                    >
                        <Card className="container max-w-3xl mx-auto">
                            <CardHeader>
                                <CardTitle className="text-center">
                                    Manage Bhagwan Mahavir Page Content
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="">
                                <FormField
                                    control={form.control}
                                    name={`CoverImage.media`}
                                    render={({ field }) => (
                                        <GenericFormField
                                            field={field}
                                            formLabel="Cover Image"
                                            itemClass="w-full"
                                            cb={GenericFormImageInput}
                                        />
                                    )}
                                />

                            </CardContent>
                            <CardFooter className="mt-5 justify-end">
                                <PrimaryButton
                                    type="submit"
                                    className="max-md:w-full md:w-4/12"
                                    disabled={loading}
                                >
                                    {loading ? "Processing..." : "Save"}
                                </PrimaryButton>

                            </CardFooter>
                        </Card>
                    </form>
                </Form>
            </>
        </div>
    );
};
