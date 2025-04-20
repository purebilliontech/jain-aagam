"use client";

import { useState, useRef } from "react";
import type { SetStateAction } from "react";
import type { Dispatch } from "react";
import { Button } from "../ui/button";
import { MediaFormSchema, type MediaDTO, type MediaForm } from "@/schema/media";
import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { changeMedia, deleteMediaById, updateMediaMetadata } from "@/app/admin/media/actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "../ui/form";
import { GenericFormField, GenericFormInput } from "../generic";

const MediaDialog = ({
  media,
  setSelectedMedia,
  handleNext,
  handlePrev,
  onSave,
  canDelete = false,
}: {
  media: MediaDTO;
  setSelectedMedia: Dispatch<SetStateAction<MediaDTO | null>>;
  handleNext: () => void;
  handlePrev: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave?: (data: MediaDTO) => void;
  canDelete?: boolean;
}) => {
  const [isCopid, setIsCopid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<MediaForm>({
    resolver: zodResolver(MediaFormSchema),
    defaultValues: {
      title: media.title || "",
      alt: media.alt || "",
      cta: media.cta || "",
    },
  })

  const router = useRouter();

  const deleteMedia = async () => {
    try {
      await deleteMediaById(media.id);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast("Failed to Delete Media");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewImagePreview(imageUrl);
      setSelectedFile(file);
    }
  };

  const handleRemoveNewImage = () => {
    setNewImagePreview(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Function to update image and metadata
  const handleSaveWithImageReplacement = async () => {
    setLoading(true);
    try {
      // Create FormData and upload it with the new image
      const formData = new FormData();
      formData.append("file", selectedFile!);

      const response = await changeMedia(media.id, formData);

      if (!response.success) {
        toast("Failed to replace image");
        return;
      }

      if (onSave) {
        onSave(response.data!);
      }

      toast("Image and details updated successfully");

      setSelectedMedia(null);

    } catch (error) {
      console.error("Error replacing image:", error);
      toast("Failed to replace image");
    } finally {
      setLoading(false);
    }
  };
  // Function to update only metadata
  const handleSaveMetadataOnly = async (data: MediaForm) => {
    setLoading(true);
    try {
      // Call the server action to update media metadata
      const response = await updateMediaMetadata(media.id, data);

      if (!response.success) {
        toast("Failed to update media details");
        return;
      }

      if (onSave) {
        onSave(response.data!);
      }

      toast("Media details updated successfully",);

      setSelectedMedia(null);
    } catch (error) {
      console.error("PATCH error:", error);
      toast("Failed to update media details");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div
        onClick={() => {
          setSelectedMedia(null);
        }}
        className="fixed left-0 top-0 z-50 h-full w-full bg-primary/25"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="mx-auto mt-[10vh] flex h-[80vh] w-4/5 flex-col rounded-md bg-white p-5"
        >
          <div className="flex flex-1">
            <div className="h-full w-3/5 rounded-md bg-white p-10">
              <div className="relative h-full w-full">
                {media.type === "image" ? (
                  <>
                    {newImagePreview ? (
                      <div className="relative h-full w-full">
                        <Image
                          src={newImagePreview}
                          alt={media.alt}
                          fill
                          className="object-contain object-center transition-all group-hover:scale-110"
                        />
                        <div className="absolute left-2 top-2 flex gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleRemoveNewImage}
                          >
                            Cancel
                          </Button>

                          <Button
                            variant="default"
                            size="sm"
                            onClick={handleSaveWithImageReplacement}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Image
                          src={media.url}
                          alt={media.alt}
                          fill
                          className="object-contain object-center transition-all group-hover:scale-110"
                        />
                        <div className=" absolute bottom-0 left-0 right-0 p-2 text-center">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            Change Image
                          </Button>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <video
                    src={media.url}
                    controls
                    muted
                    className="absolute top-[50%] my-auto h-fit -translate-y-[50%] object-center"
                  />
                )}
              </div>
            </div>
            <div className="h-full w-2/5 border-l bg-white p-5">
              <div className="flex justify-end gap-5">
                <span
                  onClick={handlePrev}
                  className="cursor-pointer text-buttonBlue"
                >
                  Prev
                </span>
                <span
                  onClick={handleNext}
                  className="cursor-pointer text-buttonBlue"
                >
                  Next
                </span>
              </div>
              <Form {...form}>
                <form className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <GenericFormField
                        formLabel="Title"
                        field={field}
                        cb={GenericFormInput}
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="alt"
                    render={({ field }) => (
                      <GenericFormField
                        formLabel="Alt Text"
                        field={field}
                        cb={GenericFormInput}
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cta"
                    render={({ field }) => (
                      <GenericFormField
                        formLabel="CTA"
                        field={field}
                        cb={GenericFormInput}
                      />
                    )}
                  />
                </form>
              </Form>

              <Label className="mt-5 mb-2">Url</Label>
              <Input
                contentEditable={false}
                onClick={() => {
                  navigator.clipboard
                    .writeText(media.url)
                    .then(() => {
                      setIsCopid(true);
                      toast("Url Copied to Clipboard");
                      setTimeout(() => {
                        setIsCopid(false);
                      }, 2000);
                    })
                    .catch((err) => {
                      console.error("Failed to copy URL: ", err);
                    });
                }}
                value={media.url || ""}
                className="cursor-pointer !outline-0"
              />
              <p
                className={`mt-1 text-xs text-buttonGreen ${isCopid ? "opacity-100" : "opacity-0"}`}
              >
                Url Copied to Clipboard!
              </p>
              <p>
                Created On:{" "}
                <span>{media.createdAt.toString().slice(0, 10)}</span>
              </p>
              <p>
                Updated On:{" "}
                <span>{media.updatedAt.toString().slice(0, 10)}</span>
              </p>
            </div>
          </div>
          <div className="flex justify-between gap-2">
            {canDelete && (
              <Button onClick={deleteMedia} variant={"destructive"}>
                Delete
              </Button>
            )}
            {!canDelete && <div className=""></div>}

            <div className="flex gap-5">
              <Button
                variant={"secondary"}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMedia(null);
                }}
              >
                Close
              </Button>
              <Button
                disabled={loading}
                onClick={() => {
                  form.handleSubmit(handleSaveMetadataOnly)();
                }}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaDialog;
