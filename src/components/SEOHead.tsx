import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  structuredData?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Sapphire Manufacturing - Custom Lighting & Metal Fabrication',
  description = 'Sapphire Manufacturing specializes in custom lighting and metal fabrication solutions for hospitality, gaming, and commercial properties worldwide.',
  image = 'https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/img/projects/Casinos/Bossier/1-IMG_1965+copy+2+(1)_compressed.webp',
  url = 'https://sapphiremfg.com',
  type = 'website',
  structuredData
}) => {
  const fullTitle = title.includes('Sapphire Manufacturing') ? title : `${title} | Sapphire Manufacturing`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Sapphire Manufacturing" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;