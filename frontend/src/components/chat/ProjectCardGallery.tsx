import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export interface ProjectCard {
  id: string;
  images: string[];       // 1 or 2 images stacked (Figma shows some cards with 2 composited images)
  title: React.ReactNode; // supports mixed bold/regular spans
  slug?: string;          // for navigation to /project/:name
}

interface ProjectCardGalleryProps {
  cards: ProjectCard[];
  onCardClick?: (card: ProjectCard) => void;
}

/**
 * Horizontal_scrolling — Figma component (node 36:812, 74:1205)
 *
 * Layout from Figma:
 * - Outer: flex-col, overflow-x auto, overflow-y clip, p-16, rounded-8
 * - Inner wrapper: flex row, gap-24, items-start, w-full
 * - Each card: flex-1, flex-col, min-w-0
 *   - Image container: h-200px, rounded-8, relative
 *   - Title below: pt-8, 12px Inter, semibold title + regular subtitle, white, leading-16
 */
export function ProjectCardGallery({ cards, onCardClick }: ProjectCardGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener('scroll', checkScroll, { passive: true });
    return () => el?.removeEventListener('scroll', checkScroll);
  }, []);

  return (
    <div className="relative w-full group">
      {/* Scroll container — matches Figma Horizontal_scrolling wrapper */}
      <div
        ref={scrollRef}
        className="flex items-start gap-6 w-full overflow-x-auto overflow-y-clip scrollbar-hide"
        style={{
          padding: '16px',
          borderRadius: 'var(--radius-sm)',
          scrollSnapType: 'x mandatory',
        }}
      >
        {cards.map((card, idx) => (
          <motion.button
            key={card.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.4, ease: [0.18, 0.71, 0.11, 1] }}
            onClick={() => onCardClick?.(card)}
            className="flex flex-col items-start flex-1 min-w-[180px] cursor-pointer text-left group/card"
            style={{ scrollSnapAlign: 'start' }}
          >
            {/* Image — 200px height, rounded-8, relative stack */}
            <div
              className="relative w-full overflow-hidden"
              style={{
                height: '200px',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              {card.images.map((src, imgIdx) => (
                <img
                  key={imgIdx}
                  alt=""
                  src={src}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  style={{ borderRadius: 'var(--radius-sm)' }}
                />
              ))}
              {/* Hover overlay */}
              <div
                className="absolute inset-0 bg-black/0 group-hover/card:bg-black/20 transition-colors"
                style={{ borderRadius: 'var(--radius-sm)', transitionDuration: 'var(--duration-normal)' }}
              />
            </div>

            {/* Title — Figma: pt-8, 12px Inter, leading-16, white */}
            <div
              className="flex items-center w-full"
              style={{ paddingTop: '8px', gap: '2px' }}
            >
              <p
                className="flex-1 min-w-0"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  fontWeight: 600,
                  lineHeight: '16px',
                  letterSpacing: '0px',
                  color: 'var(--foreground)',
                }}
              >
                {card.title}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Left fade gradient */}
      {canScrollLeft && (
        <div
          className="absolute left-0 top-0 bottom-0 w-12 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, var(--background), transparent)',
            borderRadius: 'var(--radius-sm) 0 0 var(--radius-sm)',
          }}
        />
      )}

      {/* Right fade gradient */}
      {canScrollRight && (
        <div
          className="absolute right-0 top-0 bottom-0 w-12 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, var(--background), transparent)',
            borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
          }}
        />
      )}
    </div>
  );
}
