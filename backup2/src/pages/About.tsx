import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import LazyImage from '../components/LazyImage';

function About() {
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  return (
    <div>
      <SEOHead
        title="About Us - Precision Through Innovation"
        description="Learn about Sapphire Manufacturing's 40+ years of experience in custom fabrication, combining cutting-edge technology with masterful craftsmanship."
      />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://imagedelivery.net/n_dCasaHuVE9kaaQfihmuA/b75272b7-df71-4765-78a7-22de3d3ece00/w=1600)',
          }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        <div className="text-center z-10 px-4">
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-light text-white mb-6 sm:mb-8 uppercase">CRAFTING EXCELLENCE</h1>
          <p className="text-lg sm:text-2xl lg:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed uppercase">
            Custom lighting and architectural metal fabrication for hospitality, gaming, and commercial spaces.
          </p>
        </div>
        {/* Floating elements for visual interest */}
        <div className="absolute top-20 right-20 w-2 h-2 bg-[#C4A14D] rounded-full opacity-60 animate-pulse hidden md:block"></div>
        <div className="absolute bottom-32 left-16 w-1 h-1 bg-white rounded-full opacity-40 animate-pulse hidden md:block"></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-[#C4A14D] rounded-full opacity-50 animate-pulse hidden lg:block"></div>
      </section>

      {/* Company Overview Section */}
      <section className="py-12 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-light mb-4 sm:mb-6 text-gray-900 uppercase">ABOUT US</h2>
            <div className="w-16 sm:w-24 h-1 bg-[#C4A14D] mx-auto mb-6 sm:mb-8"></div>
            <p className="text-lg sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Sapphire Manufacturing is a custom fabrication partner serving designers, purchasers, and project teams across hospitality, commercial, and specialty environments.
            </p>
          </div>
          <div className="max-w-5xl mx-auto space-y-6">
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-center">
              With over 40 years of experience, we combine in-house engineering, skilled fabrication, and hands-on project management to support projects from concept through installation. We work directly with clients to understand project goals, budgets, design requirements, and project priorities before fabrication begins.
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-center">
              Our team provides detailed quotations, finish sampling, shop drawings, and clear project communication throughout the process. We believe successful projects start with accurate information, responsive service, and a collaborative approach that keeps everyone aligned.
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-center">
              From the initial inquiry through project completion, our focus is simple: deliver quality workmanship, communicate clearly, and be a reliable partner our clients can count on.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-20 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-light text-white mb-3 sm:mb-4 uppercase">OUR IMPACT</h2>
            <div className="w-12 sm:w-16 h-1 bg-[#C4A14D] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-white text-center relative z-10">
            {[
              { number: '40+', label: 'Years Experience' },
              { number: '5000+', label: 'Projects Completed' },
              { number: '30k', label: 'Square Foot Facility' },
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="bg-black rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-[#C4A14D]/50 transition-all duration-500 hover:transform hover:scale-105">
                  <div className="text-3xl sm:text-5xl font-light mb-3 sm:mb-4 text-[#C4A14D] group-hover:text-white transition-colors duration-300">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-gray-300 uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different Section */}
      <section className="py-12 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 text-gray-900 uppercase">OUR PROCESS — FROM VISION TO INSTALLATION</h2>
            <div className="w-16 sm:w-24 h-1 bg-[#C4A14D] mx-auto mb-6"></div>
            <p className="text-base sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Our process is built for real-world project demands: budget alignment, clear approvals, consistent quality, and on-time delivery.
            </p>
          </div>
          <div className="space-y-8 sm:space-y-16">
            {[
              {
                title: 'DESIGN-DRIVEN PARTNERSHIP',
                subtitle: 'Design intent protected — with budget and lead time clarity from day one',
                description:
                  "We're not just a vendor — we're a true project partner. From the first conversation, we align on scope, pricing, schedule, and technical requirements so your team can move forward with confidence. Expect clear quoting, responsive communication, and support throughout design development.",
                highlight: "A strong project starts with a quote that's accurate, detailed, and transparent.",
              },
              {
                title: 'PRECISION & QUALITY',
                subtitle: 'Built in California for tighter control, faster turnaround, and consistent results',
                description:
                  'All fabrication is completed in our Orange County facility under experienced project management and quality oversight. From shop drawings to sample approvals, we manage each phase with a focus on accuracy, repeatability, and clean execution.',
                highlight: 'Domestic production means faster decisions, fewer delays, and direct access to the team building your work.',
              },
              {
                title: 'MATERIAL EXPERTISE & FINISH MATCHING',
                subtitle: 'Control samples, finish matching, and fabrication methods that support your design',
                description:
                  "We source and fabricate with the flexibility to match designer-provided control samples, specialty finishes, and custom materials. Throughout production, we provide progress updates and visuals so you're never left guessing.",
                highlight: 'Finish consistency and proactive updates reduce risk — and prevent surprises late in the schedule.',
              },
              {
                title: 'ADVANCED ENGINEERING + SKILLED CRAFTSMANSHIP',
                subtitle: 'Complex fabrication made buildable — without compromising the design',
                description:
                  'Our team uses 3D modeling, shop-level engineering, and hands-on craftsmanship to solve challenges early and produce accurate, installation-ready assemblies. We engineer for fit, function, and long-term durability — including templates and coordination support when needed.',
                highlight: 'Great fabrication is equal parts engineering discipline and craftsmanship.',
              },
              {
                title: 'SEAMLESS EXECUTION & FULL TRANSPARENCY',
                subtitle: 'Delivered safely, clearly, and on schedule — with support through installation',
                description:
                  'From kickoff to final delivery, we prioritize communication, documentation, and schedule alignment. Every piece is carefully packaged for transport, labeled for installation, and supported with clear instructions so the field team can install efficiently.',
                highlight: 'No guesswork. No confusion. Just smooth delivery from shop to site.',
              },
            ].map((item, index) => (
              <div key={index} className="group relative">
                <div className="flex items-start space-x-4 sm:space-x-8">
                  {/* Number indicator */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#C4A14D] to-[#B8941A] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500">
                      <span className="text-white font-light text-base sm:text-xl">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex-1 pt-1 sm:pt-2">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-light mb-2 sm:mb-4 text-gray-900 group-hover:text-[#C4A14D] transition-colors duration-500">{item.title}</h3>
                    <h4 className="text-base sm:text-lg font-medium mb-2 sm:mb-4 text-[#C4A14D]">{item.subtitle}</h4>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed max-w-4xl">{item.description}</p>
                    <div className="mt-3 sm:mt-4 flex items-start">
                      <span className="text-[#C4A14D] mr-2 text-base sm:text-lg">→</span>
                      <p className="text-sm sm:text-base text-gray-700 italic font-medium">{item.highlight}</p>
                    </div>
                  </div>
                </div>
                {/* Decorative line */}
                {index < 4 && (
                  <div className="hidden sm:block absolute left-6 sm:left-8 top-16 sm:top-20 w-px h-12 sm:h-16 bg-gradient-to-b from-[#C4A14D]/30 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 sm:py-20 bg-black relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 sm:mb-8">READY TO START YOUR PROJECT?</h2>
          <p className="text-base sm:text-xl text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto">
            Let's discuss how we can bring your vision to life with our custom fabrication expertise.
          </p>
          <div>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 sm:px-10 py-3 sm:py-4 bg-[#C4A14D] text-white rounded-lg hover:bg-[#C4A14D]/90 transition-all duration-300 group text-base sm:text-lg font-medium shadow-xl hover:shadow-2xl hover:transform hover:scale-105"
            >
              Contact Us
              <ArrowRight className="ml-2 sm:ml-3 group-hover:translate-x-2 transition-transform duration-300 w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;