"use client"

import Typography from '@/components/common/typography'
import SectionTitle from '@/components/common/SectionTitle'
import React from 'react'
import { Button } from "@/components/ui/button"
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

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    city: z.string().min(2, {
        message: "City must be at least 2 characters.",
    }),
    contact: z.string().min(10, {
        message: "Contact must be at least 10 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
})

export default function Reservations() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            city: "",
            contact: "",
            email: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <section className="md:p-10 p-5 bg-[#E9E2D2]" >
            <SectionTitle title='Purchase & Reservations ' subtitle='ART GALLERY' />
            <Typography variant='p' className='text-justify text-foreground-ui mt-5 max-w-7xl mx-auto'>
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
                        <FEButton >Submit</FEButton>
                    </div>
                </form>
            </Form>
        </section>
    )
}
