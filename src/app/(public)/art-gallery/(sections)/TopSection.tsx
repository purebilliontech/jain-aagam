import type { CoverImageDTO } from "@/schema/pageComponents";
import Image from "next/image";
import React from "react";

const TopSection = ({ coverImage }: { coverImage: CoverImageDTO | null }) => {
    return (
        <section className="min-h-screen relative flex flex-col md:flex-row items-center justify-center md:justify-around mx-auto">
            <Image
                src={coverImage?.media.url ?? "/static/art/banner.png"}
                alt={coverImage?.media.alt ?? "Image for presentation"}
                width={2000}
                height={2000}
                className="w-screen h-full  absolute -z-50 top-0 left-0 object-center"
            />
            {/* <div className="text-center p-4 md:text-left ">
                <h2 className="text-primary-ui font-sans text-5xl md:text-8xl font-semibold">
                    ART GALLERY
                </h2>
            </div> */}
        </section>
    );
};

export default TopSection;
