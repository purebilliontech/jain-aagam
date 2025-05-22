"use client"

import Typography from '@/components/common/typography'
import SectionTitle from '@/components/common/SectionTitle'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import FEButton from '@/components/common/FEButton'
import { ReservationFormSchema } from '@/schema/reservations'
import { createReservation } from '../actions'
import { toast } from 'sonner'

export default function Reservations() {

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<z.infer<typeof ReservationFormSchema>>({
        resolver: zodResolver(ReservationFormSchema),
        defaultValues: {
            name: "",
            city: "",
            contact: "",
            email: "",
        },
    })

    async function onSubmit(values: z.infer<typeof ReservationFormSchema>) {
        try {
            const response = await createReservation(values);
            if (response.success) {
                toast.success(response.message);
                setIsSuccess(true);
                setMessage(response.message);
            } else {
                toast.error(response.message);
                setIsSuccess(false);
                setMessage(response.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    return (
        <section className="md:p-10 p-5 bg-[#E9E2D2]" >
            <SectionTitle title='Purchase & Reservations ' subtitle='ART GALLERY' />
            <Typography variant='p' className='text-justify text-foreground-ui mt-5 max-w-5xl mx-auto'>
                If you are interested in in purchasing or making reservations for paintings from the Aaradhya Art Gallery, you can connect with the team and they will get in touch with you soon!
            </Typography>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md mx-auto mt-10 space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="flex items-center gap-3">
                                <FormLabel className="text-muted-foreground-ui min-w-[70px]">Name:</FormLabel>
                                <div className="w-full">
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="flex-1 border-0 border-b border-[#BFB6A5] bg-transparent focus:outline-none focus:ring-0 text-foreground-ui placeholder:text-muted-foreground-ui"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem className="flex items-center gap-3">
                                <FormLabel className="text-muted-foreground-ui min-w-[70px]">City:</FormLabel>
                                <div className="w-full">
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="flex-1 border-0 border-b border-[#BFB6A5] bg-transparent focus:outline-none focus:ring-0 text-foreground-ui placeholder:text-muted-foreground-ui"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="contact"
                        render={({ field }) => (
                            <FormItem className="flex items-center gap-3">
                                <FormLabel className="text-muted-foreground-ui min-w-[70px]">Contact:</FormLabel>
                                <div className=" w-full">
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="flex-1 border-0 border-b border-[#BFB6A5] bg-transparent focus:outline-none focus:ring-0 text-foreground-ui placeholder:text-muted-foreground-ui"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="flex items-center gap-3">
                                <FormLabel className="text-muted-foreground-ui min-w-[70px]">Email ID:</FormLabel>
                                <div className="w-full">
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            className="flex-1 border-0 border-b border-[#BFB6A5] bg-transparent focus:outline-none focus:ring-0 text-foreground-ui placeholder:text-muted-foreground-ui"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-center mt-6">
                        <FEButton type='submit' >Submit</FEButton>
                    </div>


                    {isSuccess && <Typography variant='p' className='text-center text-foreground-ui mt-5 max-w-7xl mx-auto'>{message}</Typography>}
                </form>
            </Form>
            <Typography variant='p' className='text-center text-primary-ui font-semibold mt-5 w-full mx-auto text-xl'>
                For more information,
                <br className='md:hidden' />
                {" "} contact: +91 91671 09889
            </Typography>
        </section>
    )
}
