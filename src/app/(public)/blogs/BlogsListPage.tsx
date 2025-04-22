import BlogCard from "@/components/blog/BlogCard";
import type { BlogWithCategoryAndBanner } from "@/schema/blog";
import { Search } from "lucide-react";
import React from "react";
import moment from "moment";

const tags = ["Happiness", "Jain Agam", "Jainism"];

const BlogsListPage = ({ blogs }: { blogs: BlogWithCategoryAndBanner[] }) => {
  return (
    <>
      <div className="bg-[#E9E2D2] w-full h-64 md:h-96 flex items-center">
        <h1 className="text-primary-ui p-4 md:p-20 text-4xl md:text-8xl font-semibold">
          ARTICLES
        </h1>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row p-5 mt-10">
        <div className="md:w-2/3 flex flex-wrap gap-2 px-4 md:px-8 pb-8">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-primary-ui px-4 md:px-7 py-2 text-sm md:text-lg font-medium text-white rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="md:w-1/3 mt-4 md:mt-0">
          <div className="flex border-b border-primary-ui">
            <Search className="text-primary-ui" />
            <input
              className="w-full border-none outline-none px-2 pb-1 text-sm md:text-lg"
              placeholder="Search articles..."
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap max-w-7xl mx-auto p-5 space-y-8 md:space-y-16">
        {blogs.map((blog, index) => (
          <BlogCard
            key={blog.id}
            tags={blog.tags}
            title={blog.title}
            date={moment(blog.publishedAt).format("LL")}
          />
        ))}
      </div>
    </>
  );
};

export default BlogsListPage;
