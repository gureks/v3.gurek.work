import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useChatStore } from '../store/useChatStore';
import { EpaperProject } from './projects/EpaperProject';

export const ProjectPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const location = useLocation();
  const { setActiveSession } = useChatStore();

  useEffect(() => {
    setActiveSession(location.pathname);
  }, [location.pathname, setActiveSession]);

  if (name === 'epaper') {
    return <EpaperProject />;
  }

  return (
    <div className="w-full h-full flex flex-col bg-background">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Project Not Found</h1>
          <p className="text-foreground-muted">
            The project "{name}" is either coming soon or does not exist.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
