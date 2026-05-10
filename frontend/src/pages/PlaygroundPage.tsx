import React from 'react';
import { DraggableContainer, GridBody, GridItem } from '../components/ui/infinite-drag-scroll';

const MOCK_IMAGES = [
  { id: 1, src: "https://images.unsplash.com/photo-1512692723619-8b3e68365c9c?q=80&w=1974&auto=format&fit=crop" },
  { id: 2, src: "https://images.unsplash.com/photo-1491884662610-dfcd28f30cfb?q=80&w=1974&auto=format&fit=crop" },
  { id: 3, src: "https://images.unsplash.com/photo-1536901766856-5d45744cd180?q=80&w=1974&auto=format&fit=crop" },
  { id: 4, src: "https://images.unsplash.com/photo-1505069446780-4ef442b5207f?q=80&w=1974&auto=format&fit=crop" },
  { id: 5, src: "https://images.unsplash.com/photo-1554797589-7241bb691973?q=80&w=1974&auto=format&fit=crop" },
  { id: 6, src: "https://images.unsplash.com/photo-1596713109885-c94bdfd7f19d?q=80&w=1974&auto=format&fit=crop" },
  { id: 7, src: "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?q=80&w=1974&auto=format&fit=crop" },
  { id: 8, src: "https://images.unsplash.com/photo-1585028281328-54ec883cd7cf?q=80&w=1974&auto=format&fit=crop" },
];

export const PlaygroundPage: React.FC = () => {
  return (
    <div className="w-full h-full overflow-hidden absolute inset-0">
      <DraggableContainer variant="masonry" className="w-full h-full">
        <GridBody>
          {MOCK_IMAGES.map((image) => (
            <GridItem key={image.id} className="relative h-54 w-36 md:h-96 md:w-64">
              <img
                src={image.src}
                alt="Gallery"
                className="pointer-events-none absolute h-full w-full object-cover"
              />
            </GridItem>
          ))}
        </GridBody>
      </DraggableContainer>
    </div>
  );
};

export default PlaygroundPage;
