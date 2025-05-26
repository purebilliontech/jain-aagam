'use client';

import BlogCard from "@/components/blog/BlogCard";
import type { BlogWithTagsAndBanner } from "@/schema/blog";
import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { getBlogsList } from "./actions";
import InnerBanner from "@/components/common/InnerBanner";
import ToTopButton from "../(home)/(sections)/ToTopButton";

const BlogsListPage = ({ blogs: initialBlogs, tags, pagination: initialPagination }: {
  blogs: BlogWithTagsAndBanner[],
  tags: { id: string; name: string; }[],
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }
}) => {
  // State to track selected tags for filtering
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  // State to track blogs after filtering
  const [blogs, setBlogs] = useState<BlogWithTagsAndBanner[]>(initialBlogs);
  // State for search input
  const [searchTerm, setSearchTerm] = useState("");
  // State for current page
  const [currentPage, setCurrentPage] = useState(initialPagination.page);
  // State for pagination
  const [pagination, setPagination] = useState(initialPagination);
  // State for loading
  const [isLoading, setIsLoading] = useState(false);

  // Fetch blogs when filters change
  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const result = await getBlogsList(currentPage, pagination.pageSize, searchTerm, selectedTags);
        if (result.success) {
          setBlogs(result.data);
          setPagination(result.pagination);
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce search term changes
    const timeoutId = setTimeout(() => {
      fetchBlogs();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [currentPage]);

  // Fetch blogs when filters change
  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const result = await getBlogsList(1, 6, searchTerm, selectedTags);
        if (result.success) {
          setBlogs(result.data);
          setPagination(result.pagination);
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    setPagination(initialPagination);
    setCurrentPage(1);

    // Debounce search term changes
    const timeoutId = setTimeout(() => {
      fetchBlogs();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedTags]);

  // Handle tag selection/deselection
  const handleTagClick = (tagName: string) => {
    setSelectedTags(prevSelectedTags => {
      if (prevSelectedTags.includes(tagName)) {
        return prevSelectedTags.filter(tag => tag !== tagName);
      } else {
        return [...prevSelectedTags, tagName];
      }
    });
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <InnerBanner image={"/static/banners/ebooksnew.png"} alt="Image for presentation" >
        <div className="text-center p-4 md:text-left absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <h2 className="max-w-7xl mx-auto text-primary-ui text-center w-full p-4 md:p-20 text-4xl md:text-4xl font-semibold">
            BLOGS
          </h2>
        </div>
      </InnerBanner>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row p-5 mt-10">
        <div className="md:w-2/3 flex flex-wrap gap-2 px-4 md:px-8 pb-8">
          <button
            onClick={() => setSelectedTags([])}
            className={`cursor-pointer ${selectedTags.length === 0 ? 'border-typography  rounded-full border-2' : ''}`}
          >
            <span className="inline-block bg-primary-ui md:px-4 px-2 md:py-1.5 py-1  text-white rounded-full text-sm">
              All
            </span>
          </button>
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => handleTagClick(tag.name)}
              className={`cursor-pointer ${selectedTags.includes(tag.name) ? 'border-typography  rounded-full border-2' : ''}`}
            >
              <span className="inline-block bg-primary-ui md:px-4 px-2 md:py-1.5 py-1  text-white rounded-full text-sm">
                {tag.name}
              </span>
            </button>
          ))}
        </div>
        <div className="md:w-1/3 mt-4 md:mt-0">
          <div className="flex border-b border-primary-ui">
            <Search className="text-primary-ui" />
            <input
              className="w-full border-none outline-none px-2 pb-1 text-sm md:text-lg"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center max-w-7xl mx-auto p-5 h-64">
          <p className="text-xl text-gray-500">Loading...</p>
        </div>
      ) : blogs.length === 0 ? (
        <div className="flex justify-center items-center max-w-7xl mx-auto p-5 h-64">
          <p className="text-xl text-gray-500">No articles found matching your filter criteria.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-5 max-w-7xl mx-auto">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                tags={blog.blogToTags.map(tag => tag.tag.name)}
                title={blog.title}
                date={moment(blog.publishedAt).format("LL")}
                image={blog.banner}
                slug={blog.slug}
              />
            ))}
          </div>

          {/* Improved Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-10 mb-12 select-none">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
              aria-label="Previous page"
              className={`
                flex items-center justify-center cursor-pointer w-8 h-8 rounded-full border-2 border-primary-ui
                text-primary-ui text-xl transition
                ${currentPage === 1 || isLoading
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-primary-ui/10 active:bg-primary-ui/20'}
              `}
            >
              <span className="sr-only">Previous</span>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-4">
              {Array.from({ length: pagination.totalPages }).map((_, idx) => {
                const page = idx + 1;
                // Show first 3, last, current, and neighbors, with ellipsis
                if (
                  page === 1 ||
                  page === pagination.totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1) ||
                  (currentPage <= 3 && page <= 5) ||
                  (currentPage >= pagination.totalPages - 2 && page >= pagination.totalPages - 4)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      disabled={page === currentPage}
                      className={`
                        w-8 h-8 rounded-full cursor-pointer text-xl font-mono font-medium
                        transition
                        ${page === currentPage
                          ? 'bg-primary-ui text-white'
                          : 'text-[#686151] hover:bg-primary-ui/10 active:bg-primary-ui/20'}
                        ${page === currentPage ? 'cursor-default' : ''}
                      `}
                      aria-current={page === currentPage ? "page" : undefined}
                    >
                      {page}
                    </button>
                  );
                }
                // Ellipsis logic
                if (
                  (page === currentPage - 2 && currentPage > 4) ||
                  (page === currentPage + 2 && currentPage < pagination.totalPages - 3)
                ) {
                  return (
                    <span key={page} className="w-8 h-8 flex items-center justify-center text-xl text-[#686151]">
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pagination.totalPages || isLoading}
              aria-label="Next page"
              className={`
                flex items-center justify-center cursor-pointer w-8 h-8 rounded-full border-2 border-primary-ui
                text-primary-ui text-xl transition
                ${currentPage === pagination.totalPages || isLoading
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-primary-ui/10 active:bg-primary-ui/20'}
              `}
            >
              <span className="sr-only">Next</span>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </>
      )}

      {selectedTags.length > 0 && (
        <div className="max-w-7xl mx-auto px-5 pb-10">
          <button
            onClick={() => setSelectedTags([])}
            className="text-primary-ui hover:underline font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
            <ToTopButton/>

    </>
  );
};

export default BlogsListPage;
