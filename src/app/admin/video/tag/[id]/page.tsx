import { notFound } from "next/navigation";
import TagForm from "./TagsForm";
import { getTagById } from "./actions";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { authorizeUser } from "@/lib/auth";
import NoPermission from "@/components/common/NoPermission";

interface TagPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function TagPage({ params }: TagPageProps) {
    const { id } = await params;

    const { success, data: tag } = await getTagById(id);

    // If not creating a new tag and tag wasn't found
    if (id !== "new" && !success) {
        return notFound();
    }

    const user = await authorizeUser(["view:video-tag"]);

    if (!user.success) {
        return (
            <NoPermission message={user.message} />
        );
    }

    return (
        <div className="space-y-6">
            <TagForm tag={tag} />
        </div>
    );
}