import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Menu, X, ArrowRight, ChevronDown, Award, Lightbulb, Factory, Cog, Wrench, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ScrollToTop from './components/ScrollToTop';

// Lazy load pages
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const Project = lazy(() => import('./pages/Project'));
const Projects = lazy(() => import('./pages/Projects'));

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 50;
      if (shouldBeScrolled !== scrolled) {
        window.requestAnimationFrame(() => {
          setScrolled(shouldBeScrolled);
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (!isMounted.current) return;

    const playVideo = async () => {
      if (videoRef.current && videoRef.current.src && !videoRef.current.paused) {
        try {
          await videoRef.current.play();
        } catch (error) {
          console.error("Video autoplay failed:", error);
        }
      }
    };

    if (videoLoaded && location.pathname === '/') {
      playVideo();
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [videoLoaded, location.pathname]);

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

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    fade: true,
    arrows: false
  };

  const projects = [
    {
      id: 'margaritaville-resort-bossier-city',
      title: 'Margaritaville Resort Bossier City',
      description: 'Custom lighting installation for luxury resort',
      image: 'https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/img/projects/Casinos/Bossier/1-IMG_1965+copy+2+(1)_compressed.webp',
      category: 'Hospitality'
    },
    {
      id: 'peter-luger-steakhouse',
      title: 'Peter Luger Steakhouse',
      description: 'Custom lighting installation for iconic steakhouse',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/12/02000706/img_projects_peterlugersteakhouse2.jpg',
      category: 'Commercial'
    },
    {
      id: 'live-casino-hotel-philadelphia',
      title: 'Live! Casino Hotel Philadelphia',
      description: 'Custom lighting installation for luxury casino and hotel',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/10023747/img_projects_vertical_live2-1-1.jpg',
      category: 'Casino'
    },
    {
      id: 'caesars-palace-las-vegas',
      title: 'Caesars Palace Las Vegas',
      description: 'Custom lighting installation for iconic casino resort',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09180441/img_projects_cover_caesars1-1.jpg',
      category: 'Casino'
    },
    {
      id: 'four-winds-casino-resort',
      title: 'Four Winds Casino Resort in New Buffalo, MI',
      description: 'Custom lighting installation for luxury casino resort',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2023/06/01225031/img_projects_cover_fourwinds1.jpg',
      category: 'Casino'
    },
    {
      id: 'beauty-and-essex',
      title: 'Beauty And Essex',
      description: 'Custom lighting installation for luxury restaurant and lounge',
      image: 'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09202953/img_projects_cover_beauty1-1.jpg',
      category: 'Commercial'
    }
  ];

  const services = [
    {
      title: 'Custom Lighting Design',
      description: 'Bespoke lighting solutions tailored to your unique needs, from concept to creation.',
      icon: Lightbulb,
      capabilities: ['3D Modeling', 'Prototyping', 'Engineering Support']
    },
    {
      title: 'Metal Fabrication',
      description: 'Precision metal fabrication services, including laser cutting, forming, and welding.',
      icon: Factory,
      capabilities: ['Laser Cutting', 'CNC Punching', 'Welding']
    },
    {
      title: 'Precision Machining',
      description: 'High-quality CNC machining services for a variety of materials and applications.',
      icon: Cog,
      capabilities: ['CNC Milling', 'CNC Turning', 'Grinding']
    },
    {
      title: 'Assembly Services',
      description: 'Comprehensive assembly services, from simple components to complex electro-mechanical assemblies.',
      icon: Wrench,
      capabilities: ['Mechanical Assembly', 'Electrical Assembly', 'Testing']
    }
  ];

  function HomePage() {
    return (
      <>
        {/* Hero Section */}
        <section className="relative h-screen">
          <div className="absolute inset-0 bg-black">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onLoadedData={() => setVideoLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-1000 ${
                videoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                willChange: 'transform',
              }}
            >
              <source 
                src="https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/video/IMG_2493+(1)+(online-video-cutter.com).webm" 
                type="video/webm" 
              />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
          </div>
          <div className="relative h-full flex items-center justify-center text-center">
            <div className="max-w-3xl px-4">
              <h1 className="text-4xl md:text-6xl font-light text-white mb-6">
                Lighting That Defines Spaces: Sapphire's Tailored Solutions
              </h1>
              <p className="text-xl text-white mb-8">
                Specializing in custom metal fabrication, precision machining, and assembly services
              </p>
              <a
                href="#gallery"
                className="inline-flex items-center text-white border border-white px-8 py-3 hover:bg-white hover:text-black transition-colors"
              >
                Featured Projects <ArrowRight className="ml-2" />
              </a>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <ChevronDown className="text-white w-8 h-8 animate-bounce" />
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-light mb-4">Featured Project Installations</h2>
            <p className="text-gray-600 mb-12 max-w-2xl">
              Explore our portfolio of custom lighting installations, showcasing our expertise in creating stunning, bespoke lighting solutions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group relative overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/project/${project.id}`)}
                >
                  <div className="aspect-[4/5] w-full">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <p className="text-sm font-medium mb-2">{project.category}</p>
                      <h3 className="text-xl font-light mb-2">{project.title}</h3>
                      <p className="text-sm opacity-90">{project.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="products" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-light text-center mb-4">Our Services</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              We offer comprehensive manufacturing solutions with state-of-the-art equipment and expert craftsmanship.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div 
                    key={index} 
                    className="service-card bg-white p-8 rounded shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3 flex items-center justify-center">
                        <IconComponent className="w-16 h-16 text-gray-700" />
                      </div>
                      <div className="md:w-2/3">
                        <h3 className="text-2xl font-light mb-3">{service.title}</h3>
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{service.description}</p>
                        <div className="grid grid-cols-2 gap-2">
                          {service.capabilities.map((capability, capIndex) => (
                            <div key={capIndex} className="flex items-center text-sm text-gray-700">
                              <span className="mr-2 text-blue-600">•</span>
                              {capability}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-sm shadow-lg' : 'bg-black/30 backdrop-blur-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0">
              <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <img 
                  src="https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2022/10/03081705/sapp-logo-v2.png"
                  alt="Sapphire Manufacturing"
                  className="h-12 w-auto brightness-0 invert"
                />
              </Link>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link 
                to="/projects"
                className="text-white hover:text-gray-300 transition-colors"
              >
                Projects
              </Link>
              <a 
                href="#products" 
                onClick={(e) => handleNavClick(e, 'products')}
                className="text-white hover:text-gray-300 transition-colors"
              >
                Services
              </a>
              <Link 
                to="/about" 
                className="text-white hover:text-gray-300 transition-colors"
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-white hover:text-gray-300 transition-colors"
              >
                Contact
              </Link>
            </div>
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black md:hidden">
          <div className="pt-20 px-4">
            <Link to="/projects" className="block py-4 text-2xl font-light text-white">Projects</Link>
            <a 
              href="#products" 
              onClick={(e) => handleNavClick(e, 'products')}
              className="block py-4 text-2xl font-light text-white"
            >
              Services
            </a>
            <Link to="/about" className="block py-4 text-2xl font-light text-white">About</Link>
            <Link to="/contact" className="block py-4 text-2xl font-light text-white">Contact</Link>
          </div>
        </div>
      )}

      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/project/:id" element={<Project />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </Suspense>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <img 
                src="https://sapphiremfg.s3.us-west-2.amazonaws.com/site/wp-content/uploads/2022/10/03081705/sapp-logo-v2.png"
                alt="Sapphire Manufacturing"
                className="h-10 w-auto brightness-0 invert mb-3"
              />
              <p className="text-gray-300 text-sm mb-4">
                Precision metal manufacturing since 2008
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://www.linkedin.com/company/sapphirecmanufacturing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.instagram.com/sapphiremanufacturing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.facebook.com/sapphirecustomlighting/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-3">Quick Links</h4>
              <div className="space-y-1.5">
                <Link to="/projects" className="block text-sm text-gray-300 hover:text-white">Projects</Link>
                <a 
                  href="#products" 
                  onClick={(e) => handleNavClick(e, 'products')}
                  className="block text-sm text-gray-300 hover:text-white"
                >
                  Services
                </a>
                <Link to="/about" className="block text-sm text-gray-300 hover:text-white">About</Link>
                <Link to="/contact" className="block text-sm text-gray-300 hover:text-white">Contact</Link>
              </div>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-3">Certifications</h4>
              <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-3">
                  <img 
                    src="https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/img/Underwriters_Laboratories_logo.svg.png"
                    alt="UL Certified"
                    className="h-8 w-auto brightness-0 invert"
                  />
                  <span className="text-sm text-gray-300">UL Certified</span>
                </div>
                <div className="flex items-center space-x-3">
                  <img 
                    src="https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/img/clients_logo/nmsdclogo.png"
                    alt="NMSDC"
                    className="h-8 w-auto"
                  />
                  <span className="text-sm text-gray-300">NMSDC</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-300 text-sm">
            <p>&copy; {new Date().getFullYear()} Sapphire Manufacturing. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;