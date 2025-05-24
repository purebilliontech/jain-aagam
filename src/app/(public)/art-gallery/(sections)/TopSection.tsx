import InnerBanner from "@/components/common/InnerBanner";
import type { CoverImageDTO } from "@/schema/pageComponents";
import Image from "next/image";
import React from "react";

const TopSection = () => {
    return (
        <InnerBanner image={"/static/art/banner.png"} alt="Image for presentation" />
    );
};

export default TopSection;
