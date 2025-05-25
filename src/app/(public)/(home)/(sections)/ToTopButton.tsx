"use client";

import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import React, { useEffect, useState } from "react";

function ToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100); // Show when scrolled more than 100px
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`
        fixed bottom-12 right-6 z-50 p-6 h-15 w-15 text-white rounded-full shadow-lg 
        transform transition-all duration-300 ease-in-out bg-primary-foreground-ui hover:bg-primary-foreground-ui
        ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}
      `}
      aria-label="Move to top"
    >
      <ArrowUp size={8}/>
    </Button>
  );
}

export default ToTopButton;
