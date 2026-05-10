1. Optimize for mobile devices recursively all pages available in frontend :

Tailwind Responsive Classes. 

Mobile Considerations:
- Touch-friendly buttons (min 24x24px)
- Readable font sizes
- Adequate spacing
- Hamburger menu for navigation
- Swipe gestures
- Pull to refresh

Responsive Patterns:
- Stack columns on mobile
- Hide/show elements based on screen size
- Collapsible sections
- Responsive tables (horizontal scroll or stacked)

Testing:
- Test on multiple device sizes
- Chrome DevTools device emulation
- Real device testing


2. Optimize performance for entire frontend:

Frontend:
- Code splitting (lazy loading routes)
- Image optimization (next/image or lazy loading)
- Debounce search inputs
- Virtualize long lists (react-window)
- Memoize expensive calculations
- Remove unused dependencies

Backend:
- Database query optimization
  - Add indexes
  - Select only needed fields
  - Use lean() for read-only queries
- Cache frequently accessed data (Redis)
- Compress responses (gzip)
- Rate limiting
- Connection pooling

Bundle Size:
- Analyze bundle (webpack-bundle-analyzer)
- Remove unused code
- Use tree-shaking
- Lazy load heavy libraries

Caching:
- HTTP caching headers
- Browser caching (service workers)
- API response caching
- Static asset CDN

3. Implement SEO best practices recursively for all frontend pages:

Frontend (Next.js):
- Dynamic meta tags per page
- Open Graph tags
- Twitter Card tags
- Canonical URLs
- Sitemap.xml
- Robots.txt

Meta Tags:
```tsx
import Head from 'next/head';

function Page() {
  return (
    <>
      <Head>
        <title>Page Title | App Name</title>
        <meta name="description" content="Page description" />
        <meta property="og:title" content="Page Title" />
        <meta property="og:description" content="Description" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {/* Page content */}
    </>
  );
}
```

Best Practices:
- Unique title per page (50-60 chars)
- Descriptive meta descriptions (150-160 chars)
- Semantic HTML (h1, h2, etc.)
- Alt text for images
- Structured data (JSON-LD)

4. Enhance security for [Project Name]:

Backend:
- Helmet.js (security headers)
- CORS configuration
- Rate limiting (express-rate-limit)
- Input sanitization
- SQL injection prevention (use ORMs)
- XSS prevention
- CSRF tokens (if using cookies)
- Validate all inputs
- Escape outputs

Environment:
- Never commit .env files
- Use secrets management (production)
- Rotate API keys regularly
- Minimum privilege principle

Frontend:
- Sanitize user input before display
- HttpOnly cookies for tokens
- HTTPS only
- Content Security Policy
- Validate data from backend

Security Headers:
```typescript
app.use(helmet({
  contentSecurityPolicy: true,
  xssFilter: true,
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));
```

Testing:
- Penetration testing
- Security audit
- Dependency vulnerability scanning