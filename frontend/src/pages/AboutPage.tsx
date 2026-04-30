import React from 'react';
import { ChatPage } from './ChatPage';

const AboutPage: React.FC = () => {
  const templatedComponent = (
    <div className="bg-background-elevated-alt p-6 rounded-lg border border-border-subtle mt-2">
      <h2 className="text-xl font-semibold mb-2">About Me</h2>
      <p className="text-foreground-muted mb-4">Detailed about section and professional history goes here.</p>
    </div>
  );

  return (
    <ChatPage 
      templatedComponent={templatedComponent}
      introMessage="Let me tell you a little bit about myself."
    />
  );
};

export default AboutPage;
