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

5. Configure separate environments for [Project Name]:

Environments:
1. Development (local)
2. Staging (pre-production)
3. Production

Environment Variables:
- Separate .env files
- .env.development
- .env.staging
- .env.production

Backend:
- Different database URLs
- Different API keys
- Different CORS origins
- Different log levels

Frontend:
- Different API URLs
- Different analytics IDs
- Different feature flags

Deployment:
- Use environment variables in hosting platform
- Never commit production secrets
- Use CI/CD to inject env vars

6. Dockerize [Project Name]:

Benefits:
- Consistent environments
- Easy deployment
- Scalability

7. Deploy backend to production for [Project Name]:

Platform Options:
1. Railway (easiest)
2. Render
3. Fly.io
4. AWS (advanced)
5. DigitalOcean

Railway Deployment:
1. Connect GitHub repo
2. Add environment variables
3. Deploy automatically
4. Get deployment URL

Requirements:
- package.json with start script
- Environment variables configured
- Database connection URL
- PORT from environment

Post-Deployment:
- Test all API endpoints
- Monitor logs
- Set up alerts
- Configure custom domain (optional)

Scaling:
- Auto-scaling configuration
- Load balancing
- Health checks

8. Deploy frontend to production for [Project Name]:

Vercel Deployment (Recommended):
1. Import GitHub repo
2. Configure build settings:
   - Framework: Next.js/React
   - Build command: npm run build
   - Output directory: dist or .next
3. Add environment variables
4. Deploy

Environment Variables:
- VITE_API_URL (backend URL)
- Next: NEXT_PUBLIC_API_URL

Post-Deployment:
- Test all pages
- Check API connectivity
- Test authentication flow
- Verify production API URL

Custom Domain:
- Add domain in Vercel
- Configure DNS records
- Enable HTTPS (automatic)
- Redirect www to non-www (or vice versa)

Performance:
- Enable Vercel Analytics
- Configure caching
- Optimize images

9. Set up monitoring for [Project Name]:

Application Monitoring:
- Install Sentry for error tracking
- Track exceptions and errors
- User impact metrics
- Performance monitoring

Backend Logging:
- Structured logging (Winston/Pino)
- Log levels: error, warn, info, debug
- Log important events
- Don't log sensitive data

Frontend Monitoring:
- Error boundaries
- Track JavaScript errors
- Performance metrics (Web Vitals)

Alerts:
- Email/Slack on critical errors
- Database connection failures
- API errors above threshold
- Server resource alerts

Metrics to Track:
- Response times
- Error rates
- User activity
- Database query performance

10. Ensure accessibility for [Project Name]:

ARIA Labels:
```tsx
<button aria-label="Close modal" onClick={close}>
  <X />
</button>

<input
  type="text"
  aria-label="Search items"
  aria-describedby="search-help"
/>
<span id="search-help">Enter at least 2 characters</span>
```

Keyboard Navigation:
- Tab through all interactive elements
- Enter to activate buttons
- Escape to close modals
- Arrow keys for navigation

Focus Management:
- Visible focus indicators
- Trap focus in modals
- Return focus after modal closes
- Skip to main content link

Screen Readers:
- Semantic HTML (header, nav, main, footer)
- alt text for images
- Descriptive link text
- ARIA live regions for dynamic content

Color Contrast:
- Minimum 4.5:1 for normal text
- Minimum 3:1 for large text
- Don't rely on color alone

Testing:
- Test with keyboard only
- Use screen reader (NVDA/JAWS)
- Automated tools (axe DevTools)

11. Add multi-language support to [Project Name]:

Install i18next:
```bash
npm install i18next react-i18next
```

Setup:
```tsx
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome",
        login: "Login",
        signup: "Sign Up"
      }
    },
    es: {
      translation: {
        welcome: "Bienvenido",
        login: "Iniciar sesión",
        signup: "Registrarse"
      }
    }
  },
  lng: 'en',
  fallbackLng: 'en'
});
```

Usage:
```tsx
import { useTranslation } from 'react-i18next';

function Component() {
  const { t, i18n } = useTranslation();
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button onClick={() => i18n.changeLanguage('es')}>
        Español
      </button>
    </div>
  );
}
```

Features:
- Language selector
- Save preference
- Date/number formatting
- RTL support (Arabic, Hebrew)
- Dynamic content translation

12. 