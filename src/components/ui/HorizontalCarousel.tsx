import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface HorizontalCarouselProps {
  children: React.ReactNode[];
  itemsPerView?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  autoSlide?: boolean;
  autoSlideInterval?: number; // ms
  ariaLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
  className?: string;
}

export const HorizontalCarousel: React.FC<HorizontalCarouselProps> = ({
  children,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
  autoSlide = false,
  autoSlideInterval = 7000,
  ariaLabel = 'Carousel',
  prevLabel = 'Previous items',
  nextLabel = 'Next items',
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchDelta, setTouchDelta] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalItems = React.Children.count(children);

  // Determine current visible items count based on window width
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setVisibleCount(itemsPerView.mobile || 1);
      } else if (width < 1024) {
        setVisibleCount(itemsPerView.tablet || 2);
      } else {
        setVisibleCount(itemsPerView.desktop || 3);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, [itemsPerView]);

  const maxIndex = Math.max(0, totalItems - visibleCount);

  // Clamp current index on resize
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Check reduced motion
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Auto slide effect
  useEffect(() => {
    if (!autoSlide || isPaused || prefersReducedMotion || maxIndex <= 0) return;

    const timer = setInterval(() => {
      nextSlide();
    }, autoSlideInterval);

    return () => clearInterval(timer);
  }, [autoSlide, autoSlideInterval, isPaused, nextSlide, prefersReducedMotion, maxIndex]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    }
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchDelta(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentTouch = e.targetTouches[0].clientX;
    setTouchDelta(currentTouch - touchStart);
  };

  const handleTouchEnd = () => {
    if (touchStart === null) return;
    const threshold = 40; // min swipe distance in px
    if (touchDelta > threshold) {
      prevSlide();
    } else if (touchDelta < -threshold) {
      nextSlide();
    }
    setTouchStart(null);
    setTouchDelta(0);
  };

  // Pointer/Mouse drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    setIsDragging(true);
    setTouchStart(e.clientX);
    setTouchDelta(0);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || touchStart === null) return;
    setTouchDelta(e.clientX - touchStart);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    const threshold = 40;
    if (touchDelta > threshold) {
      prevSlide();
    } else if (touchDelta < -threshold) {
      nextSlide();
    }
    setIsDragging(false);
    setTouchStart(null);
    setTouchDelta(0);
  };

  if (totalItems === 0) return null;

  // Width of each item in percentage
  const itemWidthPercent = 100 / visibleCount;
  // Offset percentage
  const offsetPercent = currentIndex * itemWidthPercent;

  return (
    <div
      ref={containerRef}
      className={`relative w-full space-y-4 focus:outline-none ${className}`}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        if (isDragging) setIsDragging(false);
      }}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Control Header & Indicators */}
      <div className="flex items-center justify-between gap-4">
        {/* Telemetry Index Badge */}
        <div className="font-mono text-xs text-hud-muted flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-hud-green rounded-full animate-pulse" />
          <span className="text-hud-slate">MODULES:</span>
          <span className="text-hud-green font-bold">
            {String(currentIndex + 1).padStart(2, '0')} - {String(Math.min(currentIndex + visibleCount, totalItems)).padStart(2, '0')}
          </span>
          <span className="text-hud-slate">OF {String(totalItems).padStart(2, '0')}</span>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-2">
          {autoSlide && (
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="p-1.5 bg-hud-panel border border-hud-border hover:border-hud-green text-hud-slate hover:text-hud-green rounded-sm transition-colors"
              title={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
              aria-label={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          )}

          <button
            type="button"
            onClick={prevSlide}
            disabled={currentIndex === 0 && !autoSlide}
            aria-label={prevLabel}
            className={`p-2 bg-hud-panel border rounded-sm transition-all flex items-center justify-center ${
              currentIndex === 0 && !autoSlide
                ? 'border-hud-border/40 text-hud-muted/40 cursor-not-allowed'
                : 'border-hud-border hover:border-hud-green text-hud-slate hover:text-hud-green hover:bg-hud-card active:scale-95'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex && !autoSlide}
            aria-label={nextLabel}
            className={`p-2 bg-hud-panel border rounded-sm transition-all flex items-center justify-center ${
              currentIndex >= maxIndex && !autoSlide
                ? 'border-hud-border/40 text-hud-muted/40 cursor-not-allowed'
                : 'border-hud-border hover:border-hud-green text-hud-slate hover:text-hud-green hover:bg-hud-card active:scale-95'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Viewport Container */}
      <div
        className={`w-full overflow-hidden rounded-sm select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${offsetPercent}%)`,
            transitionProperty: prefersReducedMotion ? 'none' : 'transform'
          }}
        >
          {React.Children.map(children, (child, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-2 sm:px-3 box-border"
              style={{ width: `${itemWidthPercent}%` }}
              aria-hidden={index < currentIndex || index >= currentIndex + visibleCount}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Progress Dots / Bars */}
      {maxIndex > 0 && (
        <div className="flex items-center justify-center gap-1.5 pt-2" role="tablist">
          {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              role="tab"
              aria-selected={currentIndex === dotIdx}
              aria-label={`Go to slide ${dotIdx + 1}`}
              onClick={() => setCurrentIndex(dotIdx)}
              className={`h-1.5 transition-all duration-300 rounded-xs ${
                currentIndex === dotIdx
                  ? 'w-6 bg-hud-green shadow-[0_0_8px_rgba(0,255,102,0.6)]'
                  : 'w-2 bg-hud-border hover:bg-hud-slate'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
