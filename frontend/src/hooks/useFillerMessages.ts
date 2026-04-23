import { useState, useEffect } from 'react';

const FILLER_MESSAGES = [
  "Processing...",
  "Asking Gurek...",
  "Reading memory...",
  "Searching knowledge base...",
  "Crafting response..."
];

export function useFillerMessages(isActive: boolean) {
  const [currentFiller, setCurrentFiller] = useState(FILLER_MESSAGES[0]);

  useEffect(() => {
    if (!isActive) {
      setCurrentFiller(FILLER_MESSAGES[0]);
      return;
    }

    let currentIndex = 0;
    setCurrentFiller(FILLER_MESSAGES[0]);

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % FILLER_MESSAGES.length;
      setCurrentFiller(FILLER_MESSAGES[currentIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, [isActive]);

  return { currentFiller };
}
