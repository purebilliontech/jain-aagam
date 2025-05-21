import { NextResponse } from "next/server";
import { uploadMedia } from "@/app/admin/media/actions";
import { MediaDTOSchema } from "@/schema/media";
import { uploadFileToSupabase } from "@/helpers/supabase";
import slugify from "slugify";
import { db } from "@/lib/db";
import { authorizeUser } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const user = await authorizeUser(["view:media"]);
        if (!user.success) {
            return NextResponse.json(
                { success: false, message: user.message },
                { status: 401 }
            );
        }

        const formData = await request.formData();
        const file = formData.get("file") as File;
        const fileName = formData.get("fileName") as string;
        const type = formData.get("type") as string;

        if (!file || !fileName || !type) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        const result = await uploadMedia(formData, "file", fileName, type);

        if (!result.success) {
            return NextResponse.json(
                { success: false, message: "Failed to upload media" },
                { status: 500 }
            );
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error uploading media:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}



export async function PUT(request: Request) {
    try {
        const user = await authorizeUser(["view:media"]);
        if (!user.success) {
            return NextResponse.json(
                { success: false, message: user.message },
                { status: 401 }
            );
        }

        const formData = await request.formData();
        const id = formData.get("id") as string;
        const file = formData.get("file") as File;

        if (!file || !id) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        const fileBuffer = await file.arrayBuffer();
        const mediaPath = slugify(`${Date.now()}_${file.name}`, {
            lower: true, strict: true,
        });

        const { publicUrl } = await uploadFileToSupabase(
            mediaPath,
            Buffer.from(fileBuffer),
            "media",
            file.type,
        );

        const newMedia = await db.media.update({
            where: {
                id,
            },
            data: {
                url: publicUrl || "",
            },
        });

        const media = MediaDTOSchema.parse(newMedia);

        return NextResponse.json({ success: true, data: media });
    } catch (error) {
        console.error("Error updating media:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}

export const config = {
    api: {
        bodyParser: false
    },
};
