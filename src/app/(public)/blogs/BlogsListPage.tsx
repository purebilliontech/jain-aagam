'use client';

import BlogCard from "@/components/blog/BlogCard";
import type { BlogWithTagsAndBanner } from "@/schema/blog";
import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { getBlogsList } from "./actions";
import InnerBanner from "@/components/common/InnerBanner";

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
      <InnerBanner image={"/static/blog-banner.png"} alt="Image for presentation" >
        <div className="text-center p-4 md:text-left absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <h2 className="max-w-7xl mx-auto text-primary-ui text-center w-full p-4 md:p-20 text-4xl md:text-4xl font-semibold">
            BLOGS
          </h2>
        </div>
      </InnerBanner>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row p-5 mt-10">
        <div className="md:w-2/3 flex flex-wrap gap-2 px-4 md:px-8 pb-8">
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => handleTagClick(tag.name)}
              className={`inline-block cursor-pointer px-4 md:px-7 py-2 text-sm md:text-lg font-medium rounded-full transition-colors ${selectedTags.includes(tag.name) ? 'bg-primary-ui/80' : 'bg-primary-ui'
                } text-white`}
            >
              {tag.name}
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

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-8 mb-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
              className="px-4 py-2 rounded-md bg-primary-ui text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-lg">
              Page {currentPage} of {pagination.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pagination.totalPages || isLoading}
              className="px-4 py-2 rounded-md bg-primary-ui text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
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
    </>
  );
};

export default BlogsListPage;
