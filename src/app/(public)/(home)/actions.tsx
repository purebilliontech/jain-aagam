"use server";

import { handleServerActionError } from "@/helpers/error";
import { db } from "@/lib/db";
import { HomepageDTOSchema } from "@/schema/staticPage";
import { BlogWithTagsAndBannerSchema } from "@/schema/blog";
import { EnglishAgamContactForm } from "@/schema/englishAagam";
import { EnglishAgamContactSchema } from "@/schema/englishAagam";

export const getHomepageContent = async () => {
    try {
        const homepage = await db.staticPage.findUnique({
            where: {
                slug: "homepage"
            },
            include: {
                CoverImage: {
                    include: {
                        media: true
                    }
                }
            }
        });

        const latestBlogs = await db.blog.findMany({
            where: {
                published: true,
            },
            include: {
                banner: true,
                blogToTags: {
                    include: {
                        tag: true,
                    },
                },
            },
            take: 6,
            orderBy: {
                publishedAt: "desc"
            }
        });

        return {
            success: true,
            data: {
                homepage: HomepageDTOSchema.parse(homepage),
                latestBlogs: latestBlogs.map(blog => BlogWithTagsAndBannerSchema.parse(blog))
            }
        };

    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: null };
    }
}

export async function submitEnglishAgamContact(formData: EnglishAgamContactForm) {
    try {
        // Double validation on server side for security
        const validatedData = EnglishAgamContactSchema.parse(formData)

        // Additional security: Normalize and sanitize data
        const sanitizedData = {
            name: validatedData.name.trim(),
            contactNumber: validatedData.contactNumber.trim(),
            city: validatedData.city.trim(),
            country: validatedData.country.trim(),
            email: validatedData.email.trim().toLowerCase(),
        }

        // Check if email already exists
        const existingContact = await db.englishAgamContact.findFirst({
            where: {
                email: sanitizedData.email
            }
        })

        // Optional: If you want to prevent duplicate submissions
        if (existingContact) {
            return {
                success: false,
                message: "This email is already registered. Please use a different email or contact us for assistance."
            }
        }

        // Store data in the database
        await db.englishAgamContact.create({
            data: sanitizedData
        })

        return {
            success: true,
            message: "Contact information submitted successfully"
        }
    } catch (error) {
        handleServerActionError(error);
        return {
            success: false,
            message: "Failed to submit contact information. Please try again later."
        }
    }
}