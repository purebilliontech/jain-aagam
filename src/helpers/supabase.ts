import { supabase } from "@/lib/supabase";
import fs from "fs";

export async function uploadFileToSupabase(
    path: string,
    filePath: string | Buffer,
    bucket: string,
    contentType?: string,
): Promise<{ publicUrl?: string; error?: string }> {
    try {
        let file;
        if (filePath instanceof Buffer) {
            file = filePath;
        } else {
            file = fs.readFileSync(filePath);
        }
        // Upload the file with the correct MIME type if contentType exists
        const uploadOptions = contentType ? { contentType } : undefined;
        const { error } = await supabase.storage
            .from(bucket)
            .upload(path, file, uploadOptions);

        if (error) {
            throw error;
        }

        const { data: publicUrlData } = await supabase.storage
            .from(bucket)
            .getPublicUrl(path);

        if (!publicUrlData?.publicUrl) {
            throw new Error("Failed to get public URL");
        }

        return { publicUrl: publicUrlData.publicUrl };
    } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
            // Handle as an instance of Error
            return { error: error.message };
        } else {
            // Fallback for non-Error exceptions
            return { error: "An unknown error occurred" };
        }
    }
}

export async function deleteFileFromSupabase(
    fileUrl: string,
    bucket: string,
): Promise<{ success?: boolean; error?: string }> {
    try {
        const path = fileUrl.split(`/public/${bucket}/`)[1];

        if (!path) {
            throw new Error("Invalid file path");
        }

        const { error } = await supabase.storage.from(bucket).remove([path]);

        if (error) {
            throw new Error("Failed to delete existing file from Supabase");
        }

        // if (data.length === 0) {
        // console.warn("No files were deleted. Check the file path:", path);
        // }

        return { success: true };
    } catch (error: unknown) {
        if (error instanceof Error) {
            // Handle as an instance of Error
            return { error: error.message };
        } else {
            // Fallback for non-Error exceptions
            return { error: "An unknown error occurred" };
        }
    }
}
