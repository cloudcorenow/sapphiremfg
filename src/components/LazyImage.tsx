import React, { useState, useRef, useEffect } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  srcSet?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  fetchpriority?: 'high' | 'low' | 'auto';
  fallbackSrc?: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
  responsive?: boolean;
}

// Helper function to generate responsive srcSet
const generateResponsiveSrcSet = (baseSrc: string): string => {
  // Extract the base URL and file extension
  const lastDotIndex = baseSrc.lastIndexOf('.');
  const baseUrl = baseSrc.substring(0, lastDotIndex);
  const extension = baseSrc.substring(lastDotIndex);
  
  // Generate different sizes - you can customize these breakpoints
  const sizes = [400, 600, 800, 1200];
  
  return sizes
    .map(size => `${baseUrl}-${size}w${extension} ${size}w`)
    .join(', ') + `, ${baseSrc} 1600w`;
};

// Helper function to generate responsive sizes attribute
const generateResponsiveSizes = (): string => {
  return '(max-width: 640px) 400px, (max-width: 768px) 600px, (max-width: 1024px) 800px, 1200px';
};

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  srcSet,
  sizes,
  loading = 'lazy',
  decoding = 'async',
  fetchpriority = 'auto',
  fallbackSrc,
  className = '',
  onLoad,
  onError,
  responsive = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(loading === 'eager');
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setIsLoaded(loading === 'eager');
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
    } else {
      setHasError(true);
    }
    onError?.();
  };

  const combinedClassName = `
    ${loading === 'lazy' ? 'transition-opacity duration-300' : ''}
    ${loading === 'lazy' ? (isLoaded ? 'opacity-100' : 'opacity-0') : 'opacity-100'}
    ${hasError ? 'bg-gray-200' : ''}
    ${className}
  `.trim();

  // Use responsive srcSet if enabled and no custom srcSet provided
  const finalSrcSet = responsive && !srcSet ? generateResponsiveSrcSet(currentSrc) : srcSet;
  const finalSizes = responsive && !sizes ? generateResponsiveSizes() : sizes;

  if (hasError && !fallbackSrc) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        {...props}
      >
        <span className="text-gray-500 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={currentSrc}
      alt={alt}
      srcSet={finalSrcSet}
      sizes={finalSizes}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchpriority}
      className={combinedClassName}
      onLoad={handleLoad}
      onError={handleError}
      {...props}
    />
  );
};

export default LazyImage;