import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useChatStore } from '../store/useChatStore';
import { ChatPage } from './ChatPage';

export const ProjectPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const location = useLocation();
  const { setActiveSession } = useChatStore();

  useEffect(() => {
    setActiveSession(location.pathname);
  }, [location.pathname, setActiveSession]);

  const templatedComponent = (
    <div className="bg-background-elevated-alt p-6 rounded-lg border border-border-subtle mt-2">
      <h2 className="text-xl font-semibold mb-2">Project: {name}</h2>
      <p className="text-foreground-muted mb-4">Detailed interactive case study and gallery for this project will be rendered here.</p>
      {/* Future gallery integration goes here */}
    </div>
  );

  return (
    <ChatPage 
      templatedComponent={templatedComponent}
      introMessage={`Here is the deep-dive case study for ${name}.`}
    />
  );
};

export default ProjectPage;
