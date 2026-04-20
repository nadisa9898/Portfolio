import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { projects } from '../utils/my-work';

export default function MyWork() {
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef(null);



  const originalLength = projects.length;
  // Duplicate items drastically to create an endless scroll illusion (12 copies)
  const extendedProjects = Array.from({ length: 12 }, () => projects).flat();

  useEffect(() => {
    // Initial jump to the middle of our duplicate clusters so user could even scroll backwards safely seamlessly
    const initScroll = () => {
      if (scrollContainerRef.current) {
        const firstChild = scrollContainerRef.current.children[0];
        if (firstChild && firstChild.offsetWidth > 0) {
          const itemWidth = firstChild.offsetWidth + 40; // 40px corresponds to gap-10
          // start precisely at the beginning of the 5th cloned array chunk
          scrollContainerRef.current.scrollTo({ left: itemWidth * originalLength * 5, behavior: 'auto' });
        } else {
          setTimeout(initScroll, 50);
        }
      }
    };
    // Ensure we trigger slightly after DOM paints elements
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

          // If scrolled extremely far forward past our buffer blocks 
          if (scrollLeft >= maxNormalScroll * 8) {
            // Invisibly jump back blocks exactly without smooth scroll interpolation
            scrollContainerRef.current.scrollTo({ left: scrollLeft - maxNormalScroll * 4, behavior: 'auto' });
            // immediately increment one card smoothly after shifting baseline 
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTo({ left: scrollContainerRef.current.scrollLeft + itemWidth, behavior: 'smooth' });
                }
              });
            });
          }
          // Same treatment if user swipes extremely far backward into earliest blocks
          else if (scrollLeft <= maxNormalScroll * 2) {
            scrollContainerRef.current.scrollTo({ left: scrollLeft + maxNormalScroll * 4, behavior: 'auto' });
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTo({ left: scrollContainerRef.current.scrollLeft + itemWidth, behavior: 'smooth' });
                }
              });
            });
          } else {
            // Normal transition advance
            scrollContainerRef.current.scrollTo({ left: scrollLeft + itemWidth, behavior: 'smooth' });
          }
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, originalLength]);

  const scrollByDirection = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft } = scrollContainerRef.current;
      const firstChild = scrollContainerRef.current.children[0];
      if (firstChild) {
        const itemWidth = firstChild.offsetWidth + 40;
        const currentIndex = Math.round(scrollLeft / itemWidth);
        const targetIndex = currentIndex + direction;
        scrollContainerRef.current.scrollTo({ left: targetIndex * itemWidth, behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="work" className="max-w-[1170px] mx-auto px-4 md:px-0 mt-20">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-[40px] md:text-[60px] font-semibold font-last-shuriken tracking-[0]">My Work</h2>
        <Link to="/my-work" className="text-sm underline cursor-pointer hover:text-gray-600">
          View All
        </Link>
      </div>

      <div
        ref={scrollContainerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="flex gap-8 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {extendedProjects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group cursor-pointer shrink-0 w-full sm:w-[calc(50%-20px)] lg:w-[calc(33.333%-27px)] snap-start"
          >
            <div
              className={`rounded-lg overflow-hidden w-full h-[360px] ${project.bgClass}`}
            >
              <img
                src={project.img}
                className={`w-full h-full object-cover group-hover:scale-105 transition duration-300 ${project.imgClass || ''
                  }`}
                alt={project.title}
              />
            </div>
            <h3 className="mt-4 font-semibold">{project.title}</h3>
            <p className="text-sm text-gray-600">{project.type}</p>
          </a>
        ))}
      </div>

      <div className="flex justify-center mt-12 gap-3 items-center">
        <span
          onClick={() => scrollByDirection(-1)}
          className="h-1 cursor-pointer transition-all duration-300 rounded-full w-3 bg-gray-400 hover:w-4 hover:bg-gray-600"
          aria-label="Previous Project"
        ></span>
        <span
          className="h-1 transition-all duration-300 rounded-full w-10 bg-gray-800"
          aria-label="Current Project"
        ></span>
        <span
          onClick={() => scrollByDirection(1)}
          className="h-1 cursor-pointer transition-all duration-300 rounded-full w-3 bg-gray-400 hover:w-4 hover:bg-gray-600"
          aria-label="Next Project"
        ></span>
      </div>
    </section>
  );
}
