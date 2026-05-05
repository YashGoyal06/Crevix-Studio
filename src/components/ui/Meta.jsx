import { Helmet } from 'react-helmet-async';

export default function Meta({ title, description, image, url }) {
  const siteName = 'Crevix Studio';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = 'Handcrafted digital experiences for elite brands. We build premium websites, SaaS dashboards, and authentic digital identities.';
  const defaultImage = '/og-image.png'; // Make sure this exists later
  const siteUrl = 'https://crevix.studio'; // Replace with real URL if different

  const fullUrl = url || siteUrl;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Crevix Studio",
    "image": "https://crevix.studio/og-image.png",
    "@id": "https://crevix.studio",
    "url": "https://crevix.studio",
    "telephone": "",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "",
      "addressLocality": "",
      "postalCode": "",
      "addressCountry": "IN"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.linkedin.com/company/crevix-studio",
      "https://twitter.com/crevixstudio"
    ]
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />
      <meta property="twitter:image" content={image || defaultImage} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>

      {/* Mobile Meta */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#080808" />
    </Helmet>
  );
}
