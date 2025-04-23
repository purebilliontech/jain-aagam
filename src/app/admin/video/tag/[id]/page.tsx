import { notFound } from "next/navigation";
import CategoryForm from "./CategoryForm";
import { getCategoryById } from "./actions";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { authorizeUser } from "@/lib/auth";
import NoPermission from "@/components/common/NoPermission";

interface CategoryPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { id } = await params;

    const { success, data: category } = await getCategoryById(id);

    // If not creating a new category and category wasn't found
    if (id !== "new" && !success) {
        return notFound();
    }

    const user = await authorizeUser(["view:blog-category"]);

    if (!user.success) {
        return (
            <NoPermission message={user.message} />
        );
    }

    return (
        <div className="space-y-6">
            <CategoryForm category={category} />
        </div>
    );
}