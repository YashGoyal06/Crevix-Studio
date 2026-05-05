import { Helmet } from 'react-helmet-async';

export default function Meta({ title, description, image, url }) {
  const siteName = 'Crevix Studio | Digital Design Agency';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = 'Crevix Studio is a premium digital design agency specializing in high-end websites, SaaS dashboards, and branding. We craft elite digital identities for modern businesses.';
  const defaultImage = '/og-image.png'; // Make sure this exists later
  const siteUrl = 'https://crevix-studio.in'; // Correct domain

  const fullUrl = url || siteUrl;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Crevix Studio",
    "image": "https://crevix-studio.in/og-image.png",
    "@id": "https://crevix-studio.in",
    "url": "https://crevix-studio.in",
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
