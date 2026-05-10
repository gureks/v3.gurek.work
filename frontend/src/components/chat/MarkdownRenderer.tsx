import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// NOTE: rehype-raw is intentionally NOT used here.
// Allowing raw HTML in LLM-generated markdown is an XSS vector.
// All content is pre-sanitized via DOMPurify in security.ts before reaching
// this renderer. If raw HTML support is ever needed, gate it with a
// strict allowlist via rehype-sanitize, not rehype-raw.
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownRendererProps {
  content: string;
}

/** Validates that a href is safe before rendering as a link. */
function isSafeHref(href: string | undefined): boolean {
  if (!href) return false;
  // Allow only http, https, mailto — block javascript:, data:, vbscript:
  return /^(https?:|mailto:)/.test(href);
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      // No rehype-raw — prevents XSS from LLM-injected HTML
      components={{
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          const isInline = !match;
          return isInline ? (
            <code
              className="bg-background-elevated text-foreground px-[6px] py-[2px] rounded-sm text-[13px]"
              {...props}
            >
              {children}
            </code>
          ) : (
            <SyntaxHighlighter
              style={vscDarkPlus}
              language={match[1]}
              PreTag="div"
              customStyle={{
                backgroundColor: 'var(--color-neutral-950)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
                padding: '16px',
                fontSize: '13px',
                lineHeight: '20px',
                margin: '8px 0',
              }}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          );
        },
        blockquote({ children }) {
          return (
            <blockquote className="border-l-2 border-border pl-4 italic text-foreground-muted my-2">
              {children}
            </blockquote>
          );
        },
        table({ children }) {
          return (
            <div className="overflow-x-auto my-2">
              <table className="min-w-full border-collapse border border-border text-[14px]">
                {children}
              </table>
            </div>
          );
        },
        th({ children }) {
          return (
            <th className="border border-border bg-background-elevated px-3 py-2 text-left font-semibold text-[14px]">
              {children}
            </th>
          );
        },
        td({ children }) {
          return (
            <td className="border border-border px-3 py-2 text-[14px]">
              {children}
            </td>
          );
        },
        p({ children }) {
          return <p className="mb-2 last:mb-0">{children}</p>;
        },
        ul({ children }) {
          return <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>;
        },
        ol({ children }) {
          return <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>;
        },
        h1({ children }) {
          return <h1 className="text-[24px] font-semibold leading-[32px] mb-3">{children}</h1>;
        },
        h2({ children }) {
          return <h2 className="text-[20px] font-semibold leading-[28px] mb-2">{children}</h2>;
        },
        h3({ children }) {
          return <h3 className="text-[16px] font-semibold leading-[24px] mb-2">{children}</h3>;
        },
        a({ href, children }) {
          // Security: only render safe hrefs, and always force noopener noreferrer
          if (!isSafeHref(href)) {
            // Render as plain text if href is unsafe
            return <span className="text-accent">{children}</span>;
          }
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              {children}
            </a>
          );
        },
        // Block raw HTML elements from rendering (img could be used for tracking pixels)
        img({ alt }) {
          // Images from LLM responses are blocked — render alt text only
          return <span className="text-foreground-muted italic">[image: {alt}]</span>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
