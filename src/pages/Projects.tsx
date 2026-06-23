import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import LazyImage from '../components/LazyImage';
import { projects, getProjectsByCategory } from '../data/projects';

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
  const navigate = useNavigate();

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
      <div className="px-4 sm:px-6 lg:px-8 xl:px-10 pt-20 pb-0">
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