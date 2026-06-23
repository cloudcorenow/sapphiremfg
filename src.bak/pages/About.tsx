import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function About() {
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const storyVideoRef = useRef<HTMLVideoElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const clientLogos = [
    'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09220321/img_logo1.png',
    'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09220325/img_logo2.png',
    'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09220328/img_logo3.png',
    'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09220331/img_logo4.png',
    'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09220334/img_logo5.png',
    'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09220337/img_logo6.png',
    'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09220341/img_logo7.png',
    'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09220344/img_logo8.png',
    'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09220348/img_logo9.png',
    'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09220351/img_logo10.png',
    'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09220354/img_logo11.png',
    'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09220357/img_logo12.png',
    'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09220400/img_logo13.png',
    'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09220403/img_logo14.png',
    'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09220406/img_logo15.png',
    'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09220410/img_logo16.png',
    'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09220413/img_logo17.png',
    'https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09220417/img_logo18.png'
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      parallaxRefs.current.forEach((ref, index) => {
        if (ref) {
          const offset = scrolled * (0.05 + index * 0.02);
          ref.style.setProperty('--parallax-offset', `-${offset}px`);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleVideoHover = (isHovering: boolean) => {
    if (!storyVideoRef.current) return;
    
    if (isHovering) {
      storyVideoRef.current.play().catch(err => console.error("Video play failed:", err));
    } else {
      storyVideoRef.current.pause();
      storyVideoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <video
          ref={heroVideoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source 
            src="https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/video/SAPPHIREMFG_CINEMATIC+(online-video-cutter.com)+(1).mp4" 
            type="video/mp4" 
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <h1 className="text-5xl md:text-7xl text-white font-light mb-6 leading-tight animate-fade-in">
              Precision <br />
              Through Innovation
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl animate-slide-in" style={{ animationDelay: '0.2s' }}>
              Since our founding, we've been at the forefront of precision manufacturing, 
              combining cutting-edge technology with masterful craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
            {[
              { number: '40+', label: 'Years Experience' },
              { number: '5000+', label: 'Projects Completed' },
              { number: '28k', label: 'Square Foot Facility' },
              { number: '24/7', label: 'Production Capacity' }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl font-light mb-2 animate-scale-up">{stat.number}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div 
              className="relative h-[600px] overflow-hidden rounded-lg shadow-2xl"
              ref={videoContainerRef}
              onMouseEnter={() => handleVideoHover(true)}
              onMouseLeave={() => handleVideoHover(false)}
            >
              <video
                ref={storyVideoRef}
                className="w-full h-full object-cover"
                muted
                playsInline
                loop
                preload="auto"
              >
                <source src="https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/video/webinar.webm" type="video/webm" />
              </video>
              <div className="absolute -bottom-4 -right-4 bg-black p-6 rounded-lg shadow-xl max-w-[240px] hidden lg:block">
                <img 
                  src="https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/img/Underwriters_Laboratories_logo.svg.png"
                  alt="UL Certified"
                  className="h-8 w-auto mb-3 brightness-0 invert"
                />
                <p className="text-gray-300 text-xs">
                  Our commitment to quality is reflected in our UL certification and rigorous quality control processes.
                </p>
              </div>
            </div>
            <div ref={el => parallaxRefs.current[3] = el}>
              <h2 className="text-4xl font-light mb-8">Our Story</h2>
              <div className="space-y-8 text-gray-600">
                <p className="text-xl">
                  Sapphire Manufacturing is a leading provider of precision metal fabrication 
                  and machining services. Our state-of-the-art facility in Placentia, California, 
                  combines cutting-edge technology with expert craftsmanship.
                </p>
                <p>
                  Since our founding, we have been committed to excellence in manufacturing, 
                  providing our customers with the highest quality products and services. Our team 
                  of skilled engineers and technicians works closely with clients to ensure every 
                  project meets exact specifications and deadlines.
                </p>
                <p>
                  We specialize in custom metal fabrication, precision machining, and assembly 
                  services for various industries, including lighting and industrial automation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl" ref={el => parallaxRefs.current[0] = el}>
              <h2 className="text-4xl font-light mb-8">Made in the U.S.A</h2>
              <div className="space-y-6">
                <p className="text-xl leading-relaxed text-gray-600">
                  Our light fixtures are custom made in the U.S.A. Ignited by impeccable designs and pristine craftsmanship, Sapphire Manufacturing creates one of a kind custom lighting for hospitality, gaming, and commercial properties worldwide.
                </p>
                <p className="text-xl leading-relaxed text-gray-600">
                  We specialize in challenging designs; our highly skilled team is equipped with cutting-edge 3-D modeling software and state-of-the-art machinery to overcome any complexities. Solution minded innovation matched with exceptional workmanship and customer service, creativity is limitless!
                </p>
              </div>
            </div>
            <div className="relative" ref={el => parallaxRefs.current[1] = el}>
              <div className="absolute -inset-4 bg-white rounded-lg transform rotate-3"></div>
              <div className="relative bg-white rounded-lg p-8">
                <img
                  src="https://sapphiremfg.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/07/09220137/img_home1.png"
                  alt="Sapphire Manufacturing Vision"
                  className="w-full h-auto rounded-lg shadow-xl hover-lift"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-light text-center mb-12">Trusted By Industry Leaders</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {clientLogos.map((logo, index) => (
              <div 
                key={index}
                className="flex items-center justify-center p-4 hover:opacity-80 transition-opacity"
              >
                <img
                  src={logo}
                  alt={`Client logo ${index + 1}`}
                  className="max-h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-black">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-4xl font-light text-white mb-6">Ready to Start Your Project?</h2>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-3 bg-white text-black rounded-md hover:bg-gray-100 transition-colors group"
          >
            Contact Us
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;