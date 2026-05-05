import { Helmet } from 'react-helmet-async';

export default function Meta({ title, description, image, url }) {
  const siteName = 'Crevix Studio';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = 'Handcrafted digital experiences for elite brands. We build premium websites, SaaS dashboards, and authentic digital identities.';
  const defaultImage = '/og-image.png'; // Make sure this exists later
  const siteUrl = 'https://crevix.studio'; // Replace with real URL if different

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || siteUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url || siteUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />
      <meta property="twitter:image" content={image || defaultImage} />

      {/* Mobile Meta */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#080808" />
    </Helmet>
  );
}
