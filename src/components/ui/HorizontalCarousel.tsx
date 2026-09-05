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
  autoSlide = true,
  autoSlideInterval = 1200,
  ariaLabel = 'Carousel',
  prevLabel = 'Previous items',
  nextLabel = 'Next items',
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragDeltaPx, setDragDeltaPx] = useState<number>(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const interactionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Helper to temporarily pause autoplay when user interacts, then resume
  const triggerInteractionCooldown = useCallback((durationMs: number = 2500) => {
    setIsInteracting(true);
    if (interactionTimerRef.current) {
      clearTimeout(interactionTimerRef.current);
    }
    interactionTimerRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, durationMs);
  }, []);

  // Cleanup interaction timeout on unmount
  useEffect(() => {
    return () => {
      if (interactionTimerRef.current) {
        clearTimeout(interactionTimerRef.current);
      }
    };
  }, []);

  // Check reduced motion
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Single active Auto-slide effect
  useEffect(() => {
    if (!autoSlide || isPaused || isInteracting || isDragging || prefersReducedMotion || maxIndex <= 0) {
      return;
    }

    const timer = setInterval(() => {
      nextSlide();
    }, autoSlideInterval);

    return () => clearInterval(timer);
  }, [autoSlide, autoSlideInterval, isPaused, isInteracting, isDragging, nextSlide, prefersReducedMotion, maxIndex]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      triggerInteractionCooldown();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      triggerInteractionCooldown();
      nextSlide();
    }
  };

  // Unified Pointer handlers for Desktop Mouse Drag & Mobile Touch
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only respond to left mouse button or touch/pen pointers
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragDeltaPx(0);
    triggerInteractionCooldown(3000);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignored if pointer capture not supported
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || dragStartX === null) return;
    const delta = e.clientX - dragStartX;
    setDragDeltaPx(delta);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignored
    }

    const threshold = 40; // minimum swipe distance in px to change slide
    if (dragDeltaPx > threshold) {
      prevSlide();
    } else if (dragDeltaPx < -threshold) {
      nextSlide();
    }

    setIsDragging(false);
    setDragStartX(null);
    setDragDeltaPx(0);
    triggerInteractionCooldown(2000);
  };

  if (totalItems === 0) return null;

  // Width of each item in percentage
  const itemWidthPercent = 100 / visibleCount;
  // Base offset percentage
  const offsetPercent = currentIndex * itemWidthPercent;

  return (
    <div
      ref={containerRef}
      className={`relative w-full space-y-4 focus:outline-none ${className}`}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onFocus={() => triggerInteractionCooldown(4000)}
    >
      {/* Control Header & Indicators */}
      <div className="flex items-center justify-between gap-4">
        {/* Telemetry Index Badge */}
        <div className="font-mono text-xs text-hud-muted flex items-center gap-2 select-none">
          <span className="w-1.5 h-1.5 bg-hud-green rounded-full animate-pulse" />
          <span className="text-hud-slate">MODULES:</span>
          <span className="text-hud-green font-bold">
            {String(currentIndex + 1).padStart(2, '0')} - {String(Math.min(currentIndex + visibleCount, totalItems)).padStart(2, '0')}
          </span>
          <span className="text-hud-slate">OF {String(totalItems).padStart(2, '0')}</span>
          {autoSlide && maxIndex > 0 && !isPaused && (
            <span className="text-[10px] text-hud-green/80 font-mono hidden sm:inline">
              [AUTO-TELEMETRY ACTIVE]
            </span>
          )}
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-2">
          {autoSlide && (
            <button
              type="button"
              onClick={() => {
                setIsPaused(!isPaused);
                triggerInteractionCooldown(3000);
              }}
              className="p-1.5 bg-hud-panel border border-hud-border hover:border-hud-green text-hud-slate hover:text-hud-green rounded-sm transition-colors"
              title={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
              aria-label={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              triggerInteractionCooldown(3000);
              prevSlide();
            }}
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
            onClick={() => {
              triggerInteractionCooldown(3000);
              nextSlide();
            }}
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

      {/* Viewport Container with pan-y touch action & real-time drag feedback */}
      <div
        className={`w-full overflow-hidden rounded-sm select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ touchAction: 'pan-y' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className="flex"
          style={{
            transform: isDragging
              ? `translateX(calc(-${offsetPercent}% + ${dragDeltaPx}px))`
              : `translateX(-${offsetPercent}%)`,
            transition: isDragging || prefersReducedMotion
              ? 'none'
              : 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'transform'
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
        <div className="flex items-center justify-center gap-1.5 pt-2 select-none" role="tablist">
          {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              role="tab"
              aria-selected={currentIndex === dotIdx}
              aria-label={`Go to slide ${dotIdx + 1}`}
              onClick={() => {
                triggerInteractionCooldown(3000);
                setCurrentIndex(dotIdx);
              }}
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

