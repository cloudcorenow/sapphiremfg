import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Menu, X, ArrowRight, ChevronDown, Lightbulb, Factory, Cog, Wrench, Facebook, Instagram, Linkedin, Pencil, Scissors, Palette, Box, Shapes, SprayCan as Spray, Package, FileImage, Flame, Settings, FlaskRound as Flask, Glasses, PaintBucket, TestTube } from 'lucide-react';
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

  const services = [
    {
      title: 'Design Development',
      description: 'We make your vision and design concept become a reality.',
      icon: Pencil
    },
    {
      title: 'Metal Fabrication',
      description: 'The art of shaping and forming wrought iron or sheet metal to your design specifications.',
      icon: Factory
    },
    {
      title: 'Waterjet & Laser Cutting',
      description: 'Our state of the art machinery is able to cut all metal, resin, glass, stone, acrylic and wood to any shape and form to achieve the most challenging designs.',
      icon: Scissors
    },
    {
      title: 'Custom Shades',
      description: 'Select from any one of our fabrics or specify your own and we will custom make your shade to your size requirements.',
      icon: Box
    },
    {
      title: 'Acrylic Forming',
      description: 'Flat sheet vacuum formed into many different curves and shapes to achieve your design.',
      icon: Shapes
    },
    {
      title: 'Sandblasting',
      description: 'Our metal parts are sand blasted to ensure proper adhesion of paint or powder coat finishes.',
      icon: Spray
    },
    {
      title: 'Painting & Powder Coating',
      description: 'Durable custom and standard paint/powder coat options available to withstand harsh environments.',
      icon: Palette
    },
    {
      title: 'Packing',
      description: 'Properly packing product in crates and pallets with special care to prevent potential damage during transport.',
      icon: Package
    },
    {
      title: 'CAD Drawings',
      description: 'Detailed engineered 3-D shop drawings, renderings, support point information, lamp specifications and installation instructions allow for an efficient and safe install.',
      icon: FileImage
    },
    {
      title: 'Welding',
      description: 'Our experienced welders master the art of joining metal together to provide you with a safe and quality product.',
      icon: Flame
    },
    {
      title: 'Machining',
      description: 'CNC lathe and milling capabilities give us the advantage of doing custom billets to enhance the uniqueness of our product with quality and precision.',
      icon: Settings
    },
    {
      title: 'Resin Casting',
      description: 'Custom molds for cylinders, panels, boxes, abstract shapes and sizes, smooth, pillowed or textured finish options available.',
      icon: Flask
    },
    {
      title: 'Glass Slumping',
      description: 'Our in house oven enables us to form glass in many different curves, shapes and sizes to meet your design intent and project schedule.',
      icon: Glasses
    },
    {
      title: 'Custom Finishes',
      description: 'Solid colors, mixed colors, texture, gold & silver leaf, chrome, nickel, brass and bronze. Pick any one of our standards, customize our standards to your needs or we can match control samples.',
      icon: PaintBucket
    },
    {
      title: 'UL Testing',
      description: 'Sapphire Manufacturing Inc is a certified UL shop meeting all codes for dry, damp and wet label testing and labeling.',
      icon: TestTube
    }
  ];

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
        <section id="products" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-light text-center mb-4 text-black">Our Services</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              We offer comprehensive manufacturing solutions with state-of-the-art equipment and expert craftsmanship.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div 
                    key={index}
                    className="service-card"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="icon-wrapper">
                      <IconComponent className="icon w-5 h-5" />
                    </div>
                    <h3 className="text-base font-medium mb-2">{service.title}</h3>
                    <p className="text-xs leading-relaxed">{service.description}</p>
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