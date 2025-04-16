import { notFound } from "next/navigation";
import CategoryForm from "./CategoryForm";
import { getCategoryById } from "./actions";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";

interface CategoryPageProps {
    params: {
        id: string;
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { id } = params;

    const { success, data: category } = await getCategoryById(id);

    // If not creating a new category and category wasn't found
    if (id !== "new" && !success) {
        return notFound();
    }

    return (
        <div className="space-y-6">
            <CategoryForm category={category} />
        </div>
    );
}