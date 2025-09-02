import React, { useEffect, useState } from "react";

const bannerMessages = [
  "Wonyoungism Mindset",
  "Glow Starts With You",
  "Take the Beauty Quiz",
  "New! Skincare Routines Just Added",
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setPrevIndex(currentIndex);
        setCurrentIndex((prev) =>
          prev === bannerMessages.length - 1 ? 0 : prev + 1
        );
        setIsTransitioning(false);
      }, 500); // Matches animation duration
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="bg-pink-100 text-pink-800 text-sm text-center py-2 px-4 sticky top-0 z-50 overflow-hidden h-9 rounded-b-xl shadow-sm">
      <div className="relative h-full w-full">
        {prevIndex !== null && isTransitioning && (
          <div className="absolute inset-0 animate-slide-out">
            {bannerMessages[prevIndex]}
          </div>
        )}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isTransitioning ? "animate-slide-in" : ""
          }`}
        >
          {bannerMessages[currentIndex]}
        </div>
      </div>
    </div>
  );
};

export default Banner;
