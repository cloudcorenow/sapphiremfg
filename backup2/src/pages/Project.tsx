import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { getProjectById, getAdjacentProjects } from '../data/projects';

function Project() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [imageAspectRatios, setImageAspectRatios] = useState<Record<string, number>>({});
  const lightboxRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(true);

  const closeLightbox = () => {
    setSelectedImage(null);
    // Reset any browser zoom that may have occurred inside the lightbox
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
  };

  // Keyboard navigation for lightbox
  useKeyboardNavigation({
    isOpen: !!selectedImage,
    onClose: closeLightbox,
    containerRef: lightboxRef
  });

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleImageLoad = (src: string, event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.target as HTMLImageElement;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    setImageAspectRatios(prev => ({ ...prev, [src]: aspectRatio }));
    setLoadedImages(prev => new Set(prev).add(src));
  };

  const handleImageClick = (img: string, index: number) => {
    setSelectedImage(img);
    setCurrentImageIndex(index);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!project) return;
    const allImages = [project.image, ...(project.additionalImages || [])];
    const newIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(allImages[newIndex]);
    
    // Announce to screen readers
    const announcement = `Image ${newIndex + 1} of ${allImages.length}: ${project.title}`;
    const ariaLive = document.createElement('div');
    ariaLive.setAttribute('aria-live', 'polite');
    ariaLive.setAttribute('aria-atomic', 'true');
    ariaLive.className = 'sr-only';
    ariaLive.textContent = announcement;
    document.body.appendChild(ariaLive);
    setTimeout(() => document.body.removeChild(ariaLive), 1000);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!project) return;
    const allImages = [project.image, ...(project.additionalImages || [])];
    const newIndex = (currentImageIndex + 1) % allImages.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(allImages[newIndex]);
    
    // Announce to screen readers
    const announcement = `Image ${newIndex + 1} of ${allImages.length}: ${project.title}`;
    const ariaLive = document.createElement('div');
    ariaLive.setAttribute('aria-live', 'polite');
    ariaLive.setAttribute('aria-atomic', 'true');
    ariaLive.className = 'sr-only';
    ariaLive.textContent = announcement;
    document.body.appendChild(ariaLive);
    setTimeout(() => document.body.removeChild(ariaLive), 1000);
  };

  const project = id ? getProjectById(id) : undefined;
  const adjacent = id ? getAdjacentProjects(id) : { prev: null, next: null };

  if (!project) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <SEOHead title="Project Not Found" />
        <div className="max-w-7xl mx-auto px-4 py-20">
          <h1 className="text-3xl font-light mb-6">Project Not Found</h1>
          <Link to="/projects" className="text-amber-500 hover:text-amber-600">
            Return to Projects
          </Link>
        </div>
      </div>
    );
  }

  const allImages = [project.image, ...(project.additionalImages || [])];

  // Project structured data
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.fullDescription || project.description,
    "image": project.image,
    "creator": {
      "@type": "Organization",
      "name": "Sapphire Manufacturing"
    },
    "genre": project.category,
    "workExample": {
      "@type": "VisualArtwork",
      "name": project.title,
      "image": project.image,
      "description": project.description
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <SEOHead
        title={project.title}
        description={project.fullDescription || project.description}
        image={project.image}
        type="article"
        structuredData={projectSchema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-20">
        <Link to="/projects" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 sm:mb-8 text-sm sm:text-base">
          <ArrowLeft className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
          Back to Projects
        </Link>

        <div className="mb-6 sm:mb-8">
          <span className="text-xs sm:text-sm font-medium text-gray-500">{project.category}</span>
          <h1 className="text-2xl sm:text-3xl font-light mt-2 mb-3 sm:mb-4">{project.title}</h1>
          <p className="text-gray-600 text-sm sm:text-base">{project.fullDescription}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
          {allImages.map((img, index) => (
            <div
              key={index}
              className="aspect-[3/4] overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => handleImageClick(img, index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleImageClick(img, index);
                }
              }}
              aria-label={`View image ${index + 1} of ${allImages.length}: ${project.title}`}
            >
              <div className="relative w-full h-full">
                <div 
                  className={`absolute inset-0 bg-gray-200 animate-pulse ${
                    loadedImages.has(img) ? 'hidden' : ''
                  }`}
                />
                <img
                  src={img}
                  alt={`${project.title} - Image ${index + 1}`}
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    selectedImage === img ? 'scale-105' : ''
                  } ${loadedImages.has(img) ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={(e) => handleImageLoad(img, e)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Project Navigation */}
        <div className="mt-16 pt-10 border-t border-gray-200">
          <div className="flex items-center justify-between gap-6">
            {adjacent.prev ? (
              <Link
                to={`/project/${adjacent.prev.id}`}
                className="group flex items-center gap-4 min-w-0 flex-1"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-gray-300 group-hover:border-gray-900 group-hover:bg-gray-900 flex items-center justify-center transition-colors duration-200">
                  <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-200" />
                </div>
                <div className="min-w-0 hidden sm:block">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Previous</p>
                  <p className="text-base font-medium text-gray-800 group-hover:text-gray-900 truncate leading-tight">{adjacent.prev.title}</p>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            <Link
              to="/projects"
              className="flex-shrink-0 px-7 py-3 text-sm uppercase tracking-widest text-gray-500 hover:text-gray-900 border-2 border-gray-300 hover:border-gray-900 rounded-full transition-colors duration-200"
            >
              All Projects
            </Link>

            {adjacent.next ? (
              <Link
                to={`/project/${adjacent.next.id}`}
                className="group flex items-center gap-4 min-w-0 flex-1 justify-end"
              >
                <div className="min-w-0 hidden sm:block text-right">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Next</p>
                  <p className="text-base font-medium text-gray-800 group-hover:text-gray-900 truncate leading-tight">{adjacent.next.title}</p>
                </div>
                <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-gray-300 group-hover:border-gray-900 group-hover:bg-gray-900 flex items-center justify-center transition-colors duration-200">
                  <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-200" />
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            ref={lightboxRef}
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={() => closeLightbox()}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            {/* Blurred background */}
            <div 
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              style={{
                backgroundImage: `url(${selectedImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(20px) brightness(0.3)',
                transform: 'scale(1.1)',
              }}
            />

            {/* Navigation buttons */}
            <button
              onClick={handlePrevImage}
              className="fixed left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full backdrop-blur-sm transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            <button
              onClick={handleNextImage}
              className="fixed right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full backdrop-blur-sm transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Close button */}
            <button
              onClick={() => closeLightbox()}
              className="fixed top-2 sm:top-4 right-2 sm:right-4 z-20 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full backdrop-blur-sm transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Image counter */}
            <div className="fixed bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-20 bg-black/50 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full backdrop-blur-sm text-xs sm:text-sm">
              <span className="sr-only">Image </span>
              {currentImageIndex + 1} of {allImages.length}
            </div>

            {/* Main image */}
            <div 
              className="relative z-10 max-h-[90vh] max-w-[90vw]"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Project;