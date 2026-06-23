import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import LazyImage from '../components/LazyImage';

const services = [
  {
    title: 'Custom Finishes',
    description: 'Solid colors, mixed colors, texture, gold & silver leaf, chrome, nickel, brass and bronze. Pick any one of our standards, customize our standards to your needs or we can match control samples.',
    image: 'https://imagedelivery.net/n_dCasaHuVE9kaaQfihmuA/bb7d8737-4649-4a36-e182-9d110ad26300/w=800'
  },
  {
    title: 'Welding',
    description: 'Our experienced welders master the art of joining metal together to provide you with a safe and quality product.',
    image: 'https://imagedelivery.net/n_dCasaHuVE9kaaQfihmuA/66154893-7886-47ff-9744-acb6a8c9c500/w=800'
  },
  {
    title: 'Waterjet & Laser Cutting',
    description: 'Our state of the art machinery is able to cut all metal, resin, glass, stone, acrylic and wood to any shape and form to achieve the most challenging designs.',
    image: 'https://imagedelivery.net/n_dCasaHuVE9kaaQfihmuA/6b538954-7f3e-41d0-a404-4015e3c4cd00/w=800'
  },
  {
    title: 'Design Development',
    description: 'We make your vision and design concept become a reality.',
    image: 'https://imagedelivery.net/n_dCasaHuVE9kaaQfihmuA/55168e9e-00f9-4e00-601d-039b93b3f800/w=800'
  },
  {
    title: 'Custom Shades',
    description: 'Select from any one of our fabrics or specify your own and we will custom make your shade to your size requirements.',
    image: 'https://imagedelivery.net/n_dCasaHuVE9kaaQfihmuA/df626738-8248-4e35-196e-5cdebb717c00/w=800'
  },
  {
    title: 'CAD Drawings',
    description: 'Detailed engineered 3-D shop drawings, renderings, support point information, lamp specifications and installation instructions allow for an efficient and safe install.',
    image: 'https://imagedelivery.net/n_dCasaHuVE9kaaQfihmuA/3be62692-1145-4d78-28bd-4801b5987c00/w=800'
  },
  {
    title: 'UL Testing',
    description: 'Sapphire Manufacturing Inc is a certified UL shop meeting all codes for dry, damp and wet label testing and labeling.',
    image: 'https://imagedelivery.net/n_dCasaHuVE9kaaQfihmuA/84d2af46-6939-4858-43e3-7d0ab300d500/w=800'
  },
  {
    title: 'Acrylic Forming',
    description: 'Flat sheet vacuum formed into many different curves and shapes to achieve your design.',
    image: 'https://imagedelivery.net/n_dCasaHuVE9kaaQfihmuA/40d000af-c56b-4bc2-49d2-95c7d70f7800/w=800'
  },
  {
    title: 'Glass Slumping',
    description: 'Our in house oven enables us to form glass in many different curves, shapes and sizes to meet your design intent and project schedule.',
    image: 'https://imagedelivery.net/n_dCasaHuVE9kaaQfihmuA/44d585c6-f3c1-4a49-59d0-082e6a912f00/w=800'
  },
  {
    title: 'Metal Fabrication',
    description: 'The art of shaping and forming wrought iron or sheet metal to your design specifications.',
    image: 'https://imagedelivery.net/n_dCasaHuVE9kaaQfihmuA/a97b09f5-5f7a-4dcb-7e0a-3b6d5a420200/w=800'
  },
  {
    title: 'Sandblasting',
    description: 'Our metal parts are sand blasted to ensure proper adhesion of paint or powder coat finishes.',
    image: 'https://imagedelivery.net/n_dCasaHuVE9kaaQfihmuA/c6b0159a-ec33-4630-caac-65e666667300/w=800'
  },
  {
    title: 'Machining',
    description: 'CNC lathe and milling capabilities give us the advantage of doing custom billets to enhance the uniqueness of our product with quality and precision.',
    image: 'https://imagedelivery.net/n_dCasaHuVE9kaaQfihmuA/06143b12-dada-48ed-9c77-31a5d525f100/w=800'
  },
  {
    title: 'Packing',
    description: 'Properly packing product in crates and pallets with special care to prevent potential damage during transport.',
    image: 'https://imagedelivery.net/n_dCasaHuVE9kaaQfihmuA/2e221756-a324-4849-d210-22cc01778000/w=800'
  },
  {
    title: 'Painting & Powder Coating',
    description: 'Durable custom and standard paint/powder coat options available to withstand harsh environments.',
    image: 'https://imagedelivery.net/n_dCasaHuVE9kaaQfihmuA/6ed286d9-84ac-440e-39c0-6f1291f4ab00/w=800'
  },
  {
    title: 'Resin Casting',
    description: 'Custom molds for cylinders, panels, boxes, abstract shapes and sizes, smooth, pillowed or textured finish options available.',
    image: 'https://imagedelivery.net/n_dCasaHuVE9kaaQfihmuA/deabccf5-b7f0-4c42-4496-8b16a6636700/w=800'
  }
];

function Services() {
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Custom Lighting and Metal Fabrication Services",
    "description": "Comprehensive manufacturing solutions including custom lighting design, metal fabrication, precision machining, and assembly services.",
    "provider": {
      "@type": "Organization",
      "name": "Sapphire Manufacturing"
    },
    "serviceType": [
      "Custom Lighting Design",
      "Metal Fabrication",
      "Precision Machining",
      "Assembly Services"
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Our Services - Custom Manufacturing Solutions"
        description="Comprehensive manufacturing solutions including custom lighting design, metal fabrication, waterjet cutting, welding, and precision machining services."
        structuredData={servicesSchema}
      />
      {/* Hero Section */}
      <section className="relative h-[400px] sm:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <LazyImage
            src="https://sapphire-chandelier-com-cdn.s3.us-west-2.amazonaws.com/media-files/img/projects/Casinos/Bossier/24.IMG_2109+copy.webp"
            alt="Custom lighting manufacturing and installation"
            className="w-full h-full object-cover"
            loading="eager"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/50"></div>
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_1px_1px,rgba(196,161,77,0.15)_1px,transparent_0)] [background-size:40px_40px]"></div>
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-light text-white mb-4 sm:mb-6">
                OUR <span className="text-[#C4A14D]">SERVICES</span>
              </h1>
              <div className="h-1 w-20 sm:w-32 bg-[#C4A14D] mb-4 sm:mb-8"></div>
              <p className="text-base sm:text-xl text-gray-300 max-w-2xl uppercase">
                Combining cutting-edge technology with masterful craftsmanship to create
                bespoke lighting solutions for the world's most prestigious venues.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-black to-transparent"></div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div key={index} className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-16 sm:w-24 h-12 sm:h-16 flex-shrink-0">
                  <LazyImage
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-white">{service.title}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 sm:py-20 bg-black relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 sm:mb-8">READY TO SCHEDULE A CALL?</h2>
          <p className="text-base sm:text-xl text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto">
            Let's discuss how our comprehensive manufacturing services can bring your vision to life.
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

export default Services;