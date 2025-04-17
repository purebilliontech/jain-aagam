/** External Dependencies */
import {
  ComponentProps,
  Dispatch,
  FC,
  forwardRef,
  memo,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { BubbleMenu, Editor, EditorContent, useEditor } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import {
  List,
  ListOrdered,
  IndentIncrease,
  IndentDecrease,
  ImageUpIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  LinkIcon,
  Unlink2Icon,
  Heading2,
  Heading3,
} from "lucide-react";
import { ClassValue } from "clsx";
import TextAlign from "@tiptap/extension-text-align";
import Paragraph from "@tiptap/extension-paragraph";
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
import History from '@tiptap/extension-history';

/** Components created shadcn */
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Slider } from "../ui/slider";

/** Custom Components and Functions */
import { cn } from "@/lib/utils";

import SelectMediaModal from "../media/SelectMediaModal";
import type { MediaDTO } from "@/schema/media";
import { toast } from "sonner";

type TextAreaProps = ComponentProps<typeof Textarea>;

type RichTextAreaProps = Pick<TextAreaProps, "value" | "className"> & {
  outerDivClass?: ClassValue;
  innerDivClass?: ClassValue;
  editorClass?: ClassValue;
  buttonDivClass?: ClassValue;
  buttonClass?: ClassValue;

  onChange: (val: string, json: unknown) => void;
};

type ImageUploaderProps = {
  editor: Editor | null;
  className?: ClassValue;
};

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

const ImageUploader: FC<ImageUploaderProps> = ({ editor }) => {
  const handleSelectMedia = async (media: MediaDTO) => {
    try {
      editor
        ?.chain()
        .focus()
        .setImage({ src: media.url, alt: media.id })
        .run();
    } catch {
      toast.error("Failed to upload file");
    }
  };

  return (
    <SelectMediaModal
      handleSelectedMedia={(media: MediaDTO) => {
        handleSelectMedia(media);
      }}
      openSelect={false}
      uploadButton={
        <Button variant={"ghost"} type="button">
          <ImageUpIcon />
        </Button>
      }
    />
  );
};
// const ImageUploader: FC<ImageUploaderProps> = ({ editor, className = "" }) => {
//     const [open, setOpen] = useState<boolean>(false);

//     const form = useForm<DocumentUploadClient>({
//         resolver: zodResolver(DocumentUploadClientSchema),
//     })
//     const onFormSubmit = async (val: DocumentUploadClient) => {
//         try {
//             const res = await axios.post("/api/blog/post/upload", val, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 }
//             });
//             const resData = res.data as successResponse;
//             const documentData = resData.data as DocumentDTO;
//             editor?.chain().focus().setImage({ src: documentData.documentValue }).run();
//             form.reset();
//             setOpen(false);
//         } catch {
//             toast({ title: "Failed to upload file", variant: "destructive", duration: 1000 })
//         }
//     }

//     return (
//         <Popover open={open} onOpenChange={(val) => (form.reset(), setOpen(val))}>
//             <PopoverTrigger asChild>
//                 <Button className={cn(className)} variant={"ghost"} type="button"><ImageUpIcon /></Button>
//             </PopoverTrigger>
//             <PopoverContent>
//                 <Form {...form}>
//                     <form className="flex flex-col gap-4">
//                         <FormField control={form.control} name="documentValueBuffer" render={({ field }) => GenericFormField({
//                             formLabel: "",
//                             labelClass: "w-full text-center",
//                             itemClass: "flex flex-col gap-2",
//                             divClass: "flex flex-col w-full gap-2",
//                             field, cb: GenericImageUpload({ formLabel: "", buttonText: "Add Image", imageClassName: "object-cover", imageDimensions: { height: 300, width: 300 } })
//                         })} />
//                         {!!form.watch("documentValueBuffer") && (<PrimaryButton type="button" onClick={form.handleSubmit(onFormSubmit)} className="w-full">Upload</PrimaryButton>)}
//                     </form>
//                 </Form>
//             </PopoverContent>
//         </Popover >
//     )
// }

// const handle

type ImageEditorProps = ImageUploaderProps & {
  open: boolean;
  onOpenChage: Dispatch<SetStateAction<boolean>>;
};

const ImageEditor: FC<ImageEditorProps> = ({ editor, className }) => {
  if (!editor?.isActive("image")) {
    return <></>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image Editor</CardTitle>
      </CardHeader>
      <CardDescription className="flex min-w-[250px] flex-col gap-4 p-8">
        <Slider
          min={100}
          max={1200}
          step={25}
          defaultValue={[editor?.getAttributes("image").width ?? 400]}
          onValueChange={(val: any) =>
            editor
              ?.chain()
              .focus()
              .updateAttributes("image", { width: val[0] })
              .run()
          }
          className={className as string}
        />
      </CardDescription>
    </Card>
  );
};

