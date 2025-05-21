'use client';

import BlogCard from "@/components/blog/BlogCard";
import type { BlogWithTagsAndBanner } from "@/schema/blog";
import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import moment from "moment";

const BlogsListPage = ({ blogs, tags }: { blogs: BlogWithTagsAndBanner[], tags: { id: string; name: string; }[] }) => {
  // State to track selected tags for filtering
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  // State to track blogs after filtering
  const [filteredBlogs, setFilteredBlogs] = useState<BlogWithTagsAndBanner[]>(blogs);
  // State for search input
  const [searchTerm, setSearchTerm] = useState("");

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

  // Filter blogs whenever selected tags or search term changes
  useEffect(() => {
    let result = [...blogs];

    // Filter by selected tags if any are selected
    if (selectedTags.length > 0) {
      result = result.filter(blog => {
        const blogTags = blog.blogToTags.map(tag => tag.tag.name);
        return selectedTags.some(tag => blogTags.includes(tag));
      });
    }

    // Filter by search term if provided
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(blog =>
        blog.title.toLowerCase().includes(term) ||
        blog.blogToTags.some(tag => tag.tag.name.toLowerCase().includes(term))
      );
    }

    setFilteredBlogs(result);
  }, [selectedTags, searchTerm, blogs]);

  return (
    <>
      <div className="bg-[#E9E2D2] w-full h-64 md:h-96 flex items-center">
        <h1 className="max-w-7xl mx-auto text-primary-ui p-4 md:p-20 text-4xl md:text-8xl font-semibold">
          ARTICLES
        </h1>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row p-5 mt-10">
        <div className="md:w-2/3 flex flex-wrap gap-2 px-4 md:px-8 pb-8">
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => handleTagClick(tag.name)}
              className={`inline-block cursor-pointer px-4 md:px-7 py-2 text-sm md:text-lg font-medium rounded-full transition-colors bg-primary-ui text-white`}
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

      {filteredBlogs.length === 0 ? (
        <div className="flex justify-center items-center max-w-7xl mx-auto p-5 h-64">
          <p className="text-xl text-gray-500">No articles found matching your filter criteria.</p>
        </div>
      ) : (
        <div className="flex flex-wrap max-w-7xl mx-auto p-5 space-y-8 md:space-y-16">
          {filteredBlogs.map((blog) => (
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
