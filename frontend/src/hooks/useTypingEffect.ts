import { useState, useEffect } from 'react';

export function useTypingEffect(text: string, speed: number = 30) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) {
      setDisplayedText('');
      setIsComplete(true);
      return;
    }

    setDisplayedText('');
    setIsComplete(false);

    // Split text into chunks (words + trailing whitespace)
    const chunks = text.match(/\S+\s*|\s+/g) || [];
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < chunks.length) {
        setDisplayedText(prev => prev + chunks[currentIndex]);
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayedText, isComplete };
}
