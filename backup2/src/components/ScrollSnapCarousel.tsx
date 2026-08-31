import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScrollSnapCarouselProps {
  children: React.ReactNode[];
  className?: string;
  showArrows?: boolean;
  showDots?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
}

const ScrollSnapCarousel: React.FC<ScrollSnapCarouselProps> = ({
  children,
  className = '',
  showArrows = true,
  showDots = true,
  autoplay = false,
  autoplayInterval = 5000,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    
    // Update current index based on scroll position
    const itemWidth = clientWidth;
    const newIndex = Math.round(scrollLeft / itemWidth);
    setCurrentIndex(newIndex);
  };

  const scrollTo = (index: number) => {
    if (!scrollRef.current) return;
    
    const itemWidth = scrollRef.current.clientWidth;
    scrollRef.current.scrollTo({
      left: index * itemWidth,
      behavior: 'smooth'
    });
  };

  const scrollLeft = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollTo(newIndex);
  };

  const scrollRight = () => {
    const newIndex = Math.min(children.length - 1, currentIndex + 1);
    scrollTo(newIndex);
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    scrollElement.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();

    return () => {
      scrollElement.removeEventListener('scroll', updateScrollState);
    };
  }, []);

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      const nextIndex = currentIndex === children.length - 1 ? 0 : currentIndex + 1;
      scrollTo(nextIndex);
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, currentIndex, children.length]);

  return (
    <div className={`relative ${className}`}>
      {/* Carousel container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="flex-none w-full snap-start"
          >
            {child}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {showArrows && children.length > 1 && (
        <>
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white backdrop-blur-sm transition-all duration-200 ${
              canScrollLeft 
                ? 'hover:bg-black/70 opacity-100' 
                : 'opacity-50 cursor-not-allowed'
            }`}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white backdrop-blur-sm transition-all duration-200 ${
              canScrollRight 
                ? 'hover:bg-black/70 opacity-100' 
                : 'opacity-50 cursor-not-allowed'
            }`}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Dots indicator */}
      {showDots && children.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ScrollSnapCarousel;