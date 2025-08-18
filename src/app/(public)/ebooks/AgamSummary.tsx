"use client"
import FEButton from "@/components/common/FEButton";
import SectionTitle from "@/components/common/SectionTitle";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

type SummaryItem = {
    title: string;
    pdfPath: string;
    imagePath: string;
};

const baseFileNames: string[] = [
    "shree-uvavai-sutra-shree-raipaseniya-sutra-summary",
    "shree-uttaradhyayan-sutra-summary",
    "shree-upasakdashang-sutra-summary",
    "shree-thanang-sutra-summary",
    "shree-suyagadang-sutra-summary",
    "shree-samvayang-sutra-summary",
    "shree-prashnavyakaran-sutra-shree-vipak-sutra-summary",
    "shree-pragnapna-sutra-summary",
    "shree-niryavallika-addi-5-sutra-summary",
    "shree-nandi-sutra-summary",
    "shree-jivajivabhigam-sutra-summary",
    "shree-jambudweep-pragnapti-sutra-summary",
    "shree-gnatadharmakatha-sutra-summary",
    "shree-dashvaikalik-sutra-summary",
    "shree-chandra-surya-pragnapti-sutra-summary",
    "shree-bhagwati-sutra-summary",
    "shree-anuyogdwaar-sutra-summary",
    "shree-antagaddashang-sutra-summary",
    "aagam-na-ajwada",
    "shree-acharang-sutra-summary",
];

function toTitleFromBaseName(name: string): string {
    return name
        .split("-")
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

const items: SummaryItem[] = baseFileNames.map((base) => ({
    title: toTitleFromBaseName(base),
    pdfPath: `/summary/${base}.pdf`,
    imagePath: `/static/summary/${base}.png`,
}));

const AgamSummary = () => {
    const [expanded, setExpanded] = useState(false);

    const displayedItems = expanded ? items : items.slice(0, 8);

    return (
        <section className="py-10 pt-20 max-w-7xl w-full mx-auto p-5">
            <SectionTitle title="Aagam Summaries" subtitle="EXPLORE" />
            <div className="md:mt-12 mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-6 md:gap-8 lg:gap-10">
                {displayedItems.map((item, index) => (
                    <div key={index} className="group">
                        <Link href={item.pdfPath} target="_blank">
                            <div className="relative overflow-hidden rounded-lg border border-gray-200 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg">
                                <Image
                                    src={item.imagePath}
                                    alt={item.title}
                                    width={300}
                                    height={300}
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                            {/* <div className="mt-3 text-center">
                                <p className="text-sm md:text-base font-medium text-gray-800 line-clamp-2">{item.title}</p>
                            </div> */}
                        </Link>
                    </div>
                ))}
            </div>

            {items.length > 8 && (
                <div className="flex justify-center">
                    <FEButton
                        className="text-center mx-auto mt-8"
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? "SHOW LESS" : "EXPLORE ALL"}
                    </FEButton>
                </div>
            )}

            {items.length === 0 && (
                <div className="text-center mt-12">
                    <p className="text-gray-500">No summaries found.</p>
                </div>
            )}
        </section>
    );
};

export default AgamSummary;
