import type { Content } from "@/schema/blog";

const getMediaIds = (contentJson: { content: Content[] }) => {
    const { content }: { content: Content[] } = contentJson;

    const mediaIds: string[] = [];

    content.forEach((content) => {
        if (content.type === "image") {
            mediaIds.push(content.attrs.alt);
        }
    });
    return mediaIds;
};