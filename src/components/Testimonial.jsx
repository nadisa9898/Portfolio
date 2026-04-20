import { useEffect, useRef, useState } from "react";

export default function Testimonial() {
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const testimonials = [
    {
      img: "https://i.pravatar.cc/40?img=3",
      name: "Soharul Habib",
      role: "Co-Founder & CEO @ OrbitX",
      text: "I've had the pleasure of knowing and working with Nadia Nisa. She is a passionate and detail-oriented UI/UX Designer.",
    },
    {
      img: "https://i.pravatar.cc/40?img=5",
      name: "MD. Mumin Bin Salim",
      role: "Graphic Designer | Video Editor",
      text: "Nadia is a very skilled UX designer. Her attention to detail and dedication to finding solutions are impressive.",
    },
    {
      img: "https://i.pravatar.cc/40?img=8",
      name: "Tumelo Webb",
      role: "UI/UX Designer • Product Designer",
      text: "I had the pleasure of mentoring Nadia and she consistently delivers high quality work.",
    },
  ];

  const originalLength = testimonials.length;
  const extendedTestimonials = Array.from(
    { length: 12 },
    () => testimonials,
  ).flat();

  useEffect(() => {
    const initScroll = () => {
      if (scrollContainerRef.current) {
        const firstChild = scrollContainerRef.current.children[0];
        if (firstChild && firstChild.offsetWidth > 0) {
          const itemWidth = firstChild.offsetWidth + 40; // 40px corresponds to gap-10
          scrollContainerRef.current.scrollTo({
            left: itemWidth * originalLength * 5,
            behavior: "auto",
          });
        } else {
          setTimeout(initScroll, 50);
        }
      }
    };
    const timer = setTimeout(initScroll, 50);
    return () => clearTimeout(timer);
  }, [originalLength]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft } = scrollContainerRef.current;
        const firstChild = scrollContainerRef.current.children[0];

        if (firstChild) {
          const itemWidth = firstChild.offsetWidth + 40;
          const maxNormalScroll = originalLength * itemWidth;

          if (scrollLeft >= maxNormalScroll * 8) {
            scrollContainerRef.current.scrollTo({
              left: scrollLeft - maxNormalScroll * 4,
              behavior: "auto",
            });
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTo({
                    left: scrollContainerRef.current.scrollLeft + itemWidth,
                    behavior: "smooth",
                  });
                }
              });
            });
          } else if (scrollLeft <= maxNormalScroll * 2) {
            scrollContainerRef.current.scrollTo({
              left: scrollLeft + maxNormalScroll * 4,
              behavior: "auto",
            });
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTo({
                    left: scrollContainerRef.current.scrollLeft + itemWidth,
                    behavior: "smooth",
                  });
                }
              });
            });
          } else {
            scrollContainerRef.current.scrollTo({
              left: scrollLeft + itemWidth,
              behavior: "smooth",
            });
          }
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, originalLength]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft } = scrollContainerRef.current;
      const firstChild = scrollContainerRef.current.children[0];
      if (firstChild) {
        const itemWidth = firstChild.offsetWidth + 40;
        const index = Math.round(scrollLeft / itemWidth);
        setActiveIndex(index % originalLength);
      }
    }
  };

  const scrollToDot = (dotIndex) => {
    if (scrollContainerRef.current) {
      const { scrollLeft } = scrollContainerRef.current;
      const firstChild = scrollContainerRef.current.children[0];
      if (firstChild) {
        const itemWidth = firstChild.offsetWidth + 40;
        const currentIndex = Math.round(scrollLeft / itemWidth);
        const currentMod = currentIndex % originalLength;
        let diff = dotIndex - currentMod;

        if (diff > originalLength / 2) diff -= originalLength;
        else if (diff < -originalLength / 2) diff += originalLength;

        const targetIndex = currentIndex + diff;
        scrollContainerRef.current.scrollTo({
          left: targetIndex * itemWidth,
          behavior: "smooth",
        });
      }
    }
  };

  const handleCardClick = () => {
    window.open(
      "https://www.linkedin.com/in/nadia-nisa-63998a266/details/recommendations/?detailScreenTabIndex=0",
      "_blank",
    );
  };

  return (
    <section className="max-w-[1170px] mx-auto px-4 md:px-0 mt-12 md:mt-37">
      <div className="flex flex-row justify-between items-end md:items-center gap-1 md:gap-4 mb-12 flex-wrap">
        <h2 className="text-[40px] md:text-[60px] font-semibold font-last-shuriken tracking-[0]">
          TESTIMONIAL
        </h2>
        <a
          href="https://www.linkedin.com/in/nadia-nisa-63998a266/details/recommendations/?detailScreenTabIndex=0"
          className="text-sm font-semibold underline text-nowrap"
        >
          View All
        </a>
      </div>

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-4"
      >
        {extendedTestimonials.map((item, index) => (
          <div
            key={`${index}-${item.name}`}
            role="button"
            tabIndex="0"
            aria-label="Open LinkedIn recommendations"
            onClick={handleCardClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleCardClick();
              }
            }}
            className="bg-white rounded-xl shadow-md p-6 cursor-pointer flex-shrink-0 snap-start w-full sm:w-[calc(50%-20px)] lg:w-[calc(33.333%-27px)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-blue-600 font-semibold">Linked</span>
                <span className="bg-blue-600 text-white text-xs px-1 rounded">
                  in
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                {item.text}
                <span className="text-blue-600 cursor-pointer"> See more</span>
              </p>
            </div>
            <div className="flex items-center gap-4 mt-auto">
              <img
                src={item.img}
                className="w-10 h-10 rounded-full"
                alt={item.name}
              />
              <div>
                <h4 className="font-semibold text-sm">{item.name}</h4>
                <p className="text-xs text-gray-500">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-3 mt-10">
        {Array.from({ length: originalLength }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`h-2 rounded transition-colors duration-300 ${activeIndex === idx ? "w-10 bg-gray-700" : "w-4 bg-gray-400"
              }`}
            onClick={() => scrollToDot(idx)}
            aria-label={`Testimonial ${idx + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
}
