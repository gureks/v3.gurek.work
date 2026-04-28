export const getSystemContext = (pathname: string): string => {
  const routesContext = `
Available UI pages/routes you can redirect the user to:
- /projects (Project Gallery)
- /about (Resume / About)

If the user explicitly asks to view projects, a gallery, or their resume, DO NOT just answer with text.
Instead, reply ONLY with exactly this format:
[REDIRECT:/projects] or [REDIRECT:/about]
`;

  switch (pathname) {
    case '/projects':
      return `<system_context>You are currently on the projects page. The user is asking for information about their projects.</system_context>\n${routesContext}`;
    case '/about':
      return `<system_context>You are currently on the about page. The user is asking for information about the application or its creator.</system_context>\n${routesContext}`;
    default:
      return routesContext;
  }
};
