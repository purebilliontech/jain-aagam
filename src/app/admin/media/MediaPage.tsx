"use client";

import { Button } from "@/components/ui/button";
import { Edit, SearchIcon, Trash2, UploadIcon } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import type { MediaDTO } from "@/schema/media";
import Image from "next/image";
import { toast } from "sonner";
import MediaDialog from "@/components/media/MediaDialouge";
import { TablePagination } from "@/components/dataTable/tablePagination";
import useUrlState from "@/hooks/useUrlState";
import { deleteMediaById, getMedia, uploadMedia } from './actions';


const ITEMS_PER_PAGE = 20;

const MediaPage = (isSelect: boolean = false) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const multipleFileInputRef = useRef<HTMLInputElement>(null);

  const [mediaList, setMediaList] = useState<MediaDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaDTO | null>(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [search, setSearch] = useUrlState<string>("search", "");

  const handleMultipleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLoading(true);
    const files = event.target.files;
    if (!files || files.length === 0) {
      setLoading(false);
      return;
    }

    const uploadPromises = Array.from(files).map(async (file) => {
      const formData = new FormData();
      formData.append("file", file, file.name);

      try {
        const uploadedMedia = await uploadMedia(formData, "file", file.name, file.type);
        if (uploadedMedia.success && uploadedMedia.media) {
          return uploadedMedia.media;
        } else {
          console.error("Failed to upload media", uploadedMedia.message);
          return null;
        }
      } catch (error) {
        console.error("Failed to upload media", error);
        return null;
      }
    });

    try {
      const uploadedMediaList = await Promise.all(uploadPromises);
      const successfulUploads = uploadedMediaList.filter(
        (media) => media !== null,
      ) as MediaDTO[];
      setMediaList((prevMediaList) => [...successfulUploads, ...prevMediaList]);
    } catch (error) {
      console.error("Failed to upload one or more media files", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLoading(true);
    const file = event.target.files?.[0];
    if (!file) {
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file, file.name);

    try {
      const uploadedMedia = await uploadMedia(formData, "file", file.name, file.type);
      if (uploadedMedia.success && uploadedMedia.media) {
        setMediaList((prevMediaList) => [uploadedMedia.media, ...prevMediaList]);
        setSelectedMedia(uploadedMedia.media);
      } else {
        console.error("Failed to upload media", uploadedMedia.message);
      }
    } catch (error) {
      console.error("Failed to upload media", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMedia = async (media: MediaDTO) => {
    try {
      const response = await deleteMediaById(media.id);
      if (response.success) {
        setMediaList((prevMediaList) =>
          prevMediaList.filter((item) => item.id !== media.id),
        );
        fetchMedia(page);
      } else {
        toast("Failed to Delete Media");
      }
    } catch (error) {
      console.error(error);
      toast("Failed to Delete Media");
    }
  };

  const handleNext = () => {
    const currentIndex = mediaList.findIndex(
      (m) => m.id === selectedMedia?.id,
    );
    if (currentIndex !== -1 && currentIndex < mediaList.length - 1) {
      setSelectedMedia(mediaList[currentIndex + 1]);
    } else {
      toast("No more media items");
    }
  };

  const handlePrev = () => {
    const currentIndex = mediaList.findIndex(
      (m) => m.id === selectedMedia?.id,
    );
    if (currentIndex > 0) {
      setSelectedMedia(mediaList[currentIndex - 1]);
    } else {
      toast("No more media items");
    }
  };

  const updateMediaList = (media: MediaDTO) => {
    setMediaList((prevMediaList) =>
      prevMediaList.map((m) => (m.id === media.id ? media : m)),
    );
  }

  const fetchMedia = async (pageNumber = 0) => {
    setLoading(true);
    try {
      const { success, mediaList, totalCount, currentPage } = await getMedia(pageNumber, search as string);
      if (!success) {
        toast("Failed to fetch media");
        return;
      }
      setMediaList(mediaList);
      setPage(currentPage);
      setTotalCount(totalCount);
    } catch (error) {
      console.error("Failed to fetch media", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia(0);
  }, []);

  const handlePageChange = (newPage: number) => {
    fetchMedia(newPage);
  };

  return (
    <div className="flex flex-col bg-white">
      <p>
        Manage all the media on your site, including images, video, and more.{" "}
      </p>
      <p>
        The maximum allowable file size for uploads is 10 MB. For optimal
        performance and faster loading times, it is recommended that the file
        size be around <strong> 1 MB</strong>.
      </p>

      <div className="mt-10 flex justify-between gap-5 rounded-md bg-primary/5 p-2 max-md:flex-col-reverse max-md:items-center">
        <div className="flex gap-10">
          <Button
            disabled={loading}
            onClick={() => fileInputRef.current?.click()}
            className="flex gap-2"
          >
            <UploadIcon size={18} />
            Upload Media
          </Button>
          <input
            onChange={handleFileChange}
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            className="hidden"
          />
          <input
            ref={multipleFileInputRef}
            onChange={handleMultipleFileChange}
            type="file"
            accept="image/*,video/*"
            multiple
            className="hidden"
          />
          <Button
            onClick={() => multipleFileInputRef.current?.click()}
            variant={"link"}
          >
            Bulk Upload
          </Button>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={search as unknown as string}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                fetchMedia(1);
              }
            }}
            className="rounded-md border border-gray-300 p-2 outline-none"
          />
          <Button
            type="button"
            onClick={() => {
              fetchMedia(1);
            }}
          >
            <SearchIcon size={18} />
          </Button>
        </div>
      </div>
      {selectedMedia !== null && (
        <MediaDialog
          key={selectedMedia.id}
          media={selectedMedia}
          setSelectedMedia={setSelectedMedia}
          handleNext={handleNext}
          handlePrev={handlePrev}
          onSave={updateMediaList}
          canDelete={true}
        />
      )}

      <div className="mt-10 flex flex-wrap">
        {mediaList.map((media) => (
          <div className="h-72 w-1/4 p-1" key={media.id}>
            <div className="h-full w-full border p-2">
              <div className="relative h-full w-full overflow-hidden">
                <div className="group relative h-full w-full overflow-hidden">
                  {media.type === "image" ? (
                    <Image
                      src={media.url}
                      alt={media.alt}
                      fill
                      className="object-cover transition-all group-hover:scale-110"
                    />
                  ) : (
                    <video src={media.url} className="h-full w-full" />
                  )}
                  <div className="cursor-p absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-5 bg-primary/0 p-5 transition-opacity group-hover:bg-primary/50">
                    <p className="text-center text-white opacity-0 shadow group-hover:opacity-100">
                      {media.title}
                    </p>
                    <div className="flex gap-5">
                      <div
                        onClick={() => {
                          setSelectedMedia(media);
                        }}
                        className="cursor-pointer opacity-0 group-hover:opacity-100"
                      >
                        <Edit size={20} color="#ffffff" />
                      </div>
                      <div
                        onClick={() => {
                          deleteMedia(media);
                        }}
                        className="cursor-pointer opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={20} className="text-red-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <TablePagination
          currentPage={page}
          pageSize={ITEMS_PER_PAGE}
          siblingCount={1}
          totalCount={totalCount}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default MediaPage;