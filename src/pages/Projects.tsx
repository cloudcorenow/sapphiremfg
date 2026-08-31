import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, X, ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import LazyImage from '../components/LazyImage';
import { projects, getProjectsByCategory, getSpotlightProjects } from '../data/projects';

const categories = [
  { label: 'ALL PROJECTS', value: 'All' },
  { label: 'HOSPITALITY', value: 'Hospitality' },
  { label: 'CASINOS', value: 'Casino' },
  { label: 'ENTERTAINMENT/STADIUMS', value: 'Entertainment' },
  { label: 'COMMERCIAL', value: 'Commercial' },
];

function Projects() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState('');
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const navigate = useNavigate();
  const spotlightProjects = useMemo(() => getSpotlightProjects(), []);

  const nextSpotlight = useCallback(() => {
    if (spotlightProjects.length > 1) {
      setSpotlightIndex(prev => (prev + 1) % spotlightProjects.length);
    }
  }, [spotlightProjects.length]);

  const prevSpotlight = useCallback(() => {
    if (spotlightProjects.length > 1) {
      setSpotlightIndex(prev => (prev - 1 + spotlightProjects.length) % spotlightProjects.length);
    }
  }, [spotlightProjects.length]);

  useEffect(() => {
    if (spotlightProjects.length <= 1) return;
    const timer = setInterval(nextSpotlight, 6000);
    return () => clearInterval(timer);
  }, [nextSpotlight, spotlightProjects.length]);

  useEffect(() => {
    const category = searchParams.get('category') || 'All';
    setSelectedCategory(category);
  }, [searchParams]);

  const filteredProjects = useMemo(() => {
    let filtered = getProjectsByCategory(selectedCategory);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-black">
      <SEOHead
        title="Project Installations - Custom Lighting Solutions"
        description="Explore our portfolio of custom lighting installations for hospitality, gaming, and commercial properties worldwide. View our featured projects and case studies."
      />
      {/* Project Spotlight Section */}
      {spotlightProjects.length > 0 && (
        <section className="pt-20 pb-0">
          <div className="px-4 sm:px-6 lg:px-8 xl:px-10">
            <div className="max-w-[90rem] mx-auto pt-6 sm:pt-8">
              <div className="flex items-center gap-2.5 mb-4 sm:mb-6">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#C4A14D]" />
                <span className="text-[#C4A14D] text-sm sm:text-base md:text-lg uppercase tracking-[0.2em] font-medium">Project Spotlight</span>
                <div className="flex-1 h-px bg-[#C4A14D]/20 ml-2"></div>
              </div>
            </div>
          </div>

          <div className="relative">
            {(() => {
              const featured = spotlightProjects[spotlightIndex];
              const previewImages = featured.additionalImages?.slice(0, 3) || [];
              return (
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[420px] sm:min-h-[520px] lg:min-h-[600px] xl:min-h-[660px]">
                  {/* Left: Info Panel */}
                  <div className="relative flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-20 py-10 sm:py-12 lg:py-16 bg-gradient-to-br from-[#111] via-[#0d0d0d] to-black order-2 lg:order-1">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(196,161,77,0.04)_0%,_transparent_60%)]"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <span className="inline-block px-2.5 py-0.5 bg-[#C4A14D]/10 border border-[#C4A14D]/25 text-[#C4A14D] text-[10px] sm:text-xs uppercase tracking-widest rounded-sm">
                          {featured.category}
                        </span>
                        {featured.location && (
                          <span className="text-gray-500 text-[10px] sm:text-xs">{featured.location}</span>
                        )}
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-white uppercase tracking-wide leading-tight mb-3 sm:mb-4">
                        {featured.title}
                      </h2>
                      <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 max-w-lg line-clamp-3">
                        {featured.fullDescription || featured.description}
                      </p>
                      <button
                        onClick={() => navigate(`/project/${featured.id}`)}
                        className="group/btn inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#C4A14D] text-black text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-[#d4b15d] transition-all duration-300"
                      >
                        View Project
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </button>

                      {/* Preview Thumbnails */}
                      {previewImages.length > 0 && (
                        <div className="flex gap-2 mt-6 sm:mt-8">
                          {previewImages.map((img, i) => (
                            <button
                              key={i}
                              onClick={() => navigate(`/project/${featured.id}`)}
                              className="w-16 h-16 sm:w-20 sm:h-20 overflow-hidden border border-white/10 hover:border-[#C4A14D]/50 transition-colors duration-300"
                            >
                              <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                            </button>
                          ))}
                          {(featured.additionalImages?.length || 0) > 3 && (
                            <button
                              onClick={() => navigate(`/project/${featured.id}`)}
                              className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center border border-white/10 hover:border-[#C4A14D]/50 transition-colors duration-300 bg-white/5"
                            >
                              <span className="text-gray-400 text-xs sm:text-sm font-light">+{(featured.additionalImages?.length || 0) - 3}</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Hero Image */}
                  <div
                    className="relative overflow-hidden cursor-pointer order-1 lg:order-2 min-h-[300px] sm:min-h-[380px] lg:min-h-[600px] xl:min-h-[660px]"
                    onClick={() => navigate(`/project/${featured.id}`)}
                  >
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-black/30 lg:via-transparent lg:to-transparent"></div>
                  </div>
                </div>
              );
            })()}

            {/* Navigation Controls */}
            {spotlightProjects.length > 1 && (
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:right-6 flex lg:flex-col gap-2 z-10">
                <button
                  onClick={prevSpotlight}
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-black/60 backdrop-blur-sm border border-white/10 text-white hover:bg-[#C4A14D] hover:border-[#C4A14D] hover:text-black transition-all duration-300"
                  aria-label="Previous spotlight project"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSpotlight}
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-black/60 backdrop-blur-sm border border-white/10 text-white hover:bg-[#C4A14D] hover:border-[#C4A14D] hover:text-black transition-all duration-300"
                  aria-label="Next spotlight project"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Dot Indicators */}
            {spotlightProjects.length > 1 && (
              <div className="flex justify-center gap-2 py-4 bg-black">
                {spotlightProjects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSpotlightIndex(i)}
                    className={`h-0.5 rounded-full transition-all duration-500 ${
                      i === spotlightIndex
                        ? 'w-8 bg-[#C4A14D]'
                        : 'w-4 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to spotlight project ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <div className={`px-4 sm:px-6 lg:px-8 xl:px-10 ${spotlightProjects.length > 0 ? 'pt-8 sm:pt-10' : 'pt-20'} pb-0`}>
        <div className="max-w-[90rem] mx-auto p-5 sm:p-6 lg:p-8 mb-0">
          <div className="text-center">
            <p className="text-[#C4A14D] text-sm sm:text-base uppercase tracking-widest mb-1.5 sm:mb-2">PROJECTS</p>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-light mb-2 sm:mb-2.5 text-white leading-tight uppercase">FEATURED INSTALLATIONS</h1>
            <p className="text-gray-400 text-base sm:text-lg lg:text-xl leading-relaxed max-w-7xl mx-auto mb-3 sm:mb-4">
              Explore our latest installations—custom lighting for casinos, hotels, restaurants, and large-scale interiors—designed to inspire your next project.
            </p>

            {/* Search Bar */}
            <div className="relative mb-2.5 sm:mb-3 max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-500 w-3.5 h-3.5" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-8 py-1.5 sm:py-2 bg-black border border-[#C4A14D]/20 rounded-none focus:outline-none focus:ring-1 focus:ring-[#C4A14D]/50 focus:border-[#C4A14D]/50 text-xs text-gray-400 placeholder-gray-600"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-0.5"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center mb-2.5 sm:mb-3">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-colors ${
                    selectedCategory === category.value
                      ? 'bg-[#C4A14D] text-black'
                      : 'bg-transparent text-gray-400 border border-[#C4A14D]/30 hover:border-[#C4A14D]/60 hover:text-white'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Horizontal Divider Line */}
            <div className="w-full h-px bg-[#C4A14D]/30 my-2 sm:my-2.5"></div>

            {/* Results Count */}
            <div>
              <p className="text-gray-400 text-[11px] sm:text-xs">
                {searchQuery ? (
                  <>Showing {filteredProjects.length} result{filteredProjects.length !== 1 ? 's' : ''} for "{searchQuery}"</>
                ) : (
                  <>Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}</>
                )}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* No Results Message */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12 px-4">
          <div className="text-gray-600 mb-4">
            <Search className="w-16 h-16 mx-auto mb-4" />
          </div>
          <h3 className="text-xl font-light text-white mb-2">No projects found</h3>
          <p className="text-gray-400 mb-4">
            {searchQuery ? (
              <>Try adjusting your search terms or browse all projects</>
            ) : (
              <>No projects match the selected category</>
            )}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="px-6 py-2 bg-white text-black rounded-lg hover:bg-white/90 transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>
      )}

      {/* Projects Grid */}
      {filteredProjects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group cursor-pointer"
              onClick={() => navigate(`/project/${project.id}`)}
            >
              <div className="aspect-[16/10] w-full overflow-hidden">
                <LazyImage
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="bg-black px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                <h3 className="text-white text-base sm:text-lg lg:text-xl font-light mb-1 uppercase tracking-wide">{project.title}</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  {project.location && (
                    <p className="text-gray-400 text-xs sm:text-sm">{project.location}</p>
                  )}
                  {project.location && (
                    <span className="text-[#C4A14D]/40 text-xs">|</span>
                  )}
                  <span className="text-[#C4A14D] text-[10px] sm:text-xs uppercase tracking-widest">{project.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Call to Action Section */}
      <div className="px-4 sm:px-6 lg:px-12 xl:px-16 mt-12 sm:mt-16 lg:mt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-16 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-3 sm:mb-4 uppercase">
              READY TO TRANSFORM YOUR SPACE?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto">
              Let's collaborate on your next custom lighting installation. We bring your vision to life with precision engineering and stunning design.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/contact')}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-medium hover:bg-white/90 transition-all duration-300 hover:scale-105 sm:min-w-[220px] uppercase tracking-wide rounded-lg text-sm sm:text-base"
              >
                START YOUR PROJECT
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/10 text-white font-medium border-2 border-white hover:bg-white/20 transition-all duration-300 hover:scale-105 sm:min-w-[220px] uppercase tracking-wide rounded-lg text-sm sm:text-base"
              >
                CONTACT US
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;