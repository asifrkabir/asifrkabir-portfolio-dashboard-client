"use client";

import { ChevronsUp } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed z-10 bottom-5 right-5 p-3 bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-600 transition-all size-12 flex justify-center items-center"
        aria-label="Scroll to top"
      >
        <ChevronsUp />
      </button>
    )
  );
};

export default ScrollToTopButton;
