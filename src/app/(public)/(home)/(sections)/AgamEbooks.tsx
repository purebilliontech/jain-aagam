"use client";

import FEButton from "@/components/common/FEButton";
import SectionTitle from "@/components/common/SectionTitle";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const ebooks = [
  // ANGA ĀGAMA Sutras (11)
  {
    image: "/static/ebooks/ebook-34.jpg",
    pdf: "/ebooks/shree-acharang-sutra-part-1.pdf",
    category: "ANGA",
    title: "Acharang Sutra Part 1",
  },
  {
    image: "/static/ebooks/ebook-0.jpg",
    pdf: "/ebooks/shree-acharang-sutra-part-2.pdf",
    category: "ANGA",
    title: "Acharang Sutra Part 2",
  },
  {
    image: "/static/ebooks/ebook-23.jpg",
    pdf: "/ebooks/shree-suyagadang-sutra-part-1.pdf",
    category: "ANGA",
  },
  {
    image: "/static/ebooks/ebook-24.jpg",
    pdf: "/ebooks/shree-suyagadang-sutra-part-2.pdf",
    category: "ANGA",
  },
  {
    image: "/static/ebooks/ebook-25.jpg",
    pdf: "/ebooks/shree-thanang-sutra-part-1.pdf",
    category: "ANGA",
  },
  {
    image: "/static/ebooks/ebook-26.jpg",
    pdf: "/ebooks/shree-thanang-sutra-part-2.pdf",
    category: "ANGA",
  },
  {
    image: "/static/ebooks/ebook-22.jpg",
    pdf: "/ebooks/shree-samavayang-sutra.pdf",
    category: "ANGA",
  },
  {
    image: "/static/ebooks/ebook-5.jpg",
    pdf: "/ebooks/shree-bhagwati-sutra-part-1.pdf",
    category: "ANGA",
  },
  {
    image: "/static/ebooks/ebook-6.jpg",
    pdf: "/ebooks/shree-bhagwati-sutra-part-2.pdf",
    category: "ANGA",
  },
  {
    image: "/static/ebooks/ebook-7.jpg",
    pdf: "/ebooks/shree-bhagwati-sutra-part-3.pdf",
    category: "ANGA",
  },
  {
    image: "/static/ebooks/ebook-8.jpg",
    pdf: "/ebooks/shree-bhagwati-sutra-part-4.pdf",
    category: "ANGA",
  },
  {
    image: "/static/ebooks/ebook-9.jpg",
    pdf: "/ebooks/shree-bhagwati-sutra-part-5.pdf",
    category: "ANGA",
  },
  {
    image: "/static/ebooks/ebook-12.jpg",
    pdf: "/ebooks/shree-gnatadharmakatha-sutra.pdf",
    category: "ANGA",
  },
  {
    image: "/static/ebooks/ebook-29.jpg",
    pdf: "/ebooks/shree-upasakdashang-sutra.pdf",
    category: "ANGA",
  },
  {
    image: "/static/ebooks/ebook-1.jpg",
    pdf: "/ebooks/shree-antagad-sutra.pdf",
    category: "ANGA",
  },
  {
    image: "/static/ebooks/ebook-2.jpg",
    pdf: "/ebooks/shree-anuttarovavai-sutra.pdf",
    category: "ANGA",
  },
  {
    image: "/static/ebooks/ebook-20.jpg",
    pdf: "/ebooks/shree-prashnavyakaran-sutra.pdf",
    category: "ANGA",
  },
  {
    image: "/static/ebooks/ebook-33.jpg",
    pdf: "/ebooks/shree-vipak-sutra.pdf",
    category: "ANGA",
  },

  // UPĀNGA ĀGAMA Sutras (12)
  {
    image: "/static/ebooks/ebook-32.jpg",
    pdf: "/ebooks/shree-uvavai-sutra.pdf",
    category: "UPANG",
  },
  {
    image: "/static/ebooks/ebook-21.jpg",
    pdf: "/ebooks/shree-raipaseniya-sutra.pdf",
    category: "UPANG",
  },
  {
    image: "/static/ebooks/ebook-14.jpg",
    pdf: "/ebooks/shree-jivajivabhigam-sutra.pdf",
    category: "UPANG",
  },
  {
    image: "/static/ebooks/ebook-17.jpg",
    pdf: "/ebooks/shree-pannavana-sutra-part-1.pdf",
    category: "UPANG",
  },
  {
    image: "/static/ebooks/ebook-18.jpg",
    pdf: "/ebooks/shree-pannavana-sutra-part-2.pdf",
    category: "UPANG",
  },
  {
    image: "/static/ebooks/ebook-19.jpg",
    pdf: "/ebooks/shree-pannavana-sutra-part-3.pdf",
    category: "UPANG",
  },
  {
    image: "/static/ebooks/ebook-13.jpg",
    pdf: "/ebooks/shree-jambudweep-pragnapti-sutra.pdf",
    category: "UPANG",
  },
  {
    image: "/static/ebooks/ebook-10.jpg",
    pdf: "/ebooks/shree-chandra-surya-pragnapti-sutra.pdf",
    category: "UPANG",
  },
  {
    image: "/static/ebooks/niryavalika_ebook.png",
    pdf: "/ebooks/niryavalika_ebook.pdf",
    category: "UPANG",
  },

  // MOOL Sutras (4)
  {
    image: "/static/ebooks/ebook-30.jpg",
    pdf: "/ebooks/shree-uttaradhyayan-sutra-part-1.pdf",
    category: "MOOL",
  },
  {
    image: "/static/ebooks/ebook-31.jpg",
    pdf: "/ebooks/shree-uttaradhyayan-sutra-part-2.pdf",
    category: "MOOL",
  },
  {
    image: "/static/ebooks/ebook-11.jpg",
    pdf: "/ebooks/shree-dashvaikalik-sutra.pdf",
    category: "MOOL",
  },
  {
    image: "/static/ebooks/ebook-15.jpg",
    pdf: "/ebooks/shree-nandi-sutra.pdf",
    category: "MOOL",
  },
  {
    image: "/static/ebooks/ebook-3.jpg",
    pdf: "/ebooks/shree-anuyogdwar-sutra.pdf",
    category: "MOOL",
  },

  // CHHED Sutras (4)
  {
    image: "/static/ebooks/ebook-16.jpg",
    pdf: "/ebooks/shree-nishith-sutra.pdf",
    category: "CHHED",
  },
  {
    image: "/static/ebooks/ebook-27.jpg",
    pdf: "/ebooks/shree-tran-chhed-sutra.pdf",
    category: "CHHED",
  },
  {
    image: "/static/ebooks/ebook-4.jpg",
    pdf: "/ebooks/shree-avashyak-sutra.pdf",
    category: "AVASHYAK",
  },
];

