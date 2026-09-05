import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from 'lucide-react';

interface HorizontalCarouselProps {
  children: React.ReactNode[];
  itemsPerView?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  autoSlide?: boolean;
  autoSlideInterval?: number; // ms (recommended 4000ms for readable card content)
  ariaLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
  className?: string;
}

export const HorizontalCarousel: React.FC<HorizontalCarouselProps> = ({
  children,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
  autoSlide = true,
  autoSlideInterval = 4000,
  ariaLabel = 'Carousel',
  prevLabel = 'Previous items',
  nextLabel = 'Next items',
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoSlideEnabled, setIsAutoSlideEnabled] = useState(autoSlide);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDeltaPx, setDragDeltaPx] = useState<number>(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerDownRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);
  const hasDraggedRef = useRef(false);

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

  // Handler when user triggers manual navigation -> turn auto-scroll off
  const handleManualSlide = useCallback((action: () => void) => {
    setIsAutoSlideEnabled(false);
    action();
  }, []);

  // Check reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Single active Auto-slide effect (Smooth 4s interval, stops when manual mode active)
  useEffect(() => {
    if (!isAutoSlideEnabled || isDragging || prefersReducedMotion || maxIndex <= 0) {
      return;
    }

    const timer = setInterval(() => {
      nextSlide();
    }, autoSlideInterval);

    return () => clearInterval(timer);
  }, [isAutoSlideEnabled, autoSlideInterval, isDragging, nextSlide, prefersReducedMotion, maxIndex]);

  // Keyboard navigation -> turns auto-scroll off
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handleManualSlide(prevSlide);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleManualSlide(nextSlide);
    }
  };

  // Pointer Handlers: DO NOT capture pointer on pointerDown so button clicks work normally on desktop
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    pointerDownRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartYRef.current = e.clientY;
    hasDraggedRef.current = false;
    setDragDeltaPx(0);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerDownRef.current) return;

    const deltaX = e.clientX - dragStartXRef.current;
    const deltaY = e.clientY - dragStartYRef.current;

    // Only initiate drag mode if horizontal movement exceeds 6px (distinguishes drag from click)
    if (!hasDraggedRef.current) {
      if (Math.abs(deltaX) > 6 && Math.abs(deltaX) > Math.abs(deltaY)) {
        hasDraggedRef.current = true;
        setIsDragging(true);
        // Manual drag turns off auto-scroll
        setIsAutoSlideEnabled(false);
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          // Ignored
        }
      }
    }

    if (hasDraggedRef.current) {
      setDragDeltaPx(deltaX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerDownRef.current) return;

    if (hasDraggedRef.current) {
      try {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch {
        // Ignored
      }

      const threshold = 40; // min swipe distance in px to change slide
      if (dragDeltaPx > threshold) {
        prevSlide();
      } else if (dragDeltaPx < -threshold) {
        nextSlide();
      }

      setIsDragging(false);
      setDragDeltaPx(0);
    }

    pointerDownRef.current = false;
  };

  // Prevent accidental click triggering on child buttons if user performed a drag gesture
  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.stopPropagation();
      e.preventDefault();
      hasDraggedRef.current = false;
    }
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
    >
      {/* Control Header & Indicators */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Telemetry Index Badge */}
        <div className="font-mono text-xs text-hud-muted flex flex-wrap items-center gap-2 select-none">
          <span className="w-1.5 h-1.5 bg-hud-green rounded-full animate-pulse" />
          <span className="text-hud-slate">MODULES:</span>
          <span className="text-hud-green font-bold">
            {String(currentIndex + 1).padStart(2, '0')} - {String(Math.min(currentIndex + visibleCount, totalItems)).padStart(2, '0')}
          </span>
          <span className="text-hud-slate">OF {String(totalItems).padStart(2, '0')}</span>

          {/* Mode Indicator */}
          {isAutoSlideEnabled && maxIndex > 0 ? (
            <span className="text-[10px] px-2 py-0.5 bg-hud-green/10 border border-hud-green/40 text-hud-green rounded-xs font-mono">
              AUTO-TELEMETRY (4.0s)
            </span>
          ) : (
            <span className="text-[10px] px-2 py-0.5 bg-hud-panel border border-hud-border text-hud-slate rounded-xs font-mono">
              MANUAL NAVIGATION
            </span>
          )}
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-2">
          {/* Toggle Auto-Slide / Resume Button */}
          {maxIndex > 0 && (
            <button
              type="button"
              onClick={() => setIsAutoSlideEnabled(!isAutoSlideEnabled)}
              className={`px-2 py-1.5 border rounded-sm font-mono text-xs flex items-center gap-1.5 transition-all ${
                isAutoSlideEnabled
                  ? 'bg-hud-panel border-hud-green/50 text-hud-green hover:bg-hud-card'
                  : 'bg-hud-panel border-hud-border text-hud-slate hover:text-hud-green hover:border-hud-green'
              }`}
              title={isAutoSlideEnabled ? 'Pause auto-scroll' : 'Resume auto-scroll (4s interval)'}
              aria-label={isAutoSlideEnabled ? 'Pause auto-scroll' : 'Resume auto-scroll'}
            >
              {isAutoSlideEnabled ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-hud-green" />
                  <span className="text-[10px] uppercase hidden sm:inline">PAUSE</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-hud-green" />
                  <span className="text-[10px] uppercase hidden sm:inline">RESUME AUTO</span>
                </>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={() => handleManualSlide(prevSlide)}
            disabled={currentIndex === 0 && isAutoSlideEnabled}
            aria-label={prevLabel}
            className="p-2 bg-hud-panel border border-hud-border hover:border-hud-green text-hud-slate hover:text-hud-green hover:bg-hud-card active:scale-95 rounded-sm transition-all flex items-center justify-center cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => handleManualSlide(nextSlide)}
            disabled={currentIndex >= maxIndex && isAutoSlideEnabled}
            aria-label={nextLabel}
            className="p-2 bg-hud-panel border border-hud-border hover:border-hud-green text-hud-slate hover:text-hud-green hover:bg-hud-card active:scale-95 rounded-sm transition-all flex items-center justify-center cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Viewport Container: Allows clicks to pass to children, activates drag only on intentional move */}
      <div
        className={`w-full overflow-hidden rounded-sm ${
          isDragging ? 'cursor-grabbing select-none' : 'cursor-default'
        }`}
        style={{ touchAction: 'pan-y' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClickCapture={handleClickCapture}
      >
        <div
          className="flex"
          style={{
            transform: isDragging
              ? `translateX(calc(-${offsetPercent}% + ${dragDeltaPx}px))`
              : `translateX(-${offsetPercent}%)`,
            transition: isDragging || prefersReducedMotion
              ? 'none'
              : 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
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
              onClick={() => handleManualSlide(() => setCurrentIndex(dotIdx))}
              className={`h-1.5 transition-all duration-300 rounded-xs cursor-pointer ${
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


