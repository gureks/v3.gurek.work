import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  ogImage?: string;
  canonicalPath?: string;
  noIndex?: boolean;
}

const SITE_NAME = 'Gurek Singh Portfolio';
const BASE_URL = 'https://gurek.work';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;
const DEFAULT_DESCRIPTION =
  'Gurek Singh — Product Generalist, UX Systems Designer, and AI-Native Builder with 5+ years across Product Strategy, AI Feature Development, and Design Systems.';

/**
 * useSEO — updates document head meta tags dynamically per route.
 * Vite doesn't have built-in head management like Next.js, so we
 * use direct DOM manipulation — perfectly fine for a SPA.
 */
export function useSEO({
  title,
  description = DEFAULT_DESCRIPTION,
  ogImage = DEFAULT_OG_IMAGE,
  canonicalPath = '/',
  noIndex = false,
}: SEOProps = {}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Product Generalist & AI-Native Builder`;
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;

  useEffect(() => {
    // Title
    document.title = fullTitle;

    // Meta helpers
    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = href;
    };

    // Description
    setMeta('description', description);
    setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    // Open Graph
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:url', canonicalUrl, true);

    // Twitter
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);

    // Canonical
    setLink('canonical', canonicalUrl);
  }, [fullTitle, description, ogImage, canonicalUrl, noIndex]);
}
