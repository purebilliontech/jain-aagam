import type { CoverImageDTO } from "@/schema/pageComponents";
import Image from "next/image";
import React from "react";

const TopSection = ({ coverImage }: { coverImage: CoverImageDTO | null }) => {
    return (
        <section className="w-screen h-full relative flex flex-col md:flex-row items-center justify-center md:justify-around mx-auto">
            <Image
                src={coverImage?.media.url ?? "/static/placeholder.png"}
                alt={coverImage?.media.alt ?? "Image for presentation"}
                width={2000}
                height={2000}
                className="w-screen h-full object-cover"
            />
            {/* <div className="text-center p-4 md:text-left ">
                <h2 className="text-primary-ui font-sans text-5xl md:text-8xl font-semibold">
                    Bhagwan Mahavir
                </h2>
            </div> */}
        </section>
    );
};

export default TopSection;
