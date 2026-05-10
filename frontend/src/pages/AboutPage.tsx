import React from 'react';
import { ChatPage, ChatSequenceMessage } from './ChatPage';
import { useSEO } from '../hooks/useSEO';

const resumeSequence: ChatSequenceMessage[] = [
  { role: 'user', content: 'Can you help me with his resume?', delayMs: 400 },
  { role: 'assistant', content: "Hola! I'm Gurek - Product Generalist, UX Systems Designer\nand an AI-Native Builder.", delayMs: 800 },
  { role: 'assistant', content: "Versatile product thinker with 5+ years of experience across Product Strategy, AI-led Feature Development, UX Design, and qualitative product-led experience improvements.", delayMs: 800 },
  { role: 'assistant', content: "Currently focused on AI-driven personalised content systems, Vector DBs, RAGs, graph knowledge bases, and stock market UX.", delayMs: 800 },
  { role: 'assistant', content: "You may also", richContentType: 'resume', delayMs: 600 },
  { role: 'user', content: 'Tell me about your work experience?', delayMs: 1200 },
  { role: 'assistant', content: "Here's a quick overview of my experience:", richContentType: 'experience', delayMs: 800 },
  { role: 'user', content: 'What about your education?', delayMs: 1200 },
  { role: 'assistant', content: "I’ve studied at:", richContentType: 'education', delayMs: 800 },
  { role: 'user', content: 'What are the tools you work with?', delayMs: 1200 },
  { role: 'assistant', content: "This is my toolbox:", richContentType: 'tools', delayMs: 800 },
  { role: 'assistant', content: "Using it I can be a jack of all trades! ", richContentType: 'skills', delayMs: 600 },
  { role: 'user', content: 'Tell me more about you', delayMs: 1200 },
  { role: 'assistant', content: "Some notable achievements through my journey:", richContentType: 'leadership', delayMs: 800 },
  { role: 'user', content: 'Where can I reach you?', delayMs: 1200 },
  { role: 'assistant', content: "Let’s build experiences together!", richContentType: 'contact', delayMs: 800 },
  { role: 'assistant', content: "I’m open to collaborations, or consulting\nin Product, UX, or AI-first systems.", delayMs: 600 },
];

const AboutPage: React.FC = () => {
  useSEO({
    title: 'About — Resume',
    description: 'Learn about Gurek Singh\'s background, work experience, education, tools, and achievements. 5+ years in Product, UX, and AI.',
    canonicalPath: '/about',
  });
  return (
    <ChatPage 
      initialSequence={resumeSequence}
      introMessage="Hola! I'm Gurek - Product Generalist, UX Systems Designer\nand an AI-Native Builder."
    />
  );
};

export default AboutPage;
