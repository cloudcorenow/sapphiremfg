import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import ScrollToTop from './components/layout/ScrollToTop';
import SEOHead from './components/SEOHead';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';
import { projects } from './data/projects';
import LazyImage from './components/LazyImage';

// Lazy load pages
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const Project = lazy(() => import('./pages/Project'));
const Projects = lazy(() => import('./pages/Projects'));
const Services = lazy(() => import('./pages/Services'));

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
  const [isMobileProjectsOpen, setIsMobileProjectsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const projectsDropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Keyboard navigation for mobile menu
  useKeyboardNavigation({
    isOpen: isMenuOpen,
    onClose: () => setIsMenuOpen(false),
    containerRef: mobileMenuRef
  });

  useEffect(() => {
    const scrolledRef = { current: scrolled };
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 50;
      if (shouldBeScrolled !== scrolledRef.current) {
        scrolledRef.current = shouldBeScrolled;
        window.requestAnimationFrame(() => {
          setScrolled(shouldBeScrolled);
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsProjectsDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (projectsDropdownRef.current && !projectsDropdownRef.current.contains(event.target as Node)) {
        setIsProjectsDropdownOpen(false);
      }
    };

    if (isProjectsDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProjectsDropdownOpen]);

  const handleCategoryNavigate = (category: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsProjectsDropdownOpen(false);
    setIsMenuOpen(false);
    setIsMobileProjectsOpen(false);
    navigate(`/projects?category=${category}`);
  };

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsProjectsDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsProjectsDropdownOpen(false);
    }, 300);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Organization structured data for homepage
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sapphire Manufacturing",
    "description": "Custom lighting and metal fabrication solutions for hospitality, gaming, and commercial properties worldwide.",
    "url": "https://sapphiremfg.com",
    "logo": "https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2022/10/03081705/sapp-logo-v2.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "505 Porter Way",
      "addressLocality": "Placentia",
      "addressRegion": "CA",
      "postalCode": "92870",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-714-879-3660",
      "contactType": "customer service",
      "email": "info@sapphiremfg.com"
    },
    "sameAs": [
      "https://www.linkedin.com/company/sapphirecmanufacturing/",
      "https://www.instagram.com/sapphiremanufacturing/",
      "https://www.facebook.com/sapphirecustomlighting/"
    ]
  };

  function HomePage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselSlides = [
      {
        image: 'https://imagedelivery.net/n_dCasaHuVE9kaaQfihmuA/128994df-73fb-4b32-50f8-1d2b949efd00/w=1600',
        name: "One Rangers Way",
        location: 'Arlington, TX'
      },
      {
        image: 'https://imagedelivery.net/n_dCasaHuVE9kaaQfihmuA/36bca15c-4986-4c8d-3921-2eaf494ce500/w=1600',
        name: 'Resorts World',
        location: 'Las Vegas, NV'
      },
      {
        image: 'https://imagedelivery.net/n_dCasaHuVE9kaaQfihmuA/b08adf7c-908d-46af-ba6d-e6a8afdef500/w=1600',
        name: 'Live! Casino & Hotel',
        location: 'Bossier City, LA'
      },
      {
        image: 'https://imagedelivery.net/n_dCasaHuVE9kaaQfihmuA/f43e24a1-bcae-4f90-ead3-b804a5be3400/w=1600',
        name: 'Live! Casino & Hotel',
        location: 'Bossier City, LA'
      },
      {
        image: 'https://imagedelivery.net/n_dCasaHuVE9kaaQfihmuA/136c1a28-ca31-44ca-bf7b-912774cfed00/w=1600',
        name: 'Live! Casino & Hotel',
        location: 'Bossier City, LA'
      },
      {
        image: 'https://imagedelivery.net/n_dCasaHuVE9kaaQfihmuA/28681d91-e37d-4fa7-d4d8-3101cbe0c700/w=1600',
        name: 'Live! Casino & Hotel',
        location: 'Bossier City, LA'
      },
      {
        image: 'https://imagedelivery.net/n_dCasaHuVE9kaaQfihmuA/110bd44e-5479-4907-93ab-0672eb9f4900/w=1600',
        name: 'Thunder Valley Casino & Resort',
        location: 'Lincoln, CA'
      },
      {
        image: 'https://imagedelivery.net/n_dCasaHuVE9kaaQfihmuA/10dde628-61ea-478d-4af5-53baada75800/w=1600',
        name: 'Wilshire Grand',
        location: 'Los Angeles, CA'
      },
      {
        image: 'https://imagedelivery.net/n_dCasaHuVE9kaaQfihmuA/c68d6485-6919-4657-a998-d4048173ee00/w=1600',
        name: 'Atmore Casino',
        location: 'Atmore, AL'
      },
      {
        image: 'https://imagedelivery.net/n_dCasaHuVE9kaaQfihmuA/d7193e75-59cf-4470-7ac7-9ec8acdf5400/w=1600',
        name: 'Live! Casino & Hotel',
        location: 'Bossier City, LA'
      },
    ];

    const totalSlides = carouselSlides.length;

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 3000);
      return () => clearInterval(interval);
    }, [totalSlides]);

    return (
      <>
        <SEOHead
          title="Sapphire Manufacturing - Custom Lighting & Metal Fabrication"
          description="Specializing in custom metal fabrication, precision machining, and assembly services for hospitality, gaming, and commercial properties worldwide."
          structuredData={organizationSchema}
        />
        {/* Hero Carousel Section */}
        <section className="relative h-screen overflow-hidden">
          {/* Carousel Images */}
          {carouselSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            </div>
          ))}

          {/* Hero Text - Only show on first slide */}
          <div className={`absolute inset-0 flex items-center justify-center pt-32 sm:pt-40 z-10 transition-opacity duration-1000 ${
            currentSlide === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            <div className="text-center px-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-4 tracking-wider uppercase" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}>
                LET US CUSTOMIZE YOUR LIGHTING
              </h1>
              <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white italic" style={{ fontFamily: 'Dancing Script, cursive', textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}>
                experience.
              </p>
            </div>
          </div>

          {/* Featured Project Slider - Bottom Right */}
          <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 z-20 flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides)}
              className="text-white hover:text-[#C4A14D] transition-colors p-2 bg-black/30 rounded-full backdrop-blur-sm"
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="text-white text-right min-w-[140px] sm:min-w-[200px]">
              <div className="text-[10px] sm:text-xs uppercase tracking-wider opacity-70 mb-0.5 sm:mb-1">FEATURED PROJECT</div>
              <div className="text-sm sm:text-lg font-medium line-clamp-1 uppercase">{carouselSlides[currentSlide].name}</div>
              <div className="text-xs sm:text-sm opacity-80 uppercase">{carouselSlides[currentSlide].location}</div>
            </div>

            <button
              onClick={() => setCurrentSlide((currentSlide + 1) % totalSlides)}
              className="text-white hover:text-[#C4A14D] transition-colors p-2 bg-black/30 rounded-full backdrop-blur-sm"
              aria-label="Next slide"
            >
              <svg className="w-5 h-5 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>

        {/* Client Logos Section */}
        <section className="py-8 sm:py-12 bg-black">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-center text-xl sm:text-3xl mb-4 sm:mb-6 text-white uppercase whitespace-nowrap" style={{ fontFamily: 'Urbanist, sans-serif' }}>Trusted by Hospitality's Leading Names to Deliver World-Class Lighting</h2>
              <div className="w-full h-1 bg-[#C4A14D]"></div>
            </div>
            <div className="group flex flex-wrap justify-center gap-3 sm:gap-4">
              {[
                'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09220321/img_logo1.png',
                'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09220334/img_logo5.png',
                'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09220337/img_logo6.png',
                'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09220341/img_logo7.png',
                'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09220344/img_logo8.png',
                'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09220348/img_logo9.png',
                'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09220400/img_logo13.png',
                'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09220403/img_logo14.png',
                'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09220406/img_logo15.png',
                'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09220410/img_logo16.png',
                'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09220413/img_logo17.png',
                'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09220417/img_logo18.png',
              ].map((logo, index) => (
                <div key={index} className="bg-black p-3 sm:p-6 rounded-md">
                  <LazyImage
                    src={logo}
                    alt={`Client logo ${index + 1}`}
                    className="max-h-16 sm:max-h-24 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      filter: 'brightness(0) saturate(100%) invert(71%) sepia(14%) saturate(1095%) hue-rotate(358deg) brightness(89%) contrast(86%)',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Full Width Image Section with CTA */}
        <section className="relative h-[60vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/12192957/IMG_4324-copy-2-scaled.jpg)',
            }}
          />
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative h-full flex items-center justify-center text-center px-4">
            <div className="max-w-4xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 tracking-wide">
                START YOUR PROJECT
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-8 uppercase tracking-wider">
                Get in touch to discuss your custom lighting needs
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/projects"
                  className="px-8 py-4 bg-[#C4A14D] text-white text-lg uppercase tracking-wide hover:bg-[#B39143] transition-all duration-300 border-2 border-[#C4A14D] min-w-[240px] rounded-lg"
                >
                  View Projects
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-transparent text-white text-lg uppercase tracking-wide hover:bg-white/10 transition-all duration-300 border-2 border-white min-w-[240px] rounded-lg"
                >
                  Start a Project
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      {/* Skip to content link for accessibility */}
      <a className="skip-link" href="#main-content">Skip to content</a>
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-sm shadow-lg' : location.pathname === '/' ? '' : 'bg-black/50 backdrop-blur-sm'}`}>
        <div className="w-full px-8">
          <div className="flex items-center justify-between h-20 sm:h-24 max-w-[1920px] mx-auto">
            <div className="flex-shrink-0">
              <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <div className="logo-with-gold">
                  <img
                    src="https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2022/10/03081705/sapp-logo-v2.png"
                    alt="Sapphire Manufacturing"
                    className="h-10 sm:h-14 w-auto"
                  />
                </div>
              </Link>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <Link
                to="/"
                className="text-white hover:text-gray-300 transition-colors text-[20px] uppercase tracking-wide"
              >
                Home
              </Link>
              <div
                className="relative"
                ref={projectsDropdownRef}
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <Link
                  to="/projects"
                  className="text-white hover:text-gray-300 transition-colors text-[20px] uppercase tracking-wide flex items-center gap-1"
                >
                  Projects
                  <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4" />
                </Link>
                {isProjectsDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 rounded-lg overflow-hidden">
                    <div className="flex items-center divide-x divide-white/10">
                      <button
                        onClick={() => handleCategoryNavigate('All')}
                        className="px-6 py-3 text-white hover:bg-white/10 transition-colors text-sm uppercase tracking-wide whitespace-nowrap"
                      >
                        All Projects
                      </button>
                      <button
                        onClick={() => handleCategoryNavigate('Hospitality')}
                        className="px-6 py-3 text-white hover:bg-white/10 transition-colors text-sm uppercase tracking-wide whitespace-nowrap"
                      >
                        Hospitality
                      </button>
                      <button
                        onClick={() => handleCategoryNavigate('Casino')}
                        className="px-6 py-3 text-white hover:bg-white/10 transition-colors text-sm uppercase tracking-wide whitespace-nowrap"
                      >
                        Casinos
                      </button>
                      <button
                        onClick={() => handleCategoryNavigate('Entertainment')}
                        className="px-6 py-3 text-white hover:bg-white/10 transition-colors text-sm uppercase tracking-wide whitespace-nowrap"
                      >
                        Entertainment/Stadiums
                      </button>
                      <button
                        onClick={() => handleCategoryNavigate('Commercial')}
                        className="px-6 py-3 text-white hover:bg-white/10 transition-colors text-sm uppercase tracking-wide whitespace-nowrap"
                      >
                        Commercial
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <Link
                to="/about"
                className="text-white hover:text-gray-300 transition-colors text-[20px] uppercase tracking-wide"
              >
                About
              </Link>
              <Link
                to="/services"
                className="text-white hover:text-gray-300 transition-colors text-[20px] uppercase tracking-wide"
              >
                Services
              </Link>
              <Link
                to="/contact"
                className="text-white hover:text-gray-300 transition-colors text-[20px] uppercase tracking-wide"
              >
                Contact
              </Link>
            </div>
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 bg-black md:hidden overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div className="pt-24 px-4">
            <Link to="/" className="block py-4 text-2xl font-light text-white uppercase tracking-wide">Home</Link>

            <div className="py-4">
              <button
                onClick={() => setIsMobileProjectsOpen(!isMobileProjectsOpen)}
                className="flex items-center justify-between w-full text-2xl font-light text-white uppercase tracking-wide"
              >
                Projects
                <ChevronDown className={`w-6 h-6 transition-transform ${isMobileProjectsOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMobileProjectsOpen && (
                <div className="mt-2 ml-4 space-y-2">
                  <button
                    onClick={() => handleCategoryNavigate('All')}
                    className="block w-full text-left py-2 text-lg text-gray-300 hover:text-white uppercase tracking-wide"
                  >
                    All Projects
                  </button>
                  <button
                    onClick={() => handleCategoryNavigate('Hospitality')}
                    className="block w-full text-left py-2 text-lg text-gray-300 hover:text-white uppercase tracking-wide"
                  >
                    Hospitality
                  </button>
                  <button
                    onClick={() => handleCategoryNavigate('Casino')}
                    className="block w-full text-left py-2 text-lg text-gray-300 hover:text-white uppercase tracking-wide"
                  >
                    Casinos
                  </button>
                  <button
                    onClick={() => handleCategoryNavigate('Entertainment')}
                    className="block w-full text-left py-2 text-lg text-gray-300 hover:text-white uppercase tracking-wide"
                  >
                    Entertainment/Stadiums
                  </button>
                  <button
                    onClick={() => handleCategoryNavigate('Commercial')}
                    className="block w-full text-left py-2 text-lg text-gray-300 hover:text-white uppercase tracking-wide"
                  >
                    Commercial
                  </button>
                </div>
              )}
            </div>

            <Link to="/about" className="block py-4 text-2xl font-light text-white uppercase tracking-wide">About</Link>
            <Link to="/services" className="block py-4 text-2xl font-light text-white uppercase tracking-wide">Services</Link>
            <Link to="/contact" className="block py-4 text-2xl font-light text-white uppercase tracking-wide">Contact</Link>
          </div>
        </div>
      )}

      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      }>
        <main id="main-content">
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/project/:id" element={<Project />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          </Routes>
        </main>
      </Suspense>

      {/* Footer */}
      {location.pathname !== '/contact' && (
        <footer className="bg-black text-white py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="logo-with-gold">
                  <img
                    src="https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2022/10/03081705/sapp-logo-v2.png"
                    alt="Sapphire Manufacturing"
                    className="h-14 w-auto mb-3"
                  />
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Custom Lighting & Precision Manufacturing
                </p>
              </div>
              <div>
                <h4 className="text-base font-semibold mb-3">Quick Links</h4>
                <div className="space-y-1.5">
                  <Link to="/projects" className="block text-sm text-gray-300 hover:text-white">Projects</Link>
                  <Link to="/services" className="block text-sm text-gray-300 hover:text-white">Services</Link>
                  <Link to="/about" className="block text-sm text-gray-300 hover:text-white">About</Link>
                  <Link to="/contact" className="block text-sm text-gray-300 hover:text-white">Contact</Link>
                </div>
              </div>
              <div>
                <h4 className="text-base font-semibold mb-3">Certifications</h4>
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center space-x-3">
                    <a
                      href="https://www.ul.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity"
                    >
                      <LazyImage
                        src="https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/img/Underwriters_Laboratories_logo.svg.png"
                        alt="UL Certified"
                        className="h-8 w-auto brightness-0 invert"
                      />
                    </a>
                    <span className="text-sm text-gray-300">UL Certified</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <a
                      href="https://www.scmsdc.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity"
                    >
                      <LazyImage
                        src="https://theriseprogram.elevatelyfe.com/wp-content/uploads/2020/09/SCMSDC-Logo-2.png"
                        alt="SCMSDC"
                        className="h-8 w-auto brightness-0 invert"
                      />
                    </a>
                    <span className="text-sm text-gray-300">SCMSDC</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-300 text-sm">
              <p>&copy; {new Date().getFullYear()} Sapphire Manufacturing. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;