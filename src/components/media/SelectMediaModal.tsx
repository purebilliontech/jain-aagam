import type { MediaDTO } from "@/schema/media";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Edit, SearchIcon } from "lucide-react";
import { UploadIcon } from "lucide-react";
import MediaDialog from "./MediaDialouge";
import Image from "next/image";
import { TablePagination } from "@/components/dataTable/tablePagination";

const ITEMS_PER_PAGE = 20;

const SelectMediaModal = ({
  handleSelectedMedia,
  uploadButton,
  openSelect,
  onClose,
}: {
  handleSelectedMedia: (media: MediaDTO) => void;
  uploadButton?: React.ReactNode;
  openSelect: boolean;
  onClose?: () => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const [mediaList, setMediaList] = useState<MediaDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaDTO | null>(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [search, setSearch] = useState<string>("");

  const fetchMedia = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/media`, {
        params: {
          type: "all",
          limit: ITEMS_PER_PAGE,
          offset: (pageNumber - 1) * ITEMS_PER_PAGE,
          query: search,
        },
      });

      const data = response.data.data;
      setMediaList(data);
      setPage(pageNumber);
    } catch (error) {
      console.error("Failed to fetch media", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMediaCount = async () => {
    try {
      const response = await axios.get(`/api/media/count`, {
        params: {
          query: search,
        },
      });
      setTotalCount(response.data.data.count);
    } catch (error) {
      console.error("Failed to fetch media count", error);
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLoading(true);
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file, file.name);
    formData.append("path", `${Date.now()}_${file.name}`);
    formData.append("type", file.type);

    try {
      const response = await axios.post("/api/media", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const uploadedMedia: MediaDTO = response.data.data;
      setMediaList((prevMediaList) => [uploadedMedia, ...prevMediaList]);
      setSelectedMedia(uploadedMedia);
      fetchMediaCount();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Failed to upload media", error);
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

  const replaceMedia = (media: MediaDTO) => {
    setMediaList((prevMediaList) =>
      prevMediaList.map((m) => (m.id === media.id ? media : m)),
    );
  };

  const handlePageChange = (newPage: number) => {
    fetchMedia(newPage);
  };

  useEffect(() => {
    if (openSelect) {
      setIsOpen(true);
    }
  }, [openSelect]);

  useEffect(() => {
    if (isOpen) {
      fetchMedia(1);
      fetchMediaCount();
    }
  }, [isOpen]);

  if (!isOpen)
    return (
      <>
        <div className="mx-auto flex w-full justify-center">
          {uploadButton ? (
            <div onClick={() => setIsOpen(true)}>{uploadButton}</div>
          ) : (
            <Button
              variant={"secondary"}
              className="mx-auto"
              onClick={() => setIsOpen(true)}
            >
              Select Media
            </Button>
          )}
        </div>
      </>
    );

  return (
    <div
      onClick={() => {
        setIsOpen(false);
        if (onClose) {
          onClose();
        }
      }}
      className="fixed left-0 top-0 z-40 h-full w-full bg-primary/30"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="mx-auto mt-[10vh] flex h-[80vh] w-3/4 flex-col overflow-y-scroll rounded-md bg-white p-5"
      >
        <div className="flex justify-between gap-5">
          <p>
            <p>
              The maximum allowable file size for uploads is 10 MB. For optimal performance and faster loading times, it is recommended that the file size be around <strong> 1 MB</strong>.
            </p></p>

          <Button
            onClick={() => {
              setIsOpen(false);
              if (onClose) {
                onClose();
              }
            }}
          >
            Close
          </Button>
        </div>
        <div className="mt-10 flex justify-between gap-5 rounded-md bg-primary/5 p-2 max-md:flex-col-reverse max-md:items-center">
          <div>
            <Button
              disabled={loading}
              onClick={() => fileInputRef.current?.click()}
              className="flex gap-2"
              type="button"
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
          </div>
          <div
            className="flex gap-2"
          >
            <input
              type="text"
              value={search as unknown as string}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  fetchMedia(1);
                  fetchMediaCount();
                }
              }}
              placeholder="Search"
              className="border-gray-300 rounded-md border p-2 outline-none"
            />
            <Button type="button" onClick={() => {
              fetchMedia(1);
              fetchMediaCount();
            }}>
              <SearchIcon size={18} />
            </Button>
          </div>
        </div>
        {selectedMedia !== null && (
          <MediaDialog
            media={selectedMedia}
            setSelectedMedia={setSelectedMedia}
            handleNext={handleNext}
            handlePrev={handlePrev}
            onSave={(media: MediaDTO) => {
              replaceMedia(media);
            }}
          />
        )}

        <div className="mt-10 flex flex-wrap">
          {mediaList.map((media) => (
            <div className="h-72 w-1/4 p-1" key={media.id}>
              <div className="h-full w-full border p-2">
                <div
                  onClick={() => {
                    handleSelectedMedia(media);
                    setIsOpen(false);
                  }}
                  className="relative h-full w-full cursor-pointer overflow-hidden"
                >
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
                    <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-5 bg-primary/0 p-5 transition-opacity group-hover:bg-primary/50">
                      <p className="text-center text-white opacity-0 shadow group-hover:opacity-100">
                        {media.title}
                      </p>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMedia(media);
                        }}
                        className="cursor-pointer opacity-0 group-hover:opacity-100"
                      >
                        <Edit size={20} color="#ffffff" />
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
    </div>
  );
};

export default SelectMediaModal;
