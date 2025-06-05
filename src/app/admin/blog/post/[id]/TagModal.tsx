import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { createTag } from "./actions";
import { BlogTags, BlogTagsDTO } from "@/schema/blogTag";

interface TagModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onTagCreated: (tag: BlogTagsDTO) => void;
}

export const TagModal = ({ open, onOpenChange, onTagCreated }: TagModalProps) => {
    const [newTag, setNewTag] = useState<string>("");

    const handleCreateTag = async () => {
        if (newTag) {
            const result = await createTag(newTag);
            if (result.success && result.data) {
                onTagCreated(result.data);
                setNewTag("");
                onOpenChange(false);
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Tag</DialogTitle>
                    <DialogDescription>
                        Create a new tag for your blog post
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="tag">Tag Name</Label>
                        <Input
                            id="tag"
                            placeholder="Enter tag name"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCreateTag}
                    >
                        Add Tag
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
