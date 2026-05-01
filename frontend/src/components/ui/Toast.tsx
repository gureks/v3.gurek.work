import { useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';

/**
 * Toast — ephemeral notification component for redirect-only messages.
 * 
 * Fixed at top-right, auto-dismisses after 4 seconds.
 * Uses project design tokens for theming (--background-tooltip, --foreground, --radius-lg).
 * Slides in from the right with a smooth animation.
 */
export function Toast() {
  const { toast, dismissToast } = useAppStore();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(dismissToast, 4000);
    return () => clearTimeout(timer);
  }, [toast?.id, dismissToast]);

  if (!toast) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 50,
        maxWidth: '360px',
        padding: '12px 16px',
        borderRadius: 'var(--radius-lg)',
        backgroundColor: 'var(--background-tooltip)',
        color: 'var(--foreground)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        fontSize: '14px',
        lineHeight: '20px',
        animation: 'toastSlideIn 300ms ease-out',
      }}
    >
      <p style={{ margin: 0 }}>{toast.message}</p>
    </div>
  );
}
