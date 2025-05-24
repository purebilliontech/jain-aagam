"use client"

import React, { Dispatch, SetStateAction, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { submitEnglishAgamContact } from "@/app/(public)/(home)/actions";
import { EnglishAgamContactFormSchema } from "@/schema/englishAagam";
import { EnglishAgamContactForm } from "@/schema/englishAagam";
import { FormField, FormItem } from '@/components/ui/form';
import { GenericFormField, GenericFormInput } from '@/components/generic';
import { Form } from '@/components/ui/form';
import FEButton from '@/components/common/FEButton';


export default function EnglishAgamForm({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }) {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<EnglishAgamContactForm>({
        resolver: zodResolver(EnglishAgamContactFormSchema),
        mode: "onBlur",
    });

    const onSubmit = async (data: EnglishAgamContactForm) => {
        try {
            setIsSubmitting(true);

            const result = await submitEnglishAgamContact(data);

            if (result.success) {
                toast.success("Your information has been submitted successfully");
                form.reset();
                setIsOpen(false);
            } else {
                toast.error(result.message || "Something went wrong");
            }
        } catch (error) {
            toast.error("Failed to submit. Please try again.");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (

        <Dialog open={isOpen} onOpenChange={setIsOpen} >
            <DialogContent className='bg-primary-ui'>
                {/* <DialogHeader>
                    <DialogTitle>English Aagam Contact Information</DialogTitle>
                    <DialogDescription>
                        Please fill in your details to register your interest in English
                        Aagams.
                    </DialogDescription>
                </DialogHeader> */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <GenericFormField
                                    formLabel="Name"
                                    labelClass='text-typography'
                                    field={field}
                                    ctrlClass='border-typography bg-white/20'
                                    cb={GenericFormInput}
                                />
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="contactNumber"
                            render={({ field }) => (
                                <GenericFormField
                                    formLabel="Contact Number"
                                    field={field}
                                    ctrlClass='border-typography bg-white/20'
                                    labelClass='text-typography'
                                    cb={GenericFormInput}
                                />
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <GenericFormField
                                    formLabel="City"
                                    field={field}
                                    ctrlClass='border-typography bg-white/20'
                                    labelClass='text-typography'
                                    cb={GenericFormInput}
                                />
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <GenericFormField
                                    formLabel="Country"
                                    field={field}
                                    ctrlClass='border-typography bg-white/20'
                                    labelClass='text-typography'
                                    cb={GenericFormInput}
                                />
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <GenericFormField
                                    formLabel="Email Address"
                                    field={field}
                                    ctrlClass='border-typography bg-white/20'
                                    labelClass='text-typography'
                                    cb={GenericFormInput}
                                />
                            )}
                        />

                        <DialogFooter className="pt-4">
                            {/* <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </Button> */}
                            <FEButton className='!py-2 !px-5 rounded-lg mx-auto' type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </FEButton>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
