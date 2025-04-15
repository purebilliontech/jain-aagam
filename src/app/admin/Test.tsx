"use client";

import { GenericFormField, GenericFormImageInput, GenericFormInput } from '@/components/generic';
import { Form, FormField } from '@/components/ui/form';
import { MediaDTOSchema } from '@/schema/media';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';


const mySchema = z.object({
    media: MediaDTOSchema.nullable(),
    title: z.string(),
});
type mySchemaType = z.infer<typeof mySchema>;

const AdminPageTest = () => {
    const form = useForm({
        resolver: zodResolver(mySchema),
        defaultValues: {
            media: null,
            title: "",
        }
    });

    const onSubmit = async (val: any) => {
        console.log(val);
    }
    return (
        <>
            <div>Admin Dashboard</div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="media"
                        render={({ field }) =>
                            <GenericFormField
                                formLabel="Media"
                                field={field}
                                cb={GenericFormImageInput}
                            />
                        }
                    />
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <GenericFormField
                                formLabel="Email"
                                field={field}
                                cb={GenericFormInput}
                            />
                        )}
                    />
                    <button type="submit">Submit</button>
                </form>
            </Form>
        </>
    )
}

export default AdminPageTest