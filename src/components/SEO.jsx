import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Hajjo Dollars Wealth Solutions';
const BASE_URL  = 'https://hajjodollars.com';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;
const TWITTER_HANDLE = '@hajjodollars';

/**
 * SEO component — drop into any page to set per-page meta tags.
 *
 * Props:
 *   title       — page title (appended with site name)
 *   description — page description (max ~160 chars for best results)
 *   path        — URL path e.g. "/about" (used for canonical + og:url)
 *   image       — optional custom OG image URL
 *   type        — og:type, defaults to "website"
 */
export default function SEO({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
}) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} | CPA Marketing Training in Nigeria`;

  const canonical = `${BASE_URL}${path}`;

  return (
    <Helmet>
      {/* ── Primary ── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* ── Open Graph ── */}
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url"         content={canonical} />
      <meta property="og:image"       content={image} />
      <meta property="og:type"        content={type} />
      <meta property="og:site_name"   content={SITE_NAME} />

      {/* ── Twitter / X ── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content={TWITTER_HANDLE} />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />
    </Helmet>
  );
}
