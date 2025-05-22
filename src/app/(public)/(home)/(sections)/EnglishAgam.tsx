"use client";

import FEButton from "@/components/common/FEButton";
import Image from "next/image";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { submitEnglishAgamContact } from "@/app/(public)/(home)/actions";
import { EnglishAgamContactFormSchema } from "@/schema/englishAagam";
import { EnglishAgamContactForm } from "@/schema/englishAagam";
import Typography from "@/components/common/typography";


const EnglishAgam = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnglishAgamContactForm>({
    resolver: zodResolver(EnglishAgamContactFormSchema),
    mode: "onBlur", // Validate fields when they lose focus
  });

  const onSubmit = async (data: EnglishAgamContactForm) => {
    try {
      setIsSubmitting(true);

      // Call server action to save data
      const result = await submitEnglishAgamContact(data);

      if (result.success) {
        toast.success("Your information has been submitted successfully");
        reset(); // Reset form fields
        setIsOpen(false); // Close modal
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
    <section className="relative h-full px-5 py-10 md:px-10 bg-[url('/static/english-agam-bg.png')] bg-cover bg-fixed bg-center lg:px-20 xl:px-48">
      <Image
        className="-z-10 sticky top-0 left-0 inset-0 object-cover object-center"
        src={"/static/english-agam-bg.png"}
        fill
        alt="Agams BG"
        priority
      />

      <div className="z-50 bg-[#E9E2D2ED] p-5 md:p-10 lg:p-14 max-w-7xl mx-auto rounded-4xl flex flex-col md:flex-row gap-5 md:gap-10">
        <div className="w-full pt-2 md:pt-0 md:w-1/3 flex justify-center">
          <Image
            src={"/static/home/english-agam-book.png"}
            width={400}
            height={600}
            alt="English Agam Book"
            className="mx-auto w-full h-auto object-contain drop-shadow-2xl shadow-2xl "
          />
        </div>
        <div className="w-full md:w-2/3 pt-3">
          <Typography variant="h2" className="text-typography text-center md:text-left">
            Launching ENGLISH Aagams
          </Typography>
          <Typography variant="p" className="text-typography  mt-5 mb-8 text-justify">
            The Jain Aagams, originally written in the Aradhamagadhi Prakrit
            script, have been meticulously translated into Indian scripts like
            Hindi, Gujarati, Marathi, Kannada, Tamil and more by Sadhu-Sadhvijis
            over the last centuries. With the inspiration and blessings of Param
            Gurudev Shree Namramuni Maharaj Saheb, a pathbreaking effort is
            being made to conserve these precious scriptures for the coming
            generations. The Jain Aagams are being translated into English for
            global accessibility, with absolute authenticity being preserved by
            highly educated Jain sadhu-sadhvijis and distinguished scholars and
            experts.{" "}
          </Typography>
          <Typography variant="p" className="text-typography  mt-5 mb-8 text-justify">
            The first of these Aagams, Shree Upasakdashang Sutra, has been
            launched in 2024 and is now available for purchase.
          </Typography>
          <div className="flex justify-center md:justify-start">
            <FEButton onClick={() => setIsOpen(true)}>BOOK NOW</FEButton>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>English Aagam Contact Information</DialogTitle>
            <DialogDescription>
              Please fill in your details to register your interest in English
              Aagams.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                {...register("name")}
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactNumber">
                Contact Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contactNumber"
                placeholder="Enter your contact number"
                {...register("contactNumber")}
                aria-invalid={errors.contactNumber ? "true" : "false"}
              />
              {errors.contactNumber && (
                <p className="text-red-500 text-sm">
                  {errors.contactNumber.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">
                City <span className="text-red-500">*</span>
              </Label>
              <Input
                id="city"
                placeholder="Enter your city"
                {...register("city")}
                aria-invalid={errors.city ? "true" : "false"}
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">
                Country <span className="text-red-500">*</span>
              </Label>
              <Input
                id="country"
                placeholder="Enter your country"
                {...register("country")}
                aria-invalid={errors.country ? "true" : "false"}
              />
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default EnglishAgam;