const categories = [
  { id: "ALL", name: "All", count: ebooks.length },
  {
    id: "ANGA",
    name: "Ang Aagam Sutras",
    count: ebooks.filter((e) => e.category === "ANGA").length,
  },
  {
    id: "UPANG",
    name: "Upang Aagam Sutras",
    count: ebooks.filter((e) => e.category === "UPANG").length,
  },
  {
    id: "MOOL",
    name: "Mool Aagam Sutras",
    count: ebooks.filter((e) => e.category === "MOOL").length,
  },
  {
    id: "CHHED",
    name: "Chhed Aagam Sutras",
    count: ebooks.filter((e) => e.category === "CHHED").length,
  },
  {
    id: "AVASHYAK",
    name: "Avashyak Sutra",
    count: ebooks.filter((e) => e.category === "AVASHYAK").length,
  },
];

const AgamEbooks = ({ isHomePage }:{isHomePage:boolean}) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const filteredEbooks =
    selectedCategory === "ALL"
      ? ebooks
      : ebooks.filter((ebook) => ebook.category === selectedCategory);

  const displayedEbooks = expanded
    ? filteredEbooks
    : filteredEbooks.slice(0, 8);

  return (
    <>
      <section className="md:mt-10 mt-10 mb-20 max-w-7xl w-full mx-auto p-5">
        {isHomePage && (
          <div className="mb-14" >
            <SectionTitle title="Aagam eBooks" subtitle="EXPLORE" />
          </div>
        )}

        {/* Category Filter Buttons */}
        <div className="md:mt-16 mt-4">
          {/* Desktop: flex-wrap with justify-center */}
          <div className="hidden md:flex flex-wrap justify-center gap-3 md:gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setExpanded(false);
                }}
                className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 cursor-pointer ${
                  selectedCategory === category.id
                    ? "bg-primary-ui text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Mobile: horizontal scroll */}
          <div className="md:hidden overflow-x-auto">
            <div className="flex gap-3 pb-2 px-1" >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setExpanded(false);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap flex-shrink-0 ${
                    selectedCategory === category.id
                      ? "bg-primary-ui text-white "
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Category Title */}
        {selectedCategory !== "ALL" && (
          <div className="text-center mt-8">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
              {categories.find((c) => c.id === selectedCategory)?.name}
            </h3>
          </div>
        )}

        {/* Responsive grid layout */}
        <div className="md:mt-12 mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-6 md:gap-8 lg:gap-10">
          {displayedEbooks.map((ebook, index) => (
            <div key={index} className="group">
              <Link href={ebook.pdf} target="_blank">
                <div className="relative overflow-hidden rounded-lg border border-gray-200 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg">
                  <Image
                    src={ebook.image}
                    alt="Aagam Ebooks"
                    key={index}
                    width={300}
                    height={300}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {filteredEbooks.length > 8 && (
          <div className="flex justify-center">
            <FEButton
              className="text-center mx-auto mt-12 sm:mt-16 md:mt-20"
              onClick={() => {
                setExpanded(!expanded);
                if (expanded) {
                  window.scrollTo({
                    top: 3000,
                    behavior: "smooth",
                  });
                }
              }}
            >
              {expanded ? "SHOW LESS" : "EXPLORE ALL"}
            </FEButton>
          </div>
        )}

        {/* No results message */}
        {filteredEbooks.length === 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-500">No ebooks found in this category.</p>
          </div>
        )}
      </section>
    </>
  );
};

export default AgamEbooks;