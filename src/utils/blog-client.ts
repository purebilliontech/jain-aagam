import type { Content } from "@/schema/blog";
import { generateHTML } from '@tiptap/core';
import slugify from "slugify";
import TextAlign from "@tiptap/extension-text-align";
import OrderList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import Text from "@tiptap/extension-text";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Gapcursor from "@tiptap/extension-gapcursor";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";
import Paragraph from "@tiptap/extension-paragraph";
import Image from "@tiptap/extension-image";

const ExtendedImage = Image.extend({
    addAttributes() {
        return {
            height: {
                default: "400",
            },
            width: {
                default: "1200",
            },
            class: {
                default: "",
            },
            src: {
                default: "",
            },
            alt: {
                default: "",
            },
        };
    },
});

const ExtendedParagraph = Paragraph.extend({
    addAttributes() {
        return {
            class: {
                default: "",
                // Take the attribute values
                renderHTML: (attributes) => {
                    // … and return an object with HTML attributes.
                    if (typeof attributes.class === "object") {
                        return {
                            class: `${attributes.class.class}`,
                        };
                    }
                    return {
                        class: `${attributes.class}`,
                    };
                },
                parseHTML: (dom) => {
                    return {
                        class: dom.getAttribute("class"),
                    };
                },
            },
            fontSize: {
                default: "16px",
                renderHTML: (attributes) => {
                    if (typeof attributes.fontSize === "object") {
                        return {
                            style: attributes.fontSize.style,
                        };
                    }
                    return {
                        style: `font-size: ${attributes.fontSize}`,
                    };
                },
                parseHTML: (dom) => {
                    return {
                        style: dom.getAttribute("style"),
                    };
                },
            },
        };
    },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatBlogData = (contentJson: any) => {
    const contentArr = (contentJson.content as Content[]).map(
        (content: Content) => {
            if (content.type === "heading") {
                return {
                    ...content,
                    attrs: {
                        ...content.attrs,
                        id: slugify(content?.content?.[0]?.text || '', {
                            strict: true,
                            lower: true,
                        }),
                    },
                } as Content;
            } else {
                return content;
            }
        },
    );

    const newContentJson = { ...contentJson, content: contentArr };

    const content = generateHTML(newContentJson, [
        OrderList.configure({ HTMLAttributes: { class: "list-decimal mx-5" } }),
        BulletList.configure({ HTMLAttributes: { class: "list-disc mx-5" } }),
        ListItem,
        Document,
        Text,
        Dropcursor,
        Gapcursor,
        Bold,
        Italic,
        Underline,
        ExtendedImage,
        ExtendedParagraph,
        TextAlign.configure({ types: ["paragraph", "heading"] }),
        Link.configure({
            openOnClick: false,
            autolink: true,
            defaultProtocol: "https",
        }),
        Heading.configure({
            levels: [2, 3],
        }).extend({
            addAttributes() {
                return {
                    id: {
                        default: null,
                        parseHTML: (element) => element.getAttribute("id"),
                        renderHTML: (attributes) => {
                            if (!attributes.id) {
                                return {};
                            }
                            return {
                                id: attributes.id,
                            };
                        },
                    },
                };
            },
        }),
    ]);

    return { newContentJson, content };
};

export const getHTMLFromContent = (content: Content) => {
    const newcontent = generateHTML({ type: "doc", content: [content] }, [
        OrderList.configure({ HTMLAttributes: { class: "list-decimal mx-5" } }),
        BulletList.configure({ HTMLAttributes: { class: "list-disc mx-5" } }),
        ListItem,
        Document,
        Text,
        Dropcursor,
        Gapcursor,
        Bold,
        Italic,
        Underline,
        ExtendedImage,
        ExtendedParagraph,
        TextAlign.configure({ types: ["paragraph", "heading"] }),
        Link.configure({
            openOnClick: false,
            autolink: true,
            defaultProtocol: "https",
        }),
        Heading.configure({
            levels: [2, 3],
        }).extend({
            addAttributes() {
                return {
                    id: {
                        default: null,
                        parseHTML: (element) => element.getAttribute("id"),
                        renderHTML: (attributes) => {
                            if (!attributes.id) {
                                return {};
                            }
                            return {
                                id: attributes.id,
                            };
                        },
                    },
                };
            },
        }),
    ]);
    return newcontent;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getHTMLFromContentJson = (contentJson: any) => {
    try {

        console.log(contentJson);
        if (!contentJson) return "";
        const newcontent = generateHTML(contentJson, [
            OrderList.configure({ HTMLAttributes: { class: "list-decimal mx-5" } }),
            BulletList.configure({ HTMLAttributes: { class: "list-disc mx-5" } }),
            ListItem,
            Document,
            Text,
            Dropcursor,
            Gapcursor,
            Bold,
            Italic,
            Underline,
            ExtendedImage,
            ExtendedParagraph,
            TextAlign.configure({ types: ["paragraph", "heading"] }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                defaultProtocol: "https",
            }),
            Heading.configure({
                levels: [2, 3],
            }).extend({
                addAttributes() {
                    return {
                        id: {
                            default: null,
                            parseHTML: (element) => element.getAttribute("id"),
                            renderHTML: (attributes) => {
                                if (!attributes.id) {
                                    return {};
                                }
                                return {
                                    id: attributes.id,
                                };
                            },
                        },
                    };
                },
            }),
        ]);
        return newcontent;
    } catch (error) {
        console.log(error);
        return "";
    }
};

export const getMediaIds = (contentJson: { content: Content[] }) => {
    const { content }: { content: Content[] } = contentJson;

    const mediaIds: string[] = [];

    content.forEach((content) => {
        if (content.type === "image") {
            mediaIds.push(content.attrs.alt);
        }
    });
    return mediaIds;
};

