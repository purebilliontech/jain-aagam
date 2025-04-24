// actions.ts
'use server'

import { db } from '@/lib/db'
import { z } from 'zod'

// Enhanced Zod schema matching the client-side one
const englishAgamContactSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name cannot exceed 100 characters" })
    .refine(name => /^[a-zA-Z\s.\-']+$/.test(name), {
      message: "Name should only contain letters, spaces, hyphens, periods, and apostrophes"
    }),
    
  contactNumber: z.string()
    .min(10, { message: "Contact number must be at least 10 digits" })
    .max(15, { message: "Contact number cannot exceed 15 digits" })
    .refine(phone => /^[+\d\s\-()]+$/.test(phone), {
      message: "Please enter a valid phone number format"
    }),
    
  city: z.string()
    .min(2, { message: "City name must be at least 2 characters" })
    .max(50, { message: "City name cannot exceed 50 characters" })
    .refine(city => /^[a-zA-Z\s.\-']+$/.test(city), {
      message: "City should only contain letters, spaces, hyphens, and apostrophes"
    }),
    
  country: z.string()
    .min(2, { message: "Country name must be at least 2 characters" })
    .max(50, { message: "Country name cannot exceed 50 characters" })
    .refine(country => /^[a-zA-Z\s.\-']+$/.test(country), {
      message: "Country should only contain letters, spaces, hyphens, and apostrophes"
    }),
    
  email: z.string()
    .email({ message: "Please enter a valid email address" })
    .min(5, { message: "Email must be at least 5 characters" })
    .max(100, { message: "Email cannot exceed 100 characters" })
    .refine(email => !email.endsWith('.con'), {
      message: "Did you mean .com instead of .con?"
    })
})

export async function submitEnglishAgamContact(formData: unknown) {
  try {
    // Double validation on server side for security
    const validatedData = englishAgamContactSchema.parse(formData)
    
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
    console.error('Error submitting English Agam contact:', error)
    
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map(err => ({
        path: err.path.join('.'),
        message: err.message
      }))
      
      return {
        success: false,
        message: "Please check your form inputs and try again",
        errors: formattedErrors
      }
    }
    
    // Handle database-related errors
    if (error.code === 'P2002') {
      return {
        success: false,
        message: "This information is already registered in our system."
      }
    }
    
    return {
      success: false,
      message: "Failed to submit contact information. Please try again later."
    }
  }
}