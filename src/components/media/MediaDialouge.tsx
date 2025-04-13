import { useState, useRef } from "react";
import type { SetStateAction } from "react";
import type { Dispatch } from "react";
import { Button } from "../ui/button";
import type { MediaDTO } from "@/schema/media";
import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

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
  onSave?: (data: any) => void;
  canDelete?: boolean;
}) => {
  const [isCopid, setIsCopid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const deleteMedia = async () => {
    try {
      await axios.delete(`/api/media/${media.mediaId}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({ title: "Failed to Delete Media" });
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
      formData.append("mediaId", media.mediaId);
      formData.append("mediaAlt", media.mediaAlt);
      formData.append("mediaDescription", media.mediaDescription);
      formData.append("mediaTitle", media.mediaTitle);

      // Use a separate endpoint for replacing media files
      const response = await axios.post(
        `/api/media/upload/replace/${media.mediaId}`,
        formData,
      );

      if (onSave) {
        onSave(response.data.data);
      }

      toast({
        title: "Image and details updated successfully",
      });

      setSelectedMedia(null);
    } catch (error) {
      console.error("Error replacing image:", error);
      toast({
        title: "Failed to replace image",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to update only metadata
  const handleSaveMetadataOnly = async () => {
    setLoading(true);
    try {
      // Create a stringified JSON payload explicitly
      const payload = {
        mediaAlt: media.mediaAlt || "",
        mediaDescription: media.mediaDescription || "",
        mediaMetaData: {},
        mediaTitle: media.mediaTitle || "",
        cta: media.cta || "",
      };

      // Set explicit content-type header to ensure proper parsing on server
      const response = await axios.patch(
        `/api/media/${media.mediaId}`,
        payload,
      );

      if (onSave) {
        onSave(response.data.data);
      }

      toast({
        title: "Media details updated successfully",
      });

      setSelectedMedia(null);
    } catch (error) {
      console.error("PATCH error:", error);
      toast({
        title: "Failed to update media details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Main save function that dispatches to the appropriate handler
  const handleSave = () => {
    if (selectedFile) {
      // If there's a new image, call the image replacement function
      handleSaveWithImageReplacement();
    } else {
      // Otherwise just update metadata
      handleSaveMetadataOnly();
    }
  };

  return (
    <>
      <div
        onClick={() => {
          setSelectedMedia(null);
        }}
        className="fixed left-0 top-0 z-50 h-full w-full bg-primaryBlue bg-opacity-25"
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
                {media.mediaType === "image" ? (
                  <>
                    {newImagePreview ? (
                      <div className="relative h-full w-full">
                        <Image
                          src={newImagePreview}
                          alt={media.mediaAlt}
                          fill
                          className="object-contain object-center transition-all group-hover:scale-110"
                        />
                        <div className="absolute left-2 top-2 flex gap-2">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleRemoveNewImage}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Image
                          src={media.mediaUrl}
                          alt={media.mediaAlt}
                          fill
                          className="object-contain object-center transition-all group-hover:scale-110"
                        />
                        <div className="bg-black absolute bottom-0 left-0 right-0 bg-opacity-50 p-2 text-center">
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
                            Replace Image
                          </Button>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <video
                    src={media.mediaUrl}
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

              <Label className="">Title</Label>
              <Input
                value={media.mediaTitle}
                className="outline-none"
                onChange={(e) => {
                  setSelectedMedia({
                    ...media,
                    mediaTitle: e.target.value,
                  });
                }}
              />
              <br />
              <Label className="">Alt Text</Label>
              <Input
                value={media.mediaAlt}
                className="outline-none"
                onChange={(e) => {
                  setSelectedMedia({
                    ...media,
                    mediaAlt: e.target.value,
                  });
                }}
              />
              <br />
              <Label className="">Description</Label>
              <Input
                value={media.mediaDescription}
                className="outline-none"
                onChange={(e) => {
                  setSelectedMedia({
                    ...media,
                    mediaDescription: e.target.value,
                  });
                }}
              />
              <br />
              <Label className="">CTA</Label>
              <Input
                value={media.cta ?? ""}
                className="outline-none"
                onChange={(e) => {
                  setSelectedMedia({
                    ...media,
                    cta: e.target.value,
                  });
                }}
              />
              <br />
              <Label className="">Url</Label>
              <Input
                contentEditable={false}
                onClick={() => {
                  navigator.clipboard
                    .writeText(media.mediaUrl)
                    .then(() => {
                      setIsCopid(true);
                      toast({
                        title: "Url Copied to Clipboard",
                      });
                      setTimeout(() => {
                        setIsCopid(false);
                      }, 2000);
                    })
                    .catch((err) => {
                      console.error("Failed to copy URL: ", err);
                    });
                }}
                value={media.mediaUrl}
                className="cursor-pointer !outline-0"
              />
              <p
                className={`mt-1 text-xs text-buttonGreen ${isCopid ? "opacity-100" : "opacity-0"}`}
              >
                Url Copied to Clipboard!
              </p>
              {/* <Label className="">Image Meta Data</Label>
                            <Input
                                value={JSON.stringify(media.mediaMetaData)}
                                className="outline-none "
                                onChange={(e) => {
                                    setSelectedMedia({
                                        ...media,
                                        mediaDescription: e.target.value,
                                    });
                                }}
                            /> */}

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
                  handleSave();
                }}
                className={
                  selectedFile ? "bg-primaryBlue hover:bg-blue-700" : ""
                }
              >
                {selectedFile ? "Save & Replace Image" : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaDialog;
