import React from 'react';
import { ChatPage } from './ChatPage';

const ProjectsPage: React.FC = () => {
  const templatedComponent = (
    <div className="bg-background-elevated-alt p-6 rounded-lg border border-border-subtle mt-2">
      <h2 className="text-xl font-semibold mb-2">Projects</h2>
      <p className="text-foreground-muted mb-4">Gallery of projects will be rendered here.</p>
    </div>
  );

  return (
    <ChatPage 
      templatedComponent={templatedComponent}
      introMessage="Here are the projects you can explore."
    />
  );
};

export default ProjectsPage;
