"use server";

import { handleServerActionError } from "@/helpers/error";
import { db } from "@/lib/db";
import { BlogWithTagsAndBannerSchema } from "@/schema/blog";
export const getBlogsList = async (
  page: number = 1,
  pageSize: number = 6,
  searchTerm?: string,
  selectedTags?: string[]
) => {
  try {
    console.log("Fetching blogs list...");

    // Calculate skip value for pagination
    const skip = (page - 1) * pageSize;

    // Build where clause for filtering
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = {
      published: true,
    };

    // Add search term filter if provided
    if (searchTerm) {
      whereClause.OR = [
        { title: { contains: searchTerm, mode: "insensitive" } },
        { synopsis: { contains: searchTerm, mode: "insensitive" } },
      ];
    }

    // Add tag filter if provided
    if (selectedTags && selectedTags.length > 0) {
      whereClause.blogToTags = {
        some: {
          tag: {
            name: {
              in: selectedTags,
            },
          },
        },
      };
    }

    // Get total count for pagination with filters
    const totalCount = await db.blog.count({
      where: whereClause,
    });

    const blogs = await db.blog.findMany({
      where: whereClause,
      include: {
        blogToTags: {
          include: {
            tag: true,
          },
        },
        banner: true,
      },
      skip,
      take: pageSize,
      orderBy: {
        publishedAt: "desc",
      },
    });
    console.log("Blogs fetched successfully:", blogs);

    return {
      success: true,
      data: blogs.map((blog) => BlogWithTagsAndBannerSchema.parse(blog)),
      pagination: {
        total: totalCount,
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  } catch (error) {
    console.error("Error fetching blogs list:", error);
    handleServerActionError(error);
    return {
      success: false,
      data: [],
      pagination: {
        total: 0,
        page: 1,
        pageSize,
        totalPages: 0,
      },
    };
  }
};

export const getAllBlogTags = async () => {
  try {
    console.log("Fetching all blog tags...");
    const tags = await db.blogTags.findMany({
      where: {
        active: true,
      },
      select: {
        id: true,
        name: true,
      },
    });
    console.log("Blog tags fetched successfully:", tags);

    return {
      success: true,
      data: tags,
    };
  } catch (error) {
    console.error("Error fetching blog tags:", error);
    handleServerActionError(error);
    return { success: false, data: [] };
  }
};