const RichTextAreaForwardRef: FC<RichTextAreaProps> = forwardRef<
  HTMLDivElement,
  RichTextAreaProps
>(
  (
    {
      value,
      onChange,
      outerDivClass = "",
      innerDivClass = "",
      buttonDivClass = "",
      editorClass = "",
      buttonClass = "",
    },
    ref,
  ) => {
    const [open, setOpen] = useState<boolean>(false);

    const editor = useEditor({
      immediatelyRender: true,
      extensions: [
        OrderList.configure({
          HTMLAttributes: { class: "list-decimal mx-5" },
        }),
        BulletList.configure({
          HTMLAttributes: { class: "list-disc mx-5" },
        }),
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
          HTMLAttributes: {
            id: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
          },
        }),
        History
      ],
      content: `${value}`,
      onUpdate({ editor }) {
        onChange?.(editor.getHTML(), editor.getJSON());
      },
      autofocus: false,
      editorProps: {
        attributes: {
          class: cn(
            " border-none outline-none min-h-[120px] p-2 ",
            editorClass,
          ),
        },
      },
    });

    const onAlignClick = (align: "left" | "center" | "right") => {
      if (editor?.isActive("image")) {
        const classesToAdd = [
          "place-self-start",
          "place-self-center",
          "place-self-end",
          "w-20",
          "h-20",
        ];
        const cls = editor.getAttributes("image");
        const newClass = classesToAdd.reduce((prev: string, curr) => {
          const index = prev.indexOf(curr);
          if (index === -1) {
            return prev;
          }
          return prev.slice(0, index) + prev.slice(index + 1 + curr.length);
        }, cls?.class ?? "");

        const classToBeAdded =
          align === "left"
            ? classesToAdd[0]
            : align === "center"
              ? classesToAdd[1]
              : classesToAdd[2];
        editor
          ?.chain()
          .focus()
          .updateAttributes("image", {
            class: `${newClass} ${classToBeAdded}`,
          })
          .run();
      } else {
        const cls = editor.getAttributes("paragraph");
        const classesToAdd = ["text-left", "text-center", "text-right"];
        const newClass = classesToAdd.reduce(
          (prev: string, curr) => {
            const index = prev.indexOf(curr);
            if (index === -1) {
              return prev;
            }
            return prev.slice(0, index) + prev.slice(index + 1 + curr.length);
          },
          (typeof cls?.class === "object" ? cls?.class.class : cls?.class) ??
          "",
        );
        const classToBeAdded =
          align === "left"
            ? classesToAdd[0]
            : align === "center"
              ? classesToAdd[1]
              : classesToAdd[2];
        editor
          ?.chain()
          .focus()
          .updateAttributes("paragraph", {
            class: `${newClass} ${classToBeAdded}`,
          })
          .run();
      }
    };

    const setLink = useCallback(() => {
      const previousUrl = editor.getAttributes("link").href;
      const url = window.prompt("URL", previousUrl);

      // cancelled
      if (url === null) {
        return;
      }

      // empty
      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();

        return;
      }

      // update link
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }, [editor]);

    // const changeFontSize = (delta: "Increase" | "Decrease", size?: number) => {
    //     if (editor?.isActive("image")) {
    //         return;
    //     }
    //     const cls = editor.getAttributes("paragraph");
    //     const endIndex = (typeof cls.fontSize === "object" ? cls.fontSize.style : cls.fontSize).indexOf("px");
    //     const currentSize = parseInt((typeof cls.fontSize === "object" ? `${cls.fontSize.style.split(":")[1] ?? ""}`.trim() : cls.fontSize).slice(0, endIndex));
    //     const newSize = delta === "Increase" ? currentSize + 2 : currentSize - 2;
    //     if ((size && size < 8) || newSize < 8) {
    //         return;
    //     }
    //     editor?.chain().focus().updateAttributes("paragraph", { fontSize: `${size ?? newSize}px` }).run();
    // }

    return (
      <div
        className={cn(
          "flex min-h-[120px] w-full flex-col-reverse gap-4 rounded-md border border-input px-3 py-2",
          outerDivClass,
        )}
      >
        <div className={cn("flex grow flex-col", innerDivClass)}>
          {editor && (
            <BubbleMenu
              editor={editor}
              className=""
              tippyOptions={{
                duration: [100, null],
                arrow: true,
              }}
            >
              <ImageEditor
                editor={editor}
                className={`${buttonClass}`}
                open={open}
                onOpenChage={setOpen}
              />
            </BubbleMenu>
          )}
          <EditorContent
            editor={editor}
            className="admin-blog border shopify-html max-h-[80vh] min-h-20 overflow-y-scroll flex grow flex-col"
            ref={ref}
          />
        </div>
        <div className={cn("flex flex-row flex-wrap gap-2", buttonDivClass)}>
          <Button
            variant={editor?.isActive("bold") ? "outline" : "ghost"}
            className={`${editor?.isActive("bold") ? "bg-accent" : "bg-transperent"} ${buttonClass} `}
            type="button"
            onClick={() => editor?.chain().focus().toggleBold().run()}
          >
            <b>B</b>
          </Button>
          <Button
            variant={editor?.isActive("italic") ? "outline" : "ghost"}
            className={`${editor?.isActive("italic") ? "bg-accent" : "bg-transperent"} ${buttonClass} `}
            type="button"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          >
            <em>I</em>
          </Button>
          <Button
            variant={editor?.isActive("underline") ? "outline" : "ghost"}
            className={`${editor?.isActive("underline") ? "bg-accent" : "bg-transperent"} ${buttonClass} `}
            type="button"
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
          >
            <span className="underline">U</span>
          </Button>
          <Button
            variant={
              editor?.isActive("heading", { level: 2 }) ? "outline" : "ghost"
            }
            className={`${editor?.isActive("heading", { level: 2 }) ? "bg-accent" : "bg-transparent"} ${buttonClass}`}
            type="button"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <Heading2 />
          </Button>

          <Button
            variant={
              editor?.isActive("heading", { level: 3 }) ? "outline" : "ghost"
            }
            className={`${editor?.isActive("heading", { level: 3 }) ? "bg-accent" : "bg-transparent"} ${buttonClass}`}
            type="button"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <Heading3 />
          </Button>

          <Separator orientation="vertical" className="min-h-10" />
          {/* <Button variant={editor?.isActive("blockquote") ? "outline" : "ghost"} className={`${editor?.isActive("blockquote") ? "bg-accent" : "bg-transperent"}`} type="button" onClick={() => editor?.chain().focus().toggleBlockquote().run()}><b>BQ</b></Button> */}
          <Button
            variant={editor?.isActive("bulletList") ? "outline" : "ghost"}
            className={`${editor?.isActive("bulletList") ? "bg-accent" : "bg-transperent"} ${buttonClass}`}
            type="button"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          >
            <List />
          </Button>
          <Button
            variant={editor?.isActive("orderedList") ? "outline" : "ghost"}
            className={`${editor?.isActive("orderedList") ? "bg-accent" : "bg-transperent"} ${buttonClass} `}
            type="button"
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered />
          </Button>
          <Button
            variant={"ghost"}
            type="button"
            className={`${buttonClass}`}
            disabled={!editor?.can().liftListItem("listItem")}
            onClick={() =>
              editor?.chain().focus().liftListItem("listItem").run()
            }
          >
            <IndentDecrease />
          </Button>
          <Button
            variant={"ghost"}
            type="button"
            className={`${buttonClass}`}
            disabled={!editor?.can().sinkListItem("listItem")}
            onClick={() =>
              editor?.chain().focus().sinkListItem("listItem").run()
            }
          >
            <IndentIncrease />
          </Button>
          <Separator orientation="vertical" className="min-h-10" />
          <Button
            variant={"ghost"}
            type="button"
            className={`${buttonClass}`}
            onClick={() => onAlignClick("left")}
          >
            <AlignLeftIcon />
          </Button>
          <Button
            variant={"ghost"}
            type="button"
            className={`${buttonClass}`}
            onClick={() => onAlignClick("center")}
          >
            <AlignCenterIcon />
          </Button>
          <Button
            variant={"ghost"}
            type="button"
            className={`${buttonClass}`}
            onClick={() => onAlignClick("right")}
          >
            <AlignRightIcon />
          </Button>
          <Separator orientation="vertical" className="min-h-10" />
          <Button
            variant={editor.isActive("link") ? "outline" : "ghost"}
            className={`${editor.isActive("link") ? "bg-accent" : "bg-transparent"} ${buttonClass}`}
            type="button"
            onClick={setLink}
          >
            <LinkIcon />
          </Button>
          <Button
            variant={"ghost"}
            className={`${buttonClass}`}
            type="button"
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={!editor.isActive("link")}
          >
            <Unlink2Icon />
          </Button>
          <Separator orientation="vertical" className="min-h-10" />
          <div className="w-20">


            <ImageUploader editor={editor} className={` ${buttonClass} `} />
          </div>
          {/* <Button variant={"ghost"} type="button" className={`${buttonClass}`} disabled={!editor?.isActive("image")} onClick={() => editor?.chain().focus().updateAttributes("image", { class: "w-20 h-20 place-self-center" }).run()} ><ImageIcon /></Button> */}
        </div>
      </div>
    );
  },
);

RichTextAreaForwardRef.displayName = "RichTextArea";

export const RichTextArea = memo(RichTextAreaForwardRef);
