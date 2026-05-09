import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useChatStore } from '../store/useChatStore';
import { ChatPage } from './ChatPage';
import { epaperSequence } from './projects/EpaperProject';

export const ProjectPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const location = useLocation();
  const { setActiveSession } = useChatStore();

  useEffect(() => {
    setActiveSession(location.pathname);
  }, [location.pathname, setActiveSession]);

  let initialSequence = undefined;
  let templatedComponent = null;

  if (name === 'epaper') {
    initialSequence = epaperSequence;
  } else {
    templatedComponent = (
      <div className="bg-background-elevated-alt p-6 rounded-lg border border-border-subtle mt-2 text-center">
        <h2 className="text-xl font-semibold mb-2">Project: {name}</h2>
        <p className="text-foreground-muted mb-4">Detailed interactive case study and gallery for this project will be rendered here.</p>
      </div>
    );
  }

  return (
    <ChatPage 
      templatedComponent={templatedComponent}
      initialSequence={initialSequence}
      introMessage={!initialSequence ? `Here is the deep-dive case study for ${name}.` : undefined}
    />
  );
};

export default ProjectPage;
