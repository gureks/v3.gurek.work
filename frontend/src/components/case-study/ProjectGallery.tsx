import React from 'react';

interface GalleryItem {
  imageUrl: string;
  caption: string;
  description?: string;
}

interface ProjectGalleryProps {
  items: GalleryItem[];
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ items }) => {
  return (
    <div className="flex flex-row overflow-x-auto gap-[var(--space-2)] pb-2 scrollbar-hide w-full max-w-full">
      {items.map((item, index) => (
        <div 
          key={index} 
          className="bg-[var(--background-tooltip)] border border-[var(--border)] flex flex-col gap-[var(--space-2)] p-[var(--space-2)] rounded-[var(--radius-lg)] shrink-0 max-w-[400px] w-[300px] sm:w-[400px]"
        >
          <div className="w-full relative rounded-[var(--radius-sm)] overflow-hidden shrink-0" style={{ aspectRatio: '1280/768' }}>
            <img src={item.imageUrl} alt={item.caption} className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-1 w-full px-1 pb-1">
            <p className="text-[14px] leading-[20px] font-bold text-[var(--foreground)] m-0">
              {item.caption}
            </p>
            {item.description && (
              <p className="text-[14px] leading-[20px] text-[var(--foreground-muted)] m-0 whitespace-pre-wrap">
                {item.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectGallery;
