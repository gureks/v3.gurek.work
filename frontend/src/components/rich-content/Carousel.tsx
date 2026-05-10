import React, { useState } from 'react';

interface CarouselImage {
  src: string;
  caption?: string;
}

/** Richer slide format used by project pages */
interface SlideItem {
  image: string;
  caption?: string;
  description?: string;
}

/** Accepts either the legacy asset-relative format {images, slug} or the direct-URL {slides} format */
type CarouselProps =
  | { images: CarouselImage[]; slug: string; slides?: never }
  | { slides: SlideItem[]; images?: never; slug?: never };

export const Carousel: React.FC<CarouselProps> = (props) => {
  const [current, setCurrent] = useState(0);

  // Normalize both prop shapes into a unified internal list
  const items: { imgUrl: string; caption?: string; description?: string }[] = props.slides
    ? props.slides.map((s) => ({ imgUrl: s.image, caption: s.caption, description: s.description }))
    : (props.images ?? []).map((img) => ({
        imgUrl: new URL(`../../../assets/projects/${props.slug}/${img.src}`, import.meta.url).href,
        caption: img.caption,
      }));

  if (items.length === 0) {
    return (
      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gradient-to-br from-[hsl(var(--muted))] to-[hsl(var(--card))] border border-[var(--border)] flex items-center justify-center text-center p-6">
        <span className="text-sm font-medium text-[hsl(var(--foreground-muted))] italic opacity-60">
          No screenshots available
        </span>
      </div>
    );
  }

  const currentItem = items[current];

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c + 1) % items.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c - 1 + items.length) % items.length);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-[var(--border)] group">
        <img
          src={currentItem.imgUrl}
          alt={currentItem.caption || 'Project screenshot'}
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {items.length > 1 && (
          <>
            {/* Slide counter */}
            <div className="absolute top-3 right-3 bg-black/60 px-2 py-1 rounded-md text-xs text-white/90 font-medium z-10 backdrop-blur-sm">
              {current + 1} / {items.length}
            </div>

            {/* Left Button */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all opacity-0 group-hover:opacity-100 z-10"
              aria-label="Previous slide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Right Button */}
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all opacity-0 group-hover:opacity-100 z-10"
              aria-label="Next slide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrent(idx); }}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === current ? 'w-4 bg-[hsl(var(--accent-brand))]' : 'w-1.5 bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {currentItem.caption && (
        <p className="text-xs text-center text-[hsl(var(--foreground-muted))] mt-1 px-4 italic">
          {currentItem.caption}
        </p>
      )}
      {currentItem.description && (
        <p className="text-xs text-center text-[hsl(var(--foreground-muted))] px-4 whitespace-pre-wrap">
          {currentItem.description}
        </p>
      )}
    </div>
  );
};
