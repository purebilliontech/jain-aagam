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
import { HomepageFormSchema, type HomepageDTO, type HomepageForm } from "@/schema/staticPage";
import { updateHomepageContent } from "./actions";
import { toast } from "sonner";
import { PrimaryButton } from "@/components/generic";

export const HomePageForm = ({ homepageContent }: { homepageContent: HomepageDTO }) => {
    const [loading, setLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(HomepageFormSchema),
        defaultValues: {
            CoverImage: homepageContent.CoverImage || undefined,
        },
    });


    const onFormSubmit = async (values: HomepageForm) => {
        setLoading(true);
        try {
            const resData = await updateHomepageContent(values);
            if (resData.success) {
                toast.success("Homepage content updated successfully");
            } else {
                toast.error("Failed to update homepage content");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update homepage content");
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
                            onFormSubmit(data as HomepageForm),
                        )}
                    >
                        <Card className="container max-w-3xl mx-auto">
                            <CardHeader>
                                <CardTitle className="text-center">
                                    Manage Homepage Content
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="my-5 ">
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
