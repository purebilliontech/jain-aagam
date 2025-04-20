"use client";

import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import {
  Clock,
} from "lucide-react";
import Link from "next/link";
import { getHTMLFromContent } from "@/utils/blog";
import { type MediaDTO } from "@/schema/media";
import { Button } from "@/components/ui/button";
import type { BlogDetail, Content } from "@/schema/blog";
import { usePathname } from "next/navigation";

type BlogPageProps = {
  blog: BlogDetail | null;
  mediaList: MediaDTO[];
};

const BlogDetailPage = ({
  blog,
  mediaList,
}: BlogPageProps) => {

  console.log(blog);

  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

  const sectionsPriority: Content[] = (
    blog?.contentJson.content as Content[]
  )?.filter((content: Content) => content.type === "heading") || [""];

  const [inViewIds, setInViewIds] = useState<string[]>([]);

  const [activeSection, setActiveSection] = useState(
    sectionsPriority?.[0]?.attrs?.id || "",
  );

  const path = usePathname();

  const observedElementsRef = useRef<HTMLElement[]>([]);

  const addRefToElements = (element: HTMLElement | null) => {
    if (element && !observedElementsRef.current.includes(element)) {
      observedElementsRef.current.push(element);
    }
  };


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const elementId = entry.target.id;
          if (entry.isIntersecting) {
            setInViewIds((prev) => {
              const newSet = new Set(prev);
              newSet.add(elementId);
              return Array.from(newSet);
            }); // Add id if not already in the list
          } else {
            setInViewIds((prev) => prev.filter((id) => id !== elementId)); // Remove id when it goes out of view
          }
        });
      },
      { threshold: 1 }, // The element is considered in view when 50% is visible
    );

    observedElementsRef.current.forEach((element) => {
      observer.observe(element);
    });

    // Cleanup observer on component unmount
    return () => {
      observedElementsRef.current.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [path]);

  useEffect(() => {
    let index = 100;
    inViewIds.forEach((id) => {
      const sectionIndex = sectionsPriority.findIndex(
        (section) => section.attrs.id === id,
      );
      if (sectionIndex !== -1 && index > sectionIndex) {
        index = sectionIndex;
      }
    });
    if (index !== 100) {
      setActiveSection(sectionsPriority[index].attrs.id);
    }
  }, [inViewIds]);

  const getHeading = (content: Content) => {
    return content.attrs.level == 2 ? (
      <h2
        ref={addRefToElements}
        className="scroll-m-32"
        key={content.attrs.id}
        id={content.attrs.id}
      >
        {content.content && content.content[0].text}
      </h2>
    ) : (
      <h3
        ref={addRefToElements}
        className="scroll-m-32"
        key={content.attrs.id}
        id={content.attrs.id}
      >
        {content.content && content.content[0].text}
      </h3>
    );
  };

  const getImage = (content: Content) => {
    const media = mediaList.find(
      (media) => media.id === content.attrs.alt,
    );
    return (
      <Image
        className="mb-5"
        key={content.attrs.alt}
        alt={media?.alt || ""}
        src={media?.url || ""}
        width={content.attrs.width}
        height={parseInt(content.attrs.height)}
      />
    );
  };

  return (
    <>
      {!blog ? (
        <>
          <Head>
            <title>Blog Not Found</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta charSet="UTF-8" />
          </Head>
          <div className="flex min-h-[90vh] flex-col items-center justify-center py-20">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Blog Not Found
            </h2>
            <Link href="/blogs">
              <Button>Check Out Our Other Blog Posts</Button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <Head>
            <title>{blog.title}</title>
            <meta name="description" content={blog.synopsis} />
          </Head>
          <div
            id="heading"
            className="relative mx-auto scroll-m-52 md:scroll-m-10"
          >
            <article className="max-w-7xl p-5 mx-auto">
              <h1 className="p-4 font-mono text-center text-xl font-semibold text-primary-blue md:text-4xl">
                {blog.title}
              </h1>

              <div className="flex mb-2">
                <div className="flex gap-5">
                  <div className="flex items-center font-medium font-sans gap-1 text-typography">
                    {new Date(blog.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                  </div>
                  <div className="flex items-center font-medium font-sans gap-1 text-typography">
                    {blog.readingTimeSeconds} minutes read
                  </div>
                </div>
              </div>

              {blog.banner && (
                <Image
                  src={blog.banner.url}
                  width={3200}
                  height={1800}
                  className="z-0 rounded-md object-contain"
                  alt={blog.banner.alt}
                  priority
                />
              )}

              <div className="relative z-40 mx-5 -mt-10 flex justify-between gap-8 rounded-md bg-white p-1 px-5 text-xs md:hidden md:shadow-custom-combined-shadow">
                <div className="flex items-center gap-1 text-primary-blue">
                  <Clock className="max-md:h-4" />
                  {new Date(blog.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                </div>

                <div className="flex gap-1 text-primary-blue">
                  {blog.readingTimeSeconds} minutes read
                </div>
              </div>

              <div className="container ">
                <div className="mt-5 flex h-full flex-col md:flex-row">
                  <div className="relative md:w-1/3 ">
                    <div className="top-20 overflow-y-auto p-4 max-md:rounded-lg md:sticky md:h-screen  md:py-10">
                      {sectionsPriority.map((section) => {
                        return (
                          <Link
                            href={`#${section.attrs.id}`}
                            key={section.attrs.id}
                          >
                            <p
                              className={`rounded-md p-3 uppercase transition-all hover:bg-primary-ui/50   max-md:text-center max-md:text-xs md:rounded-xl md:py-5  ${section.attrs.id === activeSection ? "bg-primary-ui !text-white" : ""} `}
                            >
                              {section.content && section?.content[0]?.text}
                            </p>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  <div className="md:w-2/3 md:pl-5 ">
                    <div className="blog-html mt-8 break-words !text-typography     max-md:text-xs">
                      {(blog.contentJson.content as Content[]).map(
                        (content: Content, i: number) => {
                          if (content.type === "heading") {
                            return getHeading(content);
                          } else if (content.type === "image") {
                            return getImage(content);
                          } else {
                            return (
                              <div
                                key={i}
                                dangerouslySetInnerHTML={{
                                  __html: getHTMLFromContent(content),
                                }}
                              ></div>
                            );
                          }
                        },
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </>
      )}
    </>
  );
};
export default BlogDetailPage;
